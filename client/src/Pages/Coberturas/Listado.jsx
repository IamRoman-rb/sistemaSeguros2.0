import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import Style from "../../Styles/Coberturas/Listado.module.css";

const Listado = () => {
    const [coberturas, setCoberturas] = useState([
        { codigo: "A", nombre: "Responsabilidad Civil" },
        { codigo: "B", nombre: "Terceros Completo" },
        { codigo: "C", nombre: "Todo Riesgo con Franquicia" },
        { codigo: "D", nombre: "Todo Riesgo sin Franquicia" },
        { codigo: "RC", nombre: "Resp. Civil Básica" },
        { codigo: "C1", nombre: "Terceros + Granizo" },
        { codigo: "PACK", nombre: "Pack Ahorro" },
        { codigo: "TR", nombre: "Todo Riesgo" },
        { codigo: "GR", nombre: "Granizo Total" }
    ]);

    const user = {
        name: "Walter Rodriguez",
        role: "admin"
    }
    const handleDelete = (codigo) => {
        if (window.confirm(`¿Estás seguro de eliminar la cobertura ${codigo}?`)) {
            const nuevaLista = coberturas.filter(item => item.codigo !== codigo);
            setCoberturas(nuevaLista);
        }
    };

    return (
        <section className={Style.listadoContainer}>
            <header className={Style.header}>
                <h2>Listado de Coberturas</h2>
                <Link to={`/${user.role}/coberturas/nueva`} className={Style.btnNuevo}>
                    <IconPlus size={18} />
                    Nueva Cobertura
                </Link>
            </header>

            <div className={Style.gridCoberturas}>
                {coberturas.length > 0 ? (
                    coberturas.map((item, index) => (
                        <article key={item.codigo} className={Style.coberturaCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span className={Style.cobCodigo}>
                                    {item.codigo}
                                </span>
                                
                                <div className={Style.accionesContainer}>
                                    <Link 
                                        to={`/${user.role}/coberturas/editar/${index}`} 
                                        className={Style.btnIcon}
                                        title="Editar"
                                    >
                                        <IconPencil size={18} stroke={1.5} />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(item.codigo)}
                                        className={`${Style.btnIcon} ${Style.btnDelete}`}
                                        title="Eliminar"
                                    >
                                        <IconTrash size={18} stroke={1.5} />
                                    </button>
                                </div>
                            </div>

                            <h4 className={Style.cobNombre}>
                                {item.nombre}
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