export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full p-2 w-full bg-slate-50 overflow-auto">
      {children}
    </main>
  );
}
