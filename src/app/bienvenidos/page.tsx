"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import BannerBienvenidos from "../../../assets/Photo-for-Main-Website.png";
import '../globals.css';


function Bienvenidos() {
    const [activeButton, setActiveButton] = useState(false);
    return (
        <div className="grid text-center">
            <Image
                className="w-full h-full object-cover"
                src={BannerBienvenidos}
                alt="img-login"
                objectFit="cover"
                quality={100}
            />
            <div className="text-center">
                <h2 className="text-primary text-6xl font-sans mb-4">¡Bienvenidos!</h2>
                <b className="text-4xl font-sans" style={{ letterSpacing: '0.1em' }}>¡Exploremos juntos la plataforma!</b>
                <p className="text-2xl font-sans mt-8">Te recomendamos cambiar tu contraseña para que la recuerdes cada vez que inicies sesión</p>
            </div>
            <div className="flex justify-center mt-20">
                <button
                    className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs ${activeButton ? 'bg-action text-primary' : 'bg-primary text-white'}`}
                    onClick={() => setActiveButton(true)}
                >
                    Cambiar contraseña
                </button>
                <button
                    className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs ${activeButton ? 'bg-primary text-white' : 'bg-action text-primary'}`}
                    onClick={() => setActiveButton(false)}
                >
                    Ir al inicio
                </button>
            </div>

        </div >
    );
}

export default Bienvenidos;
