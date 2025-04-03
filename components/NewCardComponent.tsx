import { useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface CardProps {
  type: "group" | "collection";
  name: string;
  id?: string | undefined;
}

export default function CardComponent({ type, name, id }: CardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        type === "group"
          ? router.push(`/${type}/new`)
          : router.push(`/${type}/new/${id}`);
      }}
      style={styles.baseCard}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
});
