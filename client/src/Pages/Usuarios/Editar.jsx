import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, Link, useNavigate } from "react-router-dom";
import Style from "../../Styles/Usuarios/Editar.module.css";
import { IconUser, IconId, IconLock, IconDeviceFloppy, IconChevronLeft } from '@tabler/icons-react';

const usuarioSchema = z.object({
    nombre: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre es muy largo"),
    cuit: z.string()
        .regex(/^\d{2}-\d{8}-\d{1}$/, "Formato inválido. Ej: 20-12345678-9"),
    clave: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
});

const Editar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const usuariosDB = [
        { id: 0, nombre: 'Juan Pérez', cuit: "20-34567890-3", clave: "juan123" },
        { id: 1, nombre: 'María Gómez', cuit: "27-12345678-9", clave: "maria456" },
        { id: 2, nombre: 'Carlos Rodríguez', cuit: "23-98765432-1", clave: "carlos789" },
    ];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(usuarioSchema)
    });

    useEffect(() => {
        const usuarioEncontrado = usuariosDB.find(u => u.id === Number(id));

        if (usuarioEncontrado) {
            reset({
                nombre: usuarioEncontrado.nombre,
                cuit: usuarioEncontrado.cuit,
                clave: usuarioEncontrado.clave 
            });
        } else {
            console.log("Usuario no encontrado");
            
        }
    }, [id, reset]);

    const onSubmit = (data) => {
        console.log("Datos editados para enviar a BD:", data);
    };
    
    return (
        <section className={Style.editarContainer}>
            <header className={Style.header}>
                <div className={Style.headerTop}>
                    <Link to="/admin/usuarios/listado" className={Style.btnVolver}>
                        <IconChevronLeft size={18} /> Volver
                    </Link>
                    <h2 className={Style.titulo}>Editar Usuario</h2>
                </div>
                <p className={Style.subtitulo}>Modifique los datos del usuario ID: {id}</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className={Style.formCard}>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="nombre" className={Style.label}>
                        <IconUser size={18} className={Style.iconLabel} /> Nombre Completo
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
                        <IconId size={18} className={Style.iconLabel} /> CUIT
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
                        <IconLock size={18} className={Style.iconLabel} /> Clave de Acceso
                    </label>
                    <input
                        type="text"
                        id="clave"
                        className={Style.input}
                        placeholder="••••••"
                        {...register("clave")}
                    />
                    {errors.clave && <span className={Style.errorText}>⚠ {errors.clave.message}</span>}
                </fieldset>

                <div className={Style.actions}>
                    <button type="submit" className={Style.btnSubmit}>
                        <IconDeviceFloppy size={20} /> Guardar Cambios
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Editar;