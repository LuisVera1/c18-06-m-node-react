"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define la interfaz para el objeto de usuario
interface User {
    id: string;
    name: string;
    email: string;
    // Otros datos de usuario según sea necesario
}

// Define la interfaz para el contexto de usuario
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

// Crea el contexto de usuario
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define el componente UserProvider
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// Hook personalizado para acceder al contexto de usuario
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
