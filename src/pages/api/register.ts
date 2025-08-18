import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { login, confirmPassword } = req.body;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      //`${process.env.NEXT_PUBLIC_API_URL_LOCAL}/register`,
      {
        login: login,
        password: confirmPassword,
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to extract PDF: " + error.message });
  }
}
