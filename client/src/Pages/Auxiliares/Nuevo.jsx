import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Style from "../../Styles/Auxiliares/Nuevo.module.css";
import { IconArrowLeft } from '@tabler/icons-react';
import Formulario from './Formulario';

import { useCreateMarcaMutation } from '../../Redux/api/marcasApi';

const Nuevo = () => {
    const navigate = useNavigate();
    const [createMarca, { isLoading }] = useCreateMarcaMutation();

    const handleSubmit = async (formData) => {
        try {
            await createMarca(formData).unwrap();
            alert("Marca creada correctamente");
            navigate('/admin/auxiliares/listado');
        } catch (error) {
            console.error(error);
            alert("Error al crear marca");
        }
    };

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link to="/admin/auxiliares/listado" style={{ color: 'var(--slate-grey)', display: 'flex' }}>
                        <IconArrowLeft size={24} />
                    </Link>
                    <h1 className={Style.title}>Nuevo Auxiliar</h1>
                </div>
            </header>
            <Formulario 
                onSubmit={handleSubmit} 
                isLoading={isLoading}
                buttonLabel="Agregar Marca"
            />
        </section>
    );
};

export default Nuevo;