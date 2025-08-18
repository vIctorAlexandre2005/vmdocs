import {
  Table,
  TableBody,
  TableCell,
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

const tableHeaders = [
  "Arquivo",
  "Colaborador",
  "Matrícula",
  "Incidente/Requisição",
  "Patrimônio",
  "Qtd. Páginas",
  "Data de criação",
  "Última alteração",
  "Ações",
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
      <Table className="text-slate-800 overflow-y-auto">
        {dataPdf.length > 0 && (
          <>
            <TableHeader className="border-t p-2">
              <TableRow className="text-slate-800 text-sm p-2">
                {tableHeaders.map((header, idx) => (
                  <TableHead
                    key={idx}
                    className="text-slate-800 p-2 font-bold border"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs overflow-y-auto">
              {detailedView &&
                filteredData?.map((pdf) =>
                  pdf.pages.map((page) => (
                    <>
                      <TableDetaildView
                        page={page}
                        pdf={pdf}
                        setFormDataByPage={setFormDataByPage}
                        selectedPdf={selectedPdf}
                        deleteDataPdf={deleteDataPdf}
                        openDialogDeleteDataPdf={openDialogDeleteDataPdf}
                        setOpenDialogDeleteDataPdf={setOpenDialogDeleteDataPdf}
                        setOpenDialogViewPdf={setOpenDialogViewPdf}
                        setSelectedPdf={setSelectedPdf}
                        key={`${page?.inc_req}-${page?.pageNumber}`}
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
                selectedPdf?.file_name as string,
                formDataByPage,
                selectedPdf?.pdf_file as string,
                false
              )
            }
          >
            <div className="flex w-full items-start gap-4">
              <ViewPdfInDialog pdfUrl={selectedPdf?.pdf_file as string} />
              <div className="flex w-full flex-col overflow-auto max-h-[400px] gap-2">
                {selectedPdf?.pages.map((page, idx) => (
                  <UpdateDataPdf
                    key={`${page?.inc_req}-${page?.pageNumber}`}
                    item={formDataByPage[idx]}
                    id={idx}
                    last_change={selectedPdf?.last_change}
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
