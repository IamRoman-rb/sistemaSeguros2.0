import React, { useState, useMemo } from 'react';
import Filtro from './Filtro';
import Style from '../../Styles/Caja/Listado.module.css';
import Balance from './Balance'; 
import TablaPagos from './TablaPagos';
import TablaMovimientos from './TablaMovimientos';

const Listado = () => {
    const getDateString = (daysOffset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        return date.toISOString().split('T')[0];
    };
    const hoy = getDateString(0);
    
    const [pagos] = useState([
        { id: 1, fecha: hoy, cliente: 'Juan Perez', poliza: '900-542100-1', importe: 1500, usuario: 'admin1' },
        { id: 2, fecha: hoy, cliente: 'Ana Martinez', poliza: '900-544100-8', importe: 2000, usuario: 'admin2' },
        { id: 3, fecha: getDateString(-1), cliente: 'Carlos Gomez', poliza: '900-542200-2', importe: 1750, usuario: 'admin1' },
    ]);

    const [ingresos, setIngresos] = useState([
        { id: 101, fecha: hoy, concepto: 'Venta Cartón', descripcion: 'Venta de archivo muerto', monto: 500 },
        { id: 102, fecha: getDateString(-1), concepto: 'Ajuste', descripcion: 'Diferencia de caja a favor', monto: 150 },
    ]);

    const [egresos, setEgresos] = useState([
        { id: 201, fecha: hoy, concepto: 'Librería', descripcion: 'Compra de resmas A4', monto: 3500 },
        { id: 202, fecha: hoy, concepto: 'Limpieza', descripcion: 'Artículos de limpieza', monto: 1200 },
        { id: 203, fecha: getDateString(-2), concepto: 'Cafetería', descripcion: 'Café y azúcar', monto: 800 },
    ]);

    // --- 2. Estado del Filtro ---
    const [criterios, setCriterios] = useState({
        fechaInicio: hoy,
        fechaFin: hoy,
        cliente: '',
        poliza: ''
    });

    const handleFiltrar = (nuevosFiltros) => setCriterios(nuevosFiltros);

    // --- 3. Lógica de Eliminado ---
    const handleDelete = (id, tipo) => {
        if(!window.confirm('¿Estás seguro de eliminar este movimiento?')) return;

        if (tipo === 'ingreso') {
            setIngresos(prev => prev.filter(item => item.id !== id));
        } else if (tipo === 'egreso') {
            setEgresos(prev => prev.filter(item => item.id !== id));
        }
    };

    // --- 4. Filtrado de Datos ---
    // Función auxiliar para chequear fechas
    const filterByDate = (item) => {
        if (criterios.fechaInicio && item.fecha < criterios.fechaInicio) return false;
        if (criterios.fechaFin && item.fecha > criterios.fechaFin) return false;
        return true;
    };

    const pagosFiltrados = useMemo(() => {
        return pagos.filter(pago => {
            if (!filterByDate(pago)) return false;
            if (criterios.cliente && !pago.cliente.toLowerCase().includes(criterios.cliente.toLowerCase())) return false;
            if (criterios.poliza && !pago.poliza.includes(criterios.poliza)) return false;
            return true;
        });
    }, [criterios, pagos]);

    // Ingresos y Egresos SOLO se filtran por FECHA (ignoramos cliente/poliza)
    const ingresosFiltrados = useMemo(() => ingresos.filter(filterByDate), [criterios, ingresos]);
    const egresosFiltrados = useMemo(() => egresos.filter(filterByDate), [criterios, egresos]);

    // --- 5. Cálculo de Totales ---
    const totalPagos = pagosFiltrados.reduce((acc, curr) => acc + curr.importe, 0);
    const totalIngresos = ingresosFiltrados.reduce((acc, curr) => acc + curr.monto, 0);
    const totalEgresos = egresosFiltrados.reduce((acc, curr) => acc + curr.monto, 0);

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <h2 className={Style.title}>Movimientos de Caja</h2>
                <Filtro onFiltrar={handleFiltrar} initialDate={hoy} />
            </header>

            {/* Componente Balance (Totales) */}
            <Balance 
                totalPagos={totalPagos} 
                totalIngresos={totalIngresos} 
                totalEgresos={totalEgresos} 
            />

            {/* Tabla 1: Pagos (Pólizas) */}
            <TablaPagos datos={pagosFiltrados} />

            {/* Tabla 2: Otros Ingresos */}
            <TablaMovimientos 
                titulo="Otros Ingresos" 
                datos={ingresosFiltrados} 
                tipo="ingreso" 
                onDelete={handleDelete} 
            />

            {/* Tabla 3: Egresos / Gastos */}
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