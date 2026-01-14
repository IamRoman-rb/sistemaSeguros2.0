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

const Listado = () => {
    const [expandedRow, setExpandedRow] = useState(null);

    const empresas = [
        {
            id: 1,
            nombre: "Sancor Seguros",
            coberturas: [
                { codigo: "A", nombre: "Responsabilidad Civil" },
                { codigo: "B", nombre: "Terceros Completo" },
                { codigo: "C", nombre: "Todo Riesgo con Franquicia" },
                { codigo: "D", nombre: "Todo Riesgo sin Franquicia" }
            ]
        },
        {
            id: 2,
            nombre: "Federación Patronal",
            coberturas: [
                { codigo: "RC", nombre: "Resp. Civil Básica" },
                { codigo: "C1", nombre: "Terceros + Granizo" }
            ]
        },
        {
            id: 3,
            nombre: "La Caja",
            coberturas: [
                { codigo: "PACK", nombre: "Pack Ahorro" },
                { codigo: "TR", nombre: "Todo Riesgo" },
                { codigo: "GR", nombre: "Granizo Total" }
            ]
        }
    ];

    const toggleAccordion = (id) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

    const handleDelete = (id) => {
    };

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
                            <th>CUIT</th>
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
                                        {empresa.nombre}
                                    </td>
                                    <td>{empresa.cuit}</td>
                                    <td style={{textAlign: 'center'}}>
                                        <span className={Style.badgeCoberturas}>
                                            {empresa.coberturas.length} disponibles
                                        </span>
                                    </td>
                                    <td style={{textAlign: 'right'}} onClick={(e) => e.stopPropagation()}> 
                                        <div className={Style.accionesContainer}>
                                            <Link to={`/admin/empresas/detalle/${empresa.id}`} className={Style.btnIcon} title="Ver Detalle">
                                                <IconEye size={18} />
                                            </Link>
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
                                                    <IconShieldCheck size={18}/> Coberturas
                                                </h4>
                                                
                                                <div className={Style.gridCoberturas}>
                                                    {empresa.coberturas.map((cob, idx) => (
                                                        <div key={idx} className={Style.coberturaCard}>
                                                            <span className={Style.cobCodigo}>{cob.codigo}</span>
                                                            <span className={Style.cobNombre}>{cob.nombre}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Listado;