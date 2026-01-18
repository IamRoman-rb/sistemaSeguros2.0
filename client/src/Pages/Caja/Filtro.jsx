import React, { useState } from 'react';
import { IconFilter, IconX } from '@tabler/icons-react';
import Style from '../../Styles/Caja/Listado.module.css';

const Filtro = ({ onFiltrar, initialDate }) => {
    const defaultDate = initialDate || new Date().toISOString().split('T')[0];
    const [filtros, setFiltros] = useState({
        fechaInicio: defaultDate,
        fechaFin: defaultDate,
        cliente: '',
        poliza: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFiltrar(filtros);
    };
    const handleLimpiar = () => {
        const estadoVacio = { fechaInicio: '', fechaFin: '', cliente: '', poliza: '' };
        setFiltros(estadoVacio);
        onFiltrar(estadoVacio);
    };

    return(
        <form onSubmit={handleSubmit} className={Style.filterForm}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className={Style.filterHeader}>
                    <IconFilter size={18} />
                    Filtros de Búsqueda
                </h3>
                <button type="button" onClick={handleLimpiar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-grey)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                    <IconX size={14} /> Limpiar Filtros
                </button>
            </div>
            
            <div className={Style.filterGrid}>
                <div className={Style.inputGroup}>
                    <label htmlFor="fechaInicio" className={Style.label}>Fecha Inicio:</label>
                    <input 
                        type="date" 
                        id="fechaInicio" 
                        name="fechaInicio" 
                        className={Style.input}
                        value={filtros.fechaInicio}
                        onChange={handleChange}
                    />
                </div>

                <div className={Style.inputGroup}>
                    <label htmlFor="fechaFin" className={Style.label}>Fecha Fin:</label>
                    <input 
                        type="date" 
                        id="fechaFin" 
                        name="fechaFin" 
                        className={Style.input}
                        value={filtros.fechaFin}
                        onChange={handleChange}
                    />
                </div>

                <div className={Style.inputGroup}>
                    <label htmlFor="cliente" className={Style.label}>Cliente:</label>
                    <input 
                        type="text" 
                        id="cliente" 
                        name="cliente" 
                        placeholder="Nombre del cliente" 
                        className={Style.input}
                        value={filtros.cliente}
                        onChange={handleChange}
                    />
                </div>

                <div className={Style.inputGroup}>
                    <label htmlFor="poliza" className={Style.label}>Póliza:</label>
                    <input 
                        type="text" 
                        id="poliza" 
                        name="poliza" 
                        placeholder="N° Póliza" 
                        className={Style.input}
                        value={filtros.poliza}
                        onChange={handleChange}
                    />
                </div> 
                
                <button type="submit" className={Style.btnFilter}>
                    Aplicar Filtros
                </button>   
            </div>
        </form>
    )
};

export default Filtro;