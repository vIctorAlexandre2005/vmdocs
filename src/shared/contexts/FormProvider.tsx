// FormContext.tsx
import { createContext, useContext, useState } from "react";

interface FormContextType {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  updateField: (field: string, value: any) => void;
  setInitialData: (data: any) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<any>({});

  function updateField(field: string, value: any) {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }

  function setInitialData(data: any) {
    setFormData(data); // aqui você injeta o `tableDataById` vindo do back
  }

  return (
    <FormContext.Provider
      value={{ formData, setFormData, updateField, setInitialData }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx)
    throw new Error("useFormContext deve ser usado dentro de FormProvider");
  return ctx;
}
