"use client";

import { NextPage } from "next";
import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";

interface FormData {
    nombreCurso: string;
    capacidad: string;
    carreraPlan: string;
    horario: string;
    codigoCurso: string;
    asignacionDocente: string;
    descripcion: string;
}

const CrearDocente: NextPage = () => {
    const [activeButton, setActiveButton] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [studentData, setStudentData] = useState<FormData[]>([]);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [formData, setFormData] = useState<FormData>({
        nombreCurso: "",
        capacidad: "",
        carreraPlan: "",
        horario: "",
        codigoCurso: "",
        asignacionDocente: "",
        descripcion: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        const numeroRegex = /^[0-9]+$/;

        if (!formData.nombreCurso) newErrors.nombreCurso = "Nombre del curso es requerido";
        if (!formData.carreraPlan) {
            newErrors.carreraPlan = "Carrera/plan es requerido";
        } else if (!numeroRegex.test(formData.carreraPlan)) {
            newErrors.carreraPlan = "Carrera/plan solo debe contener letras";
        }
        if (!formData.codigoCurso) newErrors.codigoCurso = "Código de curso es requerido";
        if (!formData.descripcion) newErrors.descripcion = "Descripción es requerida";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            console.log(formData);
            setStudentData([...studentData, formData]);
            setFormData({
                nombreCurso: "",
                capacidad: "",
                carreraPlan: "",
                horario: "",
                codigoCurso: "",
                asignacionDocente: "",
                descripcion: "",
            });
        }
    };

    return (
        <div className="flex min-h-screen">
            <main className="flex-1 bg-gray-200">
                <header className="px-3 mx-3">
                    <div className="flex justify-between items-center ml-2">
                        <Link href="/gestioncursos" passHref>
                            <div className="flex justify-start items-center py-5">
                                <AiOutlineLeft className="mr-4 text-primary font-black" />
                                <h1 className="text-2xl text-primary font-bold">Información del curso</h1>
                            </div>
                        </Link>
                    </div>
                </header>
                <div className="w-100 m-4 bg-white rounded py-4 shadow-md">
                    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-3 bg-white rounded-lg">
                        <p className="text-xl font-semibold mb-10">Diligencia los siguientes campos</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <label className="w-1/3">Nombre del curso</label>
                                <input
                                    type="text"
                                    name="nombreCurso"
                                    value={formData.nombreCurso}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                            </div>
                            {errors.nombreCurso && <p className="text-red-500 text-sm ml-4">{errors.nombreCurso}</p>}

                            <div className="flex items-center">
                                <label className="w-1/3">Código del curso</label>
                                <input
                                    type="text"
                                    name="codigoCurso"
                                    value={formData.codigoCurso}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                            </div>
                            {errors.codigoCurso && <p className="text-red-500 text-sm ml-4">{errors.codigoCurso}</p>}

                            <div className="flex items-center">
                                <label className="w-1/3">Carrera/plan</label>
                                <input
                                    type="text"
                                    name="carreraPlan"
                                    value={formData.carreraPlan}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                            </div>
                            {errors.carreraPlan && <p className="text-red-500 text-sm ml-4">{errors.carreraPlan}</p>}

                            <div className="flex items-center">
                                <label className="w-1/3">Asignacion Docente</label>
                                <select
                                    name="asignacionDocente"
                                    value={formData.asignacionDocente}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                >
                                    <option value=""></option>
                                    <option value="Docente 1">Docente 1</option>
                                    <option value="Docente 2">Docente 2</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <div className="w-1/3">
                                    <label className="block">Capacidad</label>
                                    <p className="text-xs">Máx 250 estudiantes</p>
                                </div>
                                <input
                                    type="tel"
                                    name="capacidad"
                                    value={formData.capacidad}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl "
                                />
                            </div>
                            {errors.capacidad && <p className="text-red-500 text-sm ml-4">{errors.capacidad}</p>}

                            <div className="flex flex-col w-3/4 ml-4">
                                <div className="mb-2">
                                    <label className="block">Horario</label>
                                    <p className="text-xs">Seleccionar día y hora</p>
                                </div>
                                <div className="flex space-x-2 mb-2">
                                    {["lu", "ma", "mi", "ju", "vi", "sa"].map((day) => (
                                        <button key={day} type="button" className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
                                            {day}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <select className="p-2 border border-dark rounded-xl">
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </select>
                                    <span className="text-lg">a</span>
                                    <select className="p-2 border border-dark rounded-xl">
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </select>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-2">
                                    Descripción
                                    <textarea name="descripcion" value={formData.descripcion} className="w-full mt-2 h-48 p-2 border border-dark rounded-xl" />
                                </label>
                                {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs hover:bg-action hover:text-primary ${
                                    activeButton ? "bg-primary text-white" : "bg-action text-primary"
                                }`}
                            >
                                <Link href="/gestioncursos">Cancelar</Link>
                            </button>

                            <button
                                type="submit"
                                className={`py-2 px-4 rounded-md flex-grow max-w-xs hover:bg-action hover:text-primary ${
                                    activeButton ? "bg-action text-primary" : "bg-primary text-white"
                                }`}
                                onClick={() => setActiveButton(true)}
                            >
                                Crear curso
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CrearDocente;
