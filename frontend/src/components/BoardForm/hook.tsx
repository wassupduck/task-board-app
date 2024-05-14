import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { boardFormSchema } from "./schema";
import { BoardFormData } from "./types";

interface UseBoardFormProps {
  defaultValues?: UseFormProps<BoardFormData>["defaultValues"];
}

export function useBoardForm(props?: UseBoardFormProps) {
  return useForm<BoardFormData>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: props?.defaultValues,
  });
}
