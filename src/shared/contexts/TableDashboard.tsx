import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { DataPdfProps } from "./UploadPdfContext";

type TableDashboardType = {
  filteredData: DataPdfProps[];
  setFilteredData: Dispatch<SetStateAction<DataPdfProps[]>>;

  detailedView: boolean;
  setDetailedView: Dispatch<SetStateAction<boolean>>;
};

const TableDashboardContext = createContext<TableDashboardType | undefined>(
  undefined
);

export function TableDashboardProvider({ children }: { children: ReactNode }) {
  
  const [filteredData, setFilteredData] = useState<DataPdfProps[]>([]);
  const [detailedView, setDetailedView] = useState(false);

  return (
    <TableDashboardContext.Provider
      value={{
        filteredData,
        setFilteredData,

        detailedView,
        setDetailedView,
      }}
    >
      {children}
    </TableDashboardContext.Provider>
  );
}

export function useTableDashboardContext() {
  const context = useContext(TableDashboardContext);
  if (!context)
    throw new Error(
      "useTableDashboardContext must be used within TableDashboardProvider"
    );
  return context;
}
