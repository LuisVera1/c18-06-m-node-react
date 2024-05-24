'use client'
// Importa las funciones necesarias de React y los componentes y hooks del contexto de usuario
import React, { useEffect } from "react";
import Sidebar from "./components/sidebar/sidebar";
import { UserProvider, useUser } from "../context/UserContext";

// Define el componente RootLayout que envuelve la aplicación con el UserProvider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Envuelve la aplicación con el UserProvider para proporcionar el contexto de usuario
    <UserProvider>
      {/* Renderiza la aplicación como un hijo del UserProvider */}
      <App>{children}</App>
    </UserProvider>
  );
}

// Define el componente App que contiene la estructura principal de la aplicación
function App({ children }: { children: React.ReactNode }) {
  // Obtiene la función setUser del contexto de usuario utilizando el hook useUser
  const { setUser } = useUser();

  // Efecto que se ejecuta cuando el componente se monta para cargar el usuario desde el localStorage
  useEffect(() => {
    // Comprueba si hay un usuario almacenado en el localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Si hay un usuario almacenado, establece el usuario en el contexto de usuario
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]); // Dependencia del efecto: la función setUser

  // Renderiza la estructura principal de la aplicación
  return (
    <html lang="en">
      <body>
        <section className="flex-1">
          {/* Renderiza la barra lateral */}
          <Sidebar />
        </section>
        {/* Renderiza el contenido principal de la aplicación */}
        <main>{children}</main>
      </body>
    </html>
  );
}
