import { drizzle } from "drizzle-orm/expo-sqlite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { questionTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import WordCardComponents from "../../components/WordCardComponents";

export default function GetCollection() {
  const { id } = useLocalSearchParams();

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { questionTable } });
  const [all, setAll] = useState<
    {
      id: number;
      question: string | null;
      image: string | null;
      answer: string;
      collectionId: number;
    }[]
  >([]);

  useEffect(() => {
    if (!id) return;
    const fetchCollections = async () => {
      const questions = await drizzleDb
        .select()
        .from(questionTable)
        .where(eq(questionTable.collectionId, Number(id)))
        .orderBy(questionTable.id)
        .all();

      console.log(questions);
      setAll(questions);
    };

    fetchCollections();
  }, [id]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push(`/word/new/${id}`);
        }}
        style={styles.baseCard}
      >
        <Text>Add new question</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push(`/play/${id}`);
        }}
        style={styles.playBtn}
      >
        <Text>Learn</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: "black",
          marginVertical: 10,
          width: "100%",
        }}
      />
      {all.map((question) => (
        <View key={question.id}>
          <WordCardComponents
            image={question.image ?? undefined}
            question={question.question ?? ""}
            answer={question.answer}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  baseCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
