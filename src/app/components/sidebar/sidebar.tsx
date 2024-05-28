'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiTwotoneHome } from "react-icons/ai";
import { BiRadar, BiShoppingBag } from "react-icons/bi";
import { GiChart } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { BsClipboard2DataFill, BsChevronRight, BsChevronDoubleRight } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className='bg-grey h-screen p-4 w-80 shadow-md flex flex-col justify-between'>
            <nav className="lg:flex-1 overflow-y-auto w-80 mt-20">
                <b className="text-primary m-4">MatrículaXpress</b>
                <ul className="p-2 space-y-2 mt-40 text-justify mr-4">
                    <NavItem href="/" icon={<AiTwotoneHome className="size-5 m-4" />} text="Dashboard" isActive={pathname === "/"} />
                    <NavItem href="/gestionusuarios" icon={<BiRadar className="size-5 m-4" />} text="Gestión de usuarios" isActive={pathname === "/gestionusuarios"} />
                    <NavItem href="/gestioncursos" icon={<BiShoppingBag className="size-5 m-4" />} text="Gestión de cursos" isActive={pathname === "/gestioncursos"} />
                    <NavItem href="/configuracionsistema" icon={<GiChart className="size-5 m-4" />} text="Configuración de sistema" isActive={pathname === "/configuracionsistema"} />
                    <NavItem href="/gestionmatriculas" icon={<TbReportSearch className="size-5 m-4" />} text="Gestión de matriculas" isActive={pathname === "/gestionmatriculas"} />
                    <NavItem href="/gestionfacturacion" icon={<BsClipboard2DataFill className="size-5 m-4" />} text="Gestión de pagos y facturación" isActive={pathname === "/gestionfacturacion"} />
                </ul>
            </nav>
            <div className="flex justify-around text-primary mt-4">
                <IoSettings className="text-2xl cursor-pointer" />
                <CiCircleQuestion className="text-2xl cursor-pointer" />
                <IoIosLogOut className="text-2xl cursor-pointer" />
            </div>
        </div>
    );
}

interface NavItemProps {
    href: string;
    icon: JSX.Element;
    text: string;
    isActive: boolean;
}

function NavItem({ href, icon, text, isActive }: NavItemProps) {
    return (
        <li className={`font-bold flex items-center pl-4 py-2 text-base cursor-pointer ${isActive ? 'text-white bg-primary' : 'text-primary'}`}>
            <Link href={href}>
                <button className="flex items-center w-full justify-between">
                    <div className="flex items-center">
                        {icon}
                        <span className="text-xs truncate flex-grow">{text}</span>
                    </div>
                    <div className={`m-4 ${isActive ? 'active' : ''}`}>
                        {isActive ? <BsChevronDoubleRight className="align-middle blinking" /> : <BsChevronRight className="align-middle" />}
                    </div>
                </button>
            </Link>
        </li>
    );
}
