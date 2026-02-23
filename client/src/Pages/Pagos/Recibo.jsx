import React from 'react';
import { useParams, Link } from "react-router-dom";
import Style from "../../Styles/Pagos/Recibo.module.css";
import { IconPrinter, IconArrowLeft, IconCheck } from '@tabler/icons-react';

// Hooks de Redux
import { useGetPagoByIdQuery } from '../../Redux/api/pagosApi';
import { useGetPolizaByNumeroQuery } from '../../Redux/api/polizasApi';

const Recibo = () => {
    const { id } = useParams(); 

    // 1. Obtener datos del Pago
    const { data: pago, isLoading: loadingPago, error: errorPago } = useGetPagoByIdQuery(id);
    
    // 2. Obtener datos de la Póliza (y el Cliente que viene anidado)
    const { data: poliza, isLoading: loadingPoliza } = useGetPolizaByNumeroQuery(pago?.id_poliza, {
        skip: !pago?.id_poliza
    });

    // Utilidades de formato
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('es-AR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (loadingPago || loadingPoliza) return <div className={Style.mensaje}>Generando recibo...</div>;
    if (errorPago || !pago) return <div className={Style.mensajeError}>Error al cargar el recibo o pago no encontrado.</div>;

    const cliente = poliza?.cliente;
    const vehiculo = poliza?.poliza_vehiculos?.[0]?.vehiculo;

    return (
        <div className={Style.pageContainer}>
            {/* Controles superiores (No se imprimen) */}
            <div className={`${Style.controles} ${Style.noPrint}`}>
                <Link to="/admin/caja/listado" className={Style.btnVolver}>
                    <IconArrowLeft size={18} /> Volver a Caja
                </Link>
                <button className={Style.btnPrint} onClick={() => window.print()}>
                    <IconPrinter size={18} /> Imprimir Recibo
                </button>
            </div>

            {/* Contenedor principal del Recibo */}
            <div className={Style.reciboCard}>
                
                {/* Cabecera del Recibo */}
                <header className={Style.reciboHeader}>
                    <div className={Style.empresaInfo}>
                        <h2 className={Style.empresaNombre}>Sistema Seguros</h2>
                        <p>Sucursal: {pago.empleado?.sucursal?.sucursal || "Central"}</p>
                        <p>Atendido por: {pago.empleado?.nombre || "Administración"}</p>
                    </div>
                    <div className={Style.reciboMeta}>
                        <h1 className={Style.tituloRecibo}>RECIBO OFICIAL</h1>
                        <p className={Style.numeroRecibo}>N° {pago.id.toString().padStart(8, '0')}</p>
                        <p className={Style.fechaRecibo}>Fecha: {formatDate(pago.fecha)}</p>
                        {!pago.valido && <div className={Style.selloAnulado}>ANULADO</div>}
                    </div>
                </header>

                <div className={Style.divider}></div>

                {/* Declaración Principal */}
                <section className={Style.declaracion}>
                    <p>
                        Recibimos de <strong>{cliente?.nombre?.toUpperCase() || "CLIENTE S/D"}</strong> 
                        (DNI/CUIT: {cliente?.dni || "-"}), la cantidad de:
                    </p>
                    <div className={Style.montoDestacado}>
                        {formatCurrency(pago.importe)}
                    </div>
                </section>

                {/* Detalles divididos en columnas */}
                <section className={Style.detallesGrid}>
                    <div className={Style.detalleColumna}>
                        <h4 className={Style.columnaTitulo}>Concepto del Pago</h4>
                        <ul className={Style.listaDatos}>
                            <li><strong>Operación:</strong> {pago.observacion || "Pago de Póliza"}</li>
                            <li><strong>Método de Pago:</strong> {pago.metodo?.metodo || "Efectivo"}</li>
                            <li><strong>Estado:</strong> {pago.valido ? "Aprobado" : "Anulado"}</li>
                        </ul>
                    </div>

                    <div className={Style.detalleColumna}>
                        <h4 className={Style.columnaTitulo}>Referencia de Póliza</h4>
                        <ul className={Style.listaDatos}>
                            <li><strong>Póliza N°:</strong> {poliza?.numero || pago.id_poliza}</li>
                            <li><strong>Riesgo:</strong> {poliza?.tipo_poliza?.tipo || "S/D"}</li>
                            {vehiculo && (
                                <li>
                                    <strong>Vehículo:</strong> {vehiculo.patente.toUpperCase()} - {vehiculo.modelo}
                                </li>
                            )}
                            <li><strong>Vigencia:</strong> {poliza ? `${new Date(poliza.inicio).toLocaleDateString()} al ${new Date(poliza.fin).toLocaleDateString()}` : "-"}</li>
                        </ul>
                    </div>
                </section>

                <div className={Style.divider}></div>

                {/* Pie del Recibo (Firmas) */}
                <footer className={Style.reciboFooter}>
                    <div className={Style.firmaBox}>
                        <div className={Style.lineaFirma}></div>
                        <p>Firma y Aclaración Cliente</p>
                    </div>
                    <div className={Style.firmaBox}>
                        <div className={Style.selloAprobado}>
                            <IconCheck size={24} /> PAGO REGISTRADO
                        </div>
                        <p>Firma Cajero / Sello Empresa</p>
                    </div>
                </footer>
                
                <p className={Style.notaLegal}>
                    Este documento es un comprobante válido de pago. Conserve este recibo para cualquier reclamo futuro.
                </p>
            </div>
        </div>
    );
};

export default Recibo;