import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Importa el tema de PrimeReact
import "primereact/resources/primereact.min.css"; // Importa los estilos de PrimeReact
import "primeicons/primeicons.css";
import { use } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Edunova",
    description: "Abriendo puertas hacia la educación moderna",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
