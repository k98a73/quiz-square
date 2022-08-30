export interface QuizItem {
  id: string;
  uid: string;
  userName: string;
  genre: string;
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  description: string;
  favorites: string[];
  likes: string[];
  correctAnswerRate: boolean[];
}
