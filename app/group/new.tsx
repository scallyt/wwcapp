import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { groupTable } from "../../db/schema";
import { router } from "expo-router";

export default function NewGrup() {
  const [name, setName] = useState("");

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { groupTable } });

  const handleSubmit = async () => {
    if (!name) {
      alert("Please enter a group name");
      return;
    }

    console.log("Creating group with name:", name);

    const result = await drizzleDb
      .insert(groupTable)
      .values({
        name: name,
      })
      .returning();
    console.log(result);

    router.push("/");
    setName("");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Group Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter group name"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    maxWidth: 400,
    alignSelf: "center",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
