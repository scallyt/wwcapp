import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import { router, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { collectionTable, groupTable } from "../db/schema";
import { eq } from "drizzle-orm";

interface CardProps {
  link: string;
  name: string;
  type: string;
}

export default function CardComponent({ link, name, type }: CardProps) {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { groupTable, collectionTable } });

  const deleteFn = async () => {
    Alert.alert("Delete", "Are you sure you want to delete this?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const id = parseInt(link.replace(/^\/+/, ""));

          if (type === "collection") {
            console.log("Deleting collection with ID:", id);
            const resoult = await drizzleDb
              .delete(collectionTable)
              .where(eq(collectionTable.id, id))
              .run();
            console.log("Collection deleted with ID:", id);
            console.log(resoult);
            router.push("/");
          } else if (type === "group") {
            await drizzleDb
              .delete(groupTable)
              .where(eq(groupTable.id, id))
              .run();
            router.push("/");
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/${type}/${link}`)}
      style={styles.baseCard}
    >
      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={{ fontSize: 36 }}>{name}</Text>
        </View>
        <TouchableOpacity onPress={deleteFn} style={styles.deleteButton}>
          <Image
            source={require("../assets/rubbish-bin.png")}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseCard: {
    width: "auto",
    height: 120,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 32,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  nameContainer: {
    flex: 1,
    justifyContent: "center",
  },
  deleteButton: {
    padding: 10,
  },
});
