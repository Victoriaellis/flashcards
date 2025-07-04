import { NextResponse } from "next/server";
import { db } from "../../../src/db";
import { categories, flashcards } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category");

  try {
    const query = db
      .select({
        id: flashcards.id,
        front: flashcards.front,
        back: flashcards.back,
        categoryId: flashcards.categoryId,
        categoryName: categories.name,
      })
      .from(flashcards)
      .leftJoin(categories, eq(flashcards.categoryId, categories.id));

    const filtered = categoryId
      ? query.where(eq(categories.name, categoryId))
      : query;

    const results = await filtered;
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
