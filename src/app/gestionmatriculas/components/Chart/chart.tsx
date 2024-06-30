"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

interface StatisticsData {
    approved: string;
    dropout: string;
    enrolled: number;
    paymentsApproved: string;
    paymentsPending: string;
    pending: string;
    tickets: string;
    total: string;
    totalCourses: number;
    totalIncome: number;
}

export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [statisticsData, setStatisticsData] = useState<StatisticsData | null>(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch("/api/admin/get/statistics");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                if (data.ok) {
                    setStatisticsData(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };

        fetchStatistics();
    }, []);

    useEffect(() => {
        if (statisticsData) {
            const ticketsPercentage = parseFloat(statisticsData.tickets);
            const pendingPercentage = parseFloat(statisticsData.paymentsPending);
            const approvedPercentage = parseFloat(statisticsData.paymentsApproved);
            const data = {
                datasets: [
                    {
                        data: [ticketsPercentage, pendingPercentage, approvedPercentage],
                        backgroundColor: ["#5b40ff", "#fe7148", "#22c998"],
                    },
                ],
            };

            setChartData(data);
        }
    }, [statisticsData]);

    useEffect(() => {
        const options = {
            cutout: "60%",
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 20,
                        font: {
                            size: 16,
                        },
                        boxWidth: 20,
                        boxHeight: 20,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context: any) {
                            let label = context.label || "";
                            if (label) {
                                label += ": ";
                            }
                            if (context.raw !== null) {
                                label += new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(context.raw);
                            }
                            return label;
                        },
                    },
                },
            },
        };
        setChartOptions(options);
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            {statisticsData && (
                <div className="legend-container w-full p-5 mt-10">
                    <div className="legend-item grid">
                        <span className="color-box" style={{ backgroundColor: "#5b40ff" }}></span>
                        <div className="grid">
                            <span className="legend-text">Tickets de soporte abiertos</span>
                            <div className="flex">
                                <b className="legend-text">{statisticsData.tickets}</b>
                                {/* <p className="legend-text ml-4">{parseFloat(statisticsData.tickets)}%</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="legend-item">
                        <span className="color-box" style={{ backgroundColor: "#fe7148" }}></span>
                        <div className="grid">
                            <span className="legend-text">Pagos pendientes</span>
                            <div className="flex">
                                <b className="legend-text">{statisticsData.paymentsPending}%</b>
                                {/* <p className="legend-text ml-4">{parseFloat(statisticsData.paymentsPending)}%</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="legend-item">
                        <span className="color-box" style={{ backgroundColor: "#22c998" }}></span>
                        <div className="grid">
                            <span className="legend-text">Pagos aprobados</span>
                            <div className="flex">
                                <b className="legend-text">{statisticsData.paymentsApproved}%</b>
                                {/* <p className="legend-text ml-4">{parseFloat(statisticsData.paymentsApproved)}%</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
