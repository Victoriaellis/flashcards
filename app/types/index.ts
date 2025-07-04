export type FlashcardType = {
  id: number;
  front: string;
  back: string;
  categoryId?: number | null;
  categoryName?: string | null;
};

export type CategoryType = {
  id: string;
  name: string;
};
