import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { usePdfData } from "@/features/Upload/viewModel/usePdfData";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { useEffect, useState } from "react";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { ViewPdfInDialog } from "@/features/Upload/View/dialogs/DialogConfirmDataToSend/ViewPdfInDialog";
import { UpdateDataPdf } from "./dialogs/updateDataPdf";
import {
  DataPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import { FaEdit, FaEye } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { useTableDashboardContext } from "@/shared/contexts/TableDashboard";
import { TableDetaildView } from "./TableDetaildView";
import { TableDefaultView } from "./TableDefaultView";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const tableHeaders = [
  "Arquivo",
  "Incidente/Requisição",
  "Matrícula",
  "Colaborador",
  "Grupo",
  "VP",
  "UO",
  "Empresa",
  "Localização",
  "Gestor Imediato",
  "Marca/Modelo",
  "Patrimônio",
  "Tipo de movimentação",
  "Tipo de notebook entregue",
  "Equipamento devolvido",
  "Criado em",
  "Criado por",
  "Atualizado em",
  "Alterado por",
  "Ações",
];

export function TableWithData() {
  const {
    dataPdf,
    deleteDataPdf,
    loadingGetDataPdf,
    updateDataPdf,
    isLoading,
  } = usePdfData();
  const [selectedPdf, setSelectedPdf] = useState<DataPdfProps | null>(null);
  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);
  const [openDialogDeleteDataPdf, setOpenDialogDeleteDataPdf] = useState(false);

  console.log("selectedPdf", selectedPdf);

  const { filteredData, setFilteredData, detailedView } =
    useTableDashboardContext();

  const { formDataByPage, setFormDataByPage } = useUploadPdfContext();

  useEffect(() => {
    setFilteredData(dataPdf);
  }, [dataPdf, setFilteredData]);

  return (
    <div className="max-h-[calc(100vh-150px)] max-w-[calc(100vw-200px)] overflow-y-auto">
      <div className="fixed top-1/2 left-3/5 transform flex flex-col gap-12 -translate-x-1/2 -translate-y-1/2">
        {loadingGetDataPdf && <ClipLoader size={42} color="#4636f5" />}
      </div>
      {dataPdf.length === 0 && !loadingGetDataPdf && (
        <div className="flex justify-center items-center gap-4 flex-col">
          <img src={"/no_data.svg"} height={150} width={150} />
          <p className="text-slate-800">Nenhum upload encontrado</p>
        </div>
      )}
      <Table className="rounded-2xl shadow-sm overflow-auto">
        {dataPdf.length > 0 && (
          <>
            <TableHeader>
              <TableRow className="font-bold">
                {tableHeaders.map((header, idx) => (
                  <TableHead
                    key={idx}
                    className="text-slate-700 text-center font-bold"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailedView &&
                filteredData?.map((pdf) =>
                  pdf.pages.map((page) => (
                    <>
                      <TableDetaildView
                        page={page}
                        pdf={pdf}
                        setFormDataByPage={setFormDataByPage}
                        selectedPdf={selectedPdf}
                        isLoadingForOperation={isLoading}
                        deleteDataPdf={deleteDataPdf}
                        openDialogDeleteDataPdf={openDialogDeleteDataPdf}
                        setOpenDialogDeleteDataPdf={setOpenDialogDeleteDataPdf}
                        setOpenDialogViewPdf={setOpenDialogViewPdf}
                        setSelectedPdf={setSelectedPdf}
                        key={`${page?.incident_request}-${page?.page_number}`}
                      />
                    </>
                  ))
                )}

              {!detailedView &&
                filteredData?.map((pdf) => (
                  <>
                    <TableDefaultView
                      deleteDataPdf={deleteDataPdf}
                      page={pdf.pages[0]}
                      selectedPdf={selectedPdf}
                      isLoadingForOperation={isLoading}
                      openDialogDeleteDataPdf={openDialogDeleteDataPdf}
                      setOpenDialogDeleteDataPdf={setOpenDialogDeleteDataPdf}
                      setOpenDialogViewPdf={setOpenDialogViewPdf}
                      setSelectedPdf={setSelectedPdf}
                      setFormDataByPage={setFormDataByPage}
                      pdf={pdf}
                    />
                  </>
                ))}
            </TableBody>
          </>
        )}

        {openDialogViewPdf && (
          <DialogComponent
            open={openDialogViewPdf}
            onOpenChange={setOpenDialogViewPdf}
            textButtonCancel="Fechar"
            textButtonConfirm="Alterar"
            iconButton={<FaEdit size={18} />}
            loadingFallbackButton={isLoading}
            onClick={() =>
              updateDataPdf(
                selectedPdf?.id as number,
                formDataByPage,
              )
            }
          >
            <div className="flex w-full items-start gap-4">
              <ViewPdfInDialog
                pdfUrl={selectedPdf?.pdf_file as string}
                file_name={selectedPdf?.file_name}
              />
              <div className="flex w-full flex-col overflow-auto max-h-[75vh] gap-2">
                {selectedPdf?.pages.map((page, idx) => (
                  <UpdateDataPdf
                    key={`${page?.incident_request}-${page?.page_number}`}
                    item={formDataByPage[idx]}
                    id={idx}
                    last_change={selectedPdf?.updated_at}
                    file_name={selectedPdf?.file_name}
                    pages={selectedPdf?.pages}
                    setOpenDialogViewPdf={setOpenDialogViewPdf}
                  />
                ))}
              </div>
            </div>
          </DialogComponent>
        )}
      </Table>
    </div>
  );
}
