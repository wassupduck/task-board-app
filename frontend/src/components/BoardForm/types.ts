import { UseFormReturn } from "react-hook-form";

export type BoardFormData = {
  name: string;
  columns: { id?: string; name: string }[];
};

export type UseBoardFormReturn = UseFormReturn<BoardFormData>;
