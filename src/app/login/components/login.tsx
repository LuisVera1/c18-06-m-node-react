"use client";

import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import Image from "next/image";
import BannerLoginAlumn from "../../../../assets/login.png";
import BannerLoginTeacher from "../../../../assets/teacher 1.png";
import BannerLoginAdmin from "../../../../assets/container_2.png";
import Logo from "../../../../public/logonova.png";
import { redirect } from "next/navigation";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const Login: NextPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("alumno");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const router = useRouter();
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/;
        return passwordRegex.test(password);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        const loginSuccessFromStorage = localStorage.getItem("loginSuccess");
        if (loginSuccessFromStorage === "true") {
            setLoginSuccess(false);
        }
    }, []);

    const [redirectLogin, setRedirectLogin] = useState(false);
    if (redirectLogin) {
        redirect("/");
    }

    useEffect(() => {
        const verifyLogin = () => {
            const login = localStorage.getItem("loginSuccess");
            if (login) setRedirectLogin(true);
        };
        verifyLogin();
    }, []);

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
                        router.push(route);
                        setLoginSuccess(true);
                        localStorage.setItem("loginSuccess", "true");
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

    const roleToImageMap: { [key: string]: StaticImageData } = {
        alumno: BannerLoginAlumn,
        docente: BannerLoginTeacher,
        admin: BannerLoginAdmin,
    };

    return (
        <div className="flex flex-col lg:flex-row md:flex-row h-screen ">
            <div className="card lg:w-1/2 md:w-1/2 flex items-center justify-center">
                <form className="flex flex-col gap-3 py-5 w-full" onSubmit={handleSubmit}>
                    <div className="flex justify-center ">
                        <Image className="w-56 mb-8" src={Logo} alt="logo" />
                    </div>
                    <p className="text-primary font-bold text-3xl mb-6 text-center font-barlow mt-20">Iniciar sesión</p>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex flex-col w-2/4 items-center">
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-24 border border-primary rounded-full bg-white text-primary py-1 text-xs mb-1 font-medium font-sans text-center"
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
                                <p className="text-primary text-xs mb-5 font-normal font-sans text-center w-1/2 mx-auto">Inicio de sesión exitoso</p>
                            )}
                            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                            <p className="text-secundary text-xs text-right mt-2 hover:underline font-sans">
                                <Link href="/olvidarcontrasena">¿Olvidaste contraseña?</Link>
                            </p>
                        </div>
                        <Button
                            label="Confirmar"
                            className="w-40 mt-10 bg-primary text-grey rounded m-4 py-2 px-4 text-center text-sm font-sans hover:bg-secundary"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
            <div className="w-1/2 lg:w-1/2 hidden sm:block">
                <Image className="w-full h-full object-cover" src={roleToImageMap[role]} alt="img-login" quality={100} priority />
            </div>
        </div>
    );
};

export default Login;
