import {
  TableCell,
  TableRow,
} from "@/shared/components/ui/table";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { FaEdit, FaEye } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { DataExtractedPdfProps, DataPdfProps } from "@/shared/contexts/UploadPdfContext";
import { Dispatch, SetStateAction } from "react";

interface TableDefaultViewProps {
  pdf: DataPdfProps;
  setSelectedPdf: React.Dispatch<React.SetStateAction<DataPdfProps | null>>;
  setFormDataByPage: Dispatch<SetStateAction<DataExtractedPdfProps[]>>;
  setOpenDialogViewPdf: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDialogDeleteDataPdf: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDataPdf: (id: number) => Promise<void>;
  openDialogDeleteDataPdf: boolean;
}

export function TableDefaultView({
  pdf,
  setSelectedPdf,
  setOpenDialogViewPdf,
  setOpenDialogDeleteDataPdf,
  deleteDataPdf,
  setFormDataByPage,
  openDialogDeleteDataPdf,
}: TableDefaultViewProps) {

  return (
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
  );
}
