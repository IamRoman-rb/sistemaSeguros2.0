import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Style from '../../Styles/Usuarios/Nuevo.module.css';
import { Link } from 'react-router-dom';
import { IconUser, IconId, IconLock, IconDeviceFloppy, IconChevronLeft } from '@tabler/icons-react';

// 1. ESQUEMA DE VALIDACIÓN
const usuarioSchema = z.object({
    nombre: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre es muy largo"),
    cuit: z.string()
        .regex(/^\d{2}-\d{8}-\d{1}$/, "Formato inválido. Ej: 20-12345678-9"),
    clave: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
});

const Nuevo = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(usuarioSchema)
    });

    const onSubmit = (data) => {
        console.log("Creando usuario:", data);
    };

    return (
        <section className={Style.nuevoContainer}>
            
            {/* ENCABEZADO */}
            <header className={Style.header}>
                <div className={Style.headerTop}>
                     <Link to="/admin/usuarios/listado" className={Style.btnVolver}>
                        <IconChevronLeft size={18} /> Volver
                    </Link>
                    <h2 className={Style.titulo}>Nuevo Usuario</h2>
                </div>
                <p className={Style.subtitulo}>Complete los datos para registrar un nuevo acceso al sistema.</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className={Style.formCard}>
                
                <fieldset className={Style.fieldset}>
                    <label htmlFor="nombre" className={Style.label}>
                        <IconUser size={18} className={Style.iconLabel}/> Nombre Completo
                    </label>
                    <input 
                        type="text" 
                        id="nombre" 
                        className={Style.input}
                        placeholder="Ej: Juan Pérez"
                        {...register("nombre")} 
                    />
                    {errors.nombre && <span className={Style.errorText}>⚠ {errors.nombre.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="cuit" className={Style.label}>
                        <IconId size={18} className={Style.iconLabel}/> CUIT
                    </label>
                    <input 
                        type="text" 
                        id="cuit" 
                        className={Style.input}
                        placeholder="20-xxxxxxxx-x"
                        {...register("cuit")} 
                    />
                    {errors.cuit && <span className={Style.errorText}>⚠ {errors.cuit.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="clave" className={Style.label}>
                        <IconLock size={18} className={Style.iconLabel}/> Clave de Acceso
                    </label>
                    <input 
                        type="password" 
                        id="clave" 
                        className={Style.input}
                        placeholder="••••••"
                        {...register("clave")} 
                    />
                    {errors.clave && <span className={Style.errorText}>⚠ {errors.clave.message}</span>}
                </fieldset>

                <div className={Style.actions}>
                    <button type="submit" className={Style.btnSubmit}>
                        <IconDeviceFloppy size={20} /> Crear Usuario
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Nuevo;