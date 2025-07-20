import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { file } = req.body;
  console.log("Received file:", file);
  if (!file) {
    return res.status(400).json({ error: "File is required" });
  }

  const formData = new FormData();
  formData.append("file", file);

  console.log("Extracting PDF:", formData);

  try {
    const response = await fetch("http://localhost:8080/api/v1/pdf", {
        method: "POST",
        body: formData,
      });
      console.log("PDF extraction response:", response);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to extract PDF: " + error.message });
  }
}
