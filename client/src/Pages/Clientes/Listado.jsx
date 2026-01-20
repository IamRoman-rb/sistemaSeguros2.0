import { useState, useEffect } from "react";
import Buscador from "./Buscador";
import Style from "../../Styles/Clientes/Listado.module.css";
import { Link } from "react-router-dom";
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';
import { useGetClientesQuery, useDeleteClienteMutation } from '../../Redux/api/clientesApi';

export const user = {
    id: 1,
    nombre: "Admin User",
    email: "admin@gmail.com",
    role: "admin"
}



const Listado = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const { data: clientes, error, isLoading } = useGetClientesQuery();
    const [deleteCliente] = useDeleteClienteMutation();

    const handleDelete = async (dni) => {
        if (confirm('¿Borrar cliente?')) {
            await deleteCliente(dni);
        }
    }

    if (isLoading) return <div>Cargando base de datos...</div>;
    if (error) return <div>Error conectando al servidor: {error.message}</div>;

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
                        <div style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>
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
                                    <Link to={`/${user.role}/clientes/detalle/${cliente.id}`} className={Style.btnDetalle}>
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