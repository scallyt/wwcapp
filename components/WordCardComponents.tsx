import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

interface WordCardProps {
  image?: string;
  question: string;
  answer: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function WordCardComponents({
  image,
  question,
  answer,
  onEdit,
  onDelete,
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
            <Image source={require("../assets/edit.png")} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
            <Image
              source={require("../assets/rubbish-bin.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
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
  buttonContainer: {
    position: "absolute",
    right: 8,
    top: 8,
    flexDirection: "column",
  },
  iconButton: {
    padding: 4,
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
