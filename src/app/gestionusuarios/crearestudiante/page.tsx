import Sidebar from "@/app/components/sidebar/sidebar";
import Navbar from "../components/nav/nav";
import Form from "../components/form/form";
import { NextPage } from "next";

const CrearEstudiante: NextPage = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">
                <header className="bg-gray-200 shadow p-6">
                    <Navbar />
                </header>
                <Form />
            </main>
        </div>
    );
};

export default CrearEstudiante;
