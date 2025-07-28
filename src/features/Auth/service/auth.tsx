import axios from "axios";

export async function loginService(login: string, password: string) {
  console.log("Login:", login, password);

  try {
    const response = await axios.post("/api/login", {
      login: login,
      password: password,
    });
    console.log("Login response SERVICE:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to login: " + error.message);
  }
}
