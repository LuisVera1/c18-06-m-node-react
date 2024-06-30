"use client";

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { NextPage } from "next";
// import { UserProvider } from "./../../context/UserContext";
import Link from "next/link";
import Image from "next/image";
import BannerCambio from "./../../../assets/container_2.png";
import "primereact/resources/themes/saga-blue/theme.css"; // Importar tema PrimeReact
import "primereact/resources/primereact.min.css"; // Importar estilos PrimeReact

const ForgetPassContent: NextPage = () => {
    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState<{ email?: string }>({});
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const [role, setRole] = useState<string>("Student");
    // const { user } = useUser(); // Usa el contexto del usuario (solo lectura)

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string } = {};

        if (!email) {
            newErrors.email = "El e-mail es obligatorio";
        } else if (!validateEmail(email)) {
            newErrors.email = "El e-mail no es válido";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const roleToUrlMap: { [key: string]: string } = {
                alumno: `${process.env.NEXT_PUBLIC_URL_BASE}/api/resetpassword`,
                docente: `${process.env.NEXT_PUBLIC_URL_BASE}/api/resetpassword`,
                admin: `${process.env.NEXT_PUBLIC_URL_BASE}/api/resetpassword`,
            };

            const loginUrl = roleToUrlMap[role];
            const URL = `${process.env.NEXT_PUBLIC_URL_BASE}/api/resetpassword`;

            try {
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        role,
                        email,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.ok) {
                        // Puedes leer `user` aquí si es necesario, pero no modificarlo
                        setEmailSent(true); // Cambia el estado para mostrar la vista de "Correo enviado"
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

    return (
        <div className="flex flex-col lg:flex-row md:flex-row h-screen">
            {!emailSent ? (
                <div className="card lg:w-1/2 md:w-1/2 flex items-center justify-center">
                    <form className="flex flex-col gap-3 py-5 w-full" onSubmit={handleSubmit}>
                        <p className="text-primary font-bold text-3xl mb-5 text-center font-barlow">Olvidé mi contraseña</p>
                        <div className="w-1/2 mx-auto">
                            <p className="text-primary text-justify text-xs mb-4 font-normal font-sans text-">
                                Para poder restablecer tu contraseña, necesitamos que por favor ingreses tu e-mail y elijas el rol. Enviaremos un correo donde
                                habrá una serie de pasos a seguir.
                            </p>
                            <div className="flex flex-col items-center gap-2 w-full">
                                <div className="flex flex-col w-2/4 items-center mt-4">
                                    <label htmlFor="role" className="text-dark text-left font-barlow"></label>
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-24 border border-primary rounded-full bg-white text-primary py-1 text-xs mb-1 font-medium font-sans text-center"
                                    >
                                        <option value="Student">Alumno</option>
                                        <option value="Teacher">Docente</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
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
                            <Button
                                label="Confirmar"
                                className="w-40 mt-10 bg-primary text-grey rounded m-4 py-2 px-4 text-center font-sans text-sm hover:bg-secundary"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <div className="card w-1/2 flex items-center justify-center">
                    <div className="flex flex-col gap-3 py-5 w-full">
                        <p className="text-primary font-bold text-3xl mb-5 text-center font-barlow">Correo enviado</p>
                        <div className="w-1/2 mx-auto">
                            <p className="text-primary text-justify text-xs mb-4 font-medium font-sans">
                                Hemos enviado un e-mail a su casilla de correo. Por favor revisa la bandeja de entrada así como también la sección de spam.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 w-full">
                            {/* <Link href="/login" passHref>
                                <Button
                                    label="Iniciar sesión"
                                    icon="pi pi-user"
                                    className="w-40 mt-10 bg-primary text-grey rounded m-4 py-2 px-4 text-center font-sans hover:bg-secundary"
                                />
                            </Link> */}
                        </div>
                    </div>
                </div>
            )}
            <div className="w-1/2 lg:w-1/2 hidden sm:block">
                <Image className="w-full h-full object-cover" src={BannerCambio} alt="img-login" quality={100} priority />
            </div>
        </div>
    );
};

const ForgetPass: NextPage = () => (
    // <UserProvider>
    <ForgetPassContent />
    // </UserProvider>
);

export default ForgetPass;
