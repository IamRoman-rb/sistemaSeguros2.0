import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, Link, useNavigate } from "react-router-dom";
import Style from "../../Styles/Usuarios/Nuevo.module.css"; // Reutilizamos estilos
import { IconUser, IconId, IconLock, IconDeviceFloppy, IconChevronLeft, IconBriefcase, IconBuildingStore } from '@tabler/icons-react';

// Hooks de Redux
import { useGetEmpleadoByIdQuery, useUpdateEmpleadoMutation } from '../../Redux/api/empleadosApi';
import { useGetRolesQuery } from '../../Redux/api/rolesApi'; // <--- Importado
import { useGetSucursalesQuery } from '../../Redux/api/sucursalesApi'; // <--- Importado

// Esquema de validación
const usuarioSchema = z.object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50),
    // Si usas CUIT en lugar de DNI en el form, ajusta aquí. En tu ejemplo de datos viene "dni".
    dni: z.coerce.number().min(1, "DNI es requerido"), 
    clave: z.string().optional().or(z.literal('')), 
    id_rol: z.coerce.number().min(1, "Rol requerido"),
    id_sucursal: z.coerce.number().min(1, "Sucursal requerida")
});

const Editar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. Obtener datos del empleado
    const { data: empleado, isLoading: loadingEmpleado, error } = useGetEmpleadoByIdQuery(id);
    
    // 2. Obtener listas de Roles y Sucursales
    const { data: roles = [], isLoading: loadingRoles } = useGetRolesQuery();
    const { data: sucursales = [], isLoading: loadingSucursales } = useGetSucursalesQuery();

    // 3. Mutación para actualizar
    const [updateEmpleado, { isLoading: updating }] = useUpdateEmpleadoMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(usuarioSchema)
    });

    // 4. Rellenar formulario cuando llegan los datos
    useEffect(() => {
        if (empleado) {
            reset({
                nombre: empleado.nombre,
                dni: empleado.dni,
                // Mapeamos los IDs que vienen de la BD para que el select los reconozca
                id_rol: empleado.id_rol,
                id_sucursal: empleado.id_sucursal,
                clave: "" // Clave vacía para no sobrescribir si no se toca
            });
        }
    }, [empleado, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                id: Number(id), // ID necesario para el PUT
                nombre: data.nombre,
                dni: data.dni,
                id_rol: Number(data.id_rol),
                id_sucursal: Number(data.id_sucursal)
            };

            // Solo enviamos clave si el usuario escribió algo
            if (data.clave && data.clave.trim() !== "") {
                payload.clave = data.clave;
            }

            await updateEmpleado(payload).unwrap();
            alert("¡Usuario actualizado exitosamente!");
            navigate('/admin/usuarios/listado');

        } catch (error) {
            console.error("Error al actualizar:", error);
            alert(error.data?.error || "Error al actualizar usuario");
        }
    };
    
    // Estado de carga general
    if (loadingEmpleado || loadingRoles || loadingSucursales) {
        return <div style={{textAlign:'center', marginTop:'3rem', color: 'var(--slate-grey)'}}>Cargando datos...</div>;
    }

    if (error) return <div style={{textAlign:'center', color:'var(--cherry-rose)', marginTop:'3rem'}}>Error al cargar usuario</div>;

    return (
        <section className={Style.nuevoContainer}>
            <header className={Style.header}>
                <div className={Style.headerTop}>
                    <Link to="/admin/usuarios/listado" className={Style.btnVolver}>
                        <IconChevronLeft size={18} /> Volver
                    </Link>
                    <h2 className={Style.titulo}>Editar Usuario</h2>
                </div>
                <p className={Style.subtitulo}>Modifique los datos del usuario: <strong>{empleado?.nombre}</strong></p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className={Style.formCard}>

                {/* Nombre */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="nombre" className={Style.label}>
                        <IconUser size={18} className={Style.iconLabel} /> Nombre Completo
                    </label>
                    <input type="text" id="nombre" className={Style.input} placeholder="Ej: Juan Pérez" {...register("nombre")} />
                    {errors.nombre && <span className={Style.errorText}>⚠ {errors.nombre.message}</span>}
                </fieldset>

                {/* DNI */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="dni" className={Style.label}>
                        <IconId size={18} className={Style.iconLabel} /> DNI
                    </label>
                    <input type="number" id="dni" className={Style.input} placeholder="12345678" {...register("dni")} />
                    {errors.dni && <span className={Style.errorText}>⚠ {errors.dni.message}</span>}
                </fieldset>

                {/* Rol (Select Dinámico) */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="id_rol" className={Style.label}>
                        <IconBriefcase size={18} className={Style.iconLabel}/> Rol
                    </label>
                    <select id="id_rol" className={Style.select} {...register("id_rol")}>
                        <option value="">Seleccione un rol...</option>
                        {roles.map(rol => (
                            <option key={rol.id} value={rol.id}>
                                {/* Ajusta 'rol.rol' o 'rol.nombre' según tu backend */}
                                {rol.rol || rol.nombre} 
                            </option>
                        ))}
                    </select>
                    {errors.id_rol && <span className={Style.errorText}>⚠ {errors.id_rol.message}</span>}
                </fieldset>

                {/* Sucursal (Select Dinámico) */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="id_sucursal" className={Style.label}>
                        <IconBuildingStore size={18} className={Style.iconLabel}/> Sucursal
                    </label>
                    <select id="id_sucursal" className={Style.select} {...register("id_sucursal")}>
                        <option value="">Seleccione una sucursal...</option>
                        {sucursales.map(suc => (
                            <option key={suc.id} value={suc.id}>
                                {/* Ajusta 'suc.sucursal' o 'suc.nombre' según tu backend */}
                                {suc.sucursal || suc.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.id_sucursal && <span className={Style.errorText}>⚠ {errors.id_sucursal.message}</span>}
                </fieldset>

                {/* Clave */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="clave" className={Style.label}>
                        <IconLock size={18} className={Style.iconLabel} /> Nueva Clave (Opcional)
                    </label>
                    <input 
                        type="password" 
                        id="clave" 
                        className={Style.input} 
                        placeholder="Dejar vacía para mantener la actual" 
                        {...register("clave")} 
                    />
                    {errors.clave && <span className={Style.errorText}>⚠ {errors.clave.message}</span>}
                </fieldset>

                <div className={Style.actions}>
                    <button type="submit" className={Style.btnSubmit} disabled={updating}>
                        <IconDeviceFloppy size={20} /> {updating ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Editar;