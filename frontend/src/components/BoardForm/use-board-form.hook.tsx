import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { boardFormSchema } from "./board-form.schema";
import { BoardFormData } from "./board-form.types";

interface UseBoardFormProps {
  defaultValues?: UseFormProps<BoardFormData>["defaultValues"];
}

export function useBoardForm(props?: UseBoardFormProps) {
  return useForm<BoardFormData>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: props?.defaultValues,
  });
}
