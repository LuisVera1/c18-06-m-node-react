import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Student {
    code: string;
    name: string;
    creation: string; // La fecha en formato ISO 8601
    email: string;
    status: string;
}

export default function BasicDemo() {
    const [students, setStudents] = useState<Student[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [isGestionMatriculas, setIsGestionMatriculas] = useState<boolean>(false);

    useEffect(() => {
        // Comprobar si la ruta es /gestionmatriculas
        setIsGestionMatriculas(window.location.pathname === "/gestionmatriculas");
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("/api/admin/get/students");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                if (data.ok) {
                    setStudents(
                        data.data.map((student: Student) => ({
                            ...student,
                            creation: formatDate(student.creation), // Formatear la fecha
                        }))
                    );
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    // Función para formatear la fecha
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("es-ES");
    };

    const statusBodyTemplate = (rowData: Student) => {
        let statusClass = "";

        switch (rowData.status) {
            case "Graduado":
                statusClass = "bg-blue-100 text-blue-800 rounded-xl";
                break;
            case "Titulado":
                statusClass = "bg-yellow-100 text-yellow-800 rounded-xl";
                break;
            case "Activo":
                statusClass = "bg-green-100 text-green-800 rounded-xl";
                break;
            case "Inactivo":
                statusClass = "bg-red-100 text-gray-800 rounded-xl";
                break;
            default:
                statusClass = "bg-gray-100 text-gray-800 rounded-xl";
                break;
        }

        return <span className={`p-2 border-round font-normal ${statusClass}`}>{rowData.status}</span>;
    };

    const actionBodyTemplate = () => {
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredStudents(
            students.filter(
                (student) =>
                    student.name?.toLowerCase().includes(value) ||
                    student.email?.toLowerCase().includes(value) ||
                    student.code?.toLowerCase().includes(value) ||
                    student.status?.toLowerCase().includes(value) ||
                    formatDate(student.creation).toLowerCase().includes(value)
            )
        );
    };

    return (
        <div className="card  m-auto">
            {isGestionMatriculas ? (
                <input
                    type="text"
                    placeholder="Buscar usuario"
                    className={`w-fill p-2 pl-10 border rounded ${searchTerm ? "border-primary" : ""}`}
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => setSearchTerm(searchTerm)} // To trigger re-render for applying border-primary class
                />
            ) : (
                <b>Lista de estudiantes - proceso matrícula</b>
            )}
            <DataTable value={filteredStudents.length ? filteredStudents : students} tableStyle={{ minWidth: "50rem" }} className="custom-table ">
                <Column field="name" header="Nombre" className="header-column"></Column>
                <Column field="creation" header="Fecha solicitud" className="header-column"></Column>
                <Column field="code" header="ID Estudiante" className="header-column"></Column>
                <Column field="career.title" header="Programa" className="header-column"></Column>
                <Column field="status" header="Estado" body={statusBodyTemplate} className="status-column"></Column>
                <Column body={actionBodyTemplate} headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}></Column>
            </DataTable>
        </div>
    );
}
