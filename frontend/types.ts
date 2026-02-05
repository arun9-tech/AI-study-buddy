
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface StudySession {
  id: string;
  userId: string;
  originalText: string;
  summary: string;
  simpleExplanation: string;
  questions: string;
  speechScore: number;
  speechFeedback: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  readingTime: string;
  keywords: string[];
  createdAt: string;
}

export enum View {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY',
  RESULT = 'RESULT'
}

export interface AIResponse {
  summary: string;
  simpleExplanation: string;
  questions: string;
  score: number;
  feedback: string;
  keywords: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  readingTime: string;
}
