import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import Style from "../../Styles/Auxiliares/Nuevo.module.css";
import { IconArrowLeft } from '@tabler/icons-react';
import Formulario from "./Formulario";
import { useGetMarcasQuery, useUpdateMarcaMutation } from '../../Redux/api/marcasApi';

const Editar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: marcas, isLoading: isLoadingData } = useGetMarcasQuery();
    const marcaAEditar = useMemo(() => {
        if (!marcas) return null;
        return marcas.find(m => m.id === Number(id));
    }, [marcas, id]);

    const [updateMarca, { isLoading: isUpdating }] = useUpdateMarcaMutation();

    const handleSubmit = async (formData) => {
        try {
            const payload = { 
                id: Number(id), 
                marca: formData.marca 
            };
            
            await updateMarca(payload).unwrap();
            
            alert("Marca actualizada correctamente");
            navigate('/admin/auxiliares/listado');
        } catch (error) {
            console.error(error);
            const msg = error.data?.error || "Error al actualizar";
            alert(msg);
        }
    };

    if (isLoadingData) return <div className={Style.container}>Cargando datos...</div>;

    if (!marcaAEditar) return (
        <div className={Style.container}>
            <p>Error: No se encontró la marca con ID {id}</p>
            <Link to="/admin/auxiliares/listado">Volver</Link>
        </div>
    );

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link to="/admin/auxiliares/listado" style={{ color: 'var(--slate-grey)', display: 'flex' }}>
                        <IconArrowLeft size={24} />
                    </Link>
                    <h1 className={Style.title}>Editar Auxiliar</h1>
                </div>
            </header>
            <Formulario 
                defaultValues={marcaAEditar} 
                onSubmit={handleSubmit}
                isLoading={isUpdating}
                buttonLabel="Guardar Cambios"
            />
        </section>
    )
}

export default Editar;