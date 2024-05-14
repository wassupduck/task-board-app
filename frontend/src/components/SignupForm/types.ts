import { UseFormReturn } from "react-hook-form";

export type SignupFormData = {
  username: string;
  password: string;
  confirm: string;
};

export type UseSignupFormReturn = UseFormReturn<SignupFormData>;
