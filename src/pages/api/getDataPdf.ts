import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;

  try {
    /* const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/pdf/data`, { */
    const response = await axios.get(`http://localhost:8080/api/v1/pdf/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data?.message || "Erro ao extrair PDF";
    res.status(status).json({ error: message });
  }
}
