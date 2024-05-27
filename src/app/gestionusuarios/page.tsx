import Sidebar from "../components/sidebar/sidebar";

// Definimos y exportamos el componente Matriculas
function gestionusuarios() {
    return (
        // Sección principal que envuelve el contenido
        <>
            <section className="flex">
                {/* Insertamos el componente Sidebar */}
                <Sidebar />
                <div>
                    buenas
                </div>
            </section>
        </>
    );
}

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default gestionusuarios;
