"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// import Filter from "../../../../../assets/Filter.png";
import Search from "../../../../../assets/Search.png";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import ModalAlumno from "../ModalAlumno/ModalAlumno";
import ModalDocente from "../ModalDocente/ModalDocente";
import ModalAdmin from "../ModalAdmin/ModalAdmin";
import OkImage from "./../../../../../assets/Check Mark.png";

interface User {
    name: string;
    email: string;
    id: string;
    program: string;
    status: string;
    courses?: number;
    statusEnvio?: string;
    role: string;
}

const UserTable: NextPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayDialog, setDisplayDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página actual
    const [itemsPerPage, setItemsPerPage] = useState(5); // Estado para la cantidad de elementos por página
    const [studentToDelete, setStudentToDelete] = useState<User | null>(null); // Estado para almacenar el estudiante que se eliminará
    const [displayConfirmationDialog, setDisplayConfirmationDialog] = useState(false); // Estado para mostrar/ocultar el modal de confirmación de eliminación
    const [showModal, setShowModal] = useState(false);
    const pathname = usePathname();

    const dialogContent = () => {
        switch (pathname) {
            case "/gestionusuarios":
                return <ModalAlumno onHide={toggleDialog} addStudent={addStudent} />;
            case "/gestionusuarios/docentes":
                return <ModalDocente onHide={toggleDialog} addTeacher={addTeacher} />;
            case "/gestionusuarios/administrador":
                return <ModalAdmin onHide={toggleDialog} addAdmin={addAdmin} />;
            default:
                return null;
        }
    };

    const toggleDialog = () => {
        setDisplayDialog(!displayDialog);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let apiUrl = "";
                switch (pathname) {
                    case "/gestionusuarios":
                        apiUrl = "/api/admin/get/students";
                        break;
                    case "/gestionusuarios/docentes":
                        apiUrl = "/api/admin/get/teachers";
                        break;
                    case "/gestionusuarios/administrador":
                        apiUrl = "/api/admin/get/admins";
                        break;
                    default:
                        throw new Error("Invalid pathname");
                }
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                if (data.ok) {
                    setUsers(data.data);
                    setFilteredUsers(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, [pathname]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setFilteredUsers(users.slice(startIndex, endIndex));
    }, [currentPage, itemsPerPage, users]);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredUsers(
            users.filter(
                (user) =>
                    user.name?.toLowerCase().includes(value) ||
                    user.email?.toLowerCase().includes(value) ||
                    (typeof user.id === "string" && user.id.toLowerCase().includes(value)) ||
                    user.program?.toLowerCase().includes(value) ||
                    user.role?.toLowerCase().includes(value)
            )
        );
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

    const getUrl = (role: string): string => {
        const deleteURL: { [key: string]: string } = {
            Admin: `${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/delete/admin`,
            Docente: `${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/delete/teacher`,
            Student: `${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/delete/student`,
        };

        if (deleteURL[role]) {
            return deleteURL[role];
        } else {
            throw new Error(`Invalid role: ${role}`);
        }
    };
    const handleDelete = async (rowData: User) => {
        setStudentToDelete(rowData); // Almacenar el curso que se va a eliminar
        setDisplayConfirmationDialog(true); // Mostrar el diálogo de confirmación de eliminación
        const { id, role } = rowData;

        await fetch(getUrl(role), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        });
    };

    const confirmDelete = () => {
        if (studentToDelete) {
            const updatedStudents = users.filter((user) => user.id !== studentToDelete.id);
            setUsers(updatedStudents); // Actualizar la lista de estudiantes sin el estudiante eliminado
            setFilteredUsers(updatedStudents); // Actualizar la lista filtrada de estudiantes
            setStudentToDelete(null); // Reiniciar el estudiante a eliminar
            setDisplayConfirmationDialog(false); // Ocultar el diálogo de confirmación de eliminación
            showSuccessModal();
        }
    };
    const showSuccessModal = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    };
    const actionBodyTemplate = (rowData: User) => {
        return (
            <div className="flex justify-around">
                <button className="text-primary ">
                    <AiOutlineEdit size={20} />
                </button>
                <button className="text-primary">
                    <AiOutlineDelete size={20} onClick={() => handleDelete(rowData)} />
                </button>
            </div>
        );
    };
    // Nueva función para agregar estudiante
    const addStudent = (users: User) => {
        setUsers((prevStudents) => [...prevStudents, users]);
        setFilteredUsers((prevStudents) => [...prevStudents, users]);
    };
    // Nueva función para agregar docente
    const addTeacher = (users: User) => {
        setUsers((prevTeachers) => [...prevTeachers, users]);
        setFilteredUsers((prevTeachers) => [...prevTeachers, users]);
    };

    const addAdmin = (users: User) => {
        setUsers((prevAdmin) => [...prevAdmin, users]);
        setFilteredUsers((prevAdmin) => [...prevAdmin, users]);
    };
    return (
        <div className="flex-1 p-6 bg-white rounded-lg shadow m-4">
            <h1 className="font-bold text-primary text-3xl mb-5 font-barlow">
                {pathname === "/gestionusuarios" && "Lista de estudiantes"}
                {pathname === "/gestionusuarios/docentes" && "Lista de docentes"}
                {pathname === "/gestionusuarios/administrador" && "Lista de administradores"}
            </h1>
            <div className="flex justify-between mb-4">
                <div className="relative w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Buscar usuario"
                        className={`w-full p-2 pl-10 border border-primary rounded-xl ${searchTerm ? "border-primary" : ""}`}
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => setSearchTerm(searchTerm)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Image src={Search} alt="Buscar" width={20} height={20} />
                    </div>
                </div>
                <div className="flex space-x-2">
                    {/* <Image src={Filter} alt="Filtro" className="mr-4 cursor-pointer" width={24} height={24} /> */}
                    <button className="bg-action text-primary py-2 px-4 rounded font-sans text-sm" onClick={() => setDisplayDialog(true)}>
                        Crear nuevo usuario
                    </button>
                    <Dialog onHide={toggleDialog} className="w-3/4 h-auto" visible={displayDialog}>
                        {dialogContent()}
                    </Dialog>
                    {/* <button className="bg-primary text-white py-2 px-4 rounded">Carga masiva</button> */}
                </div>
            </div>

            <DataTable value={filteredUsers} tableStyle={{ minWidth: "50rem" }} className="custom-table">
                <Column field="name" header="Nombre" className="header-column font-barlow text-xs" />
                <Column field="email" header="Correo" className="header-column font-barlow text-xs" />
                <Column field="code" header="ID" className="header-column font-barlow text-xs" />
                <Column field="career.title" header="Programa" className="header-column font-barlow text-xs" />
                {pathname === "/gestionusuarios/docentes" && <Column field="courses" header="# Cursos asignados" />}
                <Column field="status" header="Estado Académico" className="header-column font-barlow text-xs" body={statusBodyTemplate} />
                <Column body={actionBodyTemplate} />
            </DataTable>
            <Dialog visible={displayConfirmationDialog} onHide={() => setDisplayConfirmationDialog(false)} modal>
                <div className="flex flex-col items-center gap-4 px-4">
                    <p className="text-center text-primary text-xl font-semibold">¿Está seguro de que desea eliminar a {studentToDelete?.name}?</p>
                    <div className="flex space-x-4 items-center justify-center">
                        <button onClick={confirmDelete} className="py-2 px-4 bg-primary text-white rounded hover:bg-secundary">
                            Sí
                        </button>
                        <button
                            onClick={() => setDisplayConfirmationDialog(false)}
                            className="py-2 px-4 bg-action text-primary rounded hover:bg-secundary hover:text-white"
                        >
                            No
                        </button>
                    </div>
                    <p className="text-gray-400 pt-4 text-sm">Nota: Se eliminarán los datos de forma permanente</p>
                </div>
            </Dialog>
            <Dialog visible={showModal} onHide={() => setShowModal(false)} modal>
                <div className="flex flex-col items-center gap-2 w-full rounded-full p-4">
                    <p className="text-primary text-xl font-bold">Usuario eliminado</p>
                    <Image className="w-40 h-full object-cover" src={OkImage} alt="img-login" quality={100} priority />
                </div>
            </Dialog>
            <div className="flex justify-center mt-4 bg-action rounded-lg">
                <button
                    className="text-action font-sans text-sm hover:bg-secundary hover:text-white bg-primary m-2 p-2 rounded-xl"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Anterior
                </button>
                <span className="m-2 p-2  text-primary font-sans text-sm ">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    className="text-action font-sans text-sm hover:bg-secundary hover:text-white bg-primary  m-2 p-2 rounded-xl"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default UserTable;
