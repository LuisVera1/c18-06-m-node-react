'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Student {
    id: string;
    Nombre: string;
    Fechasolicitud: string;
    IDEsttudiante: string;
    Programa: string;
    Estado: string;
}

export default function BasicDemo() {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/admin/get/students'); // Ajusta la URL a la de tu endpoint real
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.ok) {
                    setStudents(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const statusBodyTemplate = (rowData: Student) => {
        let statusClass = '';

        switch (rowData.Estado) {
            case 'Aprobado':
                statusClass = 'bg-green-100 text-green-800';
                break;
            case 'Pendiente':
                statusClass = 'bg-yellow-100 text-yellow-800';
                break;
            case 'Rechazado':
                statusClass = 'bg-red-100 text-red-800';
                break;
            default:
                statusClass = 'bg-gray-100 text-gray-800';
                break;
        }

        return (
            <span className={`p-2 border-round ${statusClass}`}>
                {rowData.Estado}
            </span>
        );
    };

    const actionBodyTemplate = () => {
        return (
            <div className="flex justify-around">
                <button className="text-blue-500"><AiOutlineEdit size={20} /></button>
                <button className="text-red-500"><AiOutlineDelete size={20} /></button>
            </div>
        );
    };

    return (
        <div className="card ml-40">
            <b>Lista de estudiantes - proceso matrícula</b>
            <DataTable value={students} tableStyle={{ minWidth: '50rem' }} className="custom-table">
                <Column field="Nombre" header="Nombre" className="header-column"></Column>
                <Column field="Fechasolicitud" header="Fecha solicitud" className="header-column"></Column>
                <Column field="IDEsttudiante" header="ID Esttudiante" className="header-column"></Column>
                <Column field="Programa" header="Programa" className="header-column"></Column>
                <Column field="Estado" header="Estado" body={statusBodyTemplate} className="status-column"></Column>
                <Column body={actionBodyTemplate} headerStyle={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#000' }}></Column>
            </DataTable>
        </div>
    );
}
