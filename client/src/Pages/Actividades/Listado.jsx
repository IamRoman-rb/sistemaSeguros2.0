import React, { useState, useMemo } from 'react';
import TablaPaginada from './TablaPaginada';

import { 
    IconFilter, 
    IconX
} from '@tabler/icons-react';
import Style from "../../Styles/Actividades/Listado.module.css";

const ActivityFilter = ({ onFilter, label }) => {
    const [filters, setFilters] = useState({ accion: '', fecha: '', hora: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    const clearFilters = () => {
        const empty = { accion: '', fecha: '', hora: '' };
        setFilters(empty);
        onFilter(empty);
    };

    return (
        <div className={Style.filterContainer}>
            <h4 className={Style.filterTitle}>
                <IconFilter size={16} /> Filtros: {label}
            </h4>
            <div className={Style.filterGrid}>
                <div className={Style.inputGroup}>
                    <input type="text" name="accion" placeholder="Buscar Acción..." value={filters.accion} onChange={handleChange} className={Style.input}/>
                </div>
                <div className={Style.inputGroup}>
                    <input type="date" name="fecha" value={filters.fecha} onChange={handleChange} className={Style.input}/>
                </div>
                <div className={Style.inputGroup}>
                    <input type="time" name="hora" value={filters.hora} onChange={handleChange} className={Style.input}/>
                </div>
                {(filters.accion || filters.fecha || filters.hora) && (
                    <button onClick={clearFilters} className={Style.btnClear}><IconX size={16} /> Limpiar</button>
                )}
            </div>
        </div>
    );
};



const Listado = () => {
    const generarDatos = (base, cantidad) => {
        return Array.from({ length: cantidad }, (_, i) => ({
            ...base,
            id: i,
            hora: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
        }));
    };

    const dataPolizas = generarDatos({ fecha: '2024-03-01', accion: 'Alta Nueva', poliza: '900-111', cliente: 'Juan Perez', usuario: 'admin1' }, 12);
    const dataPagos = generarDatos({ fecha: '2024-03-01', accion: 'Cobro Cuota', cliente: 'Maria Lopez', monto: 15000, usuario: 'admin1' }, 8);
    const dataMovimientos = generarDatos({ fecha: '2024-03-01', accion: 'Retiro', tipo: 'Egreso', usuario: 'admin2' }, 15);
    const dataClientes = generarDatos({ fecha: '2024-03-01', accion: 'Edición', cliente: 'Carlos Ruiz', usuario: 'admin1' }, 6);

    const [filterPoliza, setFilterPoliza] = useState({ accion: '', fecha: '', hora: '' });
    const [filterPago, setFilterPago] = useState({ accion: '', fecha: '', hora: '' });
    const [filterMov, setFilterMov] = useState({ accion: '', fecha: '', hora: '' });
    const [filterCli, setFilterCli] = useState({ accion: '', fecha: '', hora: '' });

    const filterData = (data, criteria) => {
        return data.filter(item => {
            const matchAccion = criteria.accion ? item.accion.toLowerCase().includes(criteria.accion.toLowerCase()) : true;
            const matchFecha = criteria.fecha ? item.fecha === criteria.fecha : true;
            const matchHora = criteria.hora ? item.hora.startsWith(criteria.hora.substring(0, 2)) : true; 
            return matchAccion && matchFecha && matchHora;
        });
    };

    const filteredPolizas = useMemo(() => filterData(dataPolizas, filterPoliza), [dataPolizas, filterPoliza]);
    const filteredPagos = useMemo(() => filterData(dataPagos, filterPago), [dataPagos, filterPago]);
    const filteredMovimientos = useMemo(() => filterData(dataMovimientos, filterMov), [dataMovimientos, filterMov]);
    const filteredClientes = useMemo(() => filterData(dataClientes, filterCli), [dataClientes, filterCli]);

    return(
        <section className={Style.container}>
            <header className={Style.mainHeader}>
                <h2>Auditoría de Actividades</h2>
                <p>Registro histórico paginado de operaciones.</p>
            </header>

            <div className={Style.sectionCard}>
                <div className={Style.cardHeader}><h3>Actividad en Pólizas</h3></div>
                <ActivityFilter label="Pólizas" onFilter={setFilterPoliza} />
                
                <TablaPaginada 
                    data={filteredPolizas}
                    itemsPerPage={5}
                    headers={['Fecha / Hora', 'Acción', 'Póliza', 'Cliente', 'Usuario']}
                    renderRow={(item) => (
                        <tr key={item.id}>
                            <td>{item.fecha} <span className={Style.timeBadge}>{item.hora}</span></td>
                            <td className={Style.fontBold}>{item.accion}</td>
                            <td>{item.poliza}</td>
                            <td>{item.cliente}</td>
                            <td><span className={Style.userBadge}>{item.usuario}</span></td>
                        </tr>
                    )}
                />
            </div>

            <div className={Style.sectionCard}>
                <div className={Style.cardHeader}><h3>Actividad en Pagos</h3></div>
                <ActivityFilter label="Pagos" onFilter={setFilterPago} />

                <TablaPaginada 
                    data={filteredPagos}
                    itemsPerPage={5}
                    headers={['Fecha / Hora', 'Acción', 'Cliente', 'Monto', 'Usuario']}
                    renderRow={(item) => (
                        <tr key={item.id}>
                            <td>{item.fecha} <span className={Style.timeBadge}>{item.hora}</span></td>
                            <td className={Style.fontBold}>{item.accion}</td>
                            <td>{item.cliente}</td>
                            <td className={Style.amount}>${item.monto?.toLocaleString()}</td>
                            <td><span className={Style.userBadge}>{item.usuario}</span></td>
                        </tr>
                    )}
                />
            </div>

            <div className={Style.sectionCard}>
                <div className={Style.cardHeader}><h3>Actividad en Movimientos</h3></div>
                <ActivityFilter label="Movimientos" onFilter={setFilterMov} />

                <TablaPaginada 
                    data={filteredMovimientos}
                    itemsPerPage={5}
                    headers={['Fecha / Hora', 'Acción', 'Tipo', 'Usuario']}
                    renderRow={(item) => (
                        <tr key={item.id}>
                            <td>{item.fecha} <span className={Style.timeBadge}>{item.hora}</span></td>
                            <td className={Style.fontBold}>{item.accion}</td>
                            <td>{item.tipo}</td>
                            <td><span className={Style.userBadge}>{item.usuario}</span></td>
                        </tr>
                    )}
                />
            </div>
            <div className={Style.sectionCard}>
                <div className={Style.cardHeader}><h3>Actividad en Clientes</h3></div>
                <ActivityFilter label="Clientes" onFilter={setFilterCli} />

                <TablaPaginada 
                    data={filteredClientes}
                    itemsPerPage={5}
                    headers={['Fecha / Hora', 'Acción', 'Cliente Afectado', 'Usuario']}
                    renderRow={(item) => (
                        <tr key={item.id}>
                            <td>{item.fecha} <span className={Style.timeBadge}>{item.hora}</span></td>
                            <td className={Style.fontBold}>{item.accion}</td>
                            <td>{item.cliente}</td>
                            <td><span className={Style.userBadge}>{item.usuario}</span></td>
                        </tr>
                    )}
                />
            </div>

        </section>
    );
};

export default Listado;