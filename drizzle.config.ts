import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: "postgres://robynellison@localhost:5432/flashcards-italian",
  },
  out: "./drizzle",
});
