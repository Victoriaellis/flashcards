import { NextResponse } from "next/server";
import { db } from "../../../src/db/client";
import { categories } from "@/src/db/schema";

export async function GET() {
  try {
    const allCategories = await db.select().from(categories);
    return NextResponse.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
