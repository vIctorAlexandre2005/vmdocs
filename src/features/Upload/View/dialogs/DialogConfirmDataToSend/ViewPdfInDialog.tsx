import { breakpoints } from "@/shared/constants/breakpoints";
import { useEffect, useState } from "react";
import { GrDocumentPdf } from "react-icons/gr";


interface ViewPdfInDialogProps {
  pdfUrl: string | null;
  height?: number;
  file_name: string | null | undefined;
}

export function ViewPdfInDialog({ pdfUrl, file_name }: ViewPdfInDialogProps) {
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= breakpoints.sm) {
        setHeight(window.innerHeight * 0.7);
      } else {
        setHeight(window.innerHeight);
      }
    }

    handleResize(); // inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);
  return (
    <div className="w-full">
      <h1 className="text-indigo-500 font-bold text-center flex gap-2 items-center text-lg mb-2">
        <GrDocumentPdf size={20} />
        {file_name}
      </h1>
      {pdfUrl && (
        <iframe
          loading="lazy"
          allowFullScreen
          allow="fullscreen"
          allowTransparency
          src={pdfUrl || ""}
          height={height || 500}
          className="w-full border border-slate-300 rounded-lg"
          title="Visualização do PDF"
        />
      )}
    </div>
  );
}
