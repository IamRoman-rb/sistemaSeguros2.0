import { useState, useEffect } from "react";
import Buscador from "./Buscador";
import Style from "../../Styles/Polizas/Listado.module.css";
import { Link } from "react-router-dom";
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';

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
        cliente: "María Elena Rodríguez",
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

const Listado = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPorVista = 3;

    const polizasFiltradas = polizas.filter((poliza) => {
        const termino = searchTerm.toLowerCase();
        return (
            poliza.nPoliza.toLowerCase().includes(termino) ||
            poliza.cliente.toLowerCase().includes(termino) ||
            poliza.patente.toLowerCase().includes(termino) ||
            poliza.cobertura.toLowerCase().includes(termino)
        );
    });

    const totalSlides = Math.ceil(polizasFiltradas.length / itemsPorVista);

    useEffect(() => {
        setCurrentIndex(0);
    }, [searchTerm]);

    const nextSlide = () => {
        if (totalSlides === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        if (totalSlides === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
        );
    };

    return (
        <section className={Style.listadoContainer}>
            <header className={Style.headerListadoClientes}>
                <h2 className={Style.h2ListadoCLientes}>Listado de Pólizas</h2>
            </header>

            <Buscador onSearch={setSearchTerm} />

            <div className={Style.carouselWrapper}>
                <button onClick={prevSlide} className={Style.arrowBtn}>
                    <IconCaretLeft />
                </button>

                <div className={Style.carouselWindow}>
                    {polizasFiltradas.length === 0 && (
                        <div style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>
                            No se encontraron pólizas.
                        </div>
                    )}

                    <ul
                        className={Style.carouselTrack}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {polizasFiltradas.map((poliza) => (
                            <li key={poliza.id} className={Style.clienteCard}>
                                <div className={Style.cardInner}>
                                    <div className={Style.cardData}>
                                        <h3>{poliza.cliente}</h3>

                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>Póliza:</span>
                                            <span>{poliza.nPoliza}</span>
                                        </div>
                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>Patente:</span>
                                            <span>{poliza.patente}</span>
                                        </div>
                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>Cobertura:</span>
                                            <span style={{ textAlign: 'right', fontSize: '0.9em' }}>{poliza.cobertura}</span>
                                        </div>
                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>Vence:</span>
                                            <span>{poliza.finVigencia}</span>
                                        </div>
                                    </div>

                                    <Link to={`/admin/polizas/detalle/${poliza.id}`} className={Style.btnDetalle}>
                                        Ver Detalle
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <button onClick={nextSlide} className={Style.arrowBtn}>
                    <IconCaretRight />
                </button>
            </div>

            {totalSlides > 1 && (
                <div className={Style.paginationContainer}>
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <button
                            key={idx}
                            className={`${Style.pageBtn} ${currentIndex === idx ? Style.activePageBtn : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            )}

        </section>
    );
};

export default Listado;