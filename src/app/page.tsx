'use client';

import React from 'react';
import { usePathname } from 'next/navigation'; // Importa usePathname
import RootLayout from './RootLayout';
import Home from './home/page';
import Usuario from './gestionusuarios/page';

const Page = () => {
  const pathname = usePathname(); // Usa usePathname para obtener la ruta actual

  // Función para determinar el componente a renderizar basado en la URL
  const renderComponent = () => {
    switch (pathname) {
      case '/gestionusuarios':
        return <Usuario />;
      case '/':
      default:
        return <Home />;
    }
  };

  return (
    <RootLayout>
      {renderComponent()}
    </RootLayout>
  );
};

export default Page;
