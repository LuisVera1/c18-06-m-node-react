"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

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
        const newErrors: { username?: string; password?: string } = {};

        if (!username) {
            newErrors.username = "El e-mail es obligatorio";
        } else if (!validateEmail(username)) {
            newErrors.username = "El e-mail no es válido";
        }

        if (!password) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (!validatePassword(password)) {
            newErrors.password = "La contraseña debe tener entre 6 y 8 caracteres, al menos una mayúscula y un número";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Formulario válido, enviando datos...");
            //envio de datos al backend
            try {
                const response = await fetch("http://localhost:3000/api/student/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });

                if (response.ok) {
                    console.log("Datos enviados correctamente");
                    // enviar al inicio solo si fue exitoso. O usar import { useRouter } from 'next/router';?
                    window.location.href = "/inicio";
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
                            <label htmlFor="username" className="text-dark text-left font-barlow">
                                E-mail
                            </label>
                            <InputText
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border-2 h-8 border-grey rounded text-dark p-2 text-xs mb-1 font-sans"
                                placeholder="Ingresa tu e-mail"
                            />
                            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
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
                <img className="w-full h-full object-cover" src="https://amskul.com/home/img/call-to-action.jpg" alt="img-login" />
            </div>
        </div>
    );
};

export default Login;
