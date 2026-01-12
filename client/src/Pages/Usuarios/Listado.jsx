import Style from '../../Styles/Usuarios/Listado.module.css';
import { Link } from 'react-router-dom';
import { IconEye } from '@tabler/icons-react';

const Listado = () => {

    const usuarios = [
        { nombre: 'Juan Pérez', cuit: "20-34567890-3", estado: 'Activo' },
        { nombre: 'María Gómez', cuit: "27-12345678-9", estado: 'Inactivo' },
        { nombre: 'Carlos Rodríguez', cuit: "23-98765432-1", estado: 'Activo' },
    ];

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
                                    <Link to={`/admin/usuarios/detalle/${index}`} className={Style.btnDetalle}>
                                        <IconEye size={18} /> Detalle
                                    </Link>
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