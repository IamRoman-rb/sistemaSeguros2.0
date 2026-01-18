import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft, IconPrinter } from '@tabler/icons-react';
import Style from '../../Styles/Pagos/Detalle.module.css';

const Detalle = () => {
    const getDateString = (daysOffset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        return date.toISOString().split('T')[0];
    };

    const { id } = useParams();
    const hoy = getDateString(0);
    const pagosOriginales = useMemo(() => [
        {
            id: 1,
            fecha: hoy,
            importe: 1500,
            usuario: 'admin1',
            metodo: 'Efectivo',
            comprobante: 'REC-0001-000055',
            cliente: {
                nombre: 'Juan Perez',
                dni: '20.123.456',
                telefono: '+54 11 1234-5678',
                email: 'juan.perez@mail.com'
            },
            poliza: {
                numero: '900-542100-1',
                vigencia: '01/01/2024 - 01/01/2025',
                vehiculo: 'Ford Focus 2.0 Titanium',
                patente: 'AA 123 BB',
                cobertura: 'Terceros Completo'
            }
        },
    ], [hoy]);

    const user = {
        role: 'admin'
    }

    const pago = pagosOriginales.find(p => p.id === parseInt(id));

    if (!pago) return <div className={Style.notFound}>Pago no encontrado</div>;

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
                
                <button className={Style.btnPrint}>
                    <IconPrinter size={18} /> Imprimir Recibo
                </button>
            </header>

            <div className={Style.gridLayout}>
                <article className={Style.card}>
                    <h3 className={Style.cardTitle}>Información del Pago</h3>
                    <div className={Style.dataGrid}>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Fecha de Pago</span>
                            <span className={Style.value}>{pago.fecha}</span>
                        </div>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Importe</span>
                            <span className={`${Style.value} ${Style.amount}`}>
                                ${pago.importe.toLocaleString()}
                            </span>
                        </div>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Método</span>
                            <span className={Style.value}>{pago.metodo}</span>
                        </div>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Comprobante</span>
                            <span className={Style.value}>{pago.comprobante}</span>
                        </div>
                        <div className={Style.dataGroup}>
                            <span className={Style.label}>Registrado por</span>
                            <span className={Style.badgeUser}>{pago.usuario}</span>
                        </div>
                    </div>
                </article>
                <article className={Style.card}>
                    <h3 className={Style.cardTitle}>Datos del Cliente</h3>
                    <div className={Style.dataList}>
                        <div className={Style.row}>
                            <span className={Style.label}>Nombre:</span>
                            <span className={Style.value}>{pago.cliente.nombre}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>DNI/CUIT:</span>
                            <span className={Style.value}>{pago.cliente.dni}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Teléfono:</span>
                            <span className={Style.value}>{pago.cliente.telefono}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Email:</span>
                            <span className={Style.value}>{pago.cliente.email}</span>
                        </div>
                    </div>
                </article>
                <article className={Style.card}>
                    <h3 className={Style.cardTitle}>Detalle de Póliza</h3>
                    <div className={Style.dataList}>
                        <div className={Style.row}>
                            <span className={Style.label}>Póliza N°:</span>
                            <span className={Style.valueHighlight}>{pago.poliza.numero}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Vehículo:</span>
                            <span className={Style.value}>{pago.poliza.vehiculo}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Patente:</span>
                            <span className={Style.value}>{pago.poliza.patente}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Vigencia:</span>
                            <span className={Style.value}>{pago.poliza.vigencia}</span>
                        </div>
                        <div className={Style.row}>
                            <span className={Style.label}>Cobertura:</span>
                            <span className={Style.value}>{pago.poliza.cobertura}</span>
                        </div>
                    </div>
                </article>

            </div>
        </section>
    )
};

export default Detalle;