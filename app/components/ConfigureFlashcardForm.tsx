"use client";
import { useState } from "react";

export const ConfigureFlashCardForm = () => {
  const [newFrontValue, setNewFrontValue] = useState("");
  const [newBackValue, setNewBackValue] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        front: newFrontValue,
        back: newBackValue,
        categoryId: newCategoryId ? parseInt(newCategoryId) : null,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Flashcard created!");
      setNewFrontValue("");
      setNewBackValue("");
      setNewCategoryId("");
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
        value={newCategoryId}
        onChange={(e) => setNewCategoryId(e.target.value)}
        className="border border-gray-300 rounded p-1 h-10"
      >
        <option value="">-- Select Category --</option>
        <option value="1">Italian Verbs</option>
        <option value="2">Food Vocabulary</option>
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
