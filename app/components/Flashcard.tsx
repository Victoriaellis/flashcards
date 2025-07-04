"use-client";

import { useState } from "react";
import { FlashcardType } from "../types";

export const Flashcard = ({
  id,
  front,
  back,
  categoryName,
  categoryId,
}: FlashcardType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFrontValue, setNewFrontValue] = useState(front);
  const [newBackValue, setNewBackValue] = useState(back);

  const handleEditCard = async () => {
    try {
      const response = await fetch(`/api/edit?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          front: newFrontValue,
          back: newBackValue,
          categoryId: categoryId,
        }),
      });
      const data = await response.json();
      setIsEditing(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isEditing) {
    return (
      <li className="border rounded-lg p-5 border-gray-300 flex flex-col gap-2">
        <input
          className="border border-gray-300 rounded p-1"
          value={newFrontValue}
          onChange={(e) => setNewFrontValue(e.target.value)}
          placeholder="Front"
        />
        <input
          className="border border-gray-300 rounded p-1"
          placeholder="Back"
          value={newBackValue}
          onChange={(e) => setNewBackValue(e.target.value)}
        />
        <button
          onClick={handleEditCard}
          className="border-2 border-gray-300 rounded-lg py-1 px-3 cursor-pointer"
        >
          Save
        </button>
      </li>
    );
  }

  return (
    <li className="border rounded-lg p-5 border-gray-300 flex justify-between items-start">
      <div>
        <p className="text-2xl pb-2">
          <strong>{newFrontValue}</strong>: {newBackValue}
        </p>
        <p>Category: {categoryName}</p>
      </div>
      <button className="cursor-pointer" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    </li>
  );
};
