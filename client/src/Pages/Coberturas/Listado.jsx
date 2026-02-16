import React from "react";
import { Link } from "react-router-dom";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import Style from "../../Styles/Coberturas/Listado.module.css";

// Importamos los hooks de Redux
import { useGetCoberturasQuery, useDeleteCoberturaMutation } from "../../Redux/api/coberturasApi";

const Listado = () => {
    // 1. Obtener datos de la API
    const { data: coberturas = [], isLoading, error } = useGetCoberturasQuery();
    
    // 2. Hook para eliminar
    const [deleteCobertura] = useDeleteCoberturaMutation();

    // Variable auxiliar para rutas (puedes ajustarlo si usas un context de auth)
    const basePath = "/admin/coberturas"; 

    const handleDelete = async (id, codigo) => {
        if (window.confirm(`¿Estás seguro de eliminar la cobertura "${codigo}"?`)) {
            try {
                // Pasamos el ID numérico que espera tu backend
                await deleteCobertura(id).unwrap();
            } catch (err) {
                console.error("Error al eliminar:", err);
                alert("No se pudo eliminar la cobertura. Verifique que no esté asignada a una póliza o empresa.");
            }
        }
    };

    if (isLoading) return <div style={{padding:'2rem'}}>Cargando coberturas...</div>;
    if (error) return <div style={{padding:'2rem', color:'red'}}>Error al cargar coberturas.</div>;

    return (
        <section className={Style.listadoContainer}>
            <header className={Style.header}>
                <h2>Listado de Coberturas</h2>
                <Link to={`${basePath}/nueva`} className={Style.btnNuevo}>
                    <IconPlus size={18} />
                    Nueva Cobertura
                </Link>
            </header>

            <div className={Style.gridCoberturas}>
                {coberturas.length > 0 ? (
                    coberturas.map((item) => (
                        <article key={item.id} className={Style.coberturaCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                {/* Código de la cobertura (ej: A, RC, TR) */}
                                <span className={Style.cobCodigo}>
                                    {item.cobertura}
                                </span>
                                
                                <div className={Style.accionesContainer}>
                                    <Link 
                                        to={`${basePath}/editar/${item.id}`} 
                                        className={Style.btnIcon}
                                        title="Editar"
                                    >
                                        <IconPencil size={18} stroke={1.5} />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(item.id, item.cobertura)}
                                        className={`${Style.btnIcon} ${Style.btnDelete}`}
                                        title="Eliminar"
                                    >
                                        <IconTrash size={18} stroke={1.5} />
                                    </button>
                                </div>
                            </div>

                            {/* Descripción / Nombre completo */}
                            <h4 className={Style.cobNombre}>
                                {item.descripcion || "Sin descripción"}
                            </h4>
                        </article>
                    ))
                ) : (
                    <div className={Style.emptyState} style={{ gridColumn: '1 / -1' }}>
                        No hay coberturas registradas.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Listado;