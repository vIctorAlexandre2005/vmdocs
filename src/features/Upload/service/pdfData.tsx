import axios from "axios";

export async function createPdf(
  pdfExtractor: {
    file_name: string;
    inc_req: string;
    collaborator: string;
    registration: string;
    pdf_file: File | undefined;
  },
  formData: FormData
) {
  formData.append("file_name", pdfExtractor.file_name);
  formData.append("inc_req", pdfExtractor.inc_req);
  formData.append("collaborator", pdfExtractor.collaborator);
  formData.append("registration", pdfExtractor.registration);
  formData.append("pdf_file", pdfExtractor.pdf_file as Blob);
  console.log("FormData being sent:", formData);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/pdf/data",
      formData
    );
    console.log("PDF data created successfully:", response.data);
    return response;
  } catch (error: any) {
    throw new Error("Failed to extract PDF: " + error.message);
  }
}
