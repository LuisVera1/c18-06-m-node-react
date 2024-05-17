'use client'
// Importamos el hook useState de React para manejar el estado
import { useState } from "react";

// Importamos los iconos que usaremos en la barra lateral
import { AiTwotoneHome } from "react-icons/ai";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

// Importamos el componente Link de Next.js para la navegación
import Link from "next/link";

// Definimos y exportamos el componente Sidebar
export default function Sidebar() {
    // Definimos el estado isOpen para manejar si la barra lateral está abierta o cerrada
    const [isOpen, setIsOpen] = useState(false);

    // Función para alternar el estado de la barra lateral
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        // Clase condicional que muestra u oculta la barra lateral dependiendo del estado isOpen
        // lg:block asegura que la barra lateral siempre se muestra en pantallas grandes
        <div className={`lg:w-64 lg:flex-none lg:order-1 bg-blue-500 p-4 ${isOpen ? 'block' : 'hidden'} lg:block h-screen m-10`}>
            {/* Botón de hamburguesa para alternar la barra lateral en pantallas pequeñas */}
            <button className="lg:hidden block" onClick={toggleSidebar}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
            {/* Navegación de la barra lateral */}
            <nav className="lg:flex-1 overflow-y-auto">
                <ul className="p-2 space-y-2 mt-40">
                    {/* Enlaces de navegación */}
                    <Link href="/inicio">
                        <li className="font-bold flex items-center pl-4 py-2 text-base hover:bg-blue-700 cursor-pointer">
                            <AiTwotoneHome className="w-5 h-5 mr-3" />
                            <span>INICIO</span>
                        </li>
                    </Link>
                    <Link href="/matriculas">
                        <li className="font-bold flex items-center pl-4 py-2 text-base hover:bg-blue-700 cursor-pointer">
                            <FaMoneyCheckDollar className="w-5 h-5 mr-3" />
                            <span>MATRICULAS</span>
                        </li>
                    </Link>
                    <Link href="/clases">
                        <li className="font-bold flex items-center pl-4 py-2 text-base hover:bg-blue-700 cursor-pointer">
                            <MdInventory className="w-5 h-5 mr-3" />
                            <span>CLASES</span>
                        </li>
                    </Link>
                    <Link href="/notas">
                        <li className="font-bold flex items-center pl-4 py-2 text-base hover:bg-blue-700 cursor-pointer">
                            <TbReportSearch className="w-5 h-5 mr-3" />
                            <span>NOTAS</span>
                        </li>
                    </Link>
                </ul>
            </nav>
            {/* Botón Toggle adicional para mostrar la barra lateral cuando está oculta en pantallas pequeñas */}
            <button className={`lg:hidden absolute bottom-4 left-4 bg-black text-white rounded-full p-2 ${isOpen ? 'hidden' : 'block'}`} onClick={toggleSidebar}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    );
}
