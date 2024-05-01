import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { boardFormSchema } from "./schema";
import { BoardFormFieldValues } from "./types";

interface UseBoardFormProps {
  defaultValues?: UseFormProps<BoardFormFieldValues>["defaultValues"];
}

export function useBoardForm(props?: UseBoardFormProps) {
  return useForm<BoardFormFieldValues>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: props?.defaultValues,
  });
}
