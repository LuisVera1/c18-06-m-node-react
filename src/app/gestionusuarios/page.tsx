import Sidebar from "../components/sidebar/sidebar";
import UserTable from "./components/Table/UserTable";
import Image from "next/image";
import AvatarGestionEstudiante from "../../../assets/AvatarGestionEstudiante.png";
import Link from "next/link";

const GestionUsuarios: React.FC = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">
                <header className="bg-gray-200 shadow p-6">
                    <div className="flex justify-end mb-5">
                        <Image src={AvatarGestionEstudiante} alt="Descripción de la imagen" width={56} height={56} />
                    </div>
                    <nav>
                        <ul className="flex justify-between">
                            <li className="w-72 h-12 rounded-lg p-2 bg-primary text-white text-center cursor-pointer flex items-center justify-center font-semibold">
                                <Link href="/estudiantes">Estudiantes</Link>
                            </li>
                            <li className="w-72 h-12 rounded-lg p-2 text-primary bg-white text-center cursor-pointer flex items-center justify-center font-semibold">
                                <Link href="/docentes">Docentes</Link>
                            </li>
                            <li className="w-72 h-12 rounded-lg p-2 text-primary bg-white text-center cursor-pointer flex items-center justify-center font-semibold">
                                <Link href="/administradores">Administradores</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <UserTable />
            </main>
        </div>
    );
};

export default GestionUsuarios;
