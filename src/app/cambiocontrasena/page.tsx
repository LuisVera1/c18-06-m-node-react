"use client";

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BannerCambio from "./../../../assets/container_2.png";

function cambiocontrasena() {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState<{ password?: string; passwordConfirm?: string }>({});

    const router = useRouter();

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/;
        return passwordRegex.test(password);
    };

    const validatePasswordConfirm = (passwordConfirm: string): boolean => {
        return passwordConfirm === password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { password?: string; passwordConfirm?: string } = {};

        if (!password) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (!validatePassword(password)) {
            newErrors.password = "La contraseña debe tener entre 6 y 8 caracteres, al menos una mayúscula y un número";
        }

        if (!passwordConfirm) {
            newErrors.passwordConfirm = "Confirmar la contraseña es obligatorio";
        } else if (!validatePasswordConfirm(passwordConfirm)) {
            newErrors.passwordConfirm = "Las contraseñas no coinciden";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const loginUrl = "/api/cambiar-contrasena"; // falta la ruta del servidor acá

            try {
                const response = await fetch(loginUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        password,
                        passwordConfirm,
                    }),
                });
                if (response.ok) {
                    setSuccessMessage("¡Contraseña cambiada con éxito!");
                    setPassword("");
                    setPasswordConfirm("");
                    setErrors({});
                    router.push("/inicio");
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
                    <p className="text-primary font-bold text-3xl mb-10 text-center font-barlow">Cambio de contraseña</p>

                    <p className="text-primary py-1 px-2 text-xs mb-1 font-medium font-sans text-center">
                        Tu contraseña debe tener entre 6 y 8 caracteres, al menos una mayúscula y un número
                    </p>

                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex flex-col w-2/4">
                            <label htmlFor="mail" className="text-dark text-left font-barlow">
                                Contraseña Nueva
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
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex flex-col w-2/4">
                            <label htmlFor="password" className="text-dark text-left font-barlow">
                                Confirmar Contraseña
                            </label>
                            <InputText
                                id="newpassword"
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                className="w-full border-2 h-8 border-grey rounded text-dark p-2 text-xs mb-1 font-sans"
                                placeholder="Ingresa tu contraseña"
                            />
                            {errors.passwordConfirm && <p className="text-red-500 text-xs">{errors.passwordConfirm}</p>}
                        </div>
                        {successMessage && <p className="text-primary font-bold">{successMessage}</p>}
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
                <Image className="w-full h-full object-cover" src={BannerCambio} alt="img-login" quality={100} priority />
            </div>
        </div>
    );
}

export default cambiocontrasena;
