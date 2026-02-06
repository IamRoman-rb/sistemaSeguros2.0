import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    IconEdit, 
    IconTrash, 
    IconPlus, 
    IconSearch, 
    IconCategory 
} from '@tabler/icons-react';
import Style from "../../Styles/TipoPolizas/Listado.module.css";
import { useGetTiposPolizaQuery, useDeleteTipoPolizaMutation } from '../../Redux/api/polizasApi';

const Listado = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: tipos, isLoading, error } = useGetTiposPolizaQuery();
    const [deleteTipo] = useDeleteTipoPolizaMutation();
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este tipo de póliza?')) {
            try {
                await deleteTipo(id).unwrap();
            } catch (err) {
                console.error(err);
                alert("Error al eliminar: " + (err.data?.error || "Intente nuevamente"));
            }
        }
    };
    const datosFiltrados = tipos?.filter(item => 
        item.tipo?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (isLoading) return <div className={Style.loading}>Cargando tipos de póliza...</div>;
    if (error) return <div className={Style.error}>Error: {error.message || "Error de conexión"}</div>;

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <div className={Style.titleContainer}>
                    <h2 className={Style.title}>Tipos de Pólizas</h2>
                    <p className={Style.subtitle}>Configuración de categorías (Automotor, Hogar, Vida, etc.)</p>
                </div>
                
                <Link to="/admin/tipo_polizas/nuevo" className={Style.btnAdd}>
                    <IconPlus size={18} />
                    Nuevo Tipo
                </Link>
            </header>
            <div className={Style.searchBar}>
                <IconSearch size={20} className={Style.searchIcon} />
                <input 
                    type="text" 
                    placeholder="Buscar tipo..." 
                    className={Style.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className={Style.tableContainer}>
                <table className={Style.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>ID</th>
                            <th>Descripción / Tipo</th>
                            <th className={Style.textCenter} style={{ width: '150px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosFiltrados.length > 0 ? (
                            datosFiltrados.map((item) => (
                                <tr key={item.id}>
                                    <td className={Style.idCell}>#{item.id}</td>
                                    <td>
                                        <div className={Style.tipoCell}>
                                            <IconCategory size={20} color="var(--slate-grey)" />
                                            {item.tipo}
                                        </div>
                                    </td>
                                    <td className={Style.actionsCell}>
                                        <Link to={`/admin/tipo_polizas/editar/${item.id}`} className={Style.btnEdit} title="Editar">
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
                                    No se encontraron resultados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Listado;