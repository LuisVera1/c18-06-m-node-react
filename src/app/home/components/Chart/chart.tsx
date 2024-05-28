import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

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
                        boxWidth: 20, // Ancho de la caja de color
                        boxHeight: 20 // Altura de la caja de color
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
                            <b className="legend-text">8,085</b>
                            <p className="legend-text ml-4">13%</p>
                        </div>
                    </div>
                </div>
                <div className="legend-item">
                    <span className="color-box" style={{ backgroundColor: '#fe7148' }}></span>
                    <div className='grid'>
                        <span className="legend-text">Pagos pendientes</span>
                        <div className='flex'>
                            <b className="legend-text">8,085</b>
                            <p className="legend-text ml-4">13%</p>
                        </div>
                    </div>
                </div>
                <div className="legend-item">
                    <span className="color-box" style={{ backgroundColor: '#22c998' }}></span>
                    <div className='grid'>
                        <span className="legend-text">Pagos aprobados</span>
                        <div className='flex'>
                            <b className="legend-text">8,085</b>
                            <p className="legend-text ml-4">13%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
