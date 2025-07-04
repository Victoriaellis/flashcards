import { drizzle as drizzlePostgres } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzlePostgres(
  "postgres://robynellison@localhost:5432/flashcards-italian",
  {
    schema,
  }
);
