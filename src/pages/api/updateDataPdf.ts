import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    token: token,
    id,
    pdf_file,
    inc_req,
    collaborator,
    registration,
  } = req.body;

  const formData = new FormData();

  formData?.append("file", pdf_file);
  formData?.append("inc_req", inc_req);
  formData?.append("collaborator", collaborator);
  formData?.append("registration", registration);

  console.log(
    "Received file:",
    id,
    pdf_file,
    inc_req,
    collaborator,
    registration
  );

  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/pdf/data/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("PDF data SERVER:", response.data);
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to extract PDF: " + error.message });
  }
}
