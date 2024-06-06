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

interface Course {
    curso: string;
    descripcion: string;
    carreraPlan: string;
    capacidad: number;
    codigoCurso: string;
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
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null); // Estado para almacenar el curso que se eliminará
    const [displayConfirmationDialog, setDisplayConfirmationDialog] = useState(false); // Estado para mostrar/ocultar el modal de confirmación de eliminación

    useEffect(() => {
        const fetchedCourses: Course[] = [
            { curso: "Diseño Gráfico", descripcion: "Curso de diseño avanzado", carreraPlan: "Diseño", capacidad: 30, codigoCurso: "DG101" },
            { curso: "Economía Básica", descripcion: "Introducción a la economía", carreraPlan: "Economía", capacidad: 25, codigoCurso: "EB102" },
            { curso: "Contabilidad", descripcion: "Fundamentos de contabilidad", carreraPlan: "Contaduría", capacidad: 20, codigoCurso: "CT103" },
            { curso: "Ingeniería Civil", descripcion: "Principios de ingeniería civil", carreraPlan: "Ing. Civil", capacidad: 40, codigoCurso: "IC104" },
            { curso: "Ingeniería Industrial", descripcion: "Procesos industriales", carreraPlan: "Ing. Industrial", capacidad: 35, codigoCurso: "II105" },
            { curso: "Publicidad y Marketing", descripcion: "Estrategias de marketing", carreraPlan: "Publicidad", capacidad: 28, codigoCurso: "PM106" },
            {
                curso: "Ingeniería Civil Avanzada",
                descripcion: "Temas avanzados de ingeniería civil",
                carreraPlan: "Ing. Civil",
                capacidad: 22,
                codigoCurso: "ICA107",
            },
        ];

        setCourses(fetchedCourses);
        setFilteredCourses(fetchedCourses);
    }, [pathname]);

    const handleEdit = (course: Course) => {
        // Lógica para editar curso
    };

    const handleDelete = (course: Course) => {
        setCourseToDelete(course); // Almacenar el curso que se va a eliminar
        setDisplayConfirmationDialog(true); // Mostrar el diálogo de confirmación
    };

    const confirmDelete = () => {
        if (courseToDelete) {
            const updatedCourses = courses.filter((course) => course.codigoCurso !== courseToDelete.codigoCurso);
            setCourses(updatedCourses);
            setFilteredCourses(
                updatedCourses.filter(
                    (course) =>
                        course.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        course.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        course.carreraPlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        course.codigoCurso.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setCourseToDelete(null); // Reiniciar el curso a eliminar
            setDisplayConfirmationDialog(false); // Ocultar el diálogo de confirmación
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredCourses(
            courses.filter(
                (course) =>
                    course.curso.toLowerCase().includes(value) ||
                    course.descripcion.toLowerCase().includes(value) ||
                    course.carreraPlan.toLowerCase().includes(value) ||
                    course.codigoCurso.toLowerCase().includes(value)
            )
        );
    };

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
        if (button === "crear") {
            setDisplayDialog(true); // Mostrar el modal de creación de curso al hacer clic en el botón "Crear nuevo curso"
        }
    };

    const actionBodyTemplate = (rowData: Course) => {
        return (
            <div className="flex justify-around">
                <button className="text-primary" onClick={() => handleEdit(rowData)}>
                    <AiOutlineEdit size={20} />
                </button>
                <button className="text-primary" onClick={() => handleDelete(rowData)}>
                    <AiOutlineDelete size={20} />
                </button>
            </div>
        );
    };

    // Nueva función para agregar curso
    const addCourse = (course: Course) => {
        setCourses([...courses, course]);
        setFilteredCourses([...courses, course]);
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
                        onClick={() => handleButtonClick("crear")}
                        className={`py-2 px-4 rounded ${activeButton === "crear"
                                ? "bg-action text-primary hover:bg-secundary hover:text-white"
                                : "bg-action text-primary hover:bg-secundary hover:text-white"
                            }`}
                    >
                        Crear nuevo curso
                    </button>
                    <Dialog className="w-3/4" visible={displayDialog} onHide={toggleDialog}>
                        <ModalCurso onHide={toggleDialog} addCourse={addCourse} />
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
                <Column field="descripcion" header="Descripción" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="carreraPlan" header="Carrera/Plan" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="capacidad" header="#Cupos" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="codigoCurso" header="Codigo" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column body={actionBodyTemplate} headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
            </DataTable>
            <Dialog visible={displayConfirmationDialog} onHide={() => setDisplayConfirmationDialog(false)} modal>
                <div className="flex flex-col items-center gap-4 px-4">
                    <p className="text-center text-primary text-xl font-semibold">¿Está seguro de que desea eliminar el curso {courseToDelete?.curso}?</p>
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
                    <p className="text-gray-400 pt-4 text-sm">Nota: se eliminarán los datos de forma permanente</p>
                </div>
            </Dialog>
        </div>
    );
};

export default CourseTable;
