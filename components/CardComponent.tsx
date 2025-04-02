import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

interface CardProps {
  link: number;
  name: string;
}

export default function CardComponent({ link, name }: CardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/group/${link}`)}
      style={styles.baseCard}
    >
      <View style={styles.content}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 36 }}>{name}</Text>
        </View>
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
    fontSize: 32,
  },
});
