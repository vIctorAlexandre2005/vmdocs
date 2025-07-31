import {
  Table,
  TableBody,
  TableCaption,
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
import { InputComponent } from "@/shared/components/InputComponent";
import { LuSend } from "react-icons/lu";
import { UpdateDataPdf } from "./dialogs/updateDataPdf";
import { DataPdfProps } from "@/shared/contexts/UploadPdfContext";
import { FaEye } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { ClipLoader } from "react-spinners";

export function TableWithData() {
  const { dataPdf, deleteDataPdf, loadingGetDataPdf } = usePdfData();
  const [selectedPdf, setSelectedPdf] = useState<DataPdfProps | null>(null);
  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);
  const [openDialogDeleteDataPdf, setOpenDialogDeleteDataPdf] = useState(false);

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <div className="flex items-center justify-center">
          {loadingGetDataPdf && <ClipLoader size={32} color="#4636f5" />}
        </div>
      <Table className="text-slate-800">
        {!loadingGetDataPdf && (
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
              {dataPdf?.map((pdf) => (
                <>
                  <TableRow key={pdf.id} className="cursor-pointer">
                    <TableCell
                      onClick={() => {
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2"
                    >
                      {pdf.file_name}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2"
                    >
                      {pdf.collaborator}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setSelectedPdf(pdf);
                        setOpenDialogViewPdf(true);
                      }}
                      className="font-semibold p-2"
                    >
                      {pdf.inc_req}
                    </TableCell>
                    <TableCell className="p-2 font-semibold flex items-center">
                      <ButtonComponent
                        onClick={() => {
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

                    {selectedPdf && (
                      <DialogComponent
                        open={openDialogViewPdf}
                        onOpenChange={setOpenDialogViewPdf}
                      >
                        <UpdateDataPdf
                          key={selectedPdf.id}
                          id={selectedPdf.id}
                          last_change={selectedPdf.last_change}
                          file_name={selectedPdf.file_name}
                          registration={selectedPdf.registration}
                          collaborator={selectedPdf.collaborator}
                          inc_req={selectedPdf.inc_req}
                          pdf_file={selectedPdf.pdf_file}
                          setOpenDialogViewPdf={setOpenDialogViewPdf}
                        />
                      </DialogComponent>
                    )}
                  </TableRow>
                </>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </div>
  );
}
