import { breakpoints } from "@/shared/constants/breakpoints";
import { useEffect, useState } from "react";

interface ViewPdfInDialogProps {
  pdfUrl: string | null;
  height?: number;
}

export function ViewPdfInDialog({ pdfUrl }: ViewPdfInDialogProps) {
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= breakpoints.sm) {
        setHeight(window.innerHeight * 0.8);
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
