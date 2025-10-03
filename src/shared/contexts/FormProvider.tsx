import React, { createContext, useContext, useState } from "react";

type FormValues = {
  [key: string]: any; // cada campo pode ser string, number, date etc.
};

type FormContextType = {
  formData: FormValues | any;
  updateField: (field: string, value: any) => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormValues>({});

  // Atualiza apenas um campo
  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Reseta tudo
  const resetForm = () => setFormData({});

  return (
    <FormContext.Provider value={{ formData, updateField, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

// Hook personalizado para consumir o contexto
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext deve ser usado dentro de FormProvider");
  }
  return context;
};
