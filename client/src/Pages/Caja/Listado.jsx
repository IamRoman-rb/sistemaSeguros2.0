import React, { useState, useMemo } from 'react';
import Filtro from './Filtro';
import Style from '../../Styles/Caja/Listado.module.css';
import { Link } from 'react-router-dom';
const Listado = () => {
    const getDateString = (daysOffset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        return date.toISOString().split('T')[0];
    };

    const hoy = getDateString(0);
    const pagosOriginales = useMemo(() => [
        { 
            id: 1,
            fecha: hoy,
            cliente: 'Juan Perez (Hoy)', 
            poliza: '900-542100-1', 
            importe: 1500, 
            usuario: 'admin1' 
        },
        { 
            id: 2,
            fecha: hoy,
            cliente: 'Ana Martinez (Hoy)', 
            poliza: '900-544100-8', 
            importe: 2000, 
            usuario: 'admin2' 
        },
        { 
            id: 3,
            fecha: getDateString(-1),
            cliente: 'Carlos Gomez (Ayer)', 
            poliza: '900-542200-2', 
            importe: 1750, 
            usuario: 'admin1' 
        },
        {
            id: 4,
            fecha: getDateString(-5),
            cliente: 'Maria Rodriguez (Antiguo)', 
            poliza: '900-111222-3', 
            importe: 3000, 
            usuario: 'admin2' 
        },
        { 
            id: 5,
            fecha: getDateString(1),
            cliente: 'Pedro Test (Mañana)', 
            poliza: '900-999888-7', 
            importe: 500, 
            usuario: 'admin1' 
        },
    ], [hoy]);

    const user = {
        role: 'admin'
    }

    const [criterios, setCriterios] = useState({
        fechaInicio: hoy,
        fechaFin: hoy,
        cliente: '',
        poliza: ''
    });

    const handleFiltrar = (nuevosFiltros) => {
        setCriterios(nuevosFiltros);
    };
    const pagosFiltrados = useMemo(() => {
        return pagosOriginales.filter(pago => {
            if (criterios.fechaInicio && pago.fecha < criterios.fechaInicio) return false;
            if (criterios.fechaFin && pago.fecha > criterios.fechaFin) return false;
            if (criterios.cliente && !pago.cliente.toLowerCase().includes(criterios.cliente.toLowerCase())) return false;
            if (criterios.poliza && !pago.poliza.includes(criterios.poliza)) return false;

            return true;
        });
    }, [criterios, pagosOriginales]);

    return(
        <section className={Style.container}>
            <header className={Style.header}>
                <h2 className={Style.title}>Listado de Pagos</h2>
                <Filtro onFiltrar={handleFiltrar} initialDate={hoy} />
            </header>

            <div className={Style.tableContainer}>
                <table className={Style.table}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Póliza</th>
                            <th style={{ textAlign: 'right' }}>Importe</th>
                            <th>Usuario</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagosFiltrados.length > 0 ? (
                            pagosFiltrados.map((pago, index) => (
                                <tr key={index}>
                                    <td>{pago.fecha}</td>
                                    <td style={{ fontWeight: '600' }}>{pago.cliente}</td>
                                    <td>{pago.poliza}</td>
                                    <td className={Style.colImporte}>
                                        ${pago.importe.toLocaleString()}
                                    </td>
                                    <td>
                                        <span style={{ 
                                            backgroundColor: '#e9ecef', 
                                            padding: '2px 6px', 
                                            borderRadius: '4px', 
                                            fontSize: '0.85rem' 
                                        }}>
                                            {pago.usuario}
                                        </span>
                                    </td>
                                    <td><Link to={`/${user.role}/pagos/detalle/${pago.id}`}>Ver Detalle</Link></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', fontStyle: 'italic', color: 'var(--slate-grey)' }}>
                                    No hay pagos registrados para los filtros seleccionados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Listado;