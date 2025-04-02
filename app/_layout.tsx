import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Slot } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import migrations from "../drizzle/migrations";

export default function RootLayout({}) {
  const expoDb = openDatabaseSync("db");
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

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
