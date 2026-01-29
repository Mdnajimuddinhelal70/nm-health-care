/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
export const registerPatients = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        address: formData.get("address"),
        email: formData.get("email"),
      },
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    const res = await fetch(
      "http://localhost:5000/api/v1/user/create-patient",
      {
        method: "POST",
        body: newFormData,
      },
    ).then((res) => res.json());
    return res;
  } catch (error) {
    console.log(error);
    return { error: "Registration failed" };
  }
};
