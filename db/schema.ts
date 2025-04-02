import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const groupTable = sqliteTable("groups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const collectionTable = sqliteTable("collections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  groupId: integer("group_id").notNull().references(() => groupTable.id, { onDelete: "cascade" }),
});

export const questionTable = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question"),
  image: text("image"),
  answer: text("answer").notNull(),
  collectionId: integer("collection_id").notNull().references(() => collectionTable.id, { onDelete: "cascade" }),
});

export const groupRelations = relations(groupTable, ({ many }) => ({
  collections: many(collectionTable)
}));

export const collectionRelations = relations(collectionTable, ({ one, many }) => ({
  group: one(groupTable, {
    fields: [collectionTable.groupId],
    references: [groupTable.id],
  }),
  questions: many(questionTable)
}));

export const questionRelations = relations(questionTable, ({ one }) => ({
  collection: one(collectionTable, {
    fields: [questionTable.collectionId],
    references: [collectionTable.id],
  })
}));
