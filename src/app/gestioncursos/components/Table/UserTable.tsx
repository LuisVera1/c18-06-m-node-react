"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Filter from "../../../../../assets/Filter.png";
import Search from "../../../../../assets/Search.png";
import ModalCurso from "../ModalCurso/ModalCurso";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Course {
    curso: string;
    descripción: string;
    carrera: string;
    cupos: number;
    codigo: string;
}

const CourseTable: NextPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const pathname = usePathname();

    const [displayDialog, setDisplayDialog] = useState(false);
    const toggleDialog = () => {
        setDisplayDialog(!displayDialog);
    };

    useEffect(() => {
        const fetchedCourses: Course[] = [
            { curso: "Diseño Gráfico", descripción: "Curso de diseño avanzado", carrera: "Diseño", cupos: 30, codigo: "DG101" },
            { curso: "Economía Básica", descripción: "Introducción a la economía", carrera: "Economía", cupos: 25, codigo: "EB102" },
            { curso: "Contabilidad", descripción: "Fundamentos de contabilidad", carrera: "Contaduría", cupos: 20, codigo: "CT103" },
            { curso: "Ingeniería Civil", descripción: "Principios de ingeniería civil", carrera: "Ing. Civil", cupos: 40, codigo: "IC104" },
            { curso: "Ingeniería Industrial", descripción: "Procesos industriales", carrera: "Ing. Industrial", cupos: 35, codigo: "II105" },
            { curso: "Publicidad y Marketing", descripción: "Estrategias de marketing", carrera: "Publicidad", cupos: 28, codigo: "PM106" },
            { curso: "Ingeniería Civil Avanzada", descripción: "Temas avanzados de ingeniería civil", carrera: "Ing. Civil", cupos: 22, codigo: "ICA107" },
        ];

        setCourses(fetchedCourses);
        setFilteredCourses(fetchedCourses);
    }, [pathname]);

    const handleEdit = (course: Course) => {
        // Lógica para editar curso
    };

    const handleDelete = (courseCode: string) => {
        const updatedCourses = courses.filter((course) => course.codigo !== courseCode);
        setCourses(updatedCourses);
        setFilteredCourses(
            updatedCourses.filter(
                (course) =>
                    course.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.descripción.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.carrera.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.codigo.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredCourses(
            courses.filter(
                (course) =>
                    course.curso.toLowerCase().includes(value) ||
                    course.descripción.toLowerCase().includes(value) ||
                    course.carrera.toLowerCase().includes(value) ||
                    course.codigo.toLowerCase().includes(value)
            )
        );
    };

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
    };

    const actionBodyTemplate = (rowData: Course) => {
        return (
            <div className="flex justify-around">
                <button className="text-primary" onClick={() => handleEdit(rowData)}>
                    <AiOutlineEdit size={20} />
                </button>
                <button className="text-primary" onClick={() => handleDelete(rowData.codigo)}>
                    <AiOutlineDelete size={20} />
                </button>
            </div>
        );
    };

    return (
        <div className="flex-1 p-6 bg-white rounded-lg shadow m-4">
            <h1 className="font-bold text-primary text-2xl mb-5">Cursos</h1>
            <div className="flex justify-between mb-4">
                <div className="relative w-full sm:w-1/2">
                    <input type="text" placeholder="Buscar curso" className="w-full p-2 pl-10 border rounded" value={searchTerm} onChange={handleSearch} />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Image src={Search} alt="Buscar" width={20} height={20} />
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Image src={Filter} alt="Filtro" className="mr-4 cursor-pointer" width={24} height={24} />

                    <button
                        onClick={toggleDialog}
                        className={`py-2 px-4 rounded ${activeButton === "crear" ? "bg-primary text-white" : "bg-action text-primary"}`}
                    >
                        Crear nuevo curso
                    </button>
                    <Dialog className="w-3/4" visible={displayDialog} onHide={toggleDialog}>
                        <ModalCurso onHide={toggleDialog} />
                    </Dialog>
                    <button
                        onClick={() => handleButtonClick("carga")}
                        className={`py-2 px-4 rounded ${activeButton === "carga" ? "bg-action text-primary" : "bg-primary text-white"}`}
                    >
                        Carga masiva
                    </button>
                </div>
            </div>

            <DataTable value={filteredCourses} tableStyle={{ minWidth: "50rem" }} className="custom-table">
                <Column field="curso" header="Curso" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="descripción" header="Descripción" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="carrera" header="Carrera/Plan" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="cupos" header="#Cupos" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="codigo" header="Codigo" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column body={actionBodyTemplate} headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
            </DataTable>
        </div>
    );
};

export default CourseTable;
