"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import OkImage from "./../../../../../assets/Check Mark.png";

interface FormData {
    title: string;
    spaces: string;
    careerID: string;
    schedule: {
        day: string;
        startH: string;
        endH: string;
    }[];
    code: string;
    teacherID: string;
    description: string;
}

const CrearCurso: NextPage<{ onHide: () => void; addCourse: (course: any) => void }> = ({ onHide, addCourse }) => {
    const [activeButton, setActiveButton] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [formData, setFormData] = useState<FormData>({
        title: "",
        spaces: "",
        careerID: "",
        schedule: [
            {
                day: "",
                startH: "",
                endH: "",
            },
        ],
        code: "",
        teacherID: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (value.trim() !== "") {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete (newErrors as any)[name];
                return newErrors;
            });
        }
    };

    const handleScheduleChange = (index: number, key: string, value: string) => {
        const newSchedule = formData.schedule.map((slot, i) => {
            if (i === index) {
                return { ...slot, [key]: value };
            }
            return slot;
        });
        setFormData({ ...formData, schedule: newSchedule });
    };

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.title) newErrors.title = "Nombre del curso es requerido";
        if (!formData.careerID) newErrors.careerID = "Carrera/plan es requerido";
        if (!formData.code) newErrors.code = "Código de curso es requerido";
        if (!formData.description) newErrors.description = "Descripción es requerida";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showSuccessModal = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                const { title, spaces, careerID, schedule, code, teacherID, description } = formData;

                const requestData = {
                    title: title,
                    spaces: spaces,
                    careerID: careerID,
                    schedule: schedule,
                    code: code,
                    teacherID: teacherID,
                    description: description,
                };

                const response = await fetch("api/admin/create/class", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });
                if (!response.ok) {
                    const data = await response.json();
                    console.log(data);

                    addCourse(formData);
                    setFormData({
                        title: "",
                        spaces: "",
                        careerID: "",
                        schedule: [
                            {
                                day: "",
                                startH: "",
                                endH: "",
                            },
                        ],
                        code: "",
                        teacherID: "",
                        description: "",
                    });
                    onHide();
                    showSuccessModal();
                } else {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error creating course:", error);
            }
        }
    };

    return (
        <div className="flex justify-center items-center">
            <main>
                <header className="px-3 mx-3">
                    <div className="flex justify-between items-center ml-2">
                        <button className="flex justify-start items-center py-5" onClick={onHide}>
                            <AiOutlineLeft className="mr-4 text-primary font-black" />
                            <h1 className="text-2xl text-primary font-bold">Información del curso</h1>
                        </button>
                    </div>
                </header>
                <div className="w-100 m-4 rounded py-4">
                    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-3 rounded-lg">
                        <p className="text-xl font-semibold mb-10">Diligencia los siguientes campos</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <label className="w-1/3">Nombre del curso</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                            </div>
                            {errors.title && <p className="text-red-500 text-sm ml-4">{errors.title}</p>}

                            <div className="flex items-center">
                                <label className="w-1/3">Código del curso</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                            </div>
                            {errors.code && <p className="text-red-500 text-sm ml-4">{errors.code}</p>}

                            <div className="flex items-center">
                                <label className="w-1/3">Carrera/plan</label>
                                <input
                                    type="text"
                                    name="careerID"
                                    value={formData.careerID}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl"
                                />
                            </div>
                            {errors.careerID && <p className="text-red-500 text-sm ml-4">{errors.careerID}</p>}

                            <div className="flex items-center">
                                <label className="w-1/3">Asignacion Docente</label>
                                <select
                                    name="teacherID"
                                    value={formData.teacherID}
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
                                    name="spaces"
                                    value={formData.spaces}
                                    onChange={handleChange}
                                    className="flex-1 p-2 border border-dark rounded-xl "
                                />
                            </div>
                            {errors.spaces && <p className="text-red-500 text-sm ml-4">{errors.spaces}</p>}

                            <div className="flex flex-col w-3/4 ml-4">
                                <div className="mb-2">
                                    <label className="block">Horario</label>
                                    <p className="text-xs">Seleccionar día y hora</p>
                                </div>
                                {formData.schedule.map((slot, index) => (
                                    <div key={index} className="flex flex-col mb-4">
                                        <div className="flex space-x-2 mb-2">
                                            {["LU", "MA", "MI", "JU", "VI", "SA"].map((day) => (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    className={`px-2 py-1 rounded-lg hover:bg-action border border-solid border-primary ${slot.day === day ? "bg-primary text-white" : "text-primary bg-transparent"
                                                        }`}
                                                    onClick={() => handleScheduleChange(index, "day", day)}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <select
                                                className="p-2 border border-dark rounded-xl"
                                                value={slot.startH}
                                                onChange={(e) => handleScheduleChange(index, "startH", e.target.value)}
                                            >
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
                                            <select
                                                className="p-2 border border-dark rounded-xl"
                                                value={slot.endH}
                                                onChange={(e) => handleScheduleChange(index, "endH", e.target.value)}
                                            >
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
                                ))}
                            </div>

                            <div className="flex flex-col">
                                <label>Descripción</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="p-2 border border-dark rounded-xl resize-none"
                                />
                            </div>
                            {errors.description && <p className="text-red-500 text-sm ml-4">{errors.description}</p>}
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={onHide}
                                type="button"
                                className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs hover:bg-action hover:text-primary ${activeButton ? "bg-primary text-white" : "bg-action text-primary"
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