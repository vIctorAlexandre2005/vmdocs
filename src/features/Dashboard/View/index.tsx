import { MdOutlineCloudUpload } from "react-icons/md";
import { FiltersView } from "./FiltersView";
import { TableWithData } from "./TableWithData";
export function DashboardView() {
  return (
    <div className="w-full border rounded-3xl shadow-sm flex flex-col gap-4 bg-white">
      <div className="flex p-4 items-center justify-between">
        <h1 className="text-xl flex items-center gap-2 font-bold text-slate-700">
          Meus uploads <MdOutlineCloudUpload size={24} />{" "}
        </h1>
        <div className="flex justify-end">
          <FiltersView />
        </div>
      </div>
      <TableWithData />
    </div>
  );
}
