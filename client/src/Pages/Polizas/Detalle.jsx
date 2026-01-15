import { useParams, Link } from "react-router-dom";
import Style from "../../Styles/Polizas/Detalle.module.css";
import { IconArrowLeft, IconFileCertificate, IconUser, IconCurrencyDollar } from '@tabler/icons-react';
export const clientes = [
    { id: 1, nombreCompleto: "Juan Mateo Pérez", cuit: "20-34567890-3", telefono: "11 4567-8901" },
    { id: 2, nombreCompleto: "María Elena Rodríguez", cuit: "27-28901234-6", telefono: "351 15-234-5678" },
    { id: 3, nombreCompleto: "Carlos Alberto Gómez", cuit: "20-31234567-9", telefono: "261 444-5555" },
    { id: 4, nombreCompleto: "Ana Sofía Martínez", cuit: "27-33456789-1", telefono: "11 15-9876-5432" },
    { id: 5, nombreCompleto: "Logística y Transporte S.R.L.", cuit: "30-70123456-8", telefono: "0800-333-4444" },
    { id: 6, nombreCompleto: "Lucas Gabriel Fernández", cuit: "23-40123456-9", telefono: "341 555-6789" },
    { id: 7, nombreCompleto: "Laura Beatriz López", cuit: "27-18901234-5", telefono: "223 15-456-7890" },
    { id: 8, nombreCompleto: "Construcciones del Norte S.A.", cuit: "33-60987654-9", telefono: "381 432-1098" }
];
export const polizas = [
    {
        id: 1,
        nPoliza: "900-542100-1",
        cliente: "Juan Mateo Pérez",
        inicioVigencia: "2026-01-01",
        finVigencia: "2026-06-30",
        cobertura: "C - Terceros Completo",
        patente: "AE 123 CD"
    },
    {
        id: 2,
        nPoliza: "900-542105-3",
        cliente: "Juan Mateo Pérez",
        inicioVigencia: "2025-12-15",
        finVigencia: "2026-12-15",
        cobertura: "D - Todo Riesgo (C/F)",
        patente: "AF 456 GG"
    },
    {
        id: 3,
        nPoliza: "900-610220-0",
        cliente: "Logística y Transporte S.R.L.",
        inicioVigencia: "2026-02-01",
        finVigencia: "2026-08-01",
        cobertura: "A - Responsabilidad Civil",
        patente: "AC 987 JK"
    },
    {
        id: 4,
        nPoliza: "900-542200-2",
        cliente: "Carlos Alberto Gómez",
        inicioVigencia: "2025-11-20",
        finVigencia: "2026-05-20",
        cobertura: "B1 - Terceros Básico",
        patente: "KLO 998"
    },
    {
        id: 5,
        nPoliza: "900-544100-8",
        cliente: "Ana Sofía Martínez",
        inicioVigencia: "2026-01-10",
        finVigencia: "2026-07-10",
        cobertura: "C1 - Terceros + Granizo",
        patente: "AD 555 TR"
    },
    {
        id: 6,
        nPoliza: "900-778900-5",
        cliente: "Lucas Gabriel Fernández",
        inicioVigencia: "2025-10-01",
        finVigencia: "2026-10-01",
        cobertura: "D - Todo Riesgo (S/F)",
        patente: "AD 100 ZZ"
    },
    {
        id: 7,
        nPoliza: "900-881234-1",
        cliente: "Laura Beatriz López",
        inicioVigencia: "2026-03-01",
        finVigencia: "2026-09-01",
        cobertura: "B - Resp. Civil + Robo",
        patente: "MNO 432"
    },
    {
        id: 8,
        nPoliza: "900-990011-9",
        cliente: "Construcciones del Norte S.A.",
        inicioVigencia: "2025-09-15",
        finVigencia: "2026-09-15",
        cobertura: "A - Responsabilidad Civil",
        patente: "AE 999 QQ"
    }
];
export const pagos = [
    { id: 1, polizaId: 1, fechaPago: "2026-01-15", monto: 5000, estado: "Pagado" },
    { id: 2, polizaId: 1, fechaPago: "2026-03-15", monto: 5000, estado: "Pendiente" },
    { id: 3, polizaId: 2, fechaPago: "2026-02-10", monto: 7000, estado: "Pagado" },
    { id: 4, polizaId: 3, fechaPago: "2026-02-20", monto: 8000, estado: "Pagado" },
    { id: 5, polizaId: 4, fechaPago: "2025-12-01", monto: 4500, estado: "Pagado" },
    { id: 6, polizaId: 5, fechaPago: "2026-01-25", monto: 6000, estado: "Pendiente" },
    { id: 7, polizaId: 6, fechaPago: "2025-11-05", monto: 7500, estado: "Pagado" },
    { id: 8, polizaId: 7, fechaPago: "2026-03-15", monto: 5200, estado: "Pendiente" },
    { id: 9, polizaId: 8, fechaPago: "2025-10-20", monto: 9000, estado: "Pagado" }
];
const Detalle = () => {
    const { id } = useParams();

    const poliza = polizas.find(p => p.id === Number(id));

    if (!poliza) {
        return (
            <div className={Style.errorContainer}>
                <h2>Póliza no encontrada</h2>
                <Link to="/admin/polizas/listado" className={Style.btnVolver}>Volver al listado</Link>
            </div>
        );
    }

    const cliente = clientes.find(c => c.nombreCompleto === poliza.cliente);

    return(
        <section className={Style.detalleContainer}>
            <header className={Style.headerDetalle}>
                <Link to="/admin/polizas/listado" className={Style.btnVolver}>
                    <IconArrowLeft size={20} /> Volver
                </Link>
                <h2 className={Style.tituloPagina}>Detalle de Póliza</h2>
                <span className={Style.subtitulo}>N° Ref: {poliza.nPoliza}</span>
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
                            <span className={Style.valor}>{poliza.nPoliza}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Vigencia Desde:</span>
                            <span className={Style.valor}>{poliza.inicioVigencia}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Vigencia Hasta:</span>
                            <span className={Style.valor}>{poliza.finVigencia}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Cobertura:</span>
                            <span className={Style.valor}>{poliza.cobertura}</span>
                        </div>
                        <div className={Style.datoRow}>
                            <span className={Style.label}>Patente:</span>
                            <span className={Style.valor} style={{textTransform: 'uppercase'}}>{poliza.patente}</span>
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
                                <Link to={`/admin/clientes/detalle/${cliente.id}`} className={Style.linkCliente}>
                                    {poliza.cliente}
                                </Link>
                            ) : (
                                <span className={Style.valor}>{poliza.cliente}</span>
                            )}
                        </div>
                        {cliente && (
                            <>
                                <div className={Style.datoRow}>
                                    <span className={Style.label}>CUIT:</span>
                                    <span className={Style.valor}>{cliente.cuit}</span>
                                </div>
                                <div className={Style.datoRow}>
                                    <span className={Style.label}>Teléfono:</span>
                                    <span className={Style.valor}>{cliente.telefono}</span>
                                </div>
                            </>
                        )}
                    </div>
                </article>
            </div>
            <section className={Style.seccionPagos}>
                <div style={{padding: '1.5rem', borderBottom: '1px solid var(--alabaster-grey)', display:'flex', alignItems:'center', gap: '0.5rem'}}>
                    <IconCurrencyDollar size={24} color="var(--deep-twilight)"/>
                    <h3 style={{padding: 0, border: 'none'}}>Historial de Pagos</h3>
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
                            {pagos.filter(pago => pago.polizaId === poliza.id).map(pago => (
                                <tr key={pago.id}>
                                    <td>{pago.fechaPago}</td>
                                    <td style={{textAlign: 'right', fontWeight: '600'}}>
                                        ${pago.monto.toLocaleString('es-AR')}
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        <span className={`${Style.tagPago} ${pago.estado === 'Pagado' ? Style.pagado : Style.pendiente}`}>
                                            {pago.estado}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pagos.filter(pago => pago.polizaId === poliza.id).length === 0 && (
                        <p style={{padding: '1.5rem', textAlign: 'center', color: 'var(--slate-grey)'}}>
                            No hay pagos registrados para esta póliza.
                        </p>
                    )}
                </div>
            </section>
        </section>
    );
}
export default Detalle;