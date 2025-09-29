import { useRouter } from "next/router";
import { GrDocumentText } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import { TbCloudUpload } from "react-icons/tb";

const navLinks = [
  { name: "Dashboard", href: "/", icon: LuLayoutDashboard },
  { name: "Termos", href: "/terms", icon: GrDocumentText },
  { name: "Estoque", href: "/inventory", icon: MdOutlineInventory2 },
];

export function Sidebar() {
  const router = useRouter();
  return (
    <div className="bg-white w-full h-full flex flex-col border-r border-gray-200">
      <div className="p-2">
        <img
        src={"/logo-vmdocs.png"}
        height={150}
        width={150}
        alt="Logo"
        className="object-cover"
        draggable={false}
      />
      </div>
      <nav className="mt-8 gap-8 pr-4 flex flex-col">
        {navLinks.map((link, idx) => (
          <div
            key={idx}
            className={`
                flex text-base text-gray-700 font-bold p-2 items-center gap-2
                ${router.pathname === link.href && "bg-indigo-500 rounded-r-2xl text-white"}
                `
            }
          >
            {link.icon && <link.icon size={24} />}
            <a className="w-full" href={link.href}>{link.name}</a>
          </div>
        ))}
      </nav>
    </div>
  );
}
