import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  categoryId: serial("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
});
