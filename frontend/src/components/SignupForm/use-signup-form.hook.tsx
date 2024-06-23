import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupFormSchema } from "./signup-form.schema";
import { SignupFormData } from "./signup-form.types";

export function useSignupForm() {
  return useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
  });
}
