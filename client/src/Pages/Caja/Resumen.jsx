import React, { useState } from 'react';
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
const datosMensuales = [
    {
        id: '2024-03',
        mes: 'Marzo 2024',
        ingresos: 150000,
        egresos: 45000,
        balance: 105000,
        dias: [
            { fecha: '2024-03-01', ingresos: 50000, egresos: 5000, balance: 45000 },
            { fecha: '2024-03-10', ingresos: 30000, egresos: 10000, balance: 20000 },
            { fecha: '2024-03-15', ingresos: 20000, egresos: 5000, balance: 15000 },
            { fecha: '2024-03-30', ingresos: 50000, egresos: 25000, balance: 25000 },
        ]
    },
    {
        id: '2024-02',
        mes: 'Febrero 2024',
        ingresos: 120000,
        egresos: 80000,
        balance: 40000,
        dias: [
            { fecha: '2024-02-05', ingresos: 40000, egresos: 20000, balance: 20000 },
            { fecha: '2024-02-14', ingresos: 40000, egresos: 30000, balance: 10000 },
            { fecha: '2024-02-28', ingresos: 40000, egresos: 30000, balance: 10000 },
        ]
    },
    {
        id: '2024-01',
        mes: 'Enero 2024',
        ingresos: 90000,
        egresos: 95000,
        balance: -5000,
        dias: [
            { fecha: '2024-01-10', ingresos: 30000, egresos: 40000, balance: -10000 },
            { fecha: '2024-01-20', ingresos: 30000, egresos: 25000, balance: 5000 },
            { fecha: '2024-01-31', ingresos: 30000, egresos: 30000, balance: 0 },
        ]
    }
];

const Resumen = () => {
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (id) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

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
                        {datosMensuales.map((mes) => (
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
                                                        {mes.dias.map((dia, idx) => (
                                                            <tr key={idx}>
                                                                <td>{dia.fecha}</td>
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
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* RECORDATORIO PARA EL ROMAN DEL FUTURO :)
            
                ESTOS GRAFICOS SOLO SE TIENEN QUE MOSTRAR A LOS USUARIOS CON ROL ADMINISTRADOR, Y PROPIETARIO.
            */}
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
                                <XAxis dataKey="mes" fontSize={12} tick={{fill: '#666'}} />
                                <YAxis fontSize={12} tick={{fill: '#666'}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
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
                                <XAxis dataKey="mes" fontSize={12} tick={{fill: '#666'}} />
                                <YAxis fontSize={12} tick={{fill: '#666'}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
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
        </section>
    );
}
export default Resumen;