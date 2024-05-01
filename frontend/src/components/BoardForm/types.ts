import { UseFormReturn } from "react-hook-form";

export type BoardFormFieldValues = {
  name: string;
  columns: { id?: string; name: string }[];
};

export type UseBoardFormReturn = UseFormReturn<BoardFormFieldValues>;
