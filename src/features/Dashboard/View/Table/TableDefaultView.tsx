import { TableCell, TableRow } from "@/shared/components/ui/table";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { FaEdit, FaEye } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import {
  DataExtractedPdfProps,
  DataPdfProps,
} from "@/shared/contexts/UploadPdfContext";
import { Dispatch, SetStateAction } from "react";

export interface TableDefaultViewProps {
  pdf: DataPdfProps;
  page: DataExtractedPdfProps;
  selectedPdf: DataPdfProps | null;
  setSelectedPdf: React.Dispatch<React.SetStateAction<DataPdfProps | null>>;
  setFormDataByPage: Dispatch<SetStateAction<DataExtractedPdfProps[]>>;
  setOpenDialogViewPdf: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDialogDeleteDataPdf: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDataPdf: (id: number) => Promise<void>;
  isLoadingForOperation?: boolean;
  openDialogDeleteDataPdf: boolean;
}

export function TableDefaultView({
  pdf,
  setSelectedPdf,
  setOpenDialogViewPdf,
  setOpenDialogDeleteDataPdf,
  deleteDataPdf,
  setFormDataByPage,
  page,
  isLoadingForOperation,
  selectedPdf,
  openDialogDeleteDataPdf,
}: TableDefaultViewProps) {
  const filteredPages = pdf?.__filteredPages?.[0];

  return (
    <>
      <TableRow key={pdf?.id} className="cursor-pointer border-b">
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2"
        >
          {pdf?.file_name?.toUpperCase()}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {`${
            filteredPages
              ? filteredPages?.incident_request?.toUpperCase()
              : pdf?.pages?.[0]?.incident_request?.toUpperCase()
          } ${pdf?.pages?.length > 1 ? "(...)" : ""}`}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {`${
            filteredPages
              ? filteredPages?.registration?.toUpperCase()
              : pdf?.pages?.[0]?.registration?.toUpperCase()
          } ${pdf?.pages?.length > 1 ? "(...)" : ""}`}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {`${
            filteredPages
              ? filteredPages?.collaborator?.toUpperCase()
              : pdf?.pages?.[0]?.collaborator?.toUpperCase()
              ? pdf?.pages?.[0]?.collaborator?.toUpperCase()
              : "VAZIO"
          } ${pdf?.pages?.length > 1 ? "(...)" : ""}`}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {`${
            filteredPages
              ? filteredPages?.group?.toUpperCase()
              : pdf?.pages?.[0]?.group?.toUpperCase()
          } ${pdf?.pages?.length > 1 ? "(...)" : ""}`}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.vp}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.uo}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.company}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.location}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.manager}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.brand_model}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.patrimony}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.type_of_movement}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.type_of_equipment_delivery}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.pages?.[0]?.returned_equipment}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.created_at}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.created_by}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.updated_at}
        </TableCell>
        <TableCell
          onClick={() => {
            setFormDataByPage(pdf?.pages);
            setSelectedPdf(pdf);
            setOpenDialogViewPdf(true);
          }}
          className="font-semibold p-2 "
        >
          {pdf?.updated_by}
        </TableCell>
        <TableCell className="p-2 font-semibold  flex items-center">
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
            loadingFallbackButton={isLoadingForOperation}
            open={openDialogDeleteDataPdf}
            onOpenChange={setOpenDialogDeleteDataPdf}
            onTriggerClick={(e: any) => {
              e.stopPropagation();
              setSelectedPdf(pdf);
            }}
            onClick={() => deleteDataPdf(selectedPdf?.id as number)}
            title="Deseja excluir os dados deste termo?"
            classNameTrigger="font-semibold cursor-pointer flex gap-1 items-center text-red-500"
          />
        </TableCell>
      </TableRow>
    </>
  );
}
