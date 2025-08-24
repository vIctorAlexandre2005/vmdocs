import { DataRegisterProps } from "@/features/Auth/modelView/useAuth";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { login, full_name, email, password }: DataRegisterProps = req.body;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      //`${process.env.NEXT_PUBLIC_API_URL_LOCAL}/register`,
      {
        login: login,
        full_name: full_name,
        email: email,
        password: password,
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    res
      .status(error?.response?.data?.status)
      .json({ error: error?.response?.data?.message });
  }
}
