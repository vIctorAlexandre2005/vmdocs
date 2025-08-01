export type DialogController = {
  isLoading: boolean;
  execute: (
    asyncFn: () => Promise<any>,
    options?: {
      onSuccess?: () => void;
      onError?: (e: any) => void;
      finally?: () => void;
    }
  ) => void;
};

export const defaultDialogController: DialogController = {
  isLoading: false,
  execute: () => {},
};