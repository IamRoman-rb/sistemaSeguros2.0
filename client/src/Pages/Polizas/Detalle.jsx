import { useParams, Link } from "react-router-dom";
import Style from "../../Styles/Polizas/Detalle.module.css";
// 1. Agregamos IconEdit a los imports
import { IconArrowLeft, IconFileCertificate, IconUser, IconCurrencyDollar, IconCar, IconEdit } from '@tabler/icons-react';
import { useGetPolizaByNumeroQuery } from '../../Redux/api/polizasApi'; 

const Detalle = () => {
    const { id: numeroPoliza } = useParams(); 
    const { data: poliza, isLoading, error } = useGetPolizaByNumeroQuery(numeroPoliza);
    
    if (isLoading) return <div className={Style.loadingContainer}>Cargando detalle de la póliza...</div>;
    
    if (error) return (
        <div className={Style.errorContainer}>
            <h2>Error al cargar la póliza</h2>
            <p>{error.data?.error || "No se pudo conectar con el servidor"}</p>
            <Link to="/admin/polizas/listado" className={Style.btnVolver}>Volver al listado</Link>
        </div>
    );

    if (!poliza) return <div className={Style.errorContainer}>Póliza no encontrada.</div>;
    
    const cliente = poliza.cliente;
    const vehiculo = poliza.poliza_vehiculos?.[0]?.vehiculo;
    const pagos = poliza.pagos || [];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('es-AR');
    };

    return(
        <section className={Style.detalleContainer}>
            <header className={Style.headerDetalle}>
                {/* Contenedor Flex para separar los botones */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
                    <Link to="/admin/polizas/listado" className={Style.btnVolver}>
                        <IconArrowLeft size={20} /> Volver
                    </Link>

                    {/* 2. Botón de Editar Póliza */}
                    <Link 
                        to={`/admin/polizas/editar/${poliza.numero}`} 
                        className={Style.btnVolver}
                        style={{ color: 'var(--french-blue)' }} // Color distintivo para editar
                    >
                        <IconEdit size={20} /> Editar Póliza
                    </Link>
                </div>

                <div>
                    <h2 className={Style.tituloPagina}>Detalle de Póliza</h2>
                    <span className={Style.subtitulo}>N° Ref: {poliza.numero}</span>
                </div>
            </header>

            <div className={Style.infoGrid}>
                <article className={Style.card}>
                    <header className={Style.cardHeader}>
                        <IconFileCertificate size={24} color="var(--deep-twilight)" />
                        <h3>Datos de la Póliza</h3>
                    </header>
                    <div className={Style.cardBody}>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Número:</span>
                            <span className={Style.valor}>{poliza.numero}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Vigencia Desde:</span>
                            <span className={Style.valor}>{formatDate(poliza.inicio)}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Vigencia Hasta:</span>
                            <span className={Style.valor}>{formatDate(poliza.fin)}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Tipo:</span>
                            <span className={Style.valor}>{poliza.tipo_poliza?.tipo}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Premio Total:</span>
                            <span className={Style.valor} style={{fontWeight: 'bold'}}>
                                {formatCurrency(poliza.premio)}
                            </span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Estado:</span>
                            <span 
                                style={{
                                    color: poliza.valido ? 'green' : 'red', 
                                    fontWeight: 'bold'
                                }}
                            >
                                {poliza.valido ? "Vigente" : "Anulada/Vencida"}
                            </span>
                        </div>
                    </div>
                </article>

                <article className={Style.card}>
                    <header className={Style.cardHeader}>
                        <IconUser size={24} color="var(--deep-twilight)" />
                        <h3>Datos del Tomador</h3>
                    </header>
                    <div className={Style.cardBody}>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Cliente:</span>
                            {cliente ? (
                                <Link to={`/admin/clientes/detalle/${cliente.dni}`} className={Style.linkCliente}>
                                    {cliente.nombre}
                                </Link>
                            ) : (
                                <span className={Style.valor}>Desconocido</span>
                            )}
                        </div>
                        {cliente && (
                            <>
                                <div className={Style.datoRow}>
                                    <span className={Style.label}>DNI:</span>
                                    <span className={Style.valor}>{cliente.dni}</span>
                                </div>
                                <div className={Style.datoRow}>
                                    <span className={Style.label}>Teléfono:</span>
                                    <span className={Style.valor}>{cliente.telefono}</span>
                                </div>
                                <div className={Style.datoRow}>
                                    <span className={Style.label}>Dirección:</span>
                                    <span className={Style.valor}>{cliente.direccion}</span>
                                </div>
                            </>
                        )}
                    </div>
                </article>

                {vehiculo && (
                    <article className={Style.card}>
                        <header className={Style.cardHeader}>
                            <IconCar size={24} color="var(--deep-twilight)" />
                            <h3>Datos del Vehículo</h3>
                        </header>
                        <div className={Style.cardBody}>
                            <div className={Style.datoRow}>
                                <span className={Style.label}>Patente:</span>
                                <span className={Style.valor} style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                    {vehiculo.patente}
                                </span>
                            </div>
                            <div className={Style.datoRow}>
                                <span className={Style.label}>Modelo:</span>
                                <span className={Style.valor}>{vehiculo.modelo} ({vehiculo.anio})</span>
                            </div>
                            <div className={Style.datoRow}>
                                <span className={Style.label}>Motor:</span>
                                <span className={Style.valor}>{vehiculo.motor}</span>
                            </div>
                            <div className={Style.datoRow}>
                                <span className={Style.label}>Chasis:</span>
                                <span className={Style.valor}>{vehiculo.chasis}</span>
                            </div>
                        </div>
                    </article>
                )}
            </div>

            <section className={Style.seccionPagos}>
                <div style={{padding: '1.5rem', borderBottom: '1px solid var(--alabaster-grey)', display:'flex', alignItems:'center', gap: '0.5rem'}}>
                    <IconCurrencyDollar size={24} color="var(--deep-twilight)"/>
                    <h3 style={{padding: 0, border: 'none', margin: 0}}>Historial de Pagos</h3>
                </div>
                
                <div className={Style.tableResponsive}>
                    <table className={Style.tabla}>
                        <thead>
                            <tr>
                                <th>Fecha de Pago</th>
                                <th style={{textAlign: 'right'}}>Monto</th>
                                <th style={{textAlign: 'center'}}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagos.map((pago) => (
                                <tr key={pago.id}>
                                    <td>{formatDate(pago.fecha)}</td>
                                    <td style={{textAlign: 'right', fontWeight: '600'}}>
                                        {formatCurrency(pago.monto)}
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        <span className={`${Style.tagPago} ${Style.pagado}`}>
                                            Pagado
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pagos.length === 0 && (
                        <p style={{padding: '2rem', textAlign: 'center', color: 'var(--slate-grey)', fontStyle: 'italic'}}>
                            No hay pagos registrados para esta póliza.
                        </p>
                    )}
                </div>
            </section>
        </section>
    );
}

export default Detalle;