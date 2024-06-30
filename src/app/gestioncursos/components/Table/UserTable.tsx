import React, { useState, useEffect } from "react";
import Image from "next/image";
import Search from "../../../../../assets/Search.png";
import ModalCurso from "../ModalCurso/ModalCurso";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import OkImage from "./../../../../../assets/Check Mark.png";

interface Course {
    title: string;
    description: string;
    careerId: string;
    spaces?: string;
    code: string;
    id: number;
}

const CourseTable: NextPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]); // Estado para cursos filtrados
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [displayConfirmationDialog, setDisplayConfirmationDialog] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/admin/get/classes");
                const data = await response.json();
                if (data.ok) {
                    setCourses(data.data);
                    setFilteredCourses(data.data); // Inicializar con todos los cursos
                } else {
                    console.error("Error fetching classes:", data.message);
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchData();
    }, [pathname]);

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    const handleDelete = (course: Course) => {
        setCourseToDelete(course);
        setDisplayConfirmationDialog(true);
    };

    const deleteClass = async (id: number) => {
        await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/delete/class`, {
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
        if (courseToDelete) {
            const updatedCourses = courses.filter((course) => course.id !== courseToDelete.id);

            deleteClass(courseToDelete.id);
            setCourses(updatedCourses);
            setFilteredCourses(updatedCourses); // Actualizar cursos filtrados
            setCourseToDelete(null);
            setDisplayConfirmationDialog(false);
            showSuccessModal();
        }
    };

    const showSuccessModal = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    };

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
        if (button === "crear") {
            setDisplayDialog(true);
        }
    };

    const actionBodyTemplate = (rowData: Course) => {
        return (
            <div className="flex justify-around">
                <button className="text-primary">
                    <AiOutlineEdit size={20} />
                </button>
                <button className="text-primary" onClick={() => handleDelete(rowData)}>
                    <AiOutlineDelete size={20} />
                </button>
            </div>
        );
    };

    const addCourse = (course: Course) => {
        setCourses((prevCourses) => [...prevCourses, course]);
        setFilteredCourses((prevCourses) => [...prevCourses, course]);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const searchTermLower = event.target.value.toLowerCase();
        const filteredData = courses.filter((course) => {
            try {
                const titleLower = course.title ? course.title.toLowerCase() : "";
                const descriptionLower = course.description ? course.description.toLowerCase() : "";
                const careerTitleLower = course.careerId ? course.careerId.toLowerCase() : "";
                const codeLower = course.code ? course.code.toLowerCase() : "";
                const spacesLower = typeof course.spaces === "string" ? course.spaces.toLowerCase() : "";

                return (
                    titleLower.includes(searchTermLower) ||
                    descriptionLower.includes(searchTermLower) ||
                    careerTitleLower.includes(searchTermLower) ||
                    codeLower.includes(searchTermLower) ||
                    spacesLower.includes(searchTermLower)
                );
            } catch (error) {
                console.error("Error al procesar el curso:", course, error);
                return false; // Excluir este curso de los resultados filtrados si hay un error
            }
        });
        setFilteredCourses(filteredData);
        setCurrentPage(1); // Reiniciar a la primera página al buscar
    };

    return (
        <div className="flex-1 p-6 bg-white rounded-lg shadow m-4">
            <div className="flex justify-between items-center w-full">
                <b className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-3xl font-barlow">Cursos</b>
            </div>

            <div className="flex justify-between mb-4 mt-10">
                <div className="relative w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Buscar curso"
                        className="w-full p-2 pl-10 border border-primary rounded-xl"
                        value={searchTerm}
                        onChange={handleSearch} // Asociar la función de búsqueda al cambio en el input
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Image src={Search} alt="Buscar" width={20} height={20} />
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleButtonClick("crear")}
                        className={`py-2 px-4 rounded font-sans text-sm bg-action text-primary${
                            activeButton === "crear"
                                ? "bg-action text-primary hover:bg-secundary hover:text-white"
                                : "bg-primary text-primary hover:bg-secundary hover:text-white"
                        }`}
                    >
                        Crear nuevo curso
                    </button>
                    <Dialog className="w-3/4" visible={displayDialog} onHide={() => setDisplayDialog(false)}>
                        <ModalCurso onHide={() => setDisplayDialog(false)} addCourse={addCourse} />
                    </Dialog>
                </div>
            </div>

            <DataTable value={filteredCourses} tableStyle={{ minWidth: "50rem" }} className="custom-table">
                <Column
                    field="title"
                    header="Título"
                    headerClassName="text-primary"
                    headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    className="header-column font-barlow text-xs"
                />
                <Column
                    field="description"
                    header="Descripción"
                    headerClassName="text-primary"
                    headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    className="header-column font-barlow text-xs"
                />
                <Column
                    field="career.title"
                    header="Carrera/Plan"
                    headerClassName="text-primary"
                    headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    className="header-column font-barlow text-xs"
                />
                <Column
                    field="spaces"
                    header="Cupos"
                    headerClassName="text-primary"
                    headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    className="header-column font-barlow text-xs"
                />
                <Column
                    field="code"
                    header="Código"
                    headerClassName="text-primary"
                    headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    className="header-column font-barlow text-xs"
                />
                <Column
                    body={actionBodyTemplate}
                    headerClassName="text-primary"
                    headerStyle={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    className="header-column font-barlow text-xs"
                />
            </DataTable>

            <Dialog visible={displayConfirmationDialog} onHide={() => setDisplayConfirmationDialog(false)} modal>
                <div className="flex flex-col items-center gap-4 px-4">
                    <p className="text-center text-primary text-xl font-semibold">¿Está seguro de que desea eliminar el curso {courseToDelete?.title}?</p>
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
                    <p className="text-primary text-xl font-bold">Curso eliminado</p>
                    <Image className="w-40 h-full object-cover" src={OkImage} alt="img-login" quality={100} priority />
                </div>
            </Dialog>

            <div className="flex justify-center mt-4 bg-action rounded-lg font-sans text-sm">
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
