import { NextResponse } from "next/server";
import { db } from "../../../src/db";
import { flashcards } from "@/src/db/schema";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.front || !data.back) {
      return NextResponse.json(
        { error: "Front and back words are required" },
        { status: 400 }
      );
    }

    const newFlashcard = await db
      .insert(flashcards)
      .values({
        front: data.front,
        back: data.back,
        categoryId: data.categoryId,
      })
      .returning();

    return NextResponse.json(
      { message: "Flashcard created successfully", flashcard: newFlashcard[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating flashcards:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
