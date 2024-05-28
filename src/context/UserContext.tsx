'use client'
// Importa las funciones necesarias de React
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define la interfaz para el objeto de usuario
interface User {
    id: string;
    name: string;
    email: string;
    // Otros datos de usuario según sea necesario
}

// Define la interfaz para el contexto de usuario
interface UserContextType {
    user: User | null; // El usuario actual o null si no hay ninguno autenticado
    setUser: (user: User | null) => void; // Función para establecer el usuario
}

// Crea el contexto de usuario con un valor inicial indefinido
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define el componente UserProvider que proporciona el contexto de usuario a la aplicación
export const UserProvider = ({ children }: { children: ReactNode }) => {
    // Define el estado del usuario y la función para establecerlo
    const [user, setUser] = useState<User | null>(() => {
        // Al inicializar, comprueba si hay un usuario almacenado en el localStorage
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    // Efecto que se ejecuta cuando el usuario cambia, para actualizar el localStorage
    useEffect(() => {
        if (user) {
            // Si hay un usuario, almacena su información en el localStorage
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            // Si no hay usuario, elimina la información del localStorage
            localStorage.removeItem('user');
        }
    }, [user]); // Dependencia del efecto: el usuario

    // Renderiza el proveedor de contexto con el valor del usuario y la función setUser
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de usuario en cualquier parte de la aplicación
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        // Si se utiliza fuera del proveedor de contexto, muestra un error
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
