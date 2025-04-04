import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface WordCardProps {
  image?: string;
  question: string;
  answer: string;
}

export default function WordCardComponents({
  image,
  question,
  answer,
}: WordCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.questionText}>{question}</Text>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    height: 120,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 32,
    overflow: "hidden",
  },
  imageContainer: {
    width: 160,
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 24,
    color: "#333333",
    marginBottom: 8,
  },
  answerText: {
    fontSize: 16,
    color: "#666666",
  },
});
