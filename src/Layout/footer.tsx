export function Footer({text} : {text: string}) {
  return (
    <footer className="p-2 bottom-0 w-full border-t border-t-slate-300 bg-slate-50 text-slate-900 text-center text-sm font-bold">
      <p className="text-base text-slate-700 font-semibold">{text}</p>
    </footer>
  );
}
