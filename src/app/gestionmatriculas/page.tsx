'use client'
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/sidebar";
import DataTable from "../components/Table/table"
import { ProgressBar } from "primereact/progressbar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

function GestionMatriculas() {
    const [generalStatistics, setGeneralStatistics] = useState({
        total: "0",
        approved: "0",
        pending: "0",
    });
    const [careerStatistics, setCareerStatistics] = useState([]);

    useEffect(() => {
        const fetchGeneralStatistics = async () => {
            const fetchData = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/get/statistics`);
            const response = await fetchData.json();

            if (response.ok) {
                setGeneralStatistics(response.data);
            }
        };

        const fetchCareerStatistics = async () => {
            const fetchData = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/get/studentsByCareer`);
            const response = await fetchData.json();

            if (response.ok) {
                setCareerStatistics(response.data);
            }
        };

        fetchGeneralStatistics();
        fetchCareerStatistics();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex flex-col w-full md:w-3/4 lg:w-5/6 xl:w-7/8">
                <div className="flex justify-between items-center w-full px-10 mt-10 mb-20">
                    <b className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-3xl">Gestión de matriculas</b>
                </div>
                <div className="flex">
                    {/* Estadísticas Generales */}
                    <div className="flex-1 p-4">
                        <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-2xl"># De Estudiantes Matriculados</b>
                        <div className="flex justify-between mt-4">
                            <b className="text-dark">Métrica</b>
                            <b className="text-dark">Valor</b>
                        </div>
                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3>Total</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(generalStatistics.total)} />
                            </div>
                            <p>{Number(generalStatistics.total)}</p>
                        </div>
                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3>Pendientes</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(generalStatistics.approved)} />
                            </div>
                            <p>{Number(generalStatistics.approved)}</p>
                        </div>
                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3>Aprobados</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(generalStatistics.pending)} />
                            </div>
                            <p>{Number(generalStatistics.pending)}</p>
                        </div>
                    </div>

                    {/* Estadísticas por Programa */}
                    <div className="flex-1 p-4">
                        <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-2xl"># De matrículas por programa</b>
                        <div className="flex justify-between mt-4">
                            <b className="text-dark">Programa</b>
                            <b className="text-dark">Porcentaje</b>
                        </div>
                        {careerStatistics.map((career: { career: string; percentage: string }, index: number) => (
                            <div key={index} className="mb-4 mt-10 flex items-center space-x-4">
                                <h3>{career.career}</h3>
                                <div className="flex-1">
                                    <ProgressBar value={Number(career.percentage)} />
                                </div>
                                <p>{career.percentage}%</p>
                            </div>
                        ))}
                    </div>
                </div>
                <DataTable />
            </div>
        </div>
    );
}

export default GestionMatriculas;
