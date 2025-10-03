import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { useRef } from "react";
import { GoPlusCircle, GoSearch } from "react-icons/go";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { PiExport } from "react-icons/pi";
import { TfiImport } from "react-icons/tfi";
import { useImportExcel } from "../../Stock/viewModel/useImportExcel";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { Loader } from "@/shared/components/Loader";
import { PuffLoader } from "react-spinners";
import { FieldsCreateMachine } from "../../Stock/View/FieldsCreateMachine";
import { usePdfData } from "../viewModel/usePdfData";

interface OptionsTableTermsProps {
  
}
export function OptionsTableTerms({

}: OptionsTableTermsProps) {
  const { pageTableTerms, setPageTableTerms, totalPageTableTerms } = usePdfData();
  return (
    <>
      <div className="w-1/4 flex items-center gap-2">
        <GoSearch size={20} color="#a3a3a3" />
        <InputComponent
          label=""
          placeholder="Buscar"
          className="border-slate-300 p-2 text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-sm text-slate-600">
            Página {pageTableTerms} de {totalPageTableTerms}
          </span>
          <div className="flex gap-2">
            <ButtonComponent
              className="border-slate-300 text-slate-700"
              disabled={pageTableTerms === 0}
              onClick={() => setPageTableTerms(pageTableTerms - 1)}
              iconLeft={<MdOutlineArrowBackIos size={20} />}
            />
            <ButtonComponent
              className="border-slate-300 text-slate-700"
              disabled={pageTableTerms === totalPageTableTerms}
              onClick={() => setPageTableTerms(pageTableTerms + 1)}
              iconLeft={<MdOutlineArrowForwardIos size={20} />}
            />
          </div>
          <div className="flex h-5 items-center space-x-4 text-sm">
            <Separator
              orientation="vertical"
              className="border-accent-foreground"
            />
            <div>
              <ButtonComponent
                className="hover:border-slate-300 hover:border rounded-md font-semibold transition duration-300 text-slate-700"
                text="Importar termos"
                iconRight={<TfiImport size={20} />}
                //onClick={handleOpenFileDialog}
              />
              {/* <Input
                onChange={(e) => {
                  e.target.files && inputRef.current?.click();
                }}
                ref={inputRef}
                onChangeCapture={handleFile}
                type="file"
                accept=".csv"
                className="hidden"
              /> */}
            </div>
            {/* <Separator
              orientation="vertical"
              className="border-accent-foreground"
            /> */}
            {/* <div>
              <DialogComponent
                classNameTrigger="rounded p-2 font-semibold cursor-pointer flex gap-2 transition duration-300 text-white bg-indigo-500 hover:bg-indigo-600"
                textTrigger="Nova máquina"
                crud={true}
                iconTriggerRight={<GoPlusCircle size={20} />}
              >
                <FieldsCreateMachine />
              </DialogComponent>
            </div> */}
          </div>
        </div>
        {/* <DialogComponent
          title="Buscando os dados..."
          open={openDialogImportExcel}
          onOpenChange={setOpenDialogImportExcel}
        >
          {loadingTableExcel && (
            <Loader loaderIcon={<PuffLoader size={100} color="#3b82f6" />} />
          )}
        </DialogComponent> */}
      </div>
    </>
  );
}
