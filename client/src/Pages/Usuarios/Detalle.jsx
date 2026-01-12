import React from 'react';
import { useParams, Link } from "react-router-dom";
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area 
} from 'recharts';
import Style from '../../Styles/Usuarios/Detalle.module.css';
import { IconChevronLeft, IconUser, IconActivity, IconChartBar } from '@tabler/icons-react';

const Detalle = () => {
    const { id } = useParams();

    const usuarios = [
        { id: 0, nombre: 'Juan Pérez', cuit: "20-34567890-3", estado: 'Activo', email: 'juan.perez@sistema.com', rol: 'Administrador' },
        { id: 1, nombre: 'María Gómez', cuit: "27-12345678-9", estado: 'Inactivo', email: 'maria.gomez@sistema.com', rol: 'Vendedor' },
        { id: 2, nombre: 'Carlos Rodríguez', cuit: "23-98765432-1", estado: 'Activo', email: 'carlos.rod@sistema.com', rol: 'Supervisor' },
    ];

    const usuario = usuarios.find(u => u.id === Number(id));

    const dataAcciones = [
        { name: 'Altas', cantidad: 12, fill: '#00a884' },
        { name: 'Bajas', cantidad: 3, fill: '#d32f2f' },
        { name: 'Modif.', cantidad: 8, fill: '#0077b6' },
        { name: 'Login', cantidad: 25, fill: '#03045e' },
    ];

    const dataSemanal = [
        { dia: 'Lun', acciones: 4 },
        { dia: 'Mar', acciones: 7 },
        { dia: 'Mie', acciones: 2 },
        { dia: 'Jue', acciones: 10 },
        { dia: 'Vie', acciones: 5 },
        { dia: 'Sab', acciones: 1 },
        { dia: 'Dom', acciones: 0 },
    ];

    if (!usuario) return <div className={Style.error}>Usuario no encontrado</div>;

    return(
        <section className={Style.container}>
            <header className={Style.header}>
                <Link to="/admin/usuarios/listado" className={Style.btnVolver}>
                    <IconChevronLeft size={18} /> Volver
                </Link>
                <h2 className={Style.titulo}>Perfil de Usuario</h2>
            </header>

            <div className={Style.gridDashboard}>
                
                <article className={Style.cardInfo}>
                    <header className={Style.cardHeader}>
                        <IconUser size={22} color="var(--deep-twilight)" />
                        <h3>Información Personal</h3>
                    </header>
                    <div className={Style.cardBody}>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Nombre:</span>
                            <span className={Style.valor}>{usuario.nombre}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>CUIT:</span>
                            <span className={Style.valor}>{usuario.cuit}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Email:</span>
                            <span className={Style.valor}>{usuario.email}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Rol:</span>
                            <span className={Style.valor}>{usuario.rol}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Estado:</span>
                            <span className={usuario.estado === 'Activo' ? Style.tagActivo : Style.tagInactivo}>
                                {usuario.estado}
                            </span>
                        </div>
                    </div>
                </article>

                <article className={Style.cardChart}>
                    <header className={Style.cardHeader}>
                        <IconChartBar size={22} color="var(--deep-twilight)" />
                        <h3>Tipos de Operaciones</h3>
                    </header>
                    <div className={Style.chartContainer}>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={dataAcciones}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
                                <XAxis dataKey="name" tick={{fill: '#495057', fontSize: 12}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fill: '#495057', fontSize: 12}} axisLine={false} tickLine={false}/>
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ced4da'}}
                                    itemStyle={{color: '#343a40'}}
                                />
                                <Bar dataKey="cantidad" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </article>

                <article className={`${Style.cardChart} ${Style.fullWidth}`}>
                    <header className={Style.cardHeader}>
                        <IconActivity size={22} color="var(--deep-twilight)" />
                        <h3>Actividad Últimos 7 Días</h3>
                    </header>
                    <div className={Style.chartContainer}>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={dataSemanal}>
                                <defs>
                                    <linearGradient id="colorAcciones" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#023e8a" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#023e8a" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="dia" tick={{fill: '#495057'}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fill: '#495057'}} axisLine={false} tickLine={false}/>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
                                <Tooltip />
                                <Area 
                                    type="monotone" 
                                    dataKey="acciones" 
                                    stroke="var(--deep-twilight)" 
                                    fillOpacity={1} 
                                    fill="url(#colorAcciones)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </article>

            </div>
        </section>
    )
};

export default Detalle;