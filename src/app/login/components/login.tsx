"use client";

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useUser } from "../../../context/UserContext"; // Importa el contexto del usuario
import { useRouter } from "next/navigation"; // Usa next/navigation en lugar de next/router
import { NextPage } from "next"; // Importa NextPage en lugar de React.FC
import type { StaticImageData } from "next/image";
import Link from "next/link";
import Image from "next/image";
import BannerLoginAlumn from "../../../../assets/login.png"; // Imagen para alumnos
import BannerLoginTeacher from "../../../../assets/teacher 1.png"; // Imagen para docentes
import BannerLoginAdmin from "../../../../assets/container_2.png"; // Imagen para administradores

const Login: NextPage = ({ onLogin }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("alumno");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const { setUser } = useUser(); // Usa el contexto del usuario
    const router = useRouter(); // Usa el hook useRouter
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

    // Función para validar el formato de la contraseña
    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/;
        return passwordRegex.test(password);
    };
    // Función para validar el formato del correo electrónico
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Maneja el envío del formulario
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
            const roleToUrlMap: { [key: string]: string } = {
                alumno: `${process.env.NEXT_PUBLIC_URL_BASE}/api/student/login`,
                docente: `${process.env.NEXT_PUBLIC_URL_BASE}/api/teacher/login`,
                admin: `${process.env.NEXT_PUBLIC_URL_BASE}/api/admin/login`,
            };

            const loginUrl = roleToUrlMap[role];

            try {
                const response = await fetch(loginUrl, {
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
                    const data = await response.json();
                    if (data.ok) {
                        const roleToRouteMap: { [key: string]: string } = {
                            alumno: "/bienvenidos",
                            docente: "/bienvenidos",
                            admin: "/bienvenidos",
                        };
                        const route = roleToRouteMap[role] || "/";
                        router.push(route); // Redirige a bienvenida solo si fue exitoso

                        setUser(data); // Actualiza el contexto del usuario
                        setLoginSuccess(true);
                    } else {
                        setErrors({ email: "Credenciales incorrectas" });
                    }
                } else {
                    console.error("Error al enviar los datos al servidor");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };
    // Mapea los roles a las imágenes correspondientes
    const roleToImageMap: { [key: string]: StaticImageData } = {
        alumno: BannerLoginAlumn,
        docente: BannerLoginTeacher,
        admin: BannerLoginAdmin,
    };

    return (
        <div className="flex h-screen">
            <div className="card w-1/2 flex items-center justify-center">
                <form className="flex flex-col gap-3 py-5 w-full" onSubmit={handleSubmit}>
                    <p className="text-primary font-bold text-3xl mb-10 text-center font-barlow">Iniciar sesión</p>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex flex-col w-2/4 items-center">
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-40 border-2 border-primary rounded bg-action text-primary py-1 px-2 text-xs mb-1 font-medium font-sans text-center"
                            >
                                <option value="alumno">Alumno</option>
                                <option value="docente">Docente</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
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
                            {loginSuccess && (
                                <p className="text-primary text-xs mb-5 font-medium font-sans text-justify w-1/2 mx-auto">Inicio de sesión exitoso</p>
                            )}
                            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                            <p className="text-xs text-right mt-2 hover:underline">
                                <Link href="/olvidarcontrasena">¿Olvidó contraseña?</Link>
                            </p>
                        </div>
                        <Button
                            label="Confirmar"
                            className="w-40 mt-10 bg-primary text-grey rounded m-4 py-2 px-4 text-center font-sans hover:bg-secundary"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
            <div className="w-1/2">
                <Image className="w-full h-full object-cover" src={roleToImageMap[role]} alt="img-login" quality={100} priority />
            </div>
        </div>
    );
};

export default Login;
