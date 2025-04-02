import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { groupTable } from "../db/schema";
import CardComponent from "../components/CardComponent";
import NewCardComponent from "../components/NewCardComponent";

export default function index() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { groupTable } });

  const [all, setAll] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const groups = drizzleDb.select().from(groupTable).all();
    setAll(groups);
    console.log(groups);
  }, []);

  return (
    <View>
      <NewCardComponent type="group" name="New Group" />
      <View
        style={{
          borderBottomWidth: 2, // You can adjust thickness here
          borderColor: "black",
          marginVertical: 10,
          width: "100%",
        }}
      />
      {all.map((group) => (
        <View key={group.id}>
          <CardComponent link={group.id} name={group.name} />
        </View>
      ))}
    </View>
  );
}
