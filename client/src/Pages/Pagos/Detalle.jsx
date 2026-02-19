import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft, IconPrinter } from '@tabler/icons-react';
import Style from '../../Styles/Pagos/Detalle.module.css';

// Hooks de Redux
import { useGetPagoByIdQuery } from '../../Redux/api/pagosApi';
import { useGetPolizaByNumeroQuery } from '../../Redux/api/polizasApi';
import { useGetMetodosQuery } from '../../Redux/api/metodosApi';
import { useGetMarcasQuery } from '../../Redux/api/marcasApi';
import { useGetCoberturasQuery } from '../../Redux/api/coberturasApi'; // Añadido para asegurar la cobertura/empresa

const Detalle = () => {
    const { id } = useParams();

    // 1. Carga de datos principales
    const { data: pago, isLoading: loadingPago, error: errorPago } = useGetPagoByIdQuery(id);

    // 2. Carga en cascada de la póliza asociada al pago
    const { data: poliza, isLoading: loadingPoliza } = useGetPolizaByNumeroQuery(pago?.id_poliza, {
        skip: !pago?.id_poliza
    });

    // 3. Carga de catálogos para resolver IDs a nombres
    const { data: metodos = [] } = useGetMetodosQuery();
    const { data: marcas = [] } = useGetMarcasQuery();
    const { data: coberturas = [] } = useGetCoberturasQuery();

    const user = { role: 'admin' };

    // --- Utilidades ---
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('es-AR', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };

    // --- Manejo de Estados Visuales ---
    if (loadingPago || loadingPoliza) return <div className={Style.loading}>Cargando comprobante...</div>;
    if (errorPago || !pago) return <div className={Style.notFound}>Pago no encontrado</div>;

    // --- Extracción Segura de Datos ---
    const cliente = poliza?.cliente;
    const isAutomotor = poliza?.tipo_poliza?.tipo === "Automotor";

    // 1. Resolver Vehículo (Si aplica)
    const vehiculoData = poliza?.poliza_vehiculos?.[0]?.vehiculo;
    let marcaNombre = "S/D";
    if (vehiculoData) {
        // Buscamos la marca en el catálogo usando el id_marca del vehículo
        marcaNombre = marcas.find(m => m.id === vehiculoData.id_marca)?.marca || "S/D";
    }

    // 2. Resolver Método de Pago
    const metodoNombre = metodos.find(m => m.id === pago.id_metodo)?.metodo || pago.metodo?.metodo || "Desconocido";

    // 3. Resolver Cobertura y Aseguradora
    let nombreCobertura = "S/D";
    let nombreEmpresa = "S/D";

    if (poliza?.poliza_coberturas?.length > 0) {
        const idCoberturaPoliza = poliza.poliza_coberturas[0].id_cobertura;

        // Buscamos la cobertura en el catálogo general
        const coberturaEncontrada = coberturas.find(c => c.id === idCoberturaPoliza);

        if (coberturaEncontrada) {
            nombreCobertura = `${coberturaEncontrada.cobertura} - ${coberturaEncontrada.descripcion || ''}`;

            // Extraemos la empresa vinculada a esta cobertura
            if (coberturaEncontrada.cobertura_empresas?.length > 0) {
                nombreEmpresa = coberturaEncontrada.cobertura_empresas[0].empresa?.empresa || "S/D";
            }
        }
    }

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <div className={Style.headerTitleGroup}>
                    <Link to={`/${user.role}/caja/listado`} className={Style.btnBack}>
                        <IconArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className={Style.title}>Detalle de Pago</h2>
                        <span className={Style.subtitle}>ID Transacción: #{pago.id}</span>
                    </div>
                </div>

                <button className={Style.btnPrint} onClick={() => window.print()}>
                    <IconPrinter size={18} /> Imprimir Recibo
                </button>
            </header>

            <div className={Style.gridLayout}>
                {/* --- INFORMACIÓN DEL PAGO --- */}
                <article className={Style.card}>
                    <h3 className={Style.cardTitle}>Información del Pago</h3>
                    <div className={Style.dataGrid}>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Fecha de Pago</span>
                            <span className={Style.value}>{formatDate(pago.fecha)}</span>
                        </div>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Importe</span>
                            <span className={`${Style.value} ${Style.amount}`}>
                                {formatCurrency(pago.importe)}
                            </span>
                        </div>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Método</span>
                            <span className={Style.value}>{metodoNombre}</span>
                        </div>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Comprobante</span>
                            <span className={Style.value}>
                                REC-{pago.id.toString().padStart(8, '0')}
                            </span>
                        </div>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Registrado por</span>
                            <span className={Style.badgeUser}>{pago.empleado?.nombre || "-"}</span>
                        </div>
                        {pago.observacion && (
                            <div className={Style.dataGroup} style={{ gridColumn: '1 / -1' }}>
                                <span className={Style.label}>Observaciones</span>
                                <span className={Style.value}>{pago.observacion}</span>
                            </div>
                        )}
                    </div>
                </article>

                {/* --- DATOS DEL CLIENTE --- */}
                <article className={Style.card}>
                    <h3 className={Style.cardTitle}>Datos del Cliente</h3>
                    <div className={Style.dataList}>
                        <div className={Style.row}>
                            <span className={Style.label}>Nombre:</span>
                            <span className={Style.value}>{cliente?.nombre || "-"}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>DNI:</span>
                            <span className={Style.value}>{cliente?.dni || "-"}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Teléfono:</span>
                            <span className={Style.value}>{cliente?.telefono || "-"}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Dirección:</span>
                            <span className={Style.value}>{cliente?.direccion || "-"}</span>
                        </div>
                    </div>
                </article>

                {/* --- DETALLE DE LA PÓLIZA --- */}
                <article className={Style.card}>
                    <h3 className={Style.cardTitle}>Detalle de Póliza</h3>
                    <div className={Style.dataList}>
                        <div className={Style.row}>
                            <span className={Style.label}>Póliza N°:</span>
                            <Link to={`/admin/polizas/detalle/${pago.id_poliza}`} className={Style.valueHighlight}>
                                {pago.id_poliza}
                            </Link>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Tipo:</span>
                            <span className={Style.value}>{poliza?.tipo_poliza?.tipo || "-"}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Vigencia:</span>
                            <span className={Style.value}>
                                {formatDate(poliza?.inicio)} al {formatDate(poliza?.fin)}
                            </span>
                        </div>

                        <div className={Style.row}>
                            <span className={Style.label}>Aseguradora:</span>
                            <span className={Style.value} style={{ fontWeight: 'bold', color: 'var(--french-blue)' }}>
                                {nombreEmpresa}
                            </span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Cobertura:</span>
                            <span className={Style.value}>{nombreCobertura}</span>
                        </div>
                        {isAutomotor && vehiculoData && (
                            <>
                                <hr style={{ border: 'none', borderTop: '1px solid var(--alabaster-grey)', margin: '10px 0' }} />
                                <div className={Style.row}>
                                    <span className={Style.label}>Vehículo:</span>
                                    <span className={Style.value}>
                                        {marcaNombre} {vehiculoData.modelo} ({vehiculoData.anio})
                                    </span>
                                </div>
                                <div className={Style.row}>
                                    <span className={Style.label}>Patente:</span>
                                    <span className={Style.value} style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                                        {vehiculoData.patente}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Detalle;