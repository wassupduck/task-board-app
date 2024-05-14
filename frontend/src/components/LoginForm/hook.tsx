import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./schema";
import { LoginFormData } from "./types";

export function useLoginForm() {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
}
