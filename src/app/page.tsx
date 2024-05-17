// Importa el componente Sidebar desde la ruta especificada
import Sidebar from "./components/sidebar/sidebar";

// Exporta la función RootLayout que se utiliza como el componente principal de diseño
export default function RootLayout({
  // Define las props del componente. En este caso, acepta children, que es cualquier contenido React que se pase dentro de este componente
  children,
}: {
  // Especifica que children es de tipo React.ReactNode, lo cual es útil para TypeScript ya que asegura que children puede ser cualquier cosa que React puede renderizar
  children: React.ReactNode
}) {
  return (
    // Define el elemento HTML raíz con el idioma establecido en inglés
    <html lang="en">
      <body>
        {/* 
          Sección principal del diseño. 
          Utiliza flexbox para el diseño de la página. 
          Aquí se incluye el componente Sidebar.
        */}
        <section className="flex-1">
          <Sidebar />
        </section>
        {/* 
          El elemento main contendrá el contenido principal de la página. 
          children se refiere al contenido que se pasará a RootLayout.
        */}
        <main>{children}</main>
      </body>
    </html>
  )
}
