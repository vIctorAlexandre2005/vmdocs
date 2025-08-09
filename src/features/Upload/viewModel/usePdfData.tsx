import {
  DataExtractedPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import {
  createPdf,
  deleteDataPdfService,
  getDataPdfService,
  updateDataPdfService,
} from "../service/pdfDataService";
import { useEffect, useState } from "react";
import { useUserContext } from "@/shared/contexts/UserContext";
import { useAuth } from "@/features/Auth/modelView/useAuth";
import { useRouter } from "next/router";
import {
  clearToast,
  errorToast,
  infoToast,
  loadingToast,
  successToast,
} from "@/shared/utils/toasts";
import { useContextAsyncDialog } from "@/shared/contexts/AsyncDialogContext";

export function usePdfData() {
  const { user } = useUserContext();
  const { filePdf, dataPdf, setDataPdf, progress, setProgress } =
    useUploadPdfContext();

  const { execute, isLoading } = useContextAsyncDialog();
  const router = useRouter();

  const [loadingCreatePdf, setLoadingCreatePdf] = useState(false);
  const [loadingGetDataPdf, setLoadingGetDataPdf] = useState(false);
  const [loadingDeleteDataPdf, setLoadingDeleteDataPdf] = useState(false);
  const [loadingUpdateDataPdf, setLoadingUpdateDataPdf] = useState(false);

  function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64 = reader.result.split(",")[1]; // remove prefixo data:application/pdf;base64,
        resolve(base64);
      } else {
        reject("Erro ao ler arquivo");
      }
    };
    reader.onerror = (error) => reject(error);
  });
}


  async function createDataPdf(
    filename: string,
    pages: DataExtractedPdfProps[]
  ) {
    let success = false;
    setLoadingCreatePdf(true);

    console.log("Páginas antes de setar no objeto: ", pages);

    const base64Pdf = await getBase64(filePdf!);

    await execute(
      async () => {
        const payload = {
          file_name: filename,
          pages: pages,
          pdf_file: base64Pdf, // string base64 aqui
        };
        try {
          const response = await createPdf(user, payload);
          console.log(response);
          setDataPdf([...(dataPdf || []), response?.data]);
          successToast("Criado com sucesso!");
          setLoadingCreatePdf(false);
        } catch (error) {
          errorToast("Erro ao criar!");
          console.error("Failed to create PDF data:", error);
        } finally {
          setLoadingCreatePdf(false);
          clearToast();
        }
      },
      { onSuccess: () => (success = true) }
    );
    return { success };
  }

  async function getDataPdf() {
    setLoadingGetDataPdf(true);
    try {
      if (user) {
        const response = await getDataPdfService(user);
        setDataPdf(response);
      }
      setProgress(100); // Assuming the progress is 100% after fetching data
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        router.push("/auth/login");
        errorToast("Sua sessão expirou!");
      }
      console.error("Erro:", error.response?.data?.error || error.message);
    } finally {
      setLoadingGetDataPdf(false);
    }
  }

  useEffect(() => {
    if (user) {
      getDataPdf();
    }
  }, [user]);

  async function updateDataPdf(
    id: number,
    pdf_file: string,
    inc_req: string,
    collaborator: string,
    registration: string,
    sameData: boolean
  ) {
    if (sameData) {
      infoToast("Os dados não foram alterados!");
      return;
    }
    setLoadingUpdateDataPdf(true);
    const formData = new FormData();
    try {
      const response = await updateDataPdfService(
        user,
        id,
        pdf_file,
        inc_req,
        collaborator,
        registration,
        formData
      );
      setDataPdf((prev) =>
        prev?.map((item) =>
          item.id === id
            ? { ...item, pdf_file, inc_req, collaborator, registration }
            : item
        )
      );
      successToast("Dados atualizado com sucesso!");
    } catch (error) {
      console.error("Failed to update PDF data:", error);
    } finally {
      setLoadingUpdateDataPdf(false);
    }
  }

  async function deleteDataPdf(id: number) {
    setLoadingDeleteDataPdf(true);
    try {
      await deleteDataPdfService(user, id);
      setDataPdf(dataPdf?.filter((item) => item.id !== id));
      successToast("Deletado com sucesso!");
    } catch (error) {
      errorToast("Erro ao deletar!");
      console.error("Failed to delete PDF data:", error);
    } finally {
      setLoadingDeleteDataPdf(false);
    }
  }

  return {
    createDataPdf,
    getDataPdf,
    dataPdf,
    setDataPdf,
    progress,
    setProgress,
    updateDataPdf,
    deleteDataPdf,

    //loaders
    loadingCreatePdf,
    loadingGetDataPdf,
    loadingDeleteDataPdf,
    loadingUpdateDataPdf,
    setLoadingCreatePdf,
    setLoadingGetDataPdf,
    setLoadingDeleteDataPdf,
    setLoadingUpdateDataPdf,
  };
}
