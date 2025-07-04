import { NextResponse } from "next/server";
import { db } from "../../../src/db";
import { flashcards } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const flashcardId = searchParams.get("id");

  if (!flashcardId) {
    return NextResponse.json(
      { error: "Missing flashcard ID in query parameters" },
      { status: 400 }
    );
  }

  try {
    const data = await request.json();

    if (!data.front || !data.back) {
      return NextResponse.json(
        { error: "Front and back fields are required" },
        { status: 400 }
      );
    }

    const updatedFlashcard = await db
      .update(flashcards)
      .set({
        front: data.front,
        back: data.back,
        categoryId: data.categoryId ?? null, // allow optional update
      })
      .where(eq(flashcards.id, Number(flashcardId)))
      .returning();

    if (updatedFlashcard.length === 0) {
      return NextResponse.json(
        { error: "Flashcard not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Flashcard updated successfully",
        flashcard: updatedFlashcard[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
