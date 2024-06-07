"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Chart from "./components/Chart/chart";
import { ProgressBar } from "primereact/progressbar"; // Asegúrate de importar correctamente desde 'primereact/progressbar'
import DataTable from "../components/Table/table";
import ImageAvatar from "../components/avatar/Avatar";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import "primereact/resources/themes/saga-blue/theme.css"; // Importar tema PrimeReact
import "primereact/resources/primereact.min.css"; // Importar estilos PrimeReact

interface Student {
    id: string;
    Nombre: string;
    Fechasolicitud: string;
    IDEsttudiante: string;
    Programa: string;
    Estado: string;
}

// Definimos y exportamos el componente Home
function Home() {
    // useAuthRedirect();
    // Estado para almacenar los datos de los estudiantes
    const [matriculas, setMatriculas] = useState<Student[]>([]);
    const [aprobados, setAprobados] = useState<Student[]>([]);
    const [pendientes, setPendientes] = useState<Student[]>([]);


    const [statistics, setStatistics] = useState({
        total: "0",
		approved: "0",
		pending: "0",
    });
    useEffect(()=> {
        const dataFecth = async () => {
            const fetchData = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/get/statistics`);
            const response = await fetchData.json();

            if(response.ok){
                setStatistics(response.data);
            }
        }
        dataFecth();
    }, [])

    // useEffect para obtener los datos de los estudiantes al montar el componente
    /*
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Realiza la solicitud a la API
                const response = await fetch("/api/admin/get/students"); // Ajusta la URL a la de tu endpoint real
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                // Verifica si la respuesta es correcta y actualiza los estados
                if (data.ok) {
                    setMatriculas(data.data);
                    const aprobados = data.data.filter((student: Student) => student.Estado === "Aprobado");
                    const pendientes = data.data.filter((student: Student) => student.Estado === "Pendiente");
                    setAprobados(aprobados);
                    setPendientes(pendientes);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        // Llama a la función para obtener los estudiantes
        fetchStudents();
    }, []);
    */

    // const totalStudents = matriculas.length;
    // const approvedPercentage = totalStudents ? (aprobados.length / totalStudents) * 100 : 0;
    // const pendingPercentage = totalStudents ? (pendientes.length / totalStudents) * 100 : 0;

    return (
        <div className="flex flex-col md:flex-row ">
            <Sidebar />

            <div className="flex flex-col w-full md:w-3/4 lg:w-5/6 xl:w-7/8">
                <div className="flex justify-between items-center w-full px-10 mt-10">
                    <b className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Dashboard</b>
                    <ImageAvatar />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-full lg:w-3/4 xl:w-5/6 mx-auto mt-10">
                    <div className="p-4">
                        <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-3xl"># De Estudiantes Matriculados</b>
                        <div className="flex justify-between mt-4">
                            <b className="text-dark">Métrica</b>
                            <b className="text-dark">Valor</b>
                        </div>
                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3>Estudiantes</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.total)} />
                            </div>
                            <p>{Number(statistics.total)}</p>
                        </div>
                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3>Aprobados</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.approved)} />
                            </div>
                            <p>{Number(statistics.approved)}</p>
                        </div>

                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3>Pendientes</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.pending)} />
                            </div>
                            <p>{Number(statistics.pending)}</p>
                        </div>
                    </div>
                    <div className="p-4">
                        <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-3xl">Pagos</b>
                        <div className="flex justify-between mt-4">
                            <b className="text-dark">Métrica</b>
                            <b className="text-dark">Valor</b>
                        </div>
                        <div className="flex justify-between mt-4">
                            <Chart />
                        </div>
                    </div>
                </div>
                <DataTable />
            </div>
        </div>
    );
}

export default Home;
