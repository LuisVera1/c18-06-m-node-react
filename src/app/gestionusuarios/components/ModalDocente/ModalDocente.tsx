"use client";

import { NextPage } from "next";
import React, { useState } from "react";
import ImageDemo from "@/app/components/avatar/avatar";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";

interface FormData {
    nombreCompleto: string;
    fechaNacimiento: string;
    numeroTelefono: string;
    numeroIdentificacion: string;
    direccion: string;
    correoInstitucional: string;
    tituloAcademico: string;
    areaEspecializacion: string;
    cursosAsignados: string;
    nombreContactoEmergencia: string;
    telefonoContactoEmergencia: string;
    deptoFacultad: string;
    experienciaProfesional: string;
}
// interface CrearEstudianteProps {
//     // addStudent: (student: FormData) => void;
// }

const CrearDocente: NextPage = () => {
    const [activeButton, setActiveButton] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nombreCompleto: "",
        fechaNacimiento: "",
        numeroTelefono: "",
        numeroIdentificacion: "",
        direccion: "",
        correoInstitucional: "",
        tituloAcademico: "",
        areaEspecializacion: "",
        cursosAsignados: "",
        nombreContactoEmergencia: "",
        telefonoContactoEmergencia: "",
        deptoFacultad: "",
        experienciaProfesional: "",
    });
    const [studentData, setStudentData] = useState<FormData[]>([]);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validación de los campos
    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        const numeroRegex = /^[0-9]+$/; // Regex para verificar números

        if (!formData.nombreCompleto) newErrors.nombreCompleto = "Nombre completo es requerido";
        if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "Fecha de Nacimiento es requerida";
        if (!formData.numeroTelefono) {
            newErrors.numeroTelefono = "Número de Teléfono es requerido";
        } else if (!numeroRegex.test(formData.numeroTelefono)) {
            newErrors.numeroTelefono = "Número de Teléfono solo debe contener números";
        }
        if (!formData.numeroIdentificacion) {
            newErrors.numeroIdentificacion = "No. de Identificación es requerido";
        } else if (!numeroRegex.test(formData.numeroIdentificacion)) {
            newErrors.numeroIdentificacion = "No. de Identificación solo debe contener números";
        }
        if (!formData.direccion) newErrors.direccion = "La dirección es requerida";
        if (!formData.correoInstitucional) newErrors.correoInstitucional = "Correo institucional es requerido";
        if (!formData.tituloAcademico) newErrors.tituloAcademico = "Título academico es requerido";
        if (!formData.areaEspecializacion) {
            newErrors.areaEspecializacion = "Area de especializacion es requerido";
        } else if (!numeroRegex.test(formData.areaEspecializacion)) {
            newErrors.areaEspecializacion = "Area de especializacion solo debe contener letras";
        }
        if (!formData.cursosAsignados) newErrors.cursosAsignados = "Cursos asignados es requerido";
        if (!formData.nombreContactoEmergencia) newErrors.nombreContactoEmergencia = "Nombre de Contacto es requerido";
        if (!formData.telefonoContactoEmergencia) {
            newErrors.telefonoContactoEmergencia = "Teléfono de Contacto es requerido";
        } else if (!numeroRegex.test(formData.telefonoContactoEmergencia)) {
            newErrors.telefonoContactoEmergencia = "Teléfono de Contacto solo debe contener números";
        }
        if (!formData.experienciaProfesional) newErrors.experienciaProfesional = "Experiencia profesional es requerida";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            // addStudent(formData); // Llamar a la función para actualizar studentData
            console.log(formData);
            setStudentData([...studentData, formData]);
            setFormData({
                // Limpia el formulario
                nombreCompleto: "",
                fechaNacimiento: "",
                numeroTelefono: "",
                numeroIdentificacion: "",
                direccion: "",
                correoInstitucional: "",
                tituloAcademico: "",
                areaEspecializacion: "",
                cursosAsignados: "",
                nombreContactoEmergencia: "",
                telefonoContactoEmergencia: "",
                deptoFacultad: "",
                experienciaProfesional: "",
            });
        }
    };

    return (
        <div className="flex min-h-screen">
            <main className="flex-1 bg-gray-200">
                <header className=" px-3 mx-3">
                    <div className="flex justify-between items-center ml-6">
                        <Link href="/gestionusuarios" passHref>
                            <div className="flex justify-start items-center">
                                <AiOutlineLeft className="mr-4 text-primary font-black" />
                                <h1 className="text-2xl text-primary font-bold">Información del docente</h1>
                            </div>
                        </Link>
                        <ImageDemo />
                    </div>
                </header>
                <div className="w-100 m-4 bg-white rounded py-4  shadow-md">
                    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-3 bg-white rounded-lg">
                        <p className="text-xl font-semibold mb-10">Información básica</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center mb-2">
                                <label className="mr-4 w-1/3">Nombre completo</label>
                                <input
                                    type="text"
                                    name="nombreCompleto"
                                    value={formData.nombreCompleto}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.nombreCompleto && <p className="text-red-500 text-sm ml-4">{errors.nombreCompleto}</p>}
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="mr-4 w-1/3">No. de Identificación</label>
                                <input
                                    type="text"
                                    name="numeroIdentificacion"
                                    value={formData.numeroIdentificacion}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.numeroIdentificacion && <p className="text-red-500 text-sm ml-4">{errors.numeroIdentificacion}</p>}
                            </div>

                            <div className="flex items-center mb-2">
                                <label className="mr-4 w-1/3">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    value={formData.fechaNacimiento}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.fechaNacimiento && <p className="text-red-500 text-sm ml-4">{errors.fechaNacimiento}</p>}
                            </div>

                            <div className="flex items-center mb-2">
                                <label className="mr-4 w-1/3">Correo institucional</label>
                                <input
                                    type="email"
                                    name="correoInstitucional"
                                    value={formData.correoInstitucional}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.correoInstitucional && <p className="text-red-500 text-sm ml-4">{errors.correoInstitucional}</p>}
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="mr-4 w-1/3">Número de Teléfono</label>
                                <input
                                    type="tel"
                                    name="numeroTelefono"
                                    value={formData.numeroTelefono}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.numeroTelefono && <p className="text-red-500 text-sm ml-4">{errors.numeroTelefono}</p>}
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="mr-4 w-1/3">Direccion</label>
                                <input
                                    type="text"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.direccion && <p className="text-red-500 text-sm ml-4">{errors.direccion}</p>}
                            </div>
                        </div>

                        <p className="text-xl font-semibold my-10">Información profesional</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center mb-2">
                                    <label className="mr-4 w-1/3">Titulo académico</label>
                                    <input
                                        type="text"
                                        name="tituloAcademico"
                                        value={formData.tituloAcademico}
                                        onChange={handleChange}
                                        className="flex-1 p-2 border border-dark rounded-xl"
                                    />
                                    {errors.tituloAcademico && <p className="text-red-500 text-sm ml-4">{errors.tituloAcademico}</p>}
                                </div>

                                <div className="flex items-center mb-2">
                                    <label className="mr-4 w-1/3">Área de Especialización</label>
                                    <input
                                        type="text"
                                        name="areaEspecializacion"
                                        value={formData.areaEspecializacion}
                                        onChange={handleChange}
                                        className="flex-1 p-2 border border-dark rounded-xl"
                                    />
                                    {errors.areaEspecializacion && <p className="text-red-500 text-sm ml-4">{errors.areaEspecializacion}</p>}
                                </div>

                                <div className="flex items-center mb-2">
                                    <label className="mr-4 w-1/3">Cursos asignados</label>
                                    <input
                                        type="text"
                                        name="cursosAsignados"
                                        value={formData.cursosAsignados}
                                        onChange={handleChange}
                                        className="flex-1 p-2 border border-dark rounded-xl"
                                    />
                                    {errors.cursosAsignados && <p className="text-red-500 text-sm ml-4">{errors.cursosAsignados}</p>}
                                </div>
                                <div className="flex items-center mb-2">
                                    <label className="mr-4 w-1/3">Depto/Facultad</label>
                                    <select
                                        name="deptoFacultad"
                                        value={formData.deptoFacultad}
                                        onChange={(e) => setFormData({ ...formData, deptoFacultad: e.target.value })}
                                        className="flex-1 p-2 border border-dark rounded-xl"
                                    >
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2">
                                    Experiencia profesional
                                    <textarea
                                        name="experienciaProfesional"
                                        value={formData.experienciaProfesional}
                                        className="w-full mt-2 h-48 p-2 border border-dark rounded-xl"
                                    />
                                    {errors.experienciaProfesional && <p className="text-red-500 text-sm mt-1">{errors.experienciaProfesional}</p>}
                                </label>
                            </div>
                        </div>

                        <p className="text-xl font-semibold my-10">Información de emergencia</p>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-10">
                            <div className="flex items-center mb-2">
                                <label className="mr-2 w-1/3">Nombre de Contacto</label>
                                <input
                                    type="text"
                                    name="nombreContactoEmergencia"
                                    value={formData.nombreContactoEmergencia}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.nombreContactoEmergencia && <p className="text-red-500 text-sm ml-4">{errors.nombreContactoEmergencia}</p>}
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="mr-2 w-1/3">Teléfono de Contacto</label>
                                <input
                                    type="tel"
                                    name="telefonoContactoEmergencia"
                                    value={formData.telefonoContactoEmergencia}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.telefonoContactoEmergencia && <p className="text-red-500 text-sm ml-4">{errors.telefonoContactoEmergencia}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs hover:bg-action hover:text-primary ${
                                    activeButton ? "bg-primary text-white" : "bg-action text-primary"
                                }`}
                                onClick={() => setActiveButton(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className={`py-2 px-4 rounded-md flex-grow max-w-xs hover:bg-action hover:text-primary ${
                                    activeButton ? "bg-action text-primary" : "bg-primary text-white"
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
    );
};

export default CrearDocente;
