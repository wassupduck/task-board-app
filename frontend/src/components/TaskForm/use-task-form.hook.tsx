import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { TaskFormData } from "./task-form.types";
import { taskFormSchema } from "./task-form.schema";

interface UseTaskFormProps {
  defaultValues?: UseFormProps<TaskFormData>["defaultValues"];
}

export function useTaskForm(props?: UseTaskFormProps) {
  return useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: props?.defaultValues,
  });
}
