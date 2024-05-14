import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupFormSchema } from "./schema";
import { SignupFormData } from "./types";

export function useSignupForm() {
  return useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
  });
}
