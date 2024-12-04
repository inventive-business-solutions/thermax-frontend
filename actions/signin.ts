"use server";

import { signIn } from "@/auth";
import { SignInSchema } from "@/configs/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof SignInSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      let message = "";
      switch (error.type) {
        case "CredentialsSignin":
          message = "Invalid email or password. Please try again.";
          break;
        default:
          message = "An error occurred. Please try again.";
      }
      return { status: "error", message };
    }
    return { status: "error", message: "Something went wrong in sign in." };
  }
};
