import { UseFormReturn } from "react-hook-form";

export type LoginFormFieldValues = {
  username: string;
  password: string;
};

export type UseLoginFormReturn = UseFormReturn<LoginFormFieldValues>;
