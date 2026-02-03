import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    IconEdit, 
    IconTrash, 
    IconPlus, 
    IconSearch, 
    IconCar 
} from '@tabler/icons-react';
import { useGetMarcasQuery, useDeleteMarcaMutation } from '../../Redux/api/marcasApi';
import Style from "../../Styles/Auxiliares/Listado.module.css";

const Listado = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: marcas, error, isLoading } = useGetMarcasQuery();
    const [deleteMarca] = useDeleteMarcaMutation();
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta marca?')) {
            try {
                await deleteMarca(id).unwrap();
            } catch (err) {
                alert("Error al eliminar: " + (err.data?.error || "Error desconocido"));
            }
        }
    };

    if (isLoading) return <div className={Style.loading}>Cargando marcas...</div>;
    if (error) return <div className={Style.error}>Error al cargar: {error.message}</div>;
    const marcasFiltradas = marcas?.filter(m => 
        m.marca.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return(
        <section className={Style.container}>
            <header className={Style.header}>
                <div className={Style.titleContainer}>
                    <h2 className={Style.title}>Listado de Marcas</h2>
                    <p className={Style.subtitle}>Gestión de auxiliares para vehículos</p>
                </div>
                
                <Link to="/admin/auxiliares/nuevo" className={Style.btnAdd}>
                    <IconPlus size={18} />
                    Nueva Marca
                </Link>
            </header>

            <div className={Style.searchBar}>
                <IconSearch size={20} className={Style.searchIcon} />
                <input 
                    type="text" 
                    placeholder="Buscar marca..." 
                    className={Style.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className={Style.tableContainer}>
                <table className={Style.table}>
                    <thead>
                        <tr>
                            <th style={{width: '60px'}}>ID</th>
                            <th>Marca</th>
                            <th className={Style.textCenter}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marcasFiltradas.length > 0 ? (
                            marcasFiltradas.map((item) => (
                                <tr key={item.id}>
                                    <td className={Style.idCell}>#{item.id}</td>
                                    <td>
                                        <div className={Style.marcaCell}>
                                            <IconCar size={20} color="var(--slate-grey)" />
                                            {item.marca}
                                        </div>
                                    </td>
                                    <td className={Style.actionsCell}>
                                        <Link to={`/admin/auxiliares/editar/${item.id}`} className={Style.btnEdit} title="Editar">
                                            <IconEdit size={18} />
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(item.id)} 
                                            className={Style.btnDelete} 
                                            title="Eliminar"
                                        >
                                            <IconTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className={Style.emptyState}>
                                    No se encontraron marcas registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Listado;