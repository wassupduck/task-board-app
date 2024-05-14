import { UseFormReturn } from "react-hook-form";

export type LoginFormData = {
  username: string;
  password: string;
};

export type UseLoginFormReturn = UseFormReturn<LoginFormData>;
