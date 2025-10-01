export interface ExcelData {
  id: string; // UUID ou auto incremento
  model: string; // Ex: DELL 3450 i7
  assetTag: string; // Patrimônio
  company: "ELETROBRAS" | "CHESF" | "FURNAS" | "ELETROSUL" | "ELETRONORTE";
  status: "Em estoque" | "Em uso" | "Em manutenção" | "A preparar";
  entryDate: string; // formato ISO ex: "2023-09-12"
  exitDate?: string; // obrigatório apenas se status = in_use
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
  id: "",
  model: "",
  assetTag: "",
  company: "ELETROBRAS",
  status: "A preparar",
  entryDate: "",
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
}

export const defaultValueStockModel: StockModel = {
  excelData: [],
  setExcelData: () => {},
  total_pages: 0,
  setTotalPages: () => {},
};
