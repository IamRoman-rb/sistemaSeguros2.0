import { useState, useEffect } from "react";
import Buscador from "./Buscador";
import Style from "../../Styles/Polizas/Listado.module.css";
import { useGetPolizasQuery } from "../../Redux/api/polizasApi";
import SeccionPolizas from "./SeccionPolizas";


const Listado = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: polizas = [], error, isLoading } = useGetPolizasQuery();

    // Función de filtrado general
    const filtrarPolizas = (lista) => {
        return lista.filter((poliza) => {
            const termino = searchTerm.toLowerCase();
            const numeroPoliza = poliza.numero ? poliza.numero.toLowerCase() : "";
            const nombreCliente = poliza.cliente?.nombre ? poliza.cliente.nombre.toLowerCase() : "";
            // Patente solo si existe
            const patente = poliza.poliza_vehiculos?.[0]?.patente_vehiculo?.toLowerCase() || "";

            return (
                numeroPoliza.includes(termino) ||
                nombreCliente.includes(termino) ||
                patente.includes(termino)
            );
        });
    };

    if (isLoading) return <div>Cargando pólizas...</div>;
    if (error) return <div>Error al cargar las pólizas</div>;

    // 1. Aplicar búsqueda global
    const polizasEncontradas = filtrarPolizas(polizas);

    // 2. Separar en dos grupos
    // Asumimos que el tipo "Automotor" viene textual en el objeto tipo_poliza
    const polizasAuto = polizasEncontradas.filter(p => p.tipo_poliza?.tipo === "Automotor");
    const polizasOtros = polizasEncontradas.filter(p => p.tipo_poliza?.tipo !== "Automotor");

    return (
        <section className={Style.listadoContainer}>
            <header className={Style.headerListadoClientes}>
                <h2 className={Style.h2ListadoCLientes}>Listado de Pólizas</h2>
            </header>

            <Buscador onSearch={setSearchTerm} />

            <div style={{ marginTop: '2rem', width: '95%' }}>
                {/* Renderizamos Automotor */}
                <SeccionPolizas 
                    titulo="Automotores" 
                    polizas={polizasAuto} 
                />

                {/* Renderizamos Otros Riesgos */}
                <SeccionPolizas 
                    titulo="Otros Riesgos" 
                    polizas={polizasOtros} 
                />

                {/* Mensaje si no hay nada en ninguna de las dos */}
                {polizasAuto.length === 0 && polizasOtros.length === 0 && (
                    <div style={{ textAlign: 'center', width: '100%', padding: '2rem', color: 'var(--slate-grey)' }}>
                        No se encontraron pólizas con ese criterio.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Listado;