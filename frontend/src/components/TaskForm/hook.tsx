import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { TaskFormData } from "./types";
import { taskFormSchema } from "./schema";

interface UseTaskFormProps {
  defaultValues?: UseFormProps<TaskFormData>["defaultValues"];
}

export function useTaskForm(props?: UseTaskFormProps) {
  return useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: props?.defaultValues,
  });
}
