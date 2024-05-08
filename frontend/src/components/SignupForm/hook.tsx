import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupFormSchema } from "./schema";
import { SignupFormFieldValues } from "./types";

export function useSignupForm() {
  return useForm<SignupFormFieldValues>({
    resolver: zodResolver(signupFormSchema),
  });
}
