export function Header() {
  return (
    <div className="border-b p-2 bg-transparent border-gray-300">
      <img
        src={"/logo-vmdocs.png"}
        height={250}
        width={250}
        alt="Logo"
        className="object-cover"
        draggable={false}
      />
    </div>
  );
}
