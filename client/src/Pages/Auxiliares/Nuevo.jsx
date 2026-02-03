import React from 'react';
import { Link } from 'react-router-dom';
import Style from "../../Styles/Auxiliares/Nuevo.module.css";
import { IconCar, IconPlus, IconArrowLeft } from '@tabler/icons-react';

const Nuevo = () => {
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

            <form action="" className={Style.form}>
                <div className={Style.inputGroup}>
                    <label htmlFor="marca" className={Style.label}>Nombre de la marca</label>
                    <div className={Style.inputWrapper}>
                        <IconCar stroke={1.5} size={20} className={Style.inputIcon} />
                        <input 
                            type="text" 
                            id="marca"
                            name="marca"
                            placeholder="Ej: Toyota, Ford, Honda..." 
                            className={Style.input}
                        />
                    </div>
                </div>
                
                <div className={Style.btnGroup}>
                    <button type="submit" className={Style.btnSubmit}>
                        <IconPlus size={18} />
                        Agregar Marca
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Nuevo;