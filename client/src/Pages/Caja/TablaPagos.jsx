import React from 'react';
import { Link } from 'react-router-dom';
import Style from '../../Styles/Caja/Listado.module.css';

const TablaPagos = ({ datos }) => {
    return (
        <div className={Style.tableContainer}>
            <h3 className={Style.sectionTitle}>Pagos de Pólizas</h3>
            <table className={Style.table}>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Póliza</th>
                        <th style={{ textAlign: 'right' }}>Importe</th>
                        <th>Usuario</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.length > 0 ? datos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.fecha}</td>
                            <td style={{ fontWeight: '600' }}>{item.cliente}</td>
                            <td>{item.poliza}</td>
                            <td className={`${Style.colImporte} ${Style.incomeText}`}>
                                ${item.importe.toLocaleString()}
                            </td>
                            <td>{item.usuario}</td>
                            <td>
                                <Link to={`/admin/pagos/detalle/${item.id}`} style={{color: 'var(--french-blue)', textDecoration:'none', fontWeight:'bold', fontSize:'0.85rem'}}>
                                    Ver Detalle
                                </Link>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="6" style={{textAlign:'center', padding:'1rem'}}>No hay pagos registrados.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablaPagos;