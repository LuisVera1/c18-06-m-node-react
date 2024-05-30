import Sidebar from "../components/sidebar/sidebar";
import Chart from "./components/Chart/chart";
import ProgressBar from "./components/progressbar/progressbar";
import DataTable from "../components/Table/table";
import Avatar from "../components/avatar/Avatar";

// Definimos y exportamos el componente Matriculas
function Home() {
    return (
        <div className="flex flex-col md:flex-row">
            {" "}
            {/* Utilizamos flex-col para móviles y flex-row para pantallas grandes */}
            <Sidebar />
            {/* Contenido de la página */}
            <div className="flex flex-col w-full md:w-3/4 lg:w-5/6 xl:w-7/8">
                {" "}
                {/* Utilizamos w-full para móviles y fracciones de la pantalla para pantallas grandes */}
                <div className="flex justify-between items-center w-full px-10 mt-10">
                    <h2 className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Dashboard</h2>
                    <Avatar />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-full lg:w-3/4 xl:w-5/6 mx-auto mt-40">
                    {" "}
                    {/* Utilizamos grid-cols-1 para móviles y grid-cols-2 para pantallas grandes */}
                    <div className="p-4">
                        <b className="text-dark text-lg md:text-xl lg:text-2xl xl:text-3xl">De Estudiantes Matriculados</b>
                        <div className="flex justify-between mt-4">
                            <b className="text-dark">Métrica</b>
                            <b className="text-dark">Valor</b>
                        </div>
                        <div className="mt-20">
                            <div className="flex justify-between mt-4">
                                <p className="text-dark">Matriculas</p>
                                <ProgressBar />
                                <p className="text-dark">23.28%</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className="text-dark">Aprobados</p>
                                <ProgressBar />
                                <p className="text-dark">23.28%</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className="text-dark">Pendientes</p>
                                <ProgressBar />
                                <p className="text-dark">23.28%</p>
                            </div>
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

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default Home;
