import { NextResponse } from "next/server";
import { db } from "../../../src/db/client";
import { categories, flashcards } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allFlashcards = await db
      .select({
        id: flashcards.id,
        front: flashcards.front,
        back: flashcards.back,
        categoryId: flashcards.categoryId,
        categoryName: categories.name,
      })
      .from(flashcards)
      .leftJoin(categories, eq(flashcards.categoryId, categories.id));
    return NextResponse.json(allFlashcards);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
