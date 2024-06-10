"use client";
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
                statusClass = "bg-blue-100 text-blue-800 rounded-lg font-normal";
                break;
            case "Titulado":
                statusClass = "bg-yellow-100 text-yellow-800 rounded-lg font-normal";
                break;
            case "Activo":
                statusClass = "bg-green-100 text-green-800 rounded-lg font-normal";
                break;
            case "Inactivo":
                statusClass = "bg-red-100 text-red-800 rounded-lg font-normal";
                break;
            default:
                statusClass = "bg-gray-100 text-gray-800 rounded-lg font-normal";
                break;
        }

        return <span className={`p-2 border-round ${statusClass}`}>{rowData.status}</span>;
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

    return (
        <div className="card p-6 ">
            <b>Lista de estudiantes - proceso matrícula</b>
            <DataTable value={students} tableStyle={{ minWidth: "50rem" }} className="custom-table">
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
