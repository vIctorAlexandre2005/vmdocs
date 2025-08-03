import { useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";
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

  async function createDataPdf(
    filename: string,
    incReq: string,
    collaborator: string,
    registration: string,
    patrimony: string,
  ) {
    let success = false;
    setLoadingCreatePdf(true);
    await execute(
      async () => {
        const data = {
          file_name: filename,
          inc_req: incReq,
          collaborator: collaborator,
          registration: registration,
          patrimony: patrimony,
          pdf_file: filePdf,
        };
        const formData = new FormData();
        try {
          const response = await createPdf(user, data, formData);
          console.log(response);
          setDataPdf([...(dataPdf || []), response?.data]);
          successToast("Criado com sucesso!");
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
