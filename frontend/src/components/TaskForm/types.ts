import { UseFormReturn } from "react-hook-form";

export type TaskFormData = {
  title: string;
  description: string;
  subtasks: { id?: string; title: string }[];
  boardColumnId: string;
};

export type UseTaskFormReturn = UseFormReturn<TaskFormData>;
