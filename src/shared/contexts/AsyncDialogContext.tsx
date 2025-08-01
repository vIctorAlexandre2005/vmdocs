import { createContext, useContext, ReactNode, useState } from "react";
import { defaultDialogController, DialogController } from "../types/AsyncDialog";

const AsyncDialog = createContext<DialogController>(defaultDialogController);

const AsyncDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function execute(
    asyncFn: () => Promise<any>,
    options?: {
      onSuccess?: () => void;
      onError?: (e: any) => void;
      finally?: () => void;
    }
  ) {
    setIsLoading(true);
    try {
      await asyncFn();
      options?.onSuccess?.();
    } catch (err) {
      options?.onError?.(err);
    } finally {
      setIsLoading(false);
      options?.finally?.();
    }
  }

  return (
    <AsyncDialog.Provider value={{ execute, isLoading }}>
      {children}
    </AsyncDialog.Provider>
  );
};

export const useContextAsyncDialog = () => useContext(AsyncDialog);
export default AsyncDialogProvider;
