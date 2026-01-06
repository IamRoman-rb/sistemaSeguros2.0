import { useState, useEffect } from "react";
import Buscador from "./Buscador";
import Style from "../../Styles/Clientes/Listado.module.css";
import { Link } from "react-router-dom";
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';

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

const Listado = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPorVista = 3;
    
    const clientesFiltrados = clientes.filter((cliente) => {
        const termino = searchTerm.toLowerCase();
        return (
            cliente.nombreCompleto.toLowerCase().includes(termino) ||
            cliente.cuit.includes(termino) ||
            cliente.telefono.includes(termino)
        );
    });
    
    const totalSlides = Math.ceil(clientesFiltrados.length / itemsPorVista);
    
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
                <h2 className={Style.h2ListadoCLientes}>Listado de Clientes</h2>
            </header>
            
            <Buscador onSearch={setSearchTerm} />

            <div className={Style.carouselWrapper}>
                <button onClick={prevSlide} className={Style.arrowBtn}><IconCaretLeft /></button>

                <div className={Style.carouselWindow}>
                    {clientesFiltrados.length === 0 && (
                        <div style={{textAlign: 'center', width: '100%', padding: '2rem'}}>
                            No se encontraron clientes.
                        </div>
                    )}

                    <ul 
                        className={Style.carouselTrack}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {clientesFiltrados.map((cliente) => (
                            <li key={cliente.id} className={Style.clienteCard}>
                                <div className={Style.cardInner}>
                                    <div className={Style.cardData}>
                                        <h3>{cliente.nombreCompleto}</h3>
                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>CUIT:</span>
                                            <span>{cliente.cuit}</span>
                                        </div>
                                        <div className={Style.datoRow}>
                                            <span className={Style.label}>Tel:</span>
                                            <span>{cliente.telefono}</span>
                                        </div>
                                    </div>
                                    <Link to={`/detalle/${cliente.id}`} className={Style.btnDetalle}>
                                        Ver Detalle
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <button onClick={nextSlide} className={Style.arrowBtn}><IconCaretRight /></button>
            </div>
            
            {totalSlides > 1 && (
                <div className={Style.dotsContainer}>
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`${Style.dot} ${currentIndex === idx ? Style.activeDot : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        ></div>
                    ))}
                </div>
            )}

        </section>
    );
};

export default Listado;