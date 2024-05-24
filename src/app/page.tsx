import React, { useEffect } from "react";
import Sidebar from "./components/sidebar/sidebar";
import { UserProvider, useUser } from "../context/UserContext"; // Importa el UserProvider y el hook useUser desde tu contexto de usuario

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useUser(); // Obtiene la función setUser del hook useUser

  useEffect(() => {
    // Comprueba si hay un usuario almacenado en localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Establece el usuario almacenado como usuario autenticado
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  return (
    <UserProvider>
      <html lang="en">
        <body>
          <section className="flex-1">
            <Sidebar />
          </section>
          <main>{children}</main>
        </body>
      </html>
    </UserProvider>
  );
}
