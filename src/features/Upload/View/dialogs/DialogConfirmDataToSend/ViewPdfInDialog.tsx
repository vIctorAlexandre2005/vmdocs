export function ViewPdfInDialog({ pdfUrl }: { pdfUrl: string | null }) {
  return (
    <div className="w-full">
      {pdfUrl && (
        <iframe
          loading="lazy"
          allowFullScreen
          allow="fullscreen"
          allowTransparency
          height={450}
          src={pdfUrl || ""}
          className="w-full border border-slate-300 rounded-lg"
          title="Visualização do PDF"
        />
      )}
    </div>
  );
}
