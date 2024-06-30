"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Chart from "./components/Chart/chart";
import { ProgressBar } from "primereact/progressbar"; // Asegúrate de importar correctamente desde 'primereact/progressbar'
import DataTable from "../components/Table/table";
import ImageAvatar from "../components/avatar/Avatar";
import "primereact/resources/themes/saga-blue/theme.css"; // Importar tema PrimeReact
import "primereact/resources/primereact.min.css"; // Importar estilos PrimeReact
import { redirect } from "next/navigation";

// Definimos y exportamos el componente Home
function Home() {
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

    const [redirectLogin, setRedirectLogin] = useState(false);

    if (redirectLogin) {
        redirect("/login");
    }

    useEffect(() => {
        const verifyLogin = () => {
            const login = localStorage.getItem("loginSuccess");
            if (!login) setRedirectLogin(true);
        };
        verifyLogin();
    }, []);

    return (
        <div className="flex flex-col md:flex-row ">
            <Sidebar />

            <div className="flex flex-col w-full md:w-3/4 lg:w-5/6 xl:w-7/8 bg-white rounded-lg p-6 m-4 shadow">
                <div className="flex justify-between items-center w-full p-5 mt-10 shadow rounded-2xl">
                    <b className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-3xl font-barlow ">Dashboard</b>
                    <ImageAvatar />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-full lg:w-3/4 xl:w-5/6 mx-auto mt-10 flex-1 ">
                    <div className="p-4 m-2 h-100 shadow rounded-2xl">
                        <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-2xl font-barlow"># De Estudiantes Matriculados</b>

                        <div className="flex justify-between mt-4">
                            <b className="text-dark font-barlow">Métrica</b>
                            <b className="text-dark font-barlow">Valor</b>
                        </div>
                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3 className="font-sans text-sm">Estudiantes</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.total)} />
                            </div>
                            <p>{Number(statistics.total)}</p>
                        </div>
                        <div className="mb-4 mt-10 flex items-center space-x-4">
                            <h3 className="font-sans text-sm">Pendientes</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.approved)} />
                            </div>
                            <p>{Number(statistics.approved)}</p>
                        </div>

                        <div className="mb-4 mt-10 flex items-center space-x-4 ">
                            <h3 className="font-sans text-sm">Aprobados</h3>
                            <div className="flex-1">
                                <ProgressBar value={Number(statistics.pending)} />
                            </div>
                            <p>{Number(statistics.pending)}</p>
                        </div>
                    </div>
                    <div className="p-4 shadow rounded-2xl">
                        <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-2xl font-barlow ">Pagos</b>
                        <div className="flex justify-between mt-4 ">
                            <b className="text-dark font-barlow">Métrica</b>
                            <b className="text-dark font-barlow">Valor</b>
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
