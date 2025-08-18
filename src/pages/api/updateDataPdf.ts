import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token: token, id: id, payload: payload } = req.body;

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/pdf/data/${id}`,
      //`${process.env.NEXT_PUBLIC_API_URL_LOCAL}/v1/pdf/data/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to extract PDF: " + error.message });
  }
}
