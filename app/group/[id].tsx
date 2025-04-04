import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";
import { groupTable, collectionTable } from "../../db/schema";
import NewCardComponent from "../../components/NewCardComponent";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";

export default function GroupId() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) return <Text>Loading...</Text>;

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { groupTable, collectionTable } });

  const [all, setAll] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchCollections = async () => {
      const collections = await drizzleDb
        .select({
          id: collectionTable.id,
          name: collectionTable.name,
        })
        .from(collectionTable)
        .where(eq(collectionTable.groupId, Number(id)));

      console.log(collections);

      setAll(collections);
    };

    fetchCollections();
  }, [id]);

  return (
    <View>
      <NewCardComponent type="collection" name="New Collection" id={id} />
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: "black",
          marginVertical: 10,
          width: "100%",
        }}
      />

      {all.map((collection) => (
        <View key={collection.id}>
          <CardComponent
            link={`/${collection.id}`}
            name={collection.name}
            type={"collection"}
          />
        </View>
      ))}
    </View>
  );
}
