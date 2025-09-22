import { ClickAreaToChooseFile } from "./ClickAreaToChooseFile";
import { RecentUploads } from "./RecentUploads/RecentUploads";
import { DialogConfirmDataToSend } from "./dialogs/DialogConfirmDataToSend/DialogConfirmDataToSend";

export function UploadView() {

  return (
    <div className="flex flex-col justify-center items-center mt-8 gap-4 p-4">
      <ClickAreaToChooseFile />
      <RecentUploads />
      <DialogConfirmDataToSend />
    </div>
  );
}
