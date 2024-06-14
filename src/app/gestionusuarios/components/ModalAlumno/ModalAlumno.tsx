"use client";

import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import OkImage from "./../../../../../assets/Check Mark.png";
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

const CrearEstudiante: NextPage<{ onHide: () => void; addStudent: (user: any) => void }> = ({ onHide, addStudent }) => {
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
    const [studentData, setStudentData] = useState<FormData[]>([]);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [showModal, setShowModal] = useState(false);

    // Lista de carreras
    const [careers, setCareers] = useState([
        {
            id: "",
            title: "",
        },
    ]);
    useEffect(() => {
        const getCareers = async () => {
            const dataCareers = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/get/careers`);
            const responseCareers = await dataCareers.json();
            if (responseCareers.ok) setCareers(responseCareers.data);
        };
        getCareers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validación de los campos
    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        const numeroRegex = /^[0-9]+$/; // Regex para verificar números

        if (!formData.nombreCompleto) newErrors.nombreCompleto = "Nombre completo es requerido";
        // if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "Fecha de Nacimiento es requerida";
        // if (!formData.numeroTelefono) {
        //     newErrors.numeroTelefono = "Número de Teléfono es requerido";
        // } else if (!numeroRegex.test(formData.numeroTelefono)) {
        //     newErrors.numeroTelefono = "Número de Teléfono solo debe contener números";
        // }
        // if (!formData.numeroIdentificacion) {
        //     newErrors.numeroIdentificacion = "No. de Identificación es requerido";
        // } else if (!numeroRegex.test(formData.numeroIdentificacion)) {
        //     newErrors.numeroIdentificacion = "No. de Identificación solo debe contener números";
        // }
        if (!formData.correoPersonal) newErrors.correoPersonal = "Correo personal es requerido";
        // if (!formData.correoInstitucional) newErrors.correoInstitucional = "Correo institucional es requerido";
        // if (!formData.idEstudiante) newErrors.idEstudiante = "ID Estudiante es requerido";
        // if (!formData.añoIngreso) {
        //     newErrors.añoIngreso = "Año de Ingreso es requerido";
        // } else if (!numeroRegex.test(formData.añoIngreso)) {
        //     newErrors.añoIngreso = "Año de ingreso solo debe contener números";
        // }

        // if (!formData.semestreActual) newErrors.semestreActual = "Semestre/Ciclo Actual es requerido";
        if (!formData.programaEstudio) newErrors.programaEstudio = "Programa de Estudio es requerido";
        // if (!formData.cursosMatriculados) newErrors.cursosMatriculados = "Cursos Matriculados es requerido";
        // if (!formData.estadoAcademico) newErrors.estadoAcademico = "Estado Académico es requerido";
        // if (!formData.nombreContactoEmergencia) newErrors.nombreContactoEmergencia = "Nombre de Contacto es requerido";
        // if (!formData.telefonoContactoEmergencia) {
        //     newErrors.telefonoContactoEmergencia = "Teléfono de Contacto es requerido";
        // } else if (!numeroRegex.test(formData.telefonoContactoEmergencia)) {
        //     newErrors.telefonoContactoEmergencia = "Teléfono de Contacto solo debe contener números";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const showSuccessModal = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setStudentData([...studentData, formData]);
            setFormData({
                // Limpia el formulario
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
            showSuccessModal();
            onHide();

            // Fetch
            const sendData = async () => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/create/student`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.nombreCompleto,
                        email: formData.correoPersonal,
                        career: formData.programaEstudio,
                    }),
                });
                const data = await response.json();
                addStudent(data.data);

                //is response = ok, hide
                // if (data.ok) onHide();
            };
            sendData();
        }
    };

    return (
        <div className="flex  justify-center items-center">
            <main className="px-6 py-8  rounded-md">
                <header className="mb-6 flex justify-between items-center">
                    <Link href="/gestionusuarios" passHref>
                        <button className="flex items-center text-primary font-semibold" onClick={onHide}>
                            <AiOutlineLeft className="mr-5" />
                            <h1 className="text-2xl ml-2 text-primary font-bold">Información del estudiante</h1>
                        </button>
                    </Link>
                </header>

                <div className="m-4 w-full rounded py-4">
                    <form onSubmit={handleSubmit} className="p-3 bg-white rounded-lg">
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
                                <label className="mr-4 w-1/3">Programa de Estudio</label>
                                <select
                                    name="programaEstudio"
                                    value={formData.programaEstudio}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl max-w-72"
                                >
                                    <option value=""></option>
                                    {careers.map((item) => (
                                        <option key={item.id} value={item.id}>{`${item.id} - ${item.title}`}</option>
                                    ))}
                                </select>
                                {errors.programaEstudio && <p className="text-red-500 text-sm mt-1">{errors.programaEstudio}</p>}
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
                                <label className="mr-4 w-1/3">Correo personal</label>
                                <input
                                    type="email"
                                    name="correoPersonal"
                                    value={formData.correoPersonal}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                                {errors.correoPersonal && <p className="text-red-500 text-sm ml-4">{errors.correoPersonal}</p>}
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
                        <div className="flex w-full mt-10">
                            <div className="col1 m-4">
                                <p className="text-xl font-semibold mb-10">Información academica</p>
                                <div className="flex flex-col mb-4 mt-2">
                                    <label className="mb-2">ID Estudiante</label>
                                    <input
                                        type="text"
                                        name="idEstudiante"
                                        value={formData.idEstudiante}
                                        onChange={handleChange}
                                        className="p-2 border border-dark rounded-xl"
                                    />
                                    {errors.idEstudiante && <p className="text-red-500 text-sm mt-1">{errors.idEstudiante}</p>}
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="mb-2">Año de Ingreso</label>
                                    <input
                                        type="text"
                                        name="añoIngreso"
                                        value={formData.añoIngreso}
                                        onChange={handleChange}
                                        className="p-2 border border-dark rounded-xl"
                                    />
                                    {errors.añoIngreso && <p className="text-red-500 text-sm mt-1">{errors.añoIngreso}</p>}
                                </div>
                            </div>
                            <div className="col2 m-4 mt-20">
                                <div className="flex flex-col mb-4">
                                    <label className="mb-2">Cursos Matriculados</label>
                                    <input
                                        type="text"
                                        name="cursosMatriculados"
                                        value={formData.cursosMatriculados}
                                        onChange={handleChange}
                                        className="p-2 border border-dark rounded-xl"
                                    />
                                    {errors.cursosMatriculados && <p className="text-red-500 text-sm mt-1">{errors.cursosMatriculados}</p>}
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="mb-2">Semestre/Ciclo Actual</label>
                                    <input
                                        type="text"
                                        name="semestreActual"
                                        value={formData.semestreActual}
                                        onChange={handleChange}
                                        className="p-2 border border-dark rounded-xl"
                                    />
                                    {errors.semestreActual && <p className="text-red-500 text-sm mt-1">{errors.semestreActual}</p>}
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="mb-2">Estado Académico</label>
                                    <select
                                        name="estadoAcademico"
                                        value={formData.estadoAcademico}
                                        onChange={(e) => setFormData({ ...formData, estadoAcademico: e.target.value })}
                                        className="p-2 border border-dark rounded-xl"
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                        <option value="Graduado">Graduado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="m-4">
                                <div className="mb-10">
                                    <p className="text-xl font-semibold mb-10">Información de emergencia</p>
                                    <div className="flex flex-col mb-4">
                                        <label className="mb-2">Nombre de Contacto</label>
                                        <input
                                            type="text"
                                            name="nombreContactoEmergencia"
                                            value={formData.nombreContactoEmergencia}
                                            onChange={handleChange}
                                            className="p-2 border border-dark rounded-xl"
                                        />
                                        {errors.nombreContactoEmergencia && <p className="text-red-500 text-sm mt-1">{errors.nombreContactoEmergencia}</p>}
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <label className="mb-2">Teléfono de Contacto</label>
                                        <input
                                            type="tel"
                                            name="telefonoContactoEmergencia"
                                            value={formData.telefonoContactoEmergencia}
                                            onChange={handleChange}
                                            className="p-2 border border-dark rounded-xl"
                                        />
                                        {errors.telefonoContactoEmergencia && <p className="text-red-500 text-sm mt-1">{errors.telefonoContactoEmergencia}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <Link href="/gestionusuarios" passHref>
                                <button
                                    type="button"
                                    className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs hover:bg-action hover:text-primary ${
                                        activeButton ? "bg-primary text-white" : "bg-action text-primary"
                                    }`}
                                    onClick={onHide}
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
                                Crear estudiante
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Dialog visible={showModal} onHide={() => setShowModal(false)} modal>
                <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-primary text-xl font-bold">Alumno creado exitosamente</p>
                    <Image className="w-40 h-full object-cover" src={OkImage} alt="img-login" quality={100} priority />
                </div>
            </Dialog>
        </div>
    );
};

export default CrearEstudiante;
