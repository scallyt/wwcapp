import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { groupTable } from "../db/schema";
import CardComponent from "../components/CardComponent";
import NewCardComponent from "../components/NewCardComponent";

export default function Index() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { groupTable } });
  const [all, setAll] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await drizzleDb.select().from(groupTable).all();
      setAll(groups);
      console.log(groups);
    };

    fetchGroups();
  }, []);

  return (
    <View>
      <NewCardComponent type="group" name="New Group" />
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: "black",
          marginVertical: 10,
          width: "100%",
        }}
      />
      {all.map((group) => (
        <View key={group.id}>
          <CardComponent link={`${group.id}`} name={group.name} />
        </View>
      ))}
    </View>
  );
}
