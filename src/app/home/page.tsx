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
    useAuthRedirect();
    // Estado para almacenar los datos de los estudiantes
    const [matriculas, setMatriculas] = useState<Student[]>([]);
    const [aprobados, setAprobados] = useState<Student[]>([]);
    const [pendientes, setPendientes] = useState<Student[]>([]);

    const [statistics, setStatistics] = useState({
        total: "0",
        approved: "0",
        pending: "0",
    });
    useEffect(() => {
        const dataFecth = async () => {
            const fetchData = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/get/statistics`);
            const response = await fetchData.json();

            if (response.ok) {
                setStatistics(response.data);
            }
        };
        dataFecth();
    }, []);


    return (
        <div className="flex flex-col md:flex-row ">
            <Sidebar />

            <div className="flex flex-col w-full md:w-3/4 lg:w-5/6 xl:w-7/8">
                <div className="flex justify-between items-center w-full px-10 mt-10">
                    <b className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-3xl">Dashboard</b>
                    <ImageAvatar />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-full lg:w-3/4 xl:w-5/6 mx-auto mt-10">
                    <div className="p-4">
                        <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-2xl"># De Estudiantes Matriculados</b>
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
                            <h3>Pendientes</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.approved)} />
                            </div>
                            <p>{Number(statistics.approved)}</p>
                        </div>

                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3>Aprobados</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.pending)} />
                            </div>
                            <p>{Number(statistics.pending)}</p>
                        </div>
                    </div>
                    <div className="p-4">
                        <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-2xl">Pagos</b>
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