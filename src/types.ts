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

export const PROBLEMS: Problem[] = [
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
  },
  {
    id: 'climbing-stairs',
    title: '70. Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    order: 70,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.
Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    initialCode: {
      python: "class Solution:\n    def climbStairs(self, n: int) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};",
      java: "class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}"
    },
    testCases: [
      { input: "n = 2", expectedOutput: "2" },
      { input: "n = 3", expectedOutput: "3" }
    ]
  },
  {
    id: 'house-robber',
    title: '198. House Robber',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    order: 198,
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return *the maximum amount of money you can rob tonight without alerting the police*.`,
    initialCode: {
      python: "class Solution:\n    def rob(self, nums: List[int]) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};",
      java: "class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}"
    },
    testCases: [
      { input: "nums = [1,2,3,1]", expectedOutput: "4" },
      { input: "nums = [2,7,9,3,1]", expectedOutput: "12" }
    ]
  },
  {
    id: 'coin-change',
    title: '322. Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    order: 322,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    initialCode: {
      python: "class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};",
      java: "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}"
    },
    testCases: [
      { input: "coins = [1,2,5], amount = 11", expectedOutput: "3" },
      { input: "coins = [2], amount = 3", expectedOutput: "-1" }
    ]
  },
  {
    id: 'longest-common-subsequence',
    title: '1143. Longest Common Subsequence',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    order: 1143,
    description: `Given two strings \`text1\` and \`text2\`, return *the length of their longest common subsequence*. If there is no common subsequence, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.`,
    initialCode: {
      python: "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        \n    }\n};",
      java: "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        \n    }\n}"
    },
    testCases: [
      { input: "text1 = \"abcde\", text2 = \"ace\"", expectedOutput: "3" },
      { input: "text1 = \"abc\", text2 = \"def\"", expectedOutput: "0" }
    ]
  },
  {
    id: 'edit-distance',
    title: '72. Edit Distance',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    order: 72,
    description: `Given two strings \`word1\` and \`word2\`, return *the minimum number of operations required to convert \`word1\` to \`word2\`*.

You have the following three operations permitted on a word:
1. Insert a character
2. Delete a character
3. Replace a character`,
    initialCode: {
      python: "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        \n    }\n};",
      java: "class Solution {\n    public int minDistance(String word1, String word2) {\n        \n    }\n}"
    },
    testCases: [
      { input: "word1 = \"horse\", word2 = \"ros\"", expectedOutput: "3" },
      { input: "word1 = \"intention\", word2 = \"execution\"", expectedOutput: "5" }
    ]
  },
  {
    id: 'unique-paths',
    title: '62. Unique Paths',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    order: 62,
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the **top-left corner** (i.e., \`grid[0][0]\`). The robot tries to move to the **bottom-right corner** (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.`,
    initialCode: {
      python: "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        \n    }\n};",
      java: "class Solution {\n    public int uniquePaths(int m, int n) {\n        \n    }\n}"
    },
    testCases: [
      { input: "m = 3, n = 7", expectedOutput: "28" },
      { input: "m = 3, n = 2", expectedOutput: "3" }
    ]
  },
  {
    id: 'subsets',
    title: '78. Subsets',
    difficulty: 'Medium',
    category: 'Recursion',
    order: 78,
    description: `Given an integer array \`nums\` of unique elements, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in any order.`,
    initialCode: {
      python: "class Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        ",
      cpp: "class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        \n    }\n};",
      java: "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        \n    }\n}"
    },
    testCases: [
      { input: "nums = [1,2,3]", expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", expectedOutput: "[[],[0]]" }
    ]
  },
  {
    id: 'permutations',
    title: '46. Permutations',
    difficulty: 'Medium',
    category: 'Recursion',
    order: 46,
    description: `Given an array \`nums\` of distinct integers, return *all the possible permutations*. You can return the answer in **any order**.`,
    initialCode: {
      python: "class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        ",
      cpp: "class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        \n    }\n};",
      java: "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}"
    },
    testCases: [
      { input: "nums = [1,2,3]", expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "nums = [0,1]", expectedOutput: "[[0,1],[1,0]]" }
    ]
  },
  {
    id: 'generate-parentheses',
    title: '22. Generate Parentheses',
    difficulty: 'Medium',
    category: 'Recursion',
    order: 22,
    description: `Given \`n\` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.`,
    initialCode: {
      python: "class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        ",
      cpp: "class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        \n    }\n};",
      java: "class Solution {\n    public List<String> generateParenthesis(int n) {\n        \n    }\n}"
    },
    testCases: [
      { input: "n = 3", expectedOutput: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]" },
      { input: "n = 1", expectedOutput: "[\"()\"]" }
    ]
  },
  {
    id: 'palindrome-partitioning',
    title: '131. Palindrome Partitioning',
    difficulty: 'Medium',
    category: 'Recursion',
    order: 131,
    description: `Given a string \`s\`, partition \`s\` such that every substring of the partition is a **palindrome**. Return *all possible palindrome partitioning of \`s\`*.`,
    initialCode: {
      python: "class Solution:\n    def partition(self, s: str) -> List[List[str]]:\n        ",
      cpp: "class Solution {\npublic:\n    vector<vector<string>> partition(string s) {\n        \n    }\n};",
      java: "class Solution {\n    public List<List<String>> partition(String s) {\n        \n    }\n}"
    },
    testCases: [
      { input: "s = \"aab\"", expectedOutput: "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]" },
      { input: "s = \"a\"", expectedOutput: "[[\"a\"]]" }
    ]
  },
  {
    id: 'word-break',
    title: '139. Word Break',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    order: 139,
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.`,
    initialCode: {
      python: "class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        ",
      cpp: "class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};",
      java: "class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        \n    }\n}"
    },
    testCases: [
      { input: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]", expectedOutput: "true" },
      { input: "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]", expectedOutput: "true" }
    ]
  },
  {
    id: 'maximum-subarray',
    title: '53. Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    order: 53,
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.`,
    initialCode: {
      python: "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};",
      java: "class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}"
    },
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "nums = [1]", expectedOutput: "1" }
    ]
  },
  {
    id: 'pascals-triangle',
    title: '118. Pascal\'s Triangle',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    order: 118,
    description: `Given an integer \`numRows\`, return the first numRows of **Pascal's triangle**.`,
    initialCode: {
      python: "class Solution:\n    def generate(self, numRows: int) -> List[List[int]]:\n        ",
      cpp: "class Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        \n    }\n};",
      java: "class Solution {\n    public List<List<Integer>> generate(int numRows) {\n        \n    }\n}"
    },
    testCases: [
      { input: "numRows = 5", expectedOutput: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]" },
      { input: "numRows = 1", expectedOutput: "[[1]]" }
    ]
  },
  {
    id: 'power-of-two',
    title: '231. Power of Two',
    difficulty: 'Easy',
    category: 'Recursion',
    order: 231,
    description: `Given an integer \`n\`, return \`true\` if it is a power of two. Otherwise, return \`false\`.`,
    initialCode: {
      python: "class Solution:\n    def isPowerOfTwo(self, n: int) -> bool:\n        ",
      cpp: "class Solution {\npublic:\n    bool isPowerOfTwo(int n) {\n        \n    }\n};",
      java: "class Solution {\n    public boolean isPowerOfTwo(int n) {\n        \n    }\n}"
    },
    testCases: [
      { input: "n = 1", expectedOutput: "true" },
      { input: "n = 16", expectedOutput: "true" },
      { input: "n = 3", expectedOutput: "false" }
    ]
  },
  {
    id: 'binary-tree-inorder-traversal',
    title: '94. Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    category: 'Recursion',
    order: 94,
    description: `Given the \`root\` of a binary tree, return *the inorder traversal of its nodes' values*.`,
    initialCode: {
      python: "class Solution:\n    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n        ",
      cpp: "class Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        \n    }\n};",
      java: "class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        \n    }\n}"
    },
    testCases: [
      { input: "root = [1,null,2,3]", expectedOutput: "[1,3,2]" },
      { input: "root = []", expectedOutput: "[]" }
    ]
  },
  {
    id: 'n-queens',
    title: '51. N-Queens',
    difficulty: 'Hard',
    category: 'Recursion',
    order: 51,
    description: `The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.`,
    initialCode: {
      python: "class Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        ",
      cpp: "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        \n    }\n};",
      java: "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        \n    }\n}"
    },
    testCases: [
      { input: "n = 4", expectedOutput: "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]" },
      { input: "n = 1", expectedOutput: "[[\"Q\"]]" }
    ]
  },
  {
    id: 'sudoku-solver',
    title: '37. Sudoku Solver',
    difficulty: 'Hard',
    category: 'Recursion',
    order: 37,
    description: `Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules**:
1. Each of the digits \`1-9\` must occur exactly once in each row.
2. Each of the digits \`1-9\` must occur exactly once in each column.
3. Each of the digits \`1-9\` must occur exactly once in each of the 9 \`3x3\` sub-boxes of the grid.`,
    initialCode: {
      python: "class Solution:\n    def solveSudoku(self, board: List[List[str]]) -> None:\n        ",
      cpp: "class Solution {\npublic:\n    void solveSudoku(vector<vector<char>>& board) {\n        \n    }\n};",
      java: "class Solution {\n    public void solveSudoku(char[][] board) {\n        \n    }\n}"
    },
    testCases: [
      { input: "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]", expectedOutput: "Solved Board" }
    ]
  },
  {
    id: 'longest-palindromic-substring',
    title: '5. Longest Palindromic Substring',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    order: 5,
    description: `Given a string \`s\`, return *the longest palindromic substring* in \`s\`.`,
    initialCode: {
      python: "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        ",
      cpp: "class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};",
      java: "class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}"
    },
    testCases: [
      { input: "s = \"babad\"", expectedOutput: "\"bab\"" },
      { input: "s = \"cbbd\"", expectedOutput: "\"bb\"" }
    ]
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: '121. Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    order: 121,
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.`,
    initialCode: {
      python: "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};",
      java: "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}"
    },
    testCases: [
      { input: "prices = [7,1,5,3,6,4]", expectedOutput: "5" },
      { input: "prices = [7,6,4,3,1]", expectedOutput: "0" }
    ]
  },
  {
    id: 'reverse-integer',
    title: '7. Reverse Integer',
    difficulty: 'Medium',
    category: 'Math',
    order: 7,
    description: `Given a signed 32-bit integer \`x\`, return \`x\` with its digits reversed. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, then return \`0\`.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

### Example 1:
**Input:** x = 123
**Output:** 321

### Example 2:
**Input:** x = -123
**Output:** -321

### Constraints:
* \`-2^31 <= x <= 2^31 - 1\``,
    initialCode: {
      python: "class Solution:\n    def reverse(self, x: int) -> int:\n        ",
      cpp: "class Solution {\npublic:\n    int reverse(int x) {\n        \n    }\n};",
      java: "class Solution {\n    public int reverse(int x) {\n        \n    }\n}"
    },
    testCases: [
      { input: "x = 123", expectedOutput: "321" },
      { input: "x = -123", expectedOutput: "-321" }
    ]
  },
  {
    id: 'median-of-two-sorted-arrays',
    title: '4. Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Array',
    order: 4,
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.

### Example 1:
**Input:** nums1 = [1,3], nums2 = [2]
**Output:** 2.00000
**Explanation:** merged array = [1,2,3] and median is 2.

### Example 2:
**Input:** nums1 = [1,2], nums2 = [3,4]
**Output:** 2.50000
**Explanation:** merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.`,
    initialCode: {
      python: "class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        ",
      cpp: "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};",
      java: "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}"
    },
    testCases: [
      { input: "nums1 = [1,3], nums2 = [2]", expectedOutput: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", expectedOutput: "2.5" }
    ]
  }
];
