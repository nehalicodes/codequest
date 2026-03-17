// Mock service for code evaluation
export async function evaluateCode(problem, code, language) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock evaluation result
  const mockResults = [
    { input: '[2,7,11,15], 9', actual: '[0,1]', passed: true },
    { input: '[3,2,4], 6', actual: '[1,2]', passed: true },
    { input: '[3,3], 6', actual: '[0,1]', passed: true },
  ];

  return {
    status: 'Accepted',
    explanation: 'Your solution passed all test cases!',
    results: mockResults
  };
}