"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/sidebar";
import { ProgressBar } from "primereact/progressbar";
// Asegúrate de importar correctamente desde 'primereact/progressbar'
import DataTable from "../components/Table/table";
import "primereact/resources/themes/saga-blue/theme.css"; // Importar tema PrimeReact
import "primereact/resources/primereact.min.css"; // Importar estilos PrimeReact


// Definimos y exportamos el componente Home
function GestionMatriculas() {
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
        }
        dataFecth();
    }, [])


    return (
        <div className="flex flex-col md:flex-row ">
            <Sidebar />
            <div className="flex flex-col w-full md:w-3/4 lg:w-5/6 xl:w-7/8">
                <div className="flex justify-between items-center w-full px-10 mt-10">
                    <b className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Gestión matrículas</b>
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
                                <ProgressBar value={Number(statistics.total)} className="custom-progress-bar-violet" />
                            </div>
                            <p>{Number(statistics.total)}</p>
                        </div>
                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3>Pendientes</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.approved)} className="custom-progress-bar-orange" />
                            </div>
                            <p>{Number(statistics.approved)}</p>
                        </div>

                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3>Aprobados</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.pending)} className="custom-progress-bar-green" />
                            </div>
                            <p>{Number(statistics.pending)}</p>
                        </div>
                    </div>

                    <div className="p-4 flex flex-wrap justify-between">
                        <div className="p-4 w-full ">
                            <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-3xl"># De matrículas por programa</b>
                            <div className="flex justify-between mt-4">
                                <b className="text-dark">Métrica</b>
                                <b className="text-dark">Valor</b>
                            </div>
                            <div className="mb-4 mt-10 flex items-center space-x-4">
                                <h3>Contaduria</h3>
                                <div className="flex-1">
                                    <ProgressBar value={Number(statistics.total)} />
                                </div>
                                <p>{Number(statistics.total)}</p>
                            </div>
                            <div className="mb-4 mt-10 flex items-center space-x-4">
                                <h3>Economia</h3>
                                <div className="flex-1">
                                    <ProgressBar value={Number(statistics.approved)} />
                                </div>
                                <p>{Number(statistics.approved)}</p>
                            </div>

                            <div className="mb-4 mt-10 flex items-center space-x-4">
                                <h3>Diseño</h3>
                                <div className="flex-1">
                                    <ProgressBar value={Number(statistics.pending)} />
                                </div>
                                <p>{Number(statistics.pending)}</p>
                            </div>
                            <div className="mb-4 mt-10 flex items-center space-x-4">
                                <h3>Arquitectura</h3>
                                <div className="flex-1">
                                    <ProgressBar value={Number(statistics.pending)} />
                                </div>
                                <p>{Number(statistics.pending)}</p>
                            </div>
                            <div className="mb-4 mt-10 flex items-center space-x-4">
                                <h3>ing.Civil</h3>
                                <div className="flex-1">
                                    <ProgressBar value={Number(statistics.pending)} />
                                </div>
                                <p>{Number(statistics.pending)}</p>
                            </div>
                            <div className="mb-4 mt-10 flex items-center space-x-4">
                                <h3>ing.Industrial</h3>
                                <div className="flex-1">
                                    <ProgressBar value={Number(statistics.pending)} />
                                </div>
                                <p>{Number(statistics.pending)}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <DataTable />
            </div>
        </div>
    );
}

export default GestionMatriculas;
