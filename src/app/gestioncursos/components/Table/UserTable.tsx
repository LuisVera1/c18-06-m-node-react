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
    course: string;
    descripcion: string;
    carreraPlan: string;
    space?: number;
    codigoCurso: string;
    code?: number;
}

const CourseTable: NextPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página actual
    const [itemsPerPage, setItemsPerPage] = useState(5); // Estado para la cantidad de elementos por página
    const pathname = usePathname();

    const [displayDialog, setDisplayDialog] = useState(false);
    const toggleDialog = () => {
        setDisplayDialog(!displayDialog);
    };
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null); // Estado para almacenar el curso que se eliminará
    const [displayConfirmationDialog, setDisplayConfirmationDialog] = useState(false); // Estado para mostrar/ocultar el modal de confirmación de eliminación

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/admin/get/classes");
                const data = await response.json();
                if (data.ok) {
                    setCourses(data.data);
                    setFilteredCourses(data.data);
                } else {
                    console.error("Error fetching classes:", data.message);
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchData();
    }, [pathname]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setFilteredCourses(courses.slice(startIndex, endIndex));
    }, [currentPage, itemsPerPage, courses]);

    const totalPages = Math.ceil(courses.length / itemsPerPage);

    const handleEdit = (course: Course) => {
        // Aquí puedes implementar la lógica para editar el curso, por ejemplo, abrir un modal de edición
        console.log("Editar curso:", course);
    };

    const handleDelete = (course: Course) => {
        setCourseToDelete(course); // Almacenar el curso que se va a eliminar
        setDisplayConfirmationDialog(true); // Mostrar el diálogo de confirmación de eliminación
    };

    const confirmDelete = () => {
        if (courseToDelete) {
            const updatedCourses = courses.filter((course) => course.code !== courseToDelete.code);
            setCourses(updatedCourses); // Actualizar la lista de cursos sin el curso eliminado
            setFilteredCourses(updatedCourses); // Actualizar la lista filtrada de cursos
            setCourseToDelete(null); // Reiniciar el curso a eliminar
            setDisplayConfirmationDialog(false); // Ocultar el diálogo de confirmación de eliminación
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredCourses(
            courses.filter(
                (course) =>
                    course.course?.toLowerCase()?.includes(value) ||
                    course.descripcion?.toLowerCase()?.includes(value) ||
                    course.carreraPlan?.toLowerCase()?.includes(value) ||
                    course.space?.toString()?.toLowerCase()?.includes(value) ||
                    course.codigoCurso?.toLowerCase()?.includes(value)
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
        setCourses((prevCourses) => [...prevCourses, course]);
        setFilteredCourses((prevCourses) => [...prevCourses, course]);
    };

    return (
        <div className="flex-1 p-10 bg-grey ">
            <div className="flex justify-between items-center w-full">
                <b className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-3xl">Cursos</b>
            </div>

            <div className="flex justify-between mb-4 mt-40">
                <div className="relative w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Buscar curso"
                        className="w-full p-2 pl-10 border border-primary rounded-xl"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Image src={Search} alt="Buscar" width={20} height={20} />
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Image src={Filter} alt="Filtro" className="mr-4 cursor-pointer" width={24} height={24} />

                    <button
                        onClick={() => handleButtonClick("crear")}
                        className={`py-2 px-4 rounded bg-action text-primary${
                            activeButton === "crear"
                                ? "bg-action text-primary hover:bg-secundary hover:text-white"
                                : "bg-primary text-primary hover:bg-secundary hover:text-white "
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
                <Column field="title" header="Título" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="description" header="Descripción" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="career.title" header="Carrera/Plan" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="spaces" header="# Cupos" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column field="code" header="Código" headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
                <Column body={actionBodyTemplate} headerClassName="text-primary" headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }} />
            </DataTable>
            <Dialog visible={displayConfirmationDialog} onHide={() => setDisplayConfirmationDialog(false)} modal>
                <div className="flex flex-col items-center gap-4 px-4">
                    <p className="text-center text-primary text-xl font-semibold">¿Está seguro de que desea eliminar el curso {courseToDelete?.course}?</p>
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
            <div className="flex justify-center mt-4 bg-action">
                <button
                    className="text-action font-normal hover:bg-secundary hover:text-white bg-primary m-2 p-2 rounded-xl"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Anterior
                </button>
                <span className="m-2 p-2  text-primary font-normal ">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    className="text-action font-normal hover:bg-secundary hover:text-white bg-primary  m-2 p-2 rounded-xl"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default CourseTable;
