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
import { useState } from "react";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { ViewPdfInDialog } from "@/features/Upload/View/dialogs/DialogConfirmDataToSend/ViewPdfInDialog";
import { UpdateDataPdf } from "./dialogs/updateDataPdf";
import {
  DataPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import { FaEdit, FaEye } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { ClipLoader } from "react-spinners";

const tableHeaders = [
  "Arquivo",
  "Colaborador",
  "Incidente/Requisição",
  "Patrimônio",
  "Qtd. Páginas",
  "Data de criação",
  "Última alteração",
  "Ações",
];

export function TableWithData() {
  const { dataPdf, deleteDataPdf, loadingGetDataPdf, updateDataPdf, isLoading } =
    usePdfData();
  const [selectedPdf, setSelectedPdf] = useState<DataPdfProps | null>(null);
  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);
  const [openDialogDeleteDataPdf, setOpenDialogDeleteDataPdf] = useState(false);

  const { formDataByPage, setFormDataByPage } = useUploadPdfContext();

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <div className="fixed top-1/2 left-3/5 transform flex flex-col gap-12 -translate-x-1/2 -translate-y-1/2">
        {loadingGetDataPdf && <ClipLoader size={42} color="#4636f5" />}
      </div>
      {dataPdf.length === 0 && !loadingGetDataPdf && (
        <div className="flex justify-center items-center gap-4 flex-col">
          <img src={"/no_data.svg"} height={150} width={150} />
          <p className="text-slate-800">Nenhum upload encontrado</p>
        </div>
      )}
      <Table className="text-slate-800">
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
            <TableBody className="text-xs">
              {dataPdf?.map((pdf) => (
                <>
                  <TableRow key={pdf?.id} className="cursor-pointer">
                    <TableCell
                      onClick={() => {
                        setFormDataByPage(pdf?.pages);
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2 border"
                    >
                      {pdf?.file_name?.toUpperCase()}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setFormDataByPage(pdf?.pages);
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2 border"
                    >
                      {`${pdf?.pages[0]?.collaborator?.toUpperCase()} ${
                        pdf?.pages?.length > 1 ? "(...)" : ""
                      }`}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setFormDataByPage(pdf?.pages);
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2 border"
                    >
                      {`${pdf?.pages[0]?.inc_req?.toUpperCase()} ${
                        pdf?.pages?.length > 1 ? "(...)" : ""
                      }`}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setFormDataByPage(pdf?.pages);
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2 border"
                    >
                      {`${pdf?.pages[0]?.patrimony?.toUpperCase()} ${
                        pdf?.pages?.length > 1 ? "(...)" : ""
                      }`}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setFormDataByPage(pdf?.pages);
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2 border"
                    >
                      {pdf?.pages?.length} {/* busca o último pageNumber */}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setFormDataByPage(pdf?.pages);
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2 border"
                    >
                      {pdf?.created_at}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setFormDataByPage(pdf?.pages);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2 border"
                    >
                      {pdf?.last_change}
                    </TableCell>
                    <TableCell className="p-2 font-semibold border flex items-center">
                      <ButtonComponent
                        onClick={() => {
                          setFormDataByPage(pdf?.pages);
                          setSelectedPdf(pdf);
                          setOpenDialogViewPdf(true);
                        }}
                        iconLeft={<FaEye size={18} />}
                        text="Visualizar"
                        className="font-semibold text-indigo-500"
                      />
                      {/* <ButtonComponent iconLeft={<TbTrash size={20} />} text="Excluir" className="font-semibold text-red-500" /> */}
                      <DialogComponent
                        iconTriggerLeft={<TbTrash size={20} />}
                        textTrigger="Excluir"
                        textButtonCancel="Cancelar"
                        textButtonConfirm="Sim, excluir"
                        isDelete={true}
                        open={openDialogDeleteDataPdf}
                        onOpenChange={setOpenDialogDeleteDataPdf}
                        onClick={() => {
                          deleteDataPdf(pdf?.id as number);
                          setOpenDialogDeleteDataPdf(false);
                        }}
                        title="Deseja excluir os dados deste termo?"
                        classNameTrigger="font-semibold cursor-pointer flex gap-1 items-center text-red-500"
                      />
                    </TableCell>
                  </TableRow>
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
