import { useState } from "react";
import Style from "../../Styles/Empresas/Listado.module.css";
import { Link } from "react-router-dom";
import { 
    IconEye, 
    IconPencil, 
    IconTrash, 
    IconChevronDown, 
    IconChevronUp, 
    IconShieldCheck 
} from '@tabler/icons-react';

// Hooks de Redux
import { useGetEmpresasQuery, useDeleteEmpresaMutation } from '../../Redux/api/empresasApi';

const Listado = () => {
    const [expandedRow, setExpandedRow] = useState(null);
    
    // 1. Obtener datos de la API
    const { data: empresas = [], isLoading, error } = useGetEmpresasQuery();
    const [deleteEmpresa] = useDeleteEmpresaMutation();

    const toggleAccordion = (id) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta empresa?")) {
            try {
                await deleteEmpresa(id).unwrap();
            } catch (err) {
                console.error("Error al eliminar empresa:", err);
                alert("Error al eliminar la empresa.");
            }
        }
    };

    if (isLoading) return <div style={{padding:'2rem'}}>Cargando empresas...</div>;
    if (error) return <div style={{padding:'2rem', color:'red'}}>Error al cargar empresas.</div>;

    return(
        <section className={Style.listadoContainer}>
            <header className={Style.header}>
                <h2>Listado de Empresas</h2>
                <Link to="/admin/empresas/nueva" className={Style.btnNuevo}>
                    + Nueva Empresa
                </Link>
            </header>

            <div className={Style.tableResponsive}>
                <table className={Style.tabla}>
                    <thead>
                        <tr>
                            <th style={{width: '5%'}}></th>
                            <th>Empresa</th>
                            <th style={{textAlign: 'center'}}>Coberturas</th>
                            <th style={{textAlign: 'right'}}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresas.map((empresa) => (
                            <>
                                <tr 
                                    key={empresa.id} 
                                    className={`${Style.filaPrincipal} ${expandedRow === empresa.id ? Style.filaActiva : ''}`}
                                    onClick={() => toggleAccordion(empresa.id)}
                                >
                                    <td style={{textAlign: 'center', color: 'var(--slate-grey)'}}>
                                        {expandedRow === empresa.id ? <IconChevronUp size={20}/> : <IconChevronDown size={20}/>}
                                    </td>
                                    <td style={{fontWeight: '600', color: 'var(--deep-twilight)'}}>
                                        {empresa.empresa || empresa.nombre} {/* Ajusta según venga del backend */}
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        <span className={Style.badgeCoberturas}>
                                            {/* Contamos las coberturas asociadas. Ajusta 'cobertura_empresas' si tu backend usa otro nombre */}
                                            {empresa.cobertura_empresas?.length || 0} disponibles
                                        </span>
                                    </td>
                                    <td style={{textAlign: 'right'}} onClick={(e) => e.stopPropagation()}> 
                                        <div className={Style.accionesContainer}>
                                            <Link to={`/admin/empresas/editar/${empresa.id}`} className={Style.btnIcon} title="Editar">
                                                <IconPencil size={18} />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(empresa.id)} 
                                                className={`${Style.btnIcon} ${Style.btnDelete}`} 
                                                title="Eliminar"
                                            >
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {expandedRow === empresa.id && (
                                    <tr className={Style.accordionRow}>
                                        <td colSpan="5">
                                            <div className={Style.accordionContent}>
                                                <h4 className={Style.accordionTitle}>
                                                    <IconShieldCheck size={18}/> Coberturas Asociadas
                                                </h4>
                                                
                                                {/* Verificamos si hay coberturas */}
                                                {(empresa.cobertura_empresas && empresa.cobertura_empresas.length > 0) ? (
                                                    <div className={Style.gridCoberturas}>
                                                        {empresa.cobertura_empresas.map((relacion, idx) => {
                                                            // Accedemos al objeto 'cobertura' dentro de la relación
                                                            const cob = relacion.cobertura; 
                                                            return (
                                                                <div key={idx} className={Style.coberturaCard}>
                                                                    <span className={Style.cobCodigo}>{cob.cobertura}</span> {/* Codigo */}
                                                                    <span className={Style.cobNombre}>{cob.descripcion}</span> {/* Nombre */}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p style={{color: 'var(--slate-grey)', fontStyle: 'italic'}}>
                                                        No hay coberturas asociadas a esta empresa.
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
                
                {empresas.length === 0 && (
                    <div className={Style.emptyState}>
                        <p>No se encontraron empresas registradas.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Listado;