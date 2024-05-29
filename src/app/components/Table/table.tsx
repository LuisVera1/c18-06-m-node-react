'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

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
        const fetchedStudents = [
            { id: '1', Nombre: 'Juan Pérez', Fechasolicitud: '2023-09-01', IDEsttudiante: '12-3344', Programa: 'Administración', Estado: 'Aprobado', },
            { id: '2', Nombre: 'María García', Fechasolicitud: '2023-09-02', IDEsttudiante: '12-4455', Programa: 'Economia', Estado: 'Pendiente' },
            { id: '3', Nombre: 'Carlos López', Fechasolicitud: '2023-09-03', IDEsttudiante: '12-5566', Programa: 'Contabilidad', Estado: 'Rechazado' },
            { id: '4', Nombre: 'Ana Martínez', Fechasolicitud: '2023-09-04', IDEsttudiante: '12-6677', Programa: 'Profesorado Adm', Estado: 'Aprobado' },
            { id: '5', Nombre: 'Luis Rodríguez', Fechasolicitud: '2023-09-05', IDEsttudiante: '12-7788', Programa: 'Profesorado Contabilidad', Estado: 'Rechazado' }
        ];
        setStudents(fetchedStudents);
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

