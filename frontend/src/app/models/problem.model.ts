export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
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

export interface EvaluationResult {
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compile Error';
  results: TestResult[];
  explanation: string;
}

export interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export interface CodeSubmission {
  problemId: string;
  code: string;
  language: string;
}
