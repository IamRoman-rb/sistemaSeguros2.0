import React, { useState, useMemo } from 'react';
import Filtro from './Filtro';
import Style from '../../Styles/Caja/Listado.module.css';
import Balance from './Balance';
import TablaPagos from './TablaPagos';
import TablaMovimientos from './TablaMovimientos';

// Hooks de Redux
import { useGetPagosQuery } from '../../Redux/api/pagosApi';
import { useGetMovimientosQuery, useDeleteMovimientoMutation } from '../../Redux/api/movimientosApi';

const Listado = () => {
    // Fechas por defecto
    const getDateString = (daysOffset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        return date.toISOString().split('T')[0];
    };
    const hoy = getDateString(0);

    // Filtros de búsqueda
    const [criterios, setCriterios] = useState({
        fechaInicio: hoy,
        fechaFin: hoy,
        cliente: '',
        poliza: ''
    });

    // Consultas a la API
    const { data: pagosDB = [], isLoading: loadingPagos } = useGetPagosQuery();
    const { data: movimientosDB = [], isLoading: loadingMovimientos } = useGetMovimientosQuery();
    const [deleteMovimiento] = useDeleteMovimientoMutation();

    // Lógica para aplicar filtros
    const handleFiltrar = (nuevosFiltros) => setCriterios(nuevosFiltros);

    const handleDelete = async (id, tipo) => {
        if (!window.confirm(`¿Estás seguro de eliminar este ${tipo}?`)) return;
        try {
            // El backend recibe el ID en el body según tu controlador deleteMovimiento
            await deleteMovimiento(id).unwrap();
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar el movimiento.");
        }
    };

    // Función auxiliar para comparar fechas (ignorando la hora del ISO string)
    const filterByDate = (fechaISO) => {
        if (!fechaISO) return false;
        const fechaCorta = fechaISO.split('T')[0];
        if (criterios.fechaInicio && fechaCorta < criterios.fechaInicio) return false;
        if (criterios.fechaFin && fechaCorta > criterios.fechaFin) return false;
        return true;
    };

    // --- PROCESAMIENTO DE PAGOS ---
    const pagosFiltrados = useMemo(() => {
        return pagosDB
            .filter(pago => pago.valido !== false) // Ocultar eliminados si tu backend los trae
            .filter(pago => {
                if (!filterByDate(pago.fecha)) return false;

                const nombreCliente = pago.poliza?.cliente?.nombre?.toLowerCase() || '';
                const numeroPoliza = pago.id_poliza || '';

                if (criterios.cliente && !nombreCliente.includes(criterios.cliente.toLowerCase())) return false;
                if (criterios.poliza && !numeroPoliza.includes(criterios.poliza)) return false;

                return true;
            })
            .map(pago => ({
                id: pago.id,
                fecha: pago.fecha.split('T')[0],
                cliente: pago.poliza?.cliente?.nombre || 'S/D',
                poliza: pago.id_poliza,
                importe: pago.importe,
                usuario: pago.empleado?.nombre || 'S/D'
            }));
    }, [criterios, pagosDB]);
    const movimientosActivos = useMemo(() => {
        return movimientosDB.filter(m => m.valido !== false && filterByDate(m.fecha));
    }, [movimientosDB, criterios]);

    const ingresosFiltrados = useMemo(() => {
        return movimientosActivos
            .filter(m => m.tipo === 'ingreso' || m.tipo === 'INGRESO')
            .map(m => ({
                id: m.id,
                fecha: m.fecha.split('T')[0],
                motivo: m.motivo || '-',
                descripcion: m.descripcion || '-',
                monto: m.importe || 0 
            }));
    }, [movimientosActivos]);
    
    const egresosFiltrados = useMemo(() => {
        return movimientosActivos
            .filter(m => m.es_ingreso === false)
            .map(m => ({
                id: m.id,
                fecha: m.fecha.split('T')[0],
                motivo: m.motivo || '-',
                descripcion: m.descripcion || '-',
                monto: m.importe || 0
            }));
    }, [movimientosActivos]);    

    const totalPagos = pagosFiltrados.reduce((acc, curr) => acc + curr.importe, 0);
    const totalIngresos = ingresosFiltrados.reduce((acc, curr) => acc + curr.monto, 0);
    const totalEgresos = egresosFiltrados.reduce((acc, curr) => acc + curr.monto, 0);

    if (loadingPagos || loadingMovimientos) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando caja...</div>;

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <h2 className={Style.title}>Movimientos de Caja</h2>
                <Filtro onFiltrar={handleFiltrar} initialDate={hoy} />
            </header>

            <Balance
                totalPagos={totalPagos}
                totalIngresos={totalIngresos}
                totalEgresos={totalEgresos}
            />

            <TablaPagos datos={pagosFiltrados} />

            <TablaMovimientos
                titulo="Otros Ingresos"
                datos={ingresosFiltrados}
                tipo="ingreso"
                onDelete={handleDelete}
            />

            <TablaMovimientos
                titulo="Egresos y Gastos"
                datos={egresosFiltrados}
                tipo="egreso"
                onDelete={handleDelete}
            />
        </section>
    );
};

export default Listado;