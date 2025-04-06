import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Link, Slot } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import migrations from "../drizzle/migrations";
import { Text } from "react-native";

export default function RootLayout({}) {
  const expoDb = openDatabaseSync("db");
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    const init = async () => {
      await expoDb.execAsync("PRAGMA foreign_keys = ON;");
      const res = await expoDb.getFirstAsync("PRAGMA foreign_keys;");
      console.log("Foreign keys enabled:", res);
    };
    init();
  }, []);

  return (
    <>
      <Suspense>
        <SQLiteProvider
          databaseName="db"
          useSuspense={true}
          options={{ enableChangeListener: true }}
        >
          <Slot />
        </SQLiteProvider>
      </Suspense>
    </>
  );
}
