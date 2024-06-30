import React from "react";
import { UserProvider } from "../context/UserContext"; // Importa UserProvider
import useAuth from "./useAuth";

const App = ({ children }: { children: React.ReactNode }) => {
    useAuth();

    return (
        <UserProvider>
            {" "}
            {/* Envuelve toda la aplicación con UserProvider */}
            {children}
        </UserProvider>
    );
};

export default App;
