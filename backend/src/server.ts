import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Types
interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  order: number;
  description: string;
  initialCode: {
    python: string;
    cpp: string;
    java: string;
  };
  testCases: TestCase[];
}

interface CodeSubmission {
  problemId: string;
  code: string;
  language: string;
}

interface EvaluationResult {
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compile Error';
  results: TestResult[];
  explanation: string;
}

interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

// Sample problems data
const PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    category: 'Array',
    order: 1,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:
**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].

### Example 2:
**Input:** nums = [3,2,4], target = 6
**Output:** [1,2]

### Constraints:
* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* \`-10^9 <= target <= 10^9\`
* **Only one valid answer exists.**`,
    initialCode: {
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ",
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}"
    },
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" }
    ]
  },
  {
    id: 'fibonacci-number',
    title: '509. Fibonacci Number',
    difficulty: 'Easy',
    category: 'Recursion',
    order: 509,
    description: `The **Fibonacci numbers**, commonly denoted \`F(n)\` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from \`0\` and \`1\`. That is:
\`F(0) = 0, F(1) = 1\`
\`F(n) = F(n - 1) + F(n - 2)\`, for \`n > 1\`.

Given \`n\`, calculate \`F(n)\`.`,
    initialCode: {
      python: "class Solution:\n    def fib(self, n: int) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int fib(int n) {\n        \n    }\n};",
      java: "class Solution {\n    public int fib(int n) {\n        \n    }\n}"
    },
    testCases: [
      { input: "n = 2", expectedOutput: "1" },
      { input: "n = 4", expectedOutput: "3" }
    ]
  }
];

// Routes

// Get all problems
app.get('/api/problems', (req: Request, res: Response) => {
  res.json(PROBLEMS);
});

// Get problem by ID
app.get('/api/problems/:id', (req: Request, res: Response) => {
  const problem = PROBLEMS.find(p => p.id === req.params.id);
  if (problem) {
    res.json(problem);
  } else {
    res.status(404).json({ error: 'Problem not found' });
  }
});

// Evaluate code
app.post('/api/evaluate', async (req: Request, res: Response) => {
  try {
    const { problemId, code, language } = req.body as CodeSubmission;
    
    const problem = PROBLEMS.find(p => p.id === problemId);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const model = 'gemini-3-flash-preview';
    
    // Format test cases for execution
    const testCaseInstructions = problem.testCases.map((tc, i) => {
      return `Test Case ${i + 1}:\n  Input: ${tc.input}\n  Expected Output: ${tc.expectedOutput}`;
    }).join('\n\n');
    
    const prompt = `You are a precise code evaluator. Analyze and execute the following ${language} code against the given test cases.

PROBLEM: ${problem.title}

CODE TO EVALUATE:
\`\`\`${language}
${code}
\`\`\`

TEST CASES:
${testCaseInstructions}

INSTRUCTIONS:
1. Check if the code has any syntax errors, compilation errors, or runtime errors
2. For each test case:
   - Parse the input as shown
   - Execute the code with that input
   - Compare the output with expected output
   - Mark as passed or failed
3. If there are ANY execution errors (syntax, runtime, logic), provide detailed error message

IMPORTANT: For Python code with a Solution class method:
- The code should follow the "def methodName(self, parameters):" pattern
- Test by calling: solution = Solution(); result = solution.methodName(input_params)
- Return the exact output

Return ONLY valid JSON (no markdown, no extra text):
{
  "status": "Accepted" | "Wrong Answer" | "Compile Error" | "Runtime Error",
  "explanation": "Clear explanation of what happened. If there's an error, explain what went wrong.",
  "results": [
    {
      "input": "the input used",
      "expected": "the expected output",
      "actual": "the actual output or error message",
      "passed": boolean
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let result: EvaluationResult;
    try {
      result = JSON.parse(response.text || '{}') as EvaluationResult;
      
      // Validate the response structure
      if (!result.status || !Array.isArray(result.results)) {
        throw new Error('Invalid response structure from AI');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', response.text);
      return res.status(500).json({
        status: 'Compile Error',
        results: [],
        explanation: 'Error evaluating code. Please check your syntax and try again.'
      });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Evaluation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to evaluate code';
    res.status(500).json({
      status: 'Compile Error',
      results: [],
      explanation: `Evaluation failed: ${errorMessage}`
    });
  }
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Start server
app.listen(port, () => {
  console.log(`CodeQuest Backend running on http://localhost:${port}`);
});
