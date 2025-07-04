"use-client";

import { useState } from "react";
import { FlashcardType } from "../types";

export const Flashcard = ({ front, back, categoryName }: FlashcardType) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <li className="border rounded-lg p-5 border-gray-300 flex flex-col gap-2">
        <input
          className="border border-gray-300 rounded p-1"
          placeholder="Front"
        />
        <input
          className="border border-gray-300 rounded p-1"
          placeholder="Back"
        />
        <button
          onClick={() => setIsEditing(false)}
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
          <strong>{front}</strong>: {back}
        </p>
        <p>Category: {categoryName}</p>
      </div>
      <button className="cursor-pointer" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    </li>
  );
};
