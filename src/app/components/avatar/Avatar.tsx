
import React from 'react';
import Image from "next/image";
import Avatar from "../../../../assets/AvatarGestionEstudiante.png"

export default function ImageAvatar() {
    const Avatarr = Avatar;

    return (
        <div className="card">
            <div className="flex flex-wrap gap-5">
                <div className="flex-auto">
                    <Image src={Avatarr} alt="Descripción de la imagen" width={56} height={56} />
                </div>
            </div>
        </div>
    )
}
