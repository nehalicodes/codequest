import { GoogleGenAI } from "@google/genai";
import { Problem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function evaluateCode(problem: Problem, code: string, language: string) {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    You are a coding judge like LeetCode. 
    Evaluate the following code for the problem: "${problem.title}".
    
    Problem Description:
    ${problem.description}
    
    Language: ${language}
    Code:
    ${code}
    
    Test Cases to check:
    ${problem.testCases.map((tc, i) => `Case ${i + 1}: Input: ${tc.input}, Expected: ${tc.expectedOutput}`).join('\n')}
    
    Return a JSON response with the following structure:
    {
      "status": "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Compile Error",
      "results": [
        {
          "input": "string",
          "expected": "string",
          "actual": "string",
          "passed": boolean
        }
      ],
      "explanation": "Brief explanation of the result"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Evaluation error:", error);
    return {
      status: "Error",
      explanation: "Failed to evaluate code. Please check your connection or API key."
    };
  }
}
