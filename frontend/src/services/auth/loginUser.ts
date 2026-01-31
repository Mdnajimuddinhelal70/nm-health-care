/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";

const loginValidationZodSchema = z.object({
  email: z.email({ error: "Invalid email adress" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(60, { message: "Password is too long" }),
});
export const loginUser = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedFields = loginValidationZodSchema.safeParse(loginData);
    console.log(validatedFields);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            filed: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "Login failed" };
  }
};
