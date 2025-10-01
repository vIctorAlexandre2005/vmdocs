import { createContext, useContext, ReactNode, useState } from "react";
import {
  defaultValueStockModel,
  ExcelData,
  StockModel,
} from "@/features/Stock/model/Stock";

const Stock = createContext<StockModel>(defaultValueStockModel);

const StockProvider = ({ children }: { children: ReactNode }) => {
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [total_pages, setTotalPages] = useState(0);
  return (
    <Stock.Provider
      value={{
        excelData,
        setExcelData,
        total_pages,
        setTotalPages,
      }}
    >
      {children}
    </Stock.Provider>
  );
};

export const useContextStock = () => useContext(Stock);
export default StockProvider;
