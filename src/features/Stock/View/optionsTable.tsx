import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { Separator } from "@/shared/components/ui/separator";
import { GoSearch } from "react-icons/go";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { PiExport } from "react-icons/pi";
import { TfiImport } from "react-icons/tfi";

interface OptionsTableProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}
export function OptionsTable({
  search,
  setSearch,
  page,
  setPage,
  totalPages,
}: OptionsTableProps) {
  return (
    <>
      <div className="w-1/4 flex items-center gap-2">
        <GoSearch size={20} color="#a3a3a3" />
        <InputComponent
          label=""
          placeholder="Buscar"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border-slate-300 p-2 text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-sm text-slate-600">
            Página {page} de {totalPages || 1}
          </span>
          <div className="flex gap-2">
            <ButtonComponent
              className="border-slate-300 text-slate-700"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              iconLeft={<MdOutlineArrowBackIos size={20} />}
            />
            <ButtonComponent
              className="border-slate-300 text-slate-700"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
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
                text="Importar .xlsx"
                iconRight={<TfiImport size={20} />}
              />
            </div>
            <Separator
              orientation="vertical"
              className="border-accent-foreground"
            />
            <div>
              <ButtonComponent
                className="hover:border-slate-300 hover:border rounded-md font-semibold transition duration-300 text-slate-700"
                text="Exportar .xlsx"
                iconRight={<PiExport size={20} />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
