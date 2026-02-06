import { useParams, Link } from "react-router-dom";
import Style from "../../Styles/Clientes/Detalle.module.css";
import { IconArrowLeft, IconFileText } from '@tabler/icons-react';
import { useGetClienteByDniQuery } from '../../Redux/api/clientesApi';

const Detalle = () => {
    const { id } = useParams();
    const { data: cliente, isLoading, error } = useGetClienteByDniQuery(id);
    if (isLoading) return <div className={Style.loadingContainer}>Cargando datos del cliente...</div>;
    
    if (error) return (
        <div className={Style.errorContainer}>
            <h3>Error al cargar cliente</h3>
            <p>{error.data?.error || "No se pudo conectar con el servidor"}</p>
            <Link to="/admin/clientes/listado" className={Style.btnVolver}>Volver al listado</Link>
        </div>
    );

    if (!cliente) return <div className={Style.errorContainer}>Cliente no encontrado.</div>;
    const polizasDelCliente = cliente.polizas || []; 

    return (
        <section className={Style.detalleContainer}>
            <header className={Style.headerDetalle}>
                <nav className={Style.nav}>
                    <Link to="/admin/clientes/listado" className={Style.btnVolver}>
                        <IconArrowLeft size={20} /> Volver
                    </Link>
                </nav>
                <div style={{display:'flex', alignItems:'center', gap: '10px'}}>
                    <h2 className={Style.titulo}>Detalle del Cliente</h2>
                    <span className={Style.dniBadge}>DNI: {cliente.dni}</span>
                </div>
            </header>

            <section className={Style.cardInfo}>
                <h3 className={Style.subTitle}>Información Personal</h3>
                <article className={Style.datosCliente}>
                    <div className={Style.datoItem}>
                        <span className={Style.label}>Nombre Completo:</span>
                        <span className={Style.valor}> {cliente.nombre}</span>
                    </div>
                    <div className={Style.datoItem}>
                        <span className={Style.label}>DNI:</span>
                        <span className={Style.valor}> {cliente.dni}</span>
                    </div>
                    <div className={Style.datoItem}>
                        <span className={Style.label}>Teléfono:</span>
                        <span className={Style.valor}> {cliente.telefono || "No registrado"}</span>
                    </div>
                    <div className={Style.datoItem}>
                        <span className={Style.label}>Dirección:</span>
                        <span className={Style.valor}> {cliente.direccion}</span>
                    </div>
                     <div className={Style.datoItem}>
                        <span className={Style.label}>Localidad:</span>
                        <span className={Style.valor}> 
                            {cliente.localidad?.localidad || `ID: ${cliente.id_localidad}`}
                        </span>
                    </div>
                    <div className={Style.datoItem}>
                        <span className={Style.label}>Estado:</span>
                        <span className={Style.tagActivo}>Activo</span>
                    </div>
                </article>
            </section>

            <section className={Style.seccionTabla}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3 className={Style.subTitle}>Historial de Pólizas ({polizasDelCliente.length})</h3>
                    <Link to={`/admin/polizas/nueva?dni=${cliente.dni}`} className={Style.btnNuevaPoliza}>
                        + Nueva Póliza
                    </Link>
                </div>
                
                {polizasDelCliente.length > 0 ? (
                    <div className={Style.tableResponsive}>
                        <table className={Style.tablaPolizas}>
                            <thead>
                                <tr>
                                    <th>N° Póliza</th>
                                    <th>Vigencia Desde</th>
                                    <th>Vigencia Hasta</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {polizasDelCliente.map((poliza) => (
                                    <tr key={poliza.numero || poliza.id}>
                                        <td style={{fontWeight: 'bold'}}>{poliza.numero}</td>
                                        <td>{new Date(poliza.inicio).toLocaleDateString()}</td>
                                        <td>{new Date(poliza.fin).toLocaleDateString()}</td>
                                        <td>
                                            {poliza.valido ? 
                                                <span className={Style.tagVigente}>Vigente</span> : 
                                                <span className={Style.tagVencida}>Anulada/Vencida</span>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/admin/polizas/detalle/${poliza.numero}`} className={Style.detalle}>
                                                <IconFileText size={18}/> Ver Detalle
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={Style.emptyState}>
                        <p className={Style.sinResultados}>Este cliente no posee pólizas registradas.</p>
                    </div>
                )}
            </section>
        </section>
    );
};

export default Detalle;