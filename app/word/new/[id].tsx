import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { questionTable } from "../../../db/schema";
import { router, useLocalSearchParams } from "expo-router";

export default function NewWord() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { questionTable } });

  const params = useLocalSearchParams();
  const collectionId = typeof params.id === "string" ? parseInt(params.id) : 0;

  const [image, setImage] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const resoult = await drizzleDb
      .insert(questionTable)
      .values({
        question: question,
        answer: answer,
        collectionId: collectionId,
        image: image,
      })
      .returning();

    console.log(resoult);
    setQuestion("");
    setAnswer("");
    setImage(null);
    alert("Word created successfully!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Question</Text>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          placeholder="Enter question"
        />
        <Text style={styles.label}>Answer</Text>
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={setAnswer}
          placeholder="Enter answer"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image from camera roll</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16,
  },
  imageContainer: {
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F3F4F6",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
