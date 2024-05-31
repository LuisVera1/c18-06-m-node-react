
import React from 'react';
import { ProgressBar } from 'primereact/progressbar';

export default function BasicDemo() {

    const totalStudents = matriculas.length;
    const approvedPercentage = totalStudents ? (aprobados.length / totalStudents) * 100 : 0;
    const pendingPercentage = totalStudents ? (pendientes.length / totalStudents) * 100 : 0;
    return (
        <div className="card w-80">
            <ProgressBar value={''}>

            </ProgressBar>
        </div>
    );
}
