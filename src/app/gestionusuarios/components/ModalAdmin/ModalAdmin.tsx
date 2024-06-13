"use client";

import { NextPage } from "next";
import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import OkImage from "./../../../../../assets/Check Mark.png";
import Link from "next/link";

interface FormData {
    nombreCompleto: string;
    numeroTelefono: string;
    idEmpleado: string;
    correoInstitucional: string;
    tituloAcademico: string;
    areaEspecializacion: string;
    cursosAsignados: string;
    nombreContactoEmergencia: string;
    telefonoContactoEmergencia: string;
    deptoFacultad: string;
    experienciaProfesional: string;
    rolPermisos: string;
}
// interface CrearEstudianteProps {
//     // addStudent: (student: FormData) => void;
// }

const CrearAdmin: NextPage<{ onHide: () => void; addAdmin: (user: any) => void }> = ({ onHide, addAdmin }) => {
    const [activeButton, setActiveButton] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nombreCompleto: "",
        numeroTelefono: "",
        idEmpleado: "",
        correoInstitucional: "",
        tituloAcademico: "",
        areaEspecializacion: "",
        cursosAsignados: "",
        nombreContactoEmergencia: "",
        telefonoContactoEmergencia: "",
        deptoFacultad: "",
        experienciaProfesional: "",
        rolPermisos: "",
    });
    const [studentData, setStudentData] = useState<FormData[]>([]);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validación de los campos
    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        const numeroRegex = /^[0-9]+$/; // Regex para verificar números

        if (!formData.nombreCompleto) newErrors.nombreCompleto = "Nombre completo es requerido";
        if (!formData.numeroTelefono) {
            newErrors.numeroTelefono = "Número de Teléfono es requerido";
        } else if (!numeroRegex.test(formData.numeroTelefono)) {
            newErrors.numeroTelefono = "Número de Teléfono solo debe contener números";
        }
        // if (!formData.idEmpleado) {
        //     newErrors.idEmpleado = "ID Empleado es requerido";
        // } else if (!numeroRegex.test(formData.idEmpleado)) {
        //     newErrors.idEmpleado = "ID Empleadosolo debe contener números";
        // }
        // if (!formData.deptoFacultad) newErrors.deptoFacultad = "Depto/facultad es requerido";
        if (!formData.correoInstitucional) newErrors.correoInstitucional = "Correo institucional es requerido";
        // if (!formData.rolPermisos) newErrors.rolPermisos = "Rol/permisos es requerido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setStudentData([...studentData, formData]);
            setFormData({
                // Limpia el formulario
                nombreCompleto: "",
                numeroTelefono: "",
                idEmpleado: "",
                correoInstitucional: "",
                tituloAcademico: "",
                areaEspecializacion: "",
                cursosAsignados: "",
                nombreContactoEmergencia: "",
                telefonoContactoEmergencia: "",
                deptoFacultad: "",
                experienciaProfesional: "",
                rolPermisos: "",
            });
            const sendData = async () => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/create/admin`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.nombreCompleto,
                        email: formData.correoInstitucional,
                    }),
                });
                const data = await response.json();
                onHide();
                addAdmin(data.data);
                // showSuccessModal();

                //is response = ok, hide
                if (data.ok) onHide();
            };
            sendData();
        }
    };

    return (
        <div className="flex  justify-center items-center">
            <main className="px-6 py-8  rounded-md">
                <header className="px-3 mx-3">
                    <div className="flex justify-between items-center ml-6">
                        <Link href="/gestionusuarios/administrador" passHref>
                            <div className="flex justify-start items-center py-5">
                                <button className="flex justify-start items-center py-5" onClick={onHide}>
                                    <AiOutlineLeft className="mr-4 text-primary font-black" />
                                    <h1 className="text-2xl text-primary font-bold">Información del administrador</h1>
                                </button>
                            </div>
                        </Link>
                    </div>
                </header>
                <div className="w-100 m-4 bg-white rounded py-4">
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
                                <label className="mr-4 w-1/3">ID empleado</label>
                                <input
                                    type="text"
                                    name="idEmpleado"
                                    value={formData.idEmpleado}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.idEmpleado && <p className="text-red-500 text-sm ml-4">{errors.idEmpleado}</p>}
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
                        </div>

                        <p className="text-xl font-semibold my-10">Información del rol</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center mb-2">
                                    <label className="w-1/3 mr-4">Rol/Permisos</label>
                                    <div className="w-full relative">
                                        <select
                                            name="rolPermisos"
                                            value={formData.rolPermisos}
                                            onChange={(e) => setFormData({ ...formData, rolPermisos: e.target.value })}
                                            className="w-full p-2 pr-10 border border-dark rounded-xl"
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
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center mb-2">
                                    <label className="w-1/3 mr-4">Depto/Facultad</label>
                                    <div className="w-full relative">
                                        <select
                                            name="deptoFacultad"
                                            value={formData.deptoFacultad}
                                            onChange={(e) => setFormData({ ...formData, deptoFacultad: e.target.value })}
                                            className="w-full p-2 pr-10 border border-dark rounded-xl"
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={onHide}
                                type="button"
                                className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs hover:bg-action hover:text-primary ${
                                    activeButton ? "bg-primary text-white" : "bg-action text-primary"
                                }`}
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
                                Crear administrador
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Dialog visible={showModal} onHide={() => setShowModal(false)} modal>
                <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-primary text-xl font-bold">Administrador creado exitosamente</p>
                    <Image className="w-40 h-full object-cover" src={OkImage} alt="img-login" quality={100} priority />
                </div>
            </Dialog>
        </div>
    );
};

export default CrearAdmin;
