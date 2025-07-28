export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full w-full bg-slate-50 overflow-auto">
      {children}
    </main>
  );
}
