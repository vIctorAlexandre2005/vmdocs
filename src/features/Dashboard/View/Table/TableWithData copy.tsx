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
import { DataPdfProps } from "@/shared/contexts/UploadPdfContext";
import { FaEye } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { ClipLoader } from "react-spinners";

{/* VERSÃO COM AS CELULAS SEPARADAS */}

export function TableWithData() {
  const { dataPdf, deleteDataPdf, loadingGetDataPdf } = usePdfData();
  const [selectedPdf, setSelectedPdf] = useState<DataPdfProps | null>(null);
  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);
  const [openDialogDeleteDataPdf, setOpenDialogDeleteDataPdf] = useState(false);

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <div className="fixed top-1/2 left-3/5 transform flex flex-col gap-12 -translate-x-1/2 -translate-y-1/2">
        {loadingGetDataPdf && <ClipLoader size={36} color="#4636f5" />}
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
                <TableHead className="text-slate-800 font-bold p-2">
                  Nome do termo
                </TableHead>
                <TableHead className="text-slate-800 p-2 font-bold">
                  Colaborador
                </TableHead>
                <TableHead className="text-slate-800 p-2 font-bold">
                  Incidente/Requisição
                </TableHead>
                <TableHead className=" p-2 font-bold text-slate-800">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              {dataPdf?.map((pdf) =>
                pdf.pages.map((page) => (
                  <TableRow
                    key={`${pdf.id}-${page.pageNumber}`}
                    className="cursor-pointer"
                  >
                    {/* Nome do termo */}
                    <TableCell
                      onClick={() => {
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2"
                    >
                      {pdf.file_name}
                    </TableCell>

                    {/* Colaborador */}
                    <TableCell className="p-2">{page.collaborator}</TableCell>

                    {/* Incidente/Requisição */}
                    <TableCell className="p-2">{page.inc_req}</TableCell>

                    {/* Ações */}
                    <TableCell className="p-2 font-semibold flex items-center gap-2">
                      <ButtonComponent
                        onClick={() => {
                          setSelectedPdf(pdf);
                          setOpenDialogViewPdf(true);
                        }}
                        iconLeft={<FaEye size={18} />}
                        text="Visualizar"
                        className="font-semibold text-indigo-500"
                      />
                      <DialogComponent
                        iconTriggerLeft={<TbTrash size={20} />}
                        textTrigger="Excluir"
                        textButtonCancel="Cancelar"
                        textButtonConfirm="Sim, excluir"
                        isDelete={true}
                        open={openDialogDeleteDataPdf}
                        onOpenChange={setOpenDialogDeleteDataPdf}
                        onClick={() => {
                          deleteDataPdf(pdf.id);
                          setOpenDialogDeleteDataPdf(false);
                        }}
                        title="Deseja excluir os dados deste termo?"
                        classNameTrigger="font-semibold cursor-pointer flex gap-1 items-center text-red-500"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </>
        )}

        {selectedPdf && (
          <DialogComponent
            open={openDialogViewPdf}
            onOpenChange={setOpenDialogViewPdf}
            textButtonCancel="Fechar"
            textButtonConfirm="Alterar"
          >
            <div className="flex w-full items-start gap-2">
              <ViewPdfInDialog pdfUrl={selectedPdf.pdf_file} />
              <div className="flex w-full flex-col overflow-auto max-h-[400px] gap-2">
                {selectedPdf.pages.map((p) => (
                  <UpdateDataPdf
                    key={`${selectedPdf.id}-${p.pageNumber}`}
                    item={p}
                    id={selectedPdf.id}
                    file_name=""
                    last_change={selectedPdf.last_change}
                    pages={selectedPdf.pages}
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
