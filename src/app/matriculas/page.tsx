import Sidebar from "../components/sidebar/sidebar";

// Definimos y exportamos el componente Matriculas
function Matriculas() {
    return (
        // Sección principal que envuelve el contenido
        <>
            <section className="flex-1">
                {/* Insertamos el componente Sidebar */}
                <Sidebar />
            </section>
        </>
    );
}

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default Matriculas;
