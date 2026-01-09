import { useParams, Link } from "react-router-dom";
import Style from "../../Styles/Clientes/Detalle.module.css";
import { IconArrowLeft } from '@tabler/icons-react';

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
const Detalle = () => {
    const { id } = useParams();
    const cliente = clientes.find((c) => c.id === Number(id));

    if (!cliente) {
        return <div className={Style.errorContainer}>Cliente no encontrado.</div>;
    }
    const polizasDelCliente = polizas.filter(p => p.cliente === cliente.nombreCompleto);

    return (
        <section className={Style.detalleContainer}>
            <header className={Style.headerDetalle}>
                <nav className={Style.nav}>
                    <Link to="/admin/clientes/listado" className={Style.btnVolver}>
                        <IconArrowLeft size={20} /> Volver
                    </Link>
                </nav>
                <h2 className={Style.titulo}>Detalle del Cliente</h2>
            </header>

            <section className={Style.cardInfo}>
                <h3 className={Style.subTitle}>Información Personal</h3>
                <article className={Style.datosCliente}>
                    <div className={Style.datoItem}>
                        <span className={Style.label}>Nombre Completo:</span>
                        <span className={Style.valor}> {cliente.nombreCompleto}</span>
                    </div>
                    <div className={Style.datoItem}>
                        <span className={Style.label}>CUIT:</span>
                        <span className={Style.valor}> {cliente.cuit}</span>
                    </div>
                    <div className={Style.datoItem}>
                        <span className={Style.label}>Teléfono:</span>
                        <span className={Style.valor}> {cliente.telefono}</span>
                    </div>
                    <div className={Style.datoItem}>
                        <span className={Style.label}>Estado:</span>
                        <span className={Style.tagActivo}>Activo</span>
                    </div>
                </article>
            </section>

            <section className={Style.seccionTabla}>
                <h3 className={Style.subTitle}>Historial de Pólizas ({polizasDelCliente.length})</h3>
                
                {polizasDelCliente.length > 0 ? (
                        <table className={Style.tablaPolizas}>
                            <thead>
                                <tr>
                                    <th>N° Póliza</th>
                                    <th>Patente</th>
                                    <th>Vigencia Desde</th>
                                    <th>Vigencia Hasta</th>
                                    <th>Cobertura</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {polizasDelCliente.map((poliza) => (
                                    <tr key={poliza.id}>
                                        <td style={{fontWeight: 'bold'}}>{poliza.nPoliza}</td>
                                        <td>{poliza.patente}</td>
                                        <td>{poliza.inicioVigencia}</td>
                                        <td>{poliza.finVigencia}</td>
                                        <td>{poliza.cobertura}</td>
                                        <td>
                                            <span className={Style.tagVigente}>Vigente</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                ) : (
                    <p className={Style.sinResultados}>Este cliente no posee pólizas registradas.</p>
                )}
            </section>
        </section>
    );
};

export default Detalle;