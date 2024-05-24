"use client";

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useUser } from "../../../context/UserContext"; // Importa el contexto del usuario
import { useRouter } from 'next/navigation'; // Usa next/navigation en lugar de next/router
import { NextPage } from "next"; // Importa NextPage en lugar de React.FC
import Image from 'next/image';
import BannerLogin from "../../../../assets/container_2.png";

const Login: NextPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const { setUser } = useUser(); // Usa el contexto del usuario
    const router = useRouter(); // Usa el hook useRouter

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/;
        return passwordRegex.test(password);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = "El e-mail es obligatorio";
        } else if (!validateEmail(email)) {
            newErrors.email = "El e-mail no es válido";
        }

        if (!password) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (!validatePassword(password)) {
            newErrors.password = "La contraseña debe tener entre 6 y 8 caracteres, al menos una mayúscula y un número";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Formulario válido, enviando datos...");
            // Envío de datos al backend
            try {
                const response = await fetch("http://localhost:3000/api/student/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                if (response.ok) {
                    const user = await response.json();
                    setUser(user); // Actualiza el contexto del usuario
                    console.log("Datos enviados correctamente");
                    router.push("/inicio"); // Redirige al inicio solo si fue exitoso
                } else {
                    console.error("Error al enviar los datos al servidor");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <div className="flex h-screen">
            <div className="card w-1/2 flex items-center justify-center">
                <form className="flex flex-col gap-3 py-5 w-full" onSubmit={handleSubmit}>
                    <p className="text-primary font-bold text-3xl mb-10 text-center font-barlow">Bienvenid@</p>

                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex flex-col w-2/4">
                            <label htmlFor="mail" className="text-dark text-left font-barlow">
                                E-mail
                            </label>
                            <InputText
                                id="mail"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-2 h-8 border-grey rounded text-dark p-2 text-xs mb-1 font-sans"
                                placeholder="Ingresa tu e-mail"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex flex-col w-2/4">
                            <label htmlFor="password" className="text-dark text-left font-barlow">
                                Contraseña
                            </label>
                            <InputText
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-2 h-8 border-grey rounded text-dark p-2 text-xs mb-1 font-sans"
                                placeholder="Ingresa tu contraseña"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                        </div>
                        <Button
                            label="Siguiente"
                            icon="pi pi-user"
                            className="w-40 mt-10 bg-primary text-grey rounded m-4 py-2 px-4 text-center font-sans"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
            <div className="w-1/2">
                <Image
                    className="w-full h-full object-cover"
                    src={BannerLogin}
                    alt="img-login"
                    objectFit="cover"
                    quality={100}
                />
            </div>
        </div>
    );
};

export default Login;
