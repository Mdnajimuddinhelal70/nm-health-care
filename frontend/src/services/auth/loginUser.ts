/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const loginUser = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
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
