import { drizzle } from "drizzle-orm/expo-sqlite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { questionTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { View, Text, TouchableOpacity } from "react-native";
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
      <Text>{id}</Text>
      <TouchableOpacity
        onPress={() => {
          router.push(`/word/new/${id}`);
        }}
      >
        <Text style={{ color: "blue" }}>Create new word</Text>
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
