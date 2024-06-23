import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./login-form.schema";
import { LoginFormData } from "./login-form.types";

export function useLoginForm() {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
}
