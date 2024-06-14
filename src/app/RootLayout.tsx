"use client";
// Importa las funciones necesarias de React y los componentes y hooks del contexto de usuario
import React from "react";
import { UserProvider } from "../context/UserContext";

// Define el componente RootLayout que envuelve la aplicación con el UserProvider
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <html lang="en">
                <body className="flex flex-col">
                    <main>{children}</main>
                </body>
            </html>
        </UserProvider>
    );
}
