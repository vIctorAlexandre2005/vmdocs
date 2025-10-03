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

  const [updateId, setUpdateId] = useState(0);
  const [updateModel, setUpdateModel] = useState("");
  const [updateAssetTag, setUpdateAssetTag] = useState("");
  const [updateCompany, setUpdateCompany] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [updateTypeEquipment, setUpdateTypeEquipment] = useState("");
  const [updateResponsibleEmployeeId, setUpdateResponsibleEmployeeId] =
    useState("");
  const [updateResponsibleName, setUpdateResponsibleName] = useState("");
  const [updateSerialNumber, setUpdateSerialNumber] = useState("");
  const [processor, setProcessor] = useState("");
  const [location, setLocation] = useState("");
  const [memory, setMemory] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [updateObservation, setUpdateObservation] = useState("");
  const [updateOperationalNetwork, setUpdateOperationalNetwork] = useState("");
  const [updateShared, setUpdateShared] = useState("");
  return (
    <Stock.Provider
      value={{
        excelData,
        setExcelData,
        total_pages,
        setTotalPages,
        updateId,
        setUpdateId,
        updateModel,
        setUpdateModel,
        updateAssetTag,
        setUpdateAssetTag,
        updateCompany,
        setUpdateCompany,
        updateStatus,
        setUpdateStatus,
        entryDate,
        setEntryDate,
        exitDate,
        setExitDate,
        updateTypeEquipment,
        setUpdateTypeEquipment,
        updateResponsibleEmployeeId,
        setUpdateResponsibleEmployeeId,
        updateResponsibleName,
        setUpdateResponsibleName,
        updateSerialNumber,
        setUpdateSerialNumber,
        processor,
        setProcessor,
        location,
        setLocation,
        memory,
        setMemory,
        ticketNumber,
        setTicketNumber,
        updateObservation,
        setUpdateObservation,
        updateOperationalNetwork,
        setUpdateOperationalNetwork,
        updateShared,
        setUpdateShared,
      }}
    >
      {children}
    </Stock.Provider>
  );
};

export const useContextStock = () => useContext(Stock);
export default StockProvider;
