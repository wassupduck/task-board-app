import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./schema";
import { LoginFormFieldValues } from "./types";

export function useLoginForm() {
  return useForm<LoginFormFieldValues>({
    resolver: zodResolver(loginFormSchema),
  });
}
