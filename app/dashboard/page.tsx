"use client";

import { useEffect, useState } from "react";
import { Flashcard } from "../components/Flashcard";
import Link from "next/link";
import { CategoryType, FlashcardType } from "../types";

export default function DashboardPage() {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await fetch(
          `/api/flashcards?category=${selectedCategoryId}`
        );
        const data = await res.json();
        setFlashcards(data);
      } catch (error) {
        console.error("Failed to fetch flashcards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [selectedCategoryId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
        console.log(data);
      } catch {
        console.error("failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full px-10">
      <h1 className="text-3xl font-bold text-center">Flashcards Dashboard</h1>
      <select
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="my-5 text-xl p-1 border border-gray-300 rounded-lg"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <ul className="grid grid-cols-3 gap-3">
        {flashcards.map((card) => (
          <Flashcard
            id={card.id}
            key={card.id}
            front={card.front}
            back={card.back}
            categoryName={card.categoryName}
          />
        ))}
        <Link className="pt-2 text-blue-600" href="/new">
          + Add new flashcard
        </Link>
      </ul>
      <div className="w-full flex justify-center">
        <Link
          href="/review"
          className="border border-gray-300 py-2 px-3 rounded-lg mt-5"
        >
          Start a review
        </Link>
      </div>
    </div>
  );
}
