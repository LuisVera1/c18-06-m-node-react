'use client'
import React, { useState } from "react";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { BsChevronRight, BsClipboard2DataFill } from "react-icons/bs";
import { BiRadar, BiShoppingBag } from "react-icons/bi";
import { GiChart } from "react-icons/gi";

export default function Sidebar() {
    return (
        <div className='bg-grey h-screen p-4 w-80  shadow-lg'>
            <nav className="lg:flex-1 overflow-y-auto w-80 mt-20">
                <b className="text-primary m-4">Nombre de la institución</b>
                <ul className="p-2 space-y-2 mt-40 text-justify mr-4">
                    <NavItem href="/" icon={<AiTwotoneHome className="size-5 m-4" />} text="Dashboard" />
                    <NavItem href="/gestionusuarios" icon={<BiRadar className="size-5 m-4" />} text="Gestión de usuarios" />
                    <NavItem href="/gestioncursos" icon={<BiShoppingBag className="size-5 m-4" />} text="Gestión de cursos" />
                    <NavItem href="/configuracionsistema" icon={<GiChart className="size-5 m-4" />} text="Configuración de sistema" />
                    <NavItem href="/gestionmatriculas" icon={<TbReportSearch className="size-5 m-4" />} text="Gestión de matriculas" />
                    <NavItem href="/gestionfacturacion" icon={<BsClipboard2DataFill className="size-5 m-4" />} text="Gestión de pagos y facturación" />
                </ul>
            </nav>
        </div>
    );
}

function NavItem({ href, icon, text }: { href: string; icon: JSX.Element; text: string }) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <li className={`font-bold flex items-center pl-4 py-2 text-base bg-action cursor-pointer ${isActive ? 'text-white bg-primary' : 'text-primary'}`}>
            <Link href={href} className="flex items-center">
                <button onClick={handleClick} className="flex items-center w-full justify-between">
                    <div className="flex items-center">
                        {icon}
                        <span className="text-xs truncate flex-grow">{text}</span>
                    </div>
                </button>
                <span className="m-auto">
                    <BsChevronRight className={`m-4 size-5 align-middle ${isActive ? 'animate-pulse' : ''}`} />
                </span>
            </Link>
        </li>
    );
}
