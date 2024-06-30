"use client";
import React, { useState } from "react";
import Image from "next/image";
import BannerBienvenidos from "../../../assets/Photo-for-Main-Website.png";
import Link from "next/link";
import "../globals.css";

function Bienvenidos() {
    const [activeButton, setActiveButton] = useState(false);

    return (
        <div className="grid text-center">
            <Image className="w-full h-full object-cover " src={BannerBienvenidos} alt="img-login" quality={100} priority />
            <div className="text-center">
                <h2 className="text-primary text-6xl font-barlow mb-2 lg:my-2 md:my-10 ">¡Bienvenidos/as!</h2>
                <b className="text-4xl font-sans font-thin" style={{ letterSpacing: "0.1em" }}>
                    ¡Exploremos juntos la plataforma!
                </b>
                <p className="text-xl font-sans my-8 md:my-10 md:px-24">
                    Te recomendamos cambiar tu contraseña para que la recuerdes cada vez que inicies sesión
                </p>
            </div>
            <div className="flex justify-center mt-5 sm:items-center sm:justify-center">
                <Link href="/cambiocontrasena" passHref>
                    <button
                        className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs hover:bg-action hover:text-primary text-sm font-sans ${
                            activeButton ? "bg-action text-primary" : "bg-primary text-white"
                        }`}
                        onClick={() => setActiveButton(true)}
                    >
                        Cambiar contraseña
                    </button>
                </Link>
                <Link href="/" passHref>
                    <button
                        className={`py-2 px-4 rounded-md mr-4 flex-grow max-w-xs hover:bg-action hover:text-primary text-sm font-sans ${
                            activeButton ? "bg-primary text-white" : "bg-action text-primary"
                        }`}
                        onClick={() => setActiveButton(false)}
                    >
                        Ir al inicio
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Bienvenidos;
