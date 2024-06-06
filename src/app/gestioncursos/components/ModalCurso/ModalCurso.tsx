"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Image from "next/image";
import OkImage from "./../../../../../assets/Check Mark.png";

interface FormData {
    curso: string;
    capacidad: string;
    carreraPlan: string;
    horario: string;
    codigoCurso: string;
    asignacionDocente: string;
    descripcion: string;
}

const CrearCurso: NextPage<{ onHide: () => void; addCourse: (course: any) => void }> = ({ onHide, addCourse }) => {
    const [activeButton, setActiveButton] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [formData, setFormData] = useState<FormData>({
        curso: "",
        capacidad: "",
        carreraPlan: "",
        horario: "",
        codigoCurso: "",
        asignacionDocente: "",
        descripcion: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Eliminar el error asociado con el campo cuando se completa
        if (value.trim() !== "") {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete (newErrors as any)[name]; // Aquí realizamos el type assertion a 'any'
                return newErrors;
            });
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.curso) newErrors.curso = "Nombre del curso es requerido";
        else delete newErrors.curso; // Elimina el error si el campo no está vacío

        if (!formData.carreraPlan) newErrors.carreraPlan = "Carrera/plan es requerido";
        else delete newErrors.carreraPlan; // Elimina el error si el campo no está vacío

        if (!formData.codigoCurso) newErrors.codigoCurso = "Código de curso es requerido";
        else delete newErrors.codigoCurso; // Elimina el error si el campo no está vacío

        if (!formData.descripcion) newErrors.descripcion = "Descripción es requerida";
        else delete newErrors.descripcion; // Elimina el error si el campo no está vacío

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showSuccessModal = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000); // El modal se cerrará después de 3 segundos
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            // try {
            //     const { curso, capacidad, carreraPlan, codigoCurso, descripcion } = formData;

            //     const requestData = {
            //        code: codigoCurso,
            //     };

            //     const response = await fetch("http://localhost:3000/api/admin/create/class", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(requestData),
            //     });
            //     if (response.ok) {
            //         const data = await response.json();

            // console.log(data);
            addCourse(formData);
            setFormData({
                curso: "",
                capacidad: "",
                carreraPlan: "",
                horario: "",
                codigoCurso: "",
                asignacionDocente: "",
                descripcion: "",
            });
            onHide();
            showSuccessModal();
            //         } else {
            //             throw new Error("Error al crear el curso");
            //         }
            //     } catch (error) {
            //         console.error(error);
            //         // Manejo de errores
            //     }
            // }
        }
    };

    return (
        <div className="flex min-h-screen">
            <main className="flex-1 bg-gray-200">
                <header className="px-3 mx-3">
                    <div className="flex justify-between items-center ml-2">
                        <div>
                            <button className="flex justify-start items-center py-5" onClick={onHide}>
                                <AiOutlineLeft className="mr-4 text-primary font-black" />
                                <h1 className="text-2xl text-primary font-bold">Información del curso</h1>
                            </button>
                        </div>
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
                                    name="curso"
                                    value={formData.curso}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                            </div>
                            {errors.curso && <p className="text-red-500 text-sm ml-4">{errors.curso}</p>}

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
                                <div className="flex space-x-2 mb-2 ">
                                    {["LU", "MA", "MI", "JU", "VI", "SA"].map((day) => (
                                        <button
                                            key={day}
                                            type="button"
                                            className="px-2 py-1 bg-transparent text-primary rounded-lg hover:bg-action border border-solid border-primary"
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <select className="p-2 border  border-dark rounded-xl">
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

                            <div className="flex flex-col">
                                <label>Descripción</label>
                                <textarea
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    className="p-2 border border-dark rounded-xl resize-none"
                                />
                            </div>
                            {errors.descripcion && <p className="text-red-500 text-sm ml-4">{errors.descripcion}</p>}
                        </div>
                        <div className="flex justify-center mt-6">
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
                                className="py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
                                disabled={Object.keys(errors).length > 0}
                            >
                                Crear curso
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Dialog visible={showModal} onHide={() => setShowModal(false)} modal>
                <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-primary text-xl font-bold">Curso creado exitosamente</p>
                    <Image className="w-40 h-full object-cover" src={OkImage} alt="img-login" quality={100} priority />
                </div>
            </Dialog>
        </div>
    );
};

export default CrearCurso;
