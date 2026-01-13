import { useState } from 'react';
import Style from '../../Styles/Usuarios/Listado.module.css';
import { Link } from 'react-router-dom';
import { IconEye, IconPower } from '@tabler/icons-react';

const Listado = () => {

    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: 'Juan Pérez', cuit: "20-34567890-3", estado: 'Activo' },
        { id: 2, nombre: 'María Gómez', cuit: "27-12345678-9", estado: 'Inactivo' },
        { id: 3, nombre: 'Carlos Rodríguez', cuit: "23-98765432-1", estado: 'Activo' },
    ]);

    const cambiarEstado = (index) => {
        const nuevosUsuarios = [...usuarios];
        const usuario = nuevosUsuarios[index];

        const nuevoEstado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';
        
        usuario.estado = nuevoEstado;
        setUsuarios(nuevosUsuarios);
    };

    return(
        <section className={Style.listadoContainer}>
            <header className={Style.header}>
                <h2>Listado de Usuarios</h2>
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
                        {usuarios.map((usuario, index) => (
                            <tr key={index}>
                                <td style={{fontWeight: '600'}}>{usuario.nombre}</td>
                                <td>{usuario.cuit}</td>
                                <td style={{textAlign: 'center'}}>
                                    <span className={usuario.estado === 'Activo' ? Style.tagActivo : Style.tagInactivo}>
                                        {usuario.estado}
                                    </span>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    <div className={Style.accionesContainer}>
                                        
                                        <button 
                                            onClick={() => cambiarEstado(index)}
                                            className={Style.btnEstado}
                                            title={usuario.estado === 'Activo' ? "Desactivar usuario" : "Activar usuario"}
                                        >
                                            <IconPower 
                                                size={18} 
                                                color={usuario.estado === 'Activo' ? "var(--night-bordeaux)" : "var(--dark-spruce)"} 
                                            />
                                        </button>

                                        <Link to={`/admin/usuarios/detalle/${index}`} className={Style.btnDetalle}>
                                            <IconEye size={18} /> Detalle
                                        </Link>
                                        <Link to={`/admin/usuarios/editar/${index}`} className={Style.btnDetalle}>Editar</Link>
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