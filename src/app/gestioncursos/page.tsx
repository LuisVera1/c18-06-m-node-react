"use client";
import Sidebar from "../components/sidebar/sidebar";
import UserTable from "./components/Table/UserTable";
// import Navbar from "./components/nav/nav"
import { NextPage } from "next";

const Cursos: NextPage = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">
                <header>
                    <UserTable />
                </header>
            </main>
        </div>
    );
};

export default Cursos;
