"use client";

import { NextPage } from "next";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Avatar from "../../components/avatar/Avatar";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";

interface FormData {
    nombreCompleto: string;
    numeroTelefono: string;
    numeroIdentificacion: string;
    correoInstitucional: string;
    deptoFacultad: string;
    rolPermisos: string;
}

const CrearEstudiante: NextPage = () => {
    const [activeButton, setActiveButton] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nombreCompleto: "",
        numeroTelefono: "",
        numeroIdentificacion: "",
        correoInstitucional: "",
        deptoFacultad: "",
        rolPermisos: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.nombreCompleto) newErrors.nombreCompleto = "Nombre completo es requerido";
        if (!formData.numeroTelefono) newErrors.numeroTelefono = "Número de Teléfono es requerido";
        if (!formData.numeroIdentificacion) newErrors.numeroIdentificacion = "ID empleado es requerido";
        if (!formData.correoInstitucional) newErrors.correoInstitucional = "Correo institucional es requerido";
        if (!formData.rolPermisos) newErrors.rolPermisos = "Rol es requerido";
        if (!formData.deptoFacultad) newErrors.deptoFacultad = "Depto es requerido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log(formData);
        }
    };

    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 bg-gray-200 ">
                    <header className="shadow p-6">
                        <div className="flex justify-between items-center ml-6">
                            <Link href="/gestionusuarios" passHref>
                                <div className="flex justify-start items-center ">
                                    <AiOutlineLeft className="mr-4 text-primary font-black" />
                                    <h1 className="text-2xl text-primary font-bold"> Información del administrador</h1>
                                </div>
                            </Link>
                            <Avatar />
                        </div>
                    </header>
                    <div className="w-full m-4 bg-white rounded p-6 shadow-md">
                        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white rounded-lg">
                            <p className="text-xl font-semibold mb-6">Información básica</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">
                                        Nombre completo
                                        <input
                                            type="text"
                                            name="nombreCompleto"
                                            value={formData.nombreCompleto}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.nombreCompleto && <p className="text-red-500 text-sm mt-1">{errors.nombreCompleto}</p>}
                                    </label>

                                    <label className="block mb-2">
                                        Número de Teléfono
                                        <input
                                            type="tel"
                                            name="numeroTelefono"
                                            value={formData.numeroTelefono}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.numeroTelefono && <p className="text-red-500 text-sm mt-1">{errors.numeroTelefono}</p>}
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        ID Empleado
                                        <input
                                            type="text"
                                            name="numeroIdentificacion"
                                            value={formData.numeroIdentificacion}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.numeroIdentificacion && <p className="text-red-500 text-sm mt-1">{errors.numeroIdentificacion}</p>}
                                    </label>
                                    <label className="block mb-2">
                                        Correo institucional
                                        <input
                                            type="email"
                                            name="correoPersonal"
                                            value={formData.correoInstitucional}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.correoInstitucional && <p className="text-red-500 text-sm mt-1">{errors.correoInstitucional}</p>}
                                    </label>
                                </div>
                            </div>
                            <p className="text-xl font-semibold mb-6">Información del rol</p>
                            <div className="relative">
                                <label className="block mb-2">
                                    Rol/Permisos
                                    <select
                                        name="rolPermisos"
                                        value={formData.rolPermisos}
                                        onChange={(e) => setFormData({ ...formData, rolPermisos: e.target.value })}
                                        className="w-full p-2 pr-10 border border-gray-300 rounded mt-1"
                                    >
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        ></svg>
                                    </div>
                                </label>
                            </div>
                            <div className="relative">
                                <label className="block mb-2">
                                    Depto/Facultad
                                    <select
                                        name="deptoFacultad"
                                        value={formData.deptoFacultad}
                                        onChange={(e) => setFormData({ ...formData, deptoFacultad: e.target.value })}
                                        className="w-full p-2 pr-10 border border-gray-300 rounded mt-1"
                                    >
                                        <option value="Ciencias">Ciencias</option>
                                        <option value="Medicina">Medicina</option>
                                        <option value="Artes">Artes</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        ></svg>
                                    </div>
                                </label>
                            </div>
                            <div className="flex justify-end mt-6">
                                <Link href="/gestionusuarios" passHref>
                                    <button
                                        type="button"
                                        className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs hover:bg-action hover:text-primary ${
                                            activeButton ? "bg-primary text-white" : "bg-action text-primary"
                                        }`}
                                        onClick={() => setActiveButton(false)}
                                    >
                                        Cancelar
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    className={`py-2 px-4 rounded-md flex-grow max-w-xs hover:bg-action hover:text-primary ${
                                        activeButton ? "bg-action text-primary" : "bg-primary text-white"
                                    }`}
                                    onClick={() => setActiveButton(true)}
                                >
                                    Crear administrador
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default CrearEstudiante;
