'use client'
import Link from "next/link";
import Image from "next/image";
import AvatarGestionEstudiante from "../../../../../assets/AvatarGestionEstudiante.png";
import { NextPage } from "next";
import { usePathname } from "next/navigation"; // Cambiamos el import a next/navigation

const Navv: NextPage = () => {
    const pathname = usePathname(); // Cambiamos de useRouter a usePathname

    return (
        <div className="flex">
            <main className="flex-1">
                <header className="bg-gray-200 shadow p-6">
                    <div className="flex justify-end mb-5">
                        <Image src={AvatarGestionEstudiante} alt="Descripción de la imagen" width={56} height={56} />
                    </div>
                    <nav>
                        <ul className="flex justify-between">
                            <NavItem
                                href="/gestionusuarios"
                                text="Estudiante"
                                isActive={pathname === "/gestionusuarios" || pathname === "/gestionusuarios/estudiante"}
                            />
                            <NavItem
                                href="/gestionusuarios/docentes"
                                text="Docente"
                                isActive={pathname === "/gestionusuarios/docentes"}
                            />
                            <NavItem
                                href="/gestionusuarios/administrador"
                                text="Administrador"
                                isActive={pathname === "/gestionusuarios/administrador"}
                            />
                        </ul>
                    </nav>
                </header>
            </main>
        </div>
    );
}

interface NavItemProps {
    href: string;
    text: string;
    isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, text, isActive }) => {

    return (
        <li className={`w-72 h-12 rounded-lg p-2 ${isActive ? "bg-primary text-white" : "text-primary bg-white"} text-center cursor-pointer flex items-center justify-center font-semibold`}>
            <Link href={href}>{text}</Link>
        </li>
    );
}

export default Navv;
