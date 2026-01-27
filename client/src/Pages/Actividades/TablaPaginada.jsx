import React, { useState, useMemo } from 'react';
import { 
    IconChevronLeft, 
    IconChevronRight 
} from '@tabler/icons-react';
import Style from "../../Styles/Actividades/Listado.module.css";

const TablaPaginada = ({ data, headers, renderRow, itemsPerPage = 5 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calcular índices
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    useMemo(() => {
        setCurrentPage(1);
    }, [data]);

    return (
        <div className={Style.tableWrapper}>
            <div className={Style.tableScroll}>
                <table className={Style.table}>
                    <thead>
                        <tr>
                            {headers.map((head, index) => <th key={index}>{head}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => renderRow(item, index))
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className={Style.emptyState}>No se encontraron datos.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {data.length > itemsPerPage && (
                <div className={Style.paginationContainer}>
                    <span className={Style.pageInfo}>
                        Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, data.length)} de {data.length}
                    </span>
                    <div className={Style.paginationButtons}>
                        <button 
                            onClick={prevPage} 
                            disabled={currentPage === 1}
                            className={Style.pageBtn}
                        >
                            <IconChevronLeft size={18} />
                        </button>
                        <span className={Style.pageNumber}>Página {currentPage}</span>
                        <button 
                            onClick={nextPage} 
                            disabled={currentPage === totalPages}
                            className={Style.pageBtn}
                        >
                            <IconChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablaPaginada;