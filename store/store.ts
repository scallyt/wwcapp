import { create } from "zustand";

interface GameState {
  gameId: string | null;
  setGameId: (gameId: string) => void;
  questions: string[];
  setQuestions: (questions: string[]) => void;
  ansers: string[];
  setAnswers: (answers: string[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  image: string | null;
  setImage: (image: string) => void;
}

const useGameStore = create<GameState>((set) => ({
  gameId: null,
  setGameId: (gameId) => set({ gameId }),
  questions: [],
  setQuestions: (questions) => set({ questions }),
  ansers: [],
  setAnswers: (answers) => set({ ansers: answers }),
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  image: null,
  setImage: (image) => set({ image })
}));

export default useGameStore;