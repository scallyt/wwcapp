import { drizzle } from "drizzle-orm/expo-sqlite";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { questionTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

type Question = {
  id: number;
  question: string | null;
  image: string | null;
  answer: string;
  collectionId: number;
};

export default function IndexPlay() {
  const { id } = useLocalSearchParams();
  const [questionPool, setQuestionPool] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  console.log("ID:", id);

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { questionTable } });

  const fetchQuestions = async (id: number) => {
    const questions = await drizzleDb
      .select()
      .from(questionTable)
      .where(eq(questionTable.collectionId, id))
      .all();
    console.log("Fetched Questions:", questions);
    return questions;
  };

  function shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  useEffect(() => {
    if (!id) return;
    const init = async () => {
      const questions = await fetchQuestions(Number(id));
      const shuffledQuestions = shuffleArray(questions);
      setQuestionPool(shuffledQuestions);
      setCurrentQuestion(shuffledQuestions[0]);

      console.log(questionPool);
      console.log(currentQuestion);
    };
    init();
  }, []);

  function KnowHandleNextQuestion() {
    if (questionPool.length === 1) {
      alert("Well done! You have answered all the questions.");
      router.back();
    }

    questionPool.splice(questionPool.indexOf(currentQuestion!), 1);

    const nextQuestion =
      questionPool[questionPool.indexOf(currentQuestion!) + 1];
    setCurrentQuestion(nextQuestion);
    setShowAnswer(false);
  }

  function DontKnowHandleNextQuestion() {
    shuffleArray(questionPool);

    const nextQuestion =
      questionPool[questionPool.indexOf(currentQuestion!) + 1];
    setCurrentQuestion(nextQuestion);
    setShowAnswer(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.qContainer}>
        <Text style={styles.text}>{currentQuestion?.question}</Text>
        {currentQuestion?.image && (
          <Image
            source={{ uri: currentQuestion.image }}
            style={{ width: 250, height: 250, marginTop: 10 }}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={DontKnowHandleNextQuestion}
          style={styles.noButton}
        >
          <Text style={styles.buttonText}>NO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showAnswerButton}
          onPress={() => setShowAnswer(!showAnswer)}
        >
          <Text style={styles.buttonText}>
            {showAnswer ? currentQuestion?.answer : "Show Answer"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={KnowHandleNextQuestion}
          style={styles.yesButton}
        >
          <Text style={styles.buttonText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  qContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: "100%",
    maxHeight: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
  },
  noButton: {
    backgroundColor: "#ff4444",
    padding: 20,
    borderRadius: 10,
    width: "25%",
    alignItems: "center",
  },
  showAnswerButton: {
    backgroundColor: "#cccccc",
    padding: 20,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  yesButton: {
    backgroundColor: "#44ff44",
    padding: 20,
    borderRadius: 10,
    width: "25%",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
