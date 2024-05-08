import { UseFormReturn } from "react-hook-form";

export type SignupFormFieldValues = {
  username: string;
  password: string;
  confirm: string;
};

export type UseSignupFormReturn = UseFormReturn<SignupFormFieldValues>;
