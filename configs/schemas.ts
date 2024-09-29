import * as zod from "zod"

export const SignInSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod.string(),
})

export const SignUpSchema = zod
  .object({
    firstName: zod
      .string({ required_error: "First name is required" })
      .min(2, {
        message: "First name must be at least 2 characters",
      })
      .max(50, {
        message: "First name must be at most 50 characters",
      }),
    lastName: zod
      .string({ required_error: "Last name is required" })
      .min(2, {
        message: "Last name must be at least 2 characters",
      })
      .max(50, {
        message: "Last name must be at most 50 characters",
      }),
    email: zod.string({ required_error: "Valid email is required" }).email({ message: "Invalid email address" }),
    password: zod.string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: zod.string({ required_error: "Confirm password is required" }),
    role: zod.string({ required_error: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
