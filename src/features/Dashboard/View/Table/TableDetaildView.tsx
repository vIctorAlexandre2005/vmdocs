import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import {
  DataExtractedPdfProps,
  DataPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import { Dispatch, SetStateAction } from "react";
import { FaEye } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";

export interface TableViewProps {
  pdf: DataPdfProps;
  page: DataExtractedPdfProps;
  selectedPdf: DataPdfProps | null;
  setSelectedPdf: React.Dispatch<React.SetStateAction<DataPdfProps | null>>;
  setFormDataByPage: Dispatch<SetStateAction<DataExtractedPdfProps[]>>;
  setOpenDialogViewPdf: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingForOperation?: boolean;
  setOpenDialogDeleteDataPdf: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDataPdf: (id: number) => Promise<void>;
  openDialogDeleteDataPdf: boolean;
}

export function TableDetaildView({
  pdf,
  page,
  selectedPdf,
  setSelectedPdf,
  setOpenDialogViewPdf,
  setOpenDialogDeleteDataPdf,
  deleteDataPdf,
  isLoadingForOperation,
  openDialogDeleteDataPdf,
}: TableViewProps) {
  const { setFormDataByPage } = useUploadPdfContext();
  const filteredPages = pdf?.__filteredPages?.[0];
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
          {`${
            filteredPages
              ? filteredPages?.collaborator?.toUpperCase()
              : page?.collaborator?.toUpperCase()
          } ${pdf?.pages?.length > 1 ? "(...)" : ""}`}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 border"
        >
          {`${
            filteredPages
              ? filteredPages?.registration?.toUpperCase()
              : page?.registration?.toUpperCase()
          } ${pdf?.pages?.length > 1 ? "(...)" : ""}`}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 border"
        >
          {`${
            filteredPages
              ? filteredPages?.incident_request?.toUpperCase()
              : page?.incident_request?.toUpperCase() ? page?.incident_request?.toUpperCase() : "VAZIO"
          } ${pdf?.pages?.length > 1 ? "(...)" : ""}`}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 border"
        >
          {`${
            filteredPages
              ? filteredPages?.patrimony?.toUpperCase()
              : page?.patrimony?.toUpperCase()
          } ${pdf?.pages?.length > 1 ? "(...)" : ""}`}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 border"
        >
          {pdf?.pages?.length}
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
          {pdf?.updated_at}
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
          <DialogComponent
            iconTriggerLeft={<TbTrash size={20} />}
            textTrigger="Excluir"
            textButtonCancel="Cancelar"
            textButtonConfirm="Sim, excluir"
            isDelete={true}
            loadingFallbackButton={isLoadingForOperation}
            open={openDialogDeleteDataPdf}
            onOpenChange={setOpenDialogDeleteDataPdf}
            onClick={() => {
              deleteDataPdf(selectedPdf?.id as number);
            }}
            title="Deseja excluir os dados deste termo?"
            classNameTrigger="font-semibold cursor-pointer flex gap-1 items-center text-red-500"
          />
        </TableCell>
      </TableRow>
    </>
  );
}
