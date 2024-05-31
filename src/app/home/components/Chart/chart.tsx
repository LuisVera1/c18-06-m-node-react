import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
interface Student {
    id: string;
    Nombre: string;
    Fechasolicitud: string;
    IDEsttudiante: string;
    Programa: string;
    Estado: string;
    Tickets: number;
}

export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [tickets, setTickets] = useState<Student[]>([]);
    const [aprobados, setAprobados] = useState<Student[]>([]);
    const [pendientes, setPendientes] = useState<Student[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/admin/get/students');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.ok) {
                    const ticketsData = data.data.filter((student: Student) => student.Tickets === 0);
                    const aprobadosData = data.data.filter((student: Student) => student.Estado === 'Aprobado');
                    const pendientesData = data.data.filter((student: Student) => student.Estado === 'Pendiente');

                    setTickets(ticketsData)
                    setAprobados(aprobadosData);
                    setPendientes(pendientesData);

                    const chartData = {
                        datasets: [
                            {
                                data: [pendientesData.length, aprobadosData.length],
                                backgroundColor: ['#fe7148', '#22c998'],
                            }
                        ]
                    };

                    setChartData(chartData);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);


    useEffect(() => {
        const data = {
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ['#5b40ff', '#fe7148', '#22c998'],
                }
            ]
        };

        const options = {
            cutout: '60%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        font: {
                            size: 16
                        },
                        boxWidth: 20,
                        boxHeight: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context: any) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.raw !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.raw);
                            }
                            return label;
                        }
                    }
                }
            }
        };
        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            <div className="legend-container w-full p-5 mt-10">
                <div className="legend-item grid">
                    <span className="color-box" style={{ backgroundColor: '#5b40ff' }}></span>
                    <div className='grid'>
                        <span className="legend-text">Tickets de soporte abiertos</span>
                        <div className='flex'>
                            <b className="legend-text">{tickets.length}</b>
                            <p className="legend-text ml-4">{((tickets.length / (aprobados.length + pendientes.length)) * 100).toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
                <div className="legend-item">
                    <span className="color-box" style={{ backgroundColor: '#fe7148' }}></span>
                    <div className='grid'>
                        <span className="legend-text">Pagos pendientes</span>
                        <div className='flex'>
                            <b className="legend-text">{pendientes.length}</b>
                            <p className="legend-text ml-4">{((pendientes.length / (aprobados.length + pendientes.length)) * 100).toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
                <div className="legend-item">
                    <span className="color-box" style={{ backgroundColor: '#22c998' }}></span>
                    <div className='grid'>
                        <span className="legend-text">Pagos aprobados</span>
                        <div className='flex'>
                            <b className="legend-text">{aprobados.length}</b>
                            <p className="legend-text ml-4">{((aprobados.length / (aprobados.length + pendientes.length)) * 100).toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
