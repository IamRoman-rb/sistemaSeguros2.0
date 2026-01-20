import React from 'react';
import { IconTrash } from '@tabler/icons-react';
import Style from '../../Styles/Caja/Listado.module.css';

const TablaMovimientos = ({ titulo, datos, tipo, onDelete }) => {
    const amountClass = tipo === 'ingreso' ? Style.incomeText : Style.expenseText;

    return (
        <div className={Style.tableContainer}>
            <h3 className={Style.sectionTitle}>{titulo}</h3>
            <table className={Style.table}>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Concepto</th>
                        <th>Descripción</th>
                        <th style={{ textAlign: 'right' }}>Importe</th>
                        <th style={{ textAlign: 'center' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.length > 0 ? datos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.fecha}</td>
                            <td style={{ fontWeight: '600' }}>{item.concepto}</td>
                            <td>{item.descripcion}</td>
                            <td className={`${Style.colImporte} ${amountClass}`}>
                                ${item.monto.toLocaleString()}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <button 
                                    onClick={() => onDelete(item.id, tipo)} 
                                    className={Style.btnDelete}
                                    title="Eliminar movimiento"
                                >
                                    <IconTrash size={18} />
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="5" style={{textAlign:'center', padding:'1rem'}}>No hay movimientos.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablaMovimientos;