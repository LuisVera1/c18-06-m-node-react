'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Filter from "../../../../../assets/Filter.png";
import Search from "../../../../../assets/Search.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface User {
    name: string;
    email: string;
    id: string;
    program: string;
    status: string;
    courses?: number;
    statusEnvio?: string;
    role?: string;
}

const UserTable: NextPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        let fetchedUser: User[] = [];

        switch (pathname) {
            case "/gestionusuarios":
                fetchedUser = [
                    { name: "Hanna Baker", email: "hanna@company.com", id: "123456789", program: "Diseño", status: "Activo" },
                    { name: "Hanna Baker", email: "hanna@company.com", id: "123456789", program: "Economía", status: "Graduado" },
                    { name: "Hanna Baker", email: "hanna@company.com", id: "123456789", program: "Contaduría", status: "Inactivo" },
                    { name: "Hanna Baker", email: "hanna@company.com", id: "123456789", program: "Ing. civil", status: "Activo" },
                    { name: "Hanna Baker", email: "hanna@company.com", id: "123456789", program: "Ing. industrial", status: "Graduado" },
                    { name: "Hanna Baker", email: "hanna@company.com", id: "123456789", program: "Publicidad", status: "Inactivo" },
                    { name: "Hanna Baker", email: "hanna@company.com", id: "123456789", program: "Ing. civil", status: "Activo" },
                ];
                break;
            case "/gestionusuarios/docentes":
                fetchedUser = [
                    { name: "John Doe", email: "john@company.com", id: "987654321", program: "Computer Science", status: "Activo", courses: 3, statusEnvio: "Pending", role: "Profesor" },
                    { name: "Jane Smith", email: "jane@company.com", id: "456123789", program: "Mathematics", status: "Inactivo", courses: 5, statusEnvio: "Sent", role: "Asistente" },
                ];
                break;
            case "/gestionusuarios/administrador":
                fetchedUser = [
                    { name: "Admin User", email: "admin@company.com", id: "789456123", program: "Admin", status: "Activo", role: "Administrador" },
                    { name: "Admin John", email: "adminJonh@company.com", id: "154896665", program: "Admin", status: "Activo", role: "Administrador" }
                ];
                break;
            default:
                fetchedUser = [];
                break;
        }

        setUsers(fetchedUser);
        setFilteredUsers(fetchedUser);
    }, [pathname]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredUsers(users.filter(user =>
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value) ||
            user.id.toLowerCase().includes(value) ||
            user.program.toLowerCase().includes(value) ||
            (user.role && user.role.toLowerCase().includes(value))
        ));
    };

    const statusBodyTemplate = (rowData: User) => {
        let statusClass = "";

        switch (rowData.status) {
            case "Activo":
                statusClass = "bg-green-100 text-green-800";
                break;
            case "Graduado":
                statusClass = "bg-blue-100 text-blue-800";
                break;
            case "Inactivo":
                statusClass = "bg-red-100 text-red-800";
                break;
            default:
                statusClass = "bg-gray-100 text-gray-800";
                break;
        }

        return <span className={`p-2 rounded-lg ${statusClass}`}>{rowData.status}</span>;
    };

    const actionBodyTemplate = (rowData: User) => {
        return (
            <div className="flex justify-around">
                <button className="text-primary ">
                    <AiOutlineEdit size={20} />
                </button>
                <button className="text-primary">
                    <AiOutlineDelete size={20} />
                </button>
            </div>
        );
    };

    return (
        <div className="flex-1 p-6 bg-white rounded-lg shadow m-4">
            <h1 className="font-bold text-primary text-2xl mb-5">
                {pathname === "/gestionusuarios" && "Lista de estudiantes"}
                {pathname === "/gestionusuarios/docentes" && "Lista de docentes"}
                {pathname === "/gestionusuarios/administrador" && "Lista de administradores"}
            </h1>
            <div className="flex justify-between mb-4">
                <div className="relative w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Buscar usuario"
                        className={`w-full p-2 pl-10 border rounded ${searchTerm ? 'border-primary' : ''}`}
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => setSearchTerm(searchTerm)} // To trigger re-render for applying border-primary class
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Image src={Search} alt="Buscar" width={20} height={20} />
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Image src={Filter} alt="Filtro" className="mr-4 cursor-pointer" width={24} height={24} />
                    <Link href="/gestionusuarios/crearestudiante">
                        <button className="bg-action text-primary py-2 px-4 rounded">Crear nuevo usuario</button>
                    </Link>
                    <button className="bg-action text-primary py-2 px-4 rounded">Carga masiva</button>
                </div>
            </div>

            <DataTable value={filteredUsers} tableStyle={{ minWidth: "50rem" }} className="custom-table">
                <Column field="name" header="Nombre" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}></Column>
                <Column field="email" header="Correo" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}></Column>
                <Column field="id" header="ID" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}></Column>
                <Column field="program" header="Programa" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}></Column>
                {pathname === "/gestionusuarios/docentes" && <Column field="courses" header="# Cursos asignados" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}></Column>}
                {pathname === "/gestionusuarios/docentes" && <Column field="statusEnvio" header="Estado envío" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}></Column>}
                <Column
                    field="status"
                    header="Estado Académico"
                    body={statusBodyTemplate}
                    headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}
                ></Column>
                <Column body={actionBodyTemplate} headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}></Column>
            </DataTable>
        </div>
    );
};

export default UserTable;
