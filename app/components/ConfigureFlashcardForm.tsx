"use client";
import { useState, useEffect } from "react";
import { CategoryType } from "../types";

export const ConfigureFlashCardForm = () => {
  const [newFrontValue, setNewFrontValue] = useState("");
  const [newBackValue, setNewBackValue] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/categories`);
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        front: newFrontValue,
        back: newBackValue,
        categoryId: selectedCategoryId ? parseInt(selectedCategoryId) : null,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Flashcard created!");
      setNewFrontValue("");
      setNewBackValue("");
      setSelectedCategoryId("");
    } else {
      alert("❌ Error: " + result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-2 mt-5">
      <label>Front value</label>
      <input
        className="border border-gray-300 rounded p-1 h-10"
        onChange={(e) => setNewFrontValue(e.target.value)}
        value={newFrontValue}
        name="front"
        required
      />
      <label>Back value</label>
      <input
        className="border border-gray-300 rounded p-1 h-10"
        onChange={(e) => setNewBackValue(e.target.value)}
        value={newBackValue}
        name="back"
        required
      />
      <label>Category</label>
      <select
        name="category"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="border border-gray-300 rounded p-1 h-10"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        className="border border-gray-300 rounded-lg py-2 px-3 mt-3"
        type="submit"
      >
        Add flashcard
      </button>
    </form>
  );
};
