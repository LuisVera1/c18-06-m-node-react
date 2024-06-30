import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import Image from "next/image";
import Search from "/assets/Search.png";
import OkImage from "./../../../../assets/Check Mark.png";
import "primereact/resources/themes/saga-blue/theme.css"; // Importar tema PrimeReact
import "primereact/resources/primereact.min.css"; // Importar estilos PrimeReact

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
    const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página actual
    const [itemsPerPage, setItemsPerPage] = useState(10); // Estado para la cantidad de elementos por página
    const [MatToDelete, setMatToDelete] = useState<Student | null>(null); // Estado para almacenar la matrícula que se eliminará
    const [displayConfirmationDialog, setDisplayConfirmationDialog] = useState(false); // Estado para mostrar/ocultar el modal de confirmación de eliminación
    const [showModal, setShowModal] = useState(false);

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

    const handleDelete = (course: Student) => {
        setMatToDelete(course); // Almacenar el curso que se va a eliminar
        setDisplayConfirmationDialog(true); // Mostrar el diálogo de confirmación de eliminación
    };

    // const deleteMat = async (id: number) => {
    //     await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/delete/class`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             id: id,
    //         }),
    //     });
    // };

    const confirmDelete = () => {
        if (MatToDelete) {
            const newStudents = students.filter((student) => student.code !== MatToDelete.code);

            // Aquí deberías actualizar el estado de students con newStudents
            setStudents(newStudents);

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

    // Función para formatear la fecha
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("es-ES");
    };
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setFilteredStudents(students.slice(startIndex, endIndex));
    }, [currentPage, itemsPerPage, students]);

    const totalPages = Math.ceil(students.length / itemsPerPage);

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

    const actionBodyTemplate = (rowData: Student) => {
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredStudents(
            students.filter((student) => {
                const name = typeof student.name === "string" ? student.name.toLowerCase() : "";
                const email = typeof student.email === "string" ? student.email.toLowerCase() : "";
                const code = typeof student.code === "string" ? student.code.toLowerCase() : "";
                const status = typeof student.status === "string" ? student.status.toLowerCase() : "";
                const creation = typeof formatDate(student.creation) === "string" ? formatDate(student.creation).toLowerCase() : "";

                return name.includes(value) || email.includes(value) || code.includes(value) || status.includes(value) || creation.includes(value);
            })
        );
    };

    return (
        <div className="card  m-auto">
            {isGestionMatriculas ? (
                <div className="relative w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className={`w-full p-2 my-4 pl-10 border border-primary rounded-xl ${searchTerm ? "border-primary" : ""}`}
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => setSearchTerm(searchTerm)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Image src={Search} alt="Buscar" width={20} height={20} />
                    </div>
                </div>
            ) : (
                <b className="font-barlow text-md text-dark">Lista de estudiantes - proceso matrícula</b>
            )}
            <DataTable value={filteredStudents.length ? filteredStudents : students} tableStyle={{ minWidth: "50rem" }} className="custom-table ">
                <Column field="name" header="Nombre" className="header-column font-barlow text-xs"></Column>
                <Column field="creation" header="Fecha solicitud" className="header-column font-barlow text-xs"></Column>
                <Column field="code" header="ID Estudiante" className="header-column font-barlow text-xs"></Column>
                <Column field="career.title" header="Programa" className="header-column font-barlow text-xs"></Column>
                <Column field="status" header="Estado" body={statusBodyTemplate} className="status-column font-barlow text-xs"></Column>
                <Column body={actionBodyTemplate} headerStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#000" }}></Column>
            </DataTable>
            <Dialog visible={displayConfirmationDialog} onHide={() => setDisplayConfirmationDialog(false)} modal>
                <div className="flex flex-col items-center gap-4 px-4">
                    <p className="text-center text-primary text-xl font-semibold">¿Está seguro de que desea eliminar {MatToDelete?.name}?</p>
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
                    <p className="text-primary text-xl font-bold">Información eliminada</p>
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
                <span className="m-2 p-2  text-primary font-sans text-sm">
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
}
