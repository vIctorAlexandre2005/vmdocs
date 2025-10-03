export interface ExcelData {
  id: number; // UUID ou auto incremento
  model: string; // Ex: DELL 3450 i7
  assetTag: string; // Patrimônio
  company: "ELETROBRAS" | "CHESF" | "FURNAS" | "ELETROSUL" | "ELETRONORTE";
  status: "Em estoque" | "Em uso" | "Em manutenção" | "A preparar";
  entryDate: string | Date; // formato ISO ex: "2023-09-12"
  exitDate?: string | Date; // obrigatório apenas se status = in_use
  asset_name: string; // Nome amigável do ativo
  equipmentType: string; // Ex: notebook, desktop, etc.
  responsiblePerson: {
    name: string;
    employeeId: string;
  } | null; // null quando ainda não atribuído
  serialNumber: string;
  manufacturer: string;
  processor: string;
  location: string;
  memory: string;
  ticketNumber?: string;
  operationalNetwork: string;
  shared: string;
  notes?: string;
  createdAt: string; // data do registro
  createdBy: string; // quem criou
  updatedAt: string; // última modificação
  updatedBy: string; // quem modificou
}

export const defaultValueExcel: ExcelData = {
  id: 0,
  model: "",
  assetTag: "",
  company: "ELETROBRAS",
  status: "A preparar",
  entryDate: new Date(),
  asset_name: "",
  equipmentType: "",
  responsiblePerson: null,
  serialNumber: "",
  manufacturer: "",
  processor: "",
  location: "",
  memory: "",
  ticketNumber: "",
  operationalNetwork: "",
  shared: "",
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "",
};

export interface StockModel {
  excelData: ExcelData[];
  setExcelData: React.Dispatch<React.SetStateAction<ExcelData[]>>;
  total_pages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;

  // alterações
  updateId: number;
  setUpdateId: React.Dispatch<React.SetStateAction<number>>;
  updateModel: string;
  setUpdateModel: React.Dispatch<React.SetStateAction<string>>;
  updateAssetTag: string;
  setUpdateAssetTag: React.Dispatch<React.SetStateAction<string>>;
  updateCompany: string;
  setUpdateCompany: React.Dispatch<React.SetStateAction<string>>;
  updateStatus: string;
  setUpdateStatus: React.Dispatch<React.SetStateAction<string>>;
  entryDate: string;
  setEntryDate: React.Dispatch<React.SetStateAction<string>>;
  exitDate: string;
  setExitDate: React.Dispatch<React.SetStateAction<string>>;
  updateTypeEquipment: string;
  setUpdateTypeEquipment: React.Dispatch<React.SetStateAction<string>>;
  updateResponsibleEmployeeId: string;
  setUpdateResponsibleEmployeeId: React.Dispatch<React.SetStateAction<string>>;
  updateResponsibleName: string;
  setUpdateResponsibleName: React.Dispatch<React.SetStateAction<string>>;
  updateSerialNumber: string;
  setUpdateSerialNumber: React.Dispatch<React.SetStateAction<string>>;
  processor: string;
  setProcessor: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  memory: string;
  setMemory: React.Dispatch<React.SetStateAction<string>>;
  ticketNumber: string;
  setTicketNumber: React.Dispatch<React.SetStateAction<string>>;
  updateObservation: string;
  setUpdateObservation: React.Dispatch<React.SetStateAction<string>>;
  updateOperationalNetwork: string;
  setUpdateOperationalNetwork: React.Dispatch<React.SetStateAction<string>>;
  updateShared: string;
  setUpdateShared: React.Dispatch<React.SetStateAction<string>>;
}

export const defaultValueStockModel: StockModel = {
  excelData: [],
  setExcelData: () => {},
  total_pages: 0,
  setTotalPages: () => {},

  // alterações
  updateId: 0,
  setUpdateId: () => {},
  updateModel: "",
  setUpdateModel: () => {},
  updateAssetTag: "",
  setUpdateAssetTag: () => {},
  updateCompany: "",
  setUpdateCompany: () => {},
  updateStatus: "",
  setUpdateStatus: () => {},
  entryDate: "",
  setEntryDate: () => {},
  exitDate: "",
  setExitDate: () => {},
  updateTypeEquipment: "",
  setUpdateTypeEquipment: () => {},
  updateResponsibleEmployeeId: "",
  setUpdateResponsibleEmployeeId: () => {},
  updateResponsibleName: "",
  setUpdateResponsibleName: () => {},
  updateSerialNumber: "",
  setUpdateSerialNumber: () => {},
  processor: "",
  setProcessor: () => {},
  location: "",
  setLocation: () => {},
  memory: "",
  setMemory: () => {},
  ticketNumber: "",
  setTicketNumber: () => {},
  updateObservation: "",
  setUpdateObservation: () => {},
  updateOperationalNetwork: "",
  setUpdateOperationalNetwork: () => {},
  updateShared: "",
  setUpdateShared: () => {},
};

export interface StockDataSend {
  model: string;
  assetTag: string;
  company: string;
  status: string;
  entryDate: Date; // se for sempre data, pode tipar como Date
  equipmentType: string;
  serialNumber: string;
  processor: string;
  location: string;
  memory: string;
  operationalNetwork: string;
  shared: string;
  notes: string;
}

export interface StockDataUpdate {
  model: string;
  assetTag: string;
  company: string;
  status: string;
  entryDate: Date; // se for sempre data, pode tipar como Date
  exitDate?: Date;
  equipmentType: string;
  responsiblePerson: { name: string; employeeId: string };
  serialNumber: string;
  processor: string;
  location: string;
  memory: string;
  ticketNumber: string;
  operationalNetwork: string;
  shared: string;
  notes: string;
}
