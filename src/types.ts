export interface Option {
  label: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: string;
  image?: string;
}

export interface Test {
  title: string;
  questions: Question[];
}

export interface TestMetadata {
  id: string;
  title: string;
  file: string;
  questionCount: number;
}

export interface UserAnswers {
  [questionId: number]: string;
}
