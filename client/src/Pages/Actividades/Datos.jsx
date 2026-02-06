import React, { useMemo } from 'react';
import Style from "../../Styles/Actividades/Datos.module.css";
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

const Datos = () => {

    // --- GENERACIÓN DE DATOS (MOCK) ---
    const generarDatos = (base, cantidad) => {
        return Array.from({ length: cantidad }, (_, i) => ({
            ...base,
            id: i,
            // Generamos horas aleatorias para que el gráfico de tiempo tenga variedad
            hora: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
        }));
    };

    // Usamos useMemo para que no regenere los datos en cada render (opcional con datos estáticos, pero buena práctica)
    const dataPolizas = useMemo(() => generarDatos({ tipo: 'Pólizas', usuario: 'admin1' }, 12), []);
    const dataPagos = useMemo(() => generarDatos({ tipo: 'Pagos', usuario: 'admin1' }, 8), []);
    const dataMovimientos = useMemo(() => generarDatos({ tipo: 'Movimientos', usuario: 'admin2' }, 15), []);
    const dataClientes = useMemo(() => generarDatos({ tipo: 'Clientes', usuario: 'admin1' }, 6), []);

    // --- PROCESAMIENTO DE DATOS PARA GRÁFICOS ---

    // 1. Datos para: Cantidad por Tipo de Actividad
    const dataPorTipo = [
        { name: 'Pólizas', cantidad: dataPolizas.length, color: 'var(--french-blue)' },
        { name: 'Pagos', cantidad: dataPagos.length, color: 'var(--green-3)' },
        { name: 'Movimientos', cantidad: dataMovimientos.length, color: 'var(--cherry-rose)' },
        { name: 'Clientes', cantidad: dataClientes.length, color: 'var(--deep-twilight)' },
    ];

    // 2. Datos para: Actividad por Usuario (Unimos todos y contamos)
    const dataPorUsuario = useMemo(() => {
        const todos = [...dataPolizas, ...dataPagos, ...dataMovimientos, ...dataClientes];
        const conteo = {};
        
        todos.forEach(item => {
            conteo[item.usuario] = (conteo[item.usuario] || 0) + 1;
        });

        return Object.keys(conteo).map(user => ({
            usuario: user,
            actividades: conteo[user]
        }));
    }, [dataPolizas, dataPagos, dataMovimientos, dataClientes]);

    // 3. Datos para: Línea de Tiempo (Agrupar por hora)
    const dataPorHora = useMemo(() => {
        const todos = [...dataPolizas, ...dataPagos, ...dataMovimientos, ...dataClientes];
        const horas = Array(24).fill(0); // Array de 0 a 23 horas

        todos.forEach(item => {
            const hora = parseInt(item.hora.split(':')[0], 10); // Extraer "14" de "14:30"
            horas[hora] += 1;
        });

        return horas.map((cant, idx) => ({
            hora: `${idx}:00`,
            cantidad: cant
        }));
    }, [dataPolizas, dataPagos, dataMovimientos, dataClientes]);


    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <h2 className={Style.title}>Tablero de Actividades</h2>
                <p className={Style.subtitle}>Métricas visuales del rendimiento del sistema</p>
            </header>

            <div className={Style.chartsGrid}>
                
                {/* GRÁFICO 1: Barras por Tipo */}
                <div className={Style.chartCard}>
                    <h3 className={Style.chartTitle}>Volumen por Tipo</h3>
                    <div className={Style.chartWrapper}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataPorTipo}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                                <XAxis dataKey="name" tick={{fontSize: 12}} />
                                <YAxis />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                                <Bar dataKey="cantidad" radius={[4, 4, 0, 0]} barSize={50} fill="var(--french-blue)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* GRÁFICO 2: Área por Hora (Tráfico) */}
                <div className={Style.chartCard}>
                    <h3 className={Style.chartTitle}>Actividad por Hora del Día</h3>
                    <div className={Style.chartWrapper}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dataPorHora}>
                                <defs>
                                    <linearGradient id="colorActividad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--green-3)" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="var(--green-3)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0"/>
                                <XAxis dataKey="hora" tick={{fontSize: 10}} interval={2} />
                                <YAxis />
                                <Tooltip contentStyle={{borderRadius: '8px'}} />
                                <Area type="monotone" dataKey="cantidad" stroke="var(--green-3)" fillOpacity={1} fill="url(#colorActividad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* GRÁFICO 3: Barras por Usuario */}
                <div className={`${Style.chartCard} ${Style.fullWidth}`}>
                    <h3 className={Style.chartTitle}>Productividad por Usuario</h3>
                    <div className={Style.chartWrapper}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataPorUsuario} layout="vertical" margin={{left: 20}}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#e0e0e0" />
                                <XAxis type="number" />
                                <YAxis dataKey="usuario" type="category" width={80} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                                <Bar dataKey="actividades" fill="var(--deep-twilight)" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Datos;