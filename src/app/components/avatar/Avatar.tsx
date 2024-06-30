// Dentro de Avatar.tsx

import React, { useContext } from "react";
import Image from "next/image";
import AvatarImage from "../../../../assets/AvatarGestionEstudiante.png";
import { UserContext } from "../../../context/UserContext"; // Importa el contexto del usuario

export default function ImageAvatar() {
    const { user } = useContext(UserContext) || {}; // Agrega una verificación de nulidad

    return (
        <div className="card ">
            <div className="flex flex-wrap gap-5 items-center">
                <div className="flex-auto cursor-pointer">
                    <Image src={AvatarImage} alt="Descripción de la imagen" width={56} height={56} />
                </div>
                {user && <b className="text-secundary">{user.email}</b>} {/* Muestra el correo electrónico del usuario si está disponible */}
            </div>
        </div>
    );
}
