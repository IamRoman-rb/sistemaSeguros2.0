import { useState, useEffect } from "react";
import Style from "../../Styles/Polizas/Listado.module.css";
import { Link } from "react-router-dom";
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';

// --- 1. COMPONENTE REUTILIZABLE PARA CADA CARRUSEL ---
const SeccionPolizas = ({ titulo, polizas, itemsPorVista = 3 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reiniciar al principio si cambian las pólizas (ej: búsqueda)
    useEffect(() => {
        setCurrentIndex(0);
    }, [polizas]);

    const totalSlides = Math.ceil(polizas.length / itemsPorVista);

    const nextSlide = () => {
        if (totalSlides === 0) return;
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (totalSlides === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    // Slice de items visibles
    const startIndex = currentIndex * itemsPorVista;
    const itemsVisible = polizas.slice(startIndex, startIndex + itemsPorVista);

    // Función auxiliar para patente
    const getPatente = (poliza) => {
        if (poliza.poliza_vehiculos && poliza.poliza_vehiculos.length > 0) {
            return poliza.poliza_vehiculos[0].patente_vehiculo;
        }
        return "N/A";
    };

    // Si no hay datos para esta sección, no renderizamos nada (o podrías mostrar un mensaje)
    if (polizas.length === 0) return null;

    return (
        <div style={{ marginBottom: '3rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h3 className={Style.subtituloSeccion} style={{
                color: 'var(--french-blue)',
                borderBottom: '2px solid var(--light-cyan)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                {titulo} <span style={{ fontSize: '0.8em', color: 'var(--slate-grey)' }}>({polizas.length})</span>
            </h3>

            <div className={Style.carouselWrapper}>
                {totalSlides > 1 && (
                    <button onClick={prevSlide} className={Style.arrowBtn} disabled={polizas.length <= itemsPorVista}>
                        <IconCaretLeft />
                    </button>
                )}

                <div className={Style.carouselWindow}>
                    <ul className={Style.carouselTrack} style={{ transform: 'none', display: 'flex', gap: '1rem', width: '100%' }}>
                        {itemsVisible.map((poliza) => (
                            <li key={poliza.numero} className={Style.clienteCard} style={{ flex: 1 }}>
                                <div className={Style.cardInner}>
                                    <div className={Style.cardData}>
                                        <h3>{poliza.cliente?.nombre || "Cliente Desconocido"}</h3>

                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>Póliza:</span>
                                            <span>{poliza.numero}</span>
                                        </div>

                                        {/* Mostramos patente solo si es automotor o tiene vehículo */}
                                        {poliza.poliza_vehiculos?.length > 0 && (
                                            <div className={Style.datoRow}>
                                                <span className={Style.label}>Patente:</span>
                                                <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                                                    {getPatente(poliza)}
                                                </span>
                                            </div>
                                        )}

                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>Tipo:</span>
                                            <span>{poliza.tipo_poliza?.tipo || "-"}</span>
                                        </div>

                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>Vence:</span>
                                            <span>{new Date(poliza.fin).toLocaleDateString()}</span>
                                        </div>

                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>Estado:</span>
                                            <span style={{
                                                color: poliza.valido ? 'green' : 'red',
                                                fontWeight: 'bold', fontSize: '0.9em'
                                            }}>
                                                {poliza.valido ? "Vigente" : "Anulada"}
                                            </span>
                                        </div>
                                    </div>

                                    <Link to={`/admin/polizas/detalle/${poliza.numero}`} className={Style.btnDetalle}>
                                        Ver Detalle
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {totalSlides > 1 && (
                    <button onClick={nextSlide} className={Style.arrowBtn} disabled={polizas.length <= itemsPorVista}>
                        <IconCaretRight />
                    </button>

                )}

            </div>

            {/* Paginación interna de la sección */}
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
        </div>
    );
};

export default SeccionPolizas;