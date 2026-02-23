import React, { useState, useMemo } from 'react';
import { 
    IconChevronDown, 
    IconChevronUp, 
    IconChartBar, 
    IconTrendingUp 
} from '@tabler/icons-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import Style from "../../Styles/Caja/Resumen.module.css";

// Hooks de Redux
import { useGetPagosQuery } from '../../Redux/api/pagosApi';
import { useGetMovimientosQuery } from '../../Redux/api/movimientosApi';

const Resumen = () => {
    const [expandedRow, setExpandedRow] = useState(null);

    // 1. Obtener datos de la API
    const { data: pagosDB = [], isLoading: loadingPagos } = useGetPagosQuery();
    const { data: movimientosDB = [], isLoading: loadingMov } = useGetMovimientosQuery();

    // 2. Procesar y Agrupar Datos
    const datosMensuales = useMemo(() => {
        if (loadingPagos || loadingMov) return [];

        // A. Normalizar todas las transacciones en un solo array
        const transacciones = [
            // Pagos de Pólizas (Siempre son Ingresos)
            ...pagosDB.filter(p => p.valido !== false).map(p => ({
                fecha: p.fecha.split('T')[0], // Cortamos la hora para agrupar por día
                monto: p.importe,
                tipo: 'ingreso'
            })),
            // Movimientos de Caja (Verificamos el booleano es_ingreso)
            ...movimientosDB.filter(m => m.valido !== false).map(m => ({
                fecha: m.fecha.split('T')[0],
                monto: m.importe, // Según tu JSON es "importe"
                tipo: m.es_ingreso ? 'ingreso' : 'egreso' // Evaluamos el booleano
            }))
        ];

        // B. Agrupar por Mes
        const gruposPorMes = {};

        transacciones.forEach(t => {
            // Desglosamos la fecha YYYY-MM-DD para evitar desfasajes de zona horaria
            const [year, month, day] = t.fecha.split('-');
            const fechaObj = new Date(year, month - 1, day); 

            // Clave única para el mes: "2024-03"
            const mesKey = t.fecha.substring(0, 7); 
            
            // Nombre legible: "Marzo 2024"
            const nombreMes = fechaObj.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
            const mesFormateado = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);

            if (!gruposPorMes[mesKey]) {
                gruposPorMes[mesKey] = {
                    id: mesKey,
                    mes: mesFormateado,
                    ingresos: 0,
                    egresos: 0,
                    balance: 0,
                    diasMap: {} 
                };
            }

            // Sumar al total del mes
            if (t.tipo === 'ingreso') {
                gruposPorMes[mesKey].ingresos += t.monto;
            } else {
                gruposPorMes[mesKey].egresos += t.monto;
            }

            // Agrupar por día dentro del mes
            if (!gruposPorMes[mesKey].diasMap[t.fecha]) {
                gruposPorMes[mesKey].diasMap[t.fecha] = { 
                    fecha: t.fecha, 
                    ingresos: 0, 
                    egresos: 0, 
                    balance: 0 
                };
            }

            const diaGroup = gruposPorMes[mesKey].diasMap[t.fecha];
            if (t.tipo === 'ingreso') diaGroup.ingresos += t.monto;
            else diaGroup.egresos += t.monto;
        });

        // C. Convertir el Objeto a Array y calcular balances finales
        const resultado = Object.values(gruposPorMes).map(grupo => {
            grupo.balance = grupo.ingresos - grupo.egresos;

            // Convertir mapa de días a array y calcular balance diario
            grupo.dias = Object.values(grupo.diasMap).map(dia => ({
                ...dia,
                balance: dia.ingresos - dia.egresos
            })).sort((a, b) => b.fecha.localeCompare(a.fecha)); // Orden descendente

            delete grupo.diasMap;
            return grupo;
        });

        // D. Ordenar Meses Descendente (Más reciente primero para la tabla)
        return resultado.sort((a, b) => b.id.localeCompare(a.id));

    }, [pagosDB, movimientosDB, loadingPagos, loadingMov]);

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    if (loadingPagos || loadingMov) return <div className={Style.loading}>Calculando estadísticas...</div>;

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <h2 className={Style.title}>Resumen Financiero Mensual</h2>
                <p className={Style.subtitle}>Desglose de ingresos, egresos y balance por período</p>
            </header>
            
            <div className={Style.tableWrapper}>
                <table className={Style.table}>
                    <thead>
                        <tr>
                            <th>Período</th>
                            <th className={Style.textRight}>Total Ingresos</th>
                            <th className={Style.textRight}>Total Egresos</th>
                            <th className={Style.textRight}>Balance Neto</th>
                            <th className={Style.textCenter}>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosMensuales.length > 0 ? (
                            datosMensuales.map((mes) => (
                                <React.Fragment key={mes.id}>
                                    <tr 
                                        className={`${Style.rowMain} ${expandedRow === mes.id ? Style.rowActive : ''}`}
                                        onClick={() => toggleRow(mes.id)}
                                    >
                                        <td className={Style.fontBold}>{mes.mes}</td>
                                        <td className={`${Style.textRight} ${Style.textGreen}`}>
                                            ${mes.ingresos.toLocaleString()}
                                        </td>
                                        <td className={`${Style.textRight} ${Style.textRed}`}>
                                            ${mes.egresos.toLocaleString()}
                                        </td>
                                        <td className={`${Style.textRight} ${Style.fontBold} ${mes.balance >= 0 ? Style.textBlue : Style.textRed}`}>
                                            ${mes.balance.toLocaleString()}
                                        </td>
                                        <td className={Style.textCenter}>
                                            {expandedRow === mes.id ? <IconChevronUp size={20}/> : <IconChevronDown size={20}/>}
                                        </td>
                                    </tr>
                                    {expandedRow === mes.id && (
                                        <tr>
                                            <td colSpan="5" className={Style.detailCell}>
                                                <div className={Style.detailContainer}>
                                                    <h4 className={Style.detailTitle}>Detalle diario: {mes.mes}</h4>
                                                    <table className={Style.detailTable}>
                                                        <thead>
                                                            <tr>
                                                                <th>Fecha</th>
                                                                <th className={Style.textRight}>Ingresos</th>
                                                                <th className={Style.textRight}>Egresos</th>
                                                                <th className={Style.textRight}>Balance Día</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mes.dias.map((dia, idx) => {
                                                                // Formatear fecha día sin desfase
                                                                const [y, m, d] = dia.fecha.split('-');
                                                                const dateObj = new Date(y, m - 1, d);
                                                                return (
                                                                    <tr key={idx}>
                                                                        <td>{dateObj.toLocaleDateString('es-AR')}</td>
                                                                        <td className={`${Style.textRight} ${Style.textGreen}`}>
                                                                            ${dia.ingresos.toLocaleString()}
                                                                        </td>
                                                                        <td className={`${Style.textRight} ${Style.textRed}`}>
                                                                            ${dia.egresos.toLocaleString()}
                                                                        </td>
                                                                        <td className={`${Style.textRight} ${Style.fontBold}`}>
                                                                            ${dia.balance.toLocaleString()}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>No hay movimientos registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {datosMensuales.length > 0 && (
                <div className={Style.chartsSection}>
                    <div className={Style.chartCard}>
                        <div className={Style.chartHeader}>
                            <IconChartBar size={20} color="var(--deep-twilight)" />
                            <h3>Comparativa Mensual</h3>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={[...datosMensuales].reverse()}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                                    <XAxis dataKey="mes" fontSize={12} tick={{fill: '#666'}} tickFormatter={(val) => val.split(' ')[0].substring(0,3)} />
                                    <YAxis fontSize={12} tick={{fill: '#666'}} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        formatter={(value) => `$${value.toLocaleString()}`}
                                    />
                                    <Legend />
                                    <Bar dataKey="ingresos" name="Ingresos" fill="var(--green-3)" radius={[4, 4, 0, 0]} barSize={40} />
                                    <Bar dataKey="egresos" name="Egresos" fill="var(--cherry-rose)" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className={Style.chartCard}>
                        <div className={Style.chartHeader}>
                            <IconTrendingUp size={20} color="var(--deep-twilight)" />
                            <h3>Evolución del Balance</h3>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <AreaChart data={[...datosMensuales].reverse()}>
                                    <defs>
                                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--french-blue)" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="var(--french-blue)" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                                    <XAxis dataKey="mes" fontSize={12} tick={{fill: '#666'}} tickFormatter={(val) => val.split(' ')[0].substring(0,3)} />
                                    <YAxis fontSize={12} tick={{fill: '#666'}} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        formatter={(value) => `$${value.toLocaleString()}`}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="balance" 
                                        name="Balance Neto" 
                                        stroke="var(--french-blue)" 
                                        fillOpacity={1} 
                                        fill="url(#colorBalance)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Resumen;