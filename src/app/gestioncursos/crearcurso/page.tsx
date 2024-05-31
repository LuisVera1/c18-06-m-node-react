"use client";

import { NextPage } from "next";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Avatar from "../../components/avatar/avatar";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";

interface FormData {
    nombreCompleto: string;
    fechaNacimiento: string;
    numeroTelefono: string;
    numeroIdentificacion: string;
    correoPersonal: string;
    correoInstitucional: string;
    idEstudiante: string;
    añoIngreso: string;
    semestreActual: string;
    programaEstudio: string;
    cursosMatriculados: string;
    estadoAcademico: string;
    nombreContactoEmergencia: string;
    telefonoContactoEmergencia: string;
}

const Crearcurso: NextPage = () => {
    const [activeButton, setActiveButton] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nombreCompleto: "",
        fechaNacimiento: "",
        numeroTelefono: "",
        numeroIdentificacion: "",
        correoPersonal: "",
        correoInstitucional: "",
        idEstudiante: "",
        añoIngreso: "",
        semestreActual: "",
        programaEstudio: "",
        cursosMatriculados: "",
        estadoAcademico: "",
        nombreContactoEmergencia: "",
        telefonoContactoEmergencia: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.nombreCompleto) newErrors.nombreCompleto = "Nombre completo es requerido";
        if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "Fecha de Nacimiento es requerida";
        if (!formData.numeroTelefono) newErrors.numeroTelefono = "Número de Teléfono es requerido";
        if (!formData.numeroIdentificacion) newErrors.numeroIdentificacion = "No. de Identificación es requerido";
        if (!formData.correoPersonal) newErrors.correoPersonal = "Correo personal es requerido";
        if (!formData.correoInstitucional) newErrors.correoInstitucional = "Correo institucional es requerido";
        if (!formData.idEstudiante) newErrors.idEstudiante = "ID Estudiante es requerido";
        if (!formData.añoIngreso) newErrors.añoIngreso = "Año de Ingreso es requerido";
        if (!formData.semestreActual) newErrors.semestreActual = "Semestre/Ciclo Actual es requerido";
        if (!formData.programaEstudio) newErrors.programaEstudio = "Programa de Estudio es requerido";
        if (!formData.cursosMatriculados) newErrors.cursosMatriculados = "Cursos Matriculados es requerido";
        if (!formData.estadoAcademico) newErrors.estadoAcademico = "Estado Académico es requerido";
        if (!formData.nombreContactoEmergencia) newErrors.nombreContactoEmergencia = "Nombre de Contacto es requerido";
        if (!formData.telefonoContactoEmergencia) newErrors.telefonoContactoEmergencia = "Teléfono de Contacto es requerido";

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
                            <Link href="/gestioncursos" passHref>
                                <div className="flex justify-start items-center ">
                                    <AiOutlineLeft className="mr-4 text-primary font-black" />
                                    <h1 className="text-2xl text-primary font-bold"> Información del curso</h1>
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
                                        Fecha de Nacimiento
                                        <input
                                            type="date"
                                            name="fechaNacimiento"
                                            value={formData.fechaNacimiento}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.fechaNacimiento && <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>}
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
                                        No. de Identificación
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
                                        Correo personal
                                        <input
                                            type="email"
                                            name="correoPersonal"
                                            value={formData.correoPersonal}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.correoPersonal && <p className="text-red-500 text-sm mt-1">{errors.correoPersonal}</p>}
                                    </label>
                                    <label className="block mb-2">
                                        Correo institucional
                                        <input
                                            type="email"
                                            name="correoInstitucional"
                                            value={formData.correoInstitucional}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.correoInstitucional && <p className="text-red-500 text-sm mt-1">{errors.correoInstitucional}</p>}
                                    </label>
                                </div>
                            </div>
                            <p className="text-xl font-semibold mb-6">Información académica</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">
                                        ID Estudiante
                                        <input
                                            type="text"
                                            name="idEstudiante"
                                            value={formData.idEstudiante}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.idEstudiante && <p className="text-red-500 text-sm mt-1">{errors.idEstudiante}</p>}
                                    </label>
                                    <label className="block mb-2">
                                        Año de Ingreso
                                        <input
                                            type="text"
                                            name="añoIngreso"
                                            value={formData.añoIngreso}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.añoIngreso && <p className="text-red-500 text-sm mt-1">{errors.añoIngreso}</p>}
                                    </label>
                                    <label className="block mb-2">
                                        Semestre/Ciclo Actual
                                        <input
                                            type="text"
                                            name="semestreActual"
                                            value={formData.semestreActual}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.semestreActual && <p className="text-red-500 text-sm mt-1">{errors.semestreActual}</p>}
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        Programa de Estudio
                                        <input
                                            type="text"
                                            name="programaEstudio"
                                            value={formData.programaEstudio}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.programaEstudio && <p className="text-red-500 text-sm mt-1">{errors.programaEstudio}</p>}
                                    </label>
                                    <label className="block mb-2">
                                        Cursos Matriculados
                                        <input
                                            type="text"
                                            name="cursosMatriculados"
                                            value={formData.cursosMatriculados}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.cursosMatriculados && <p className="text-red-500 text-sm mt-1">{errors.cursosMatriculados}</p>}
                                    </label>
                                    <div className="relative">
                                        <label className="block mb-2">
                                            Estado Académico
                                            <select
                                                name="estadoAcademico"
                                                value={formData.estadoAcademico}
                                                onChange={(e) => setFormData({ ...formData, estadoAcademico: e.target.value })}
                                                className="w-full p-2 pr-10 border border-gray-300 rounded mt-1"
                                            >
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                                <option value="Graduado">Graduado</option>
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
                                </div>
                            </div>
                            <p className="text-xl font-semibold mb-6">Información de emergencia</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">
                                        Nombre de Contacto
                                        <input
                                            type="text"
                                            name="nombreContactoEmergencia"
                                            value={formData.nombreContactoEmergencia}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.nombreContactoEmergencia && <p className="text-red-500 text-sm mt-1">{errors.nombreContactoEmergencia}</p>}
                                    </label>
                                    <label className="block mb-2">
                                        Teléfono de Contacto
                                        <input
                                            type="text"
                                            name="telefonoContactoEmergencia"
                                            value={formData.telefonoContactoEmergencia}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1"
                                        />
                                        {errors.telefonoContactoEmergencia && <p className="text-red-500 text-sm mt-1">{errors.telefonoContactoEmergencia}</p>}
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <Link href="/gestionusuarios" passHref>
                                    <button
                                        type="button"
                                        className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs hover:bg-action hover:text-primary ${activeButton ? "bg-primary text-white" : "bg-action text-primary"
                                            }`}
                                        onClick={() => setActiveButton(false)}
                                    >
                                        Cancelar
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    className={`py-2 px-4 rounded-md flex-grow max-w-xs hover:bg-action hover:text-primary ${activeButton ? "bg-action text-primary" : "bg-primary text-white"
                                        }`}
                                    onClick={() => setActiveButton(true)}
                                >
                                    Crear estudiante
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Crearcurso;
