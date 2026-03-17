export interface Problem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  initialCode: {
    python: string;
    cpp: string;
    java: string;
  };
}