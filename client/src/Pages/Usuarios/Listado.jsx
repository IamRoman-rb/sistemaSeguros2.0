import React from 'react';
import Style from '../../Styles/usuarios/Listado.module.css';
import { Link } from 'react-router-dom';
import { IconEye, IconPower } from '@tabler/icons-react';
import { useGetEmpleadosQuery, useUpdateEmpleadoMutation, useDeleteEmpleadoMutation } from '../../Redux/api/empleadosApi';

const Listado = () => {
const { data: empleados = [], isLoading, isError, error } = useGetEmpleadosQuery();
    const [updateEmpleado] = useUpdateEmpleadoMutation();
    const [deleteEmpleado] = useDeleteEmpleadoMutation()    

    const cambiarEstado = async (empleado) => {
        const nuevoEstado = empleado.estado === 'Activo' ? 'Inactivo' : 'Activo';

        try {
            await updateEmpleado({ 
                id: empleado.id, 
                ...empleado, 
                estado: nuevoEstado 
            }).unwrap();
        } catch (err) {
            console.error('Error al actualizar estado:', err);
            alert("No se pudo cambiar el estado del empleado. Por favor, inténtalo de nuevo.");
        }
    };    

    if (isLoading) return <div style={{padding: '20px'}}>Cargando empleados...</div>;
    if (isError) return <div style={{padding: '20px', color: 'red'}}>Error: {error.message}</div>;

    return (
        <section className={Style.listadoContainer}>
            <header className={Style.header}>
                <h2>Listado de Empleados</h2>
            </header>
            
            <div className={Style.tableResponsive}>
                <table className={Style.tabla}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>CUIT</th>
                            <th style={{textAlign: 'center'}}>Estado</th>
                            <th style={{textAlign: 'right'}}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((empleado) => (
                            <tr key={empleado.id}>
                                <td style={{fontWeight: '600'}}>{empleado.nombre}</td>
                                <td>{empleado.dni}</td>
                                <td style={{textAlign: 'center'}}>
                                    <span className={empleado.estado === 'Activo' ? Style.tagActivo : Style.tagInactivo}>
                                        {empleado.estado}
                                    </span>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    <div className={Style.accionesContainer}>
                                        
                                        <button 
                                            onClick={() => cambiarEstado(empleado)}
                                            className={Style.btnEstado}
                                            title={empleado.estado === 'Activo' ? "Desactivar empleado" : "Activar empleado"}
                                        >
                                            <IconPower 
                                                size={18} 
                                                color={empleado.estado === 'Activo' ? "var(--night-bordeaux)" : "var(--dark-spruce)"} 
                                            />
                                        </button>

                                        <Link to={`/admin/usuarios/detalle/${empleado.id}`} className={Style.btnDetalle}>
                                            <IconEye size={18} /> Detalle
                                        </Link>
                                        <Link to={`/admin/usuarios/editar/${empleado.id}`} className={Style.btnDetalle}>Editar</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Listado;