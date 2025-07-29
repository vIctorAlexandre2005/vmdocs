import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { token } = req.body;

  console.log("Token:", token);

  try {
    const response = await axios.get("http://localhost:8080/api/v1/pdf/data", { 
      headers: { 
        Authorization: `Bearer ${token}`
      } 
    });
    console.log("PDF extraction response:", response);
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to extract PDF: " + error.message });
  }
}
