import Sidebar from "../components/sidebar/sidebar";
import UserTable from "./components/Table/UserTable";
import Navbar from "./components/nav/nav";
import { NextPage } from "next";

const Docente: NextPage = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">
                <header className=" p-6">
                    <Navbar />
                </header>
                <UserTable />
            </main>
        </div>
    );
};

export default Docente;
