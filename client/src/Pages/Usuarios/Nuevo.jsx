import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Style from '../../Styles/Usuarios/Nuevo.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { IconUser, IconId, IconLock, IconDeviceFloppy, IconChevronLeft, IconBriefcase, IconBuildingStore } from '@tabler/icons-react';

// Hooks de Redux
import { useCreateEmpleadoMutation } from '../../Redux/api/empleadosApi';
import { useGetRolesQuery } from '../../Redux/api/rolesApi';
// import { useGetSucursalesQuery } from '../../Redux/api/sucursalesApi'; // Si tienes slice de sucursales

// 1. ESQUEMA DE VALIDACIÓN ACTUALIZADO
const usuarioSchema = z.object({
    nombre: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre es muy largo"),
    cuit: z.string()
        .regex(/^\d{2}-\d{8}-\d{1}$/, "Formato inválido. Ej: 20-12345678-9"), // Asumo que usas CUIT como DNI o identificador
    dni: z.coerce.number().min(1, "DNI es requerido"), // Agrego DNI si tu modelo empleado lo pide separado del CUIT
    clave: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    id_rol: z.coerce.number().min(1, "Debe seleccionar un rol"),
    id_sucursal: z.coerce.number().min(1, "Debe seleccionar una sucursal")
});

const Nuevo = () => {
    const navigate = useNavigate();
    
    // Hooks de API
    const [createEmpleado, { isLoading }] = useCreateEmpleadoMutation();
    const { data: roles = [] } = useGetRolesQuery();
    // const { data: sucursales = [] } = useGetSucursalesQuery(); 
    
    // Simulación de sucursales si no tienes el endpoint aún
    const sucursales = [{ id: 1, nombre: "Sucursal Central" }, { id: 2, nombre: "Sucursal Norte" }];

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(usuarioSchema),
        defaultValues: {
            id_sucursal: 1 // Valor por defecto si quieres
        }
    });

    const onSubmit = async (data) => {
        console.log("Enviando empleado:", data);
        try {
            // Ajusta el payload según lo que espere tu backend exactamente
            const nuevoEmpleado = {
                nombre: data.nombre,
                // Si tu backend espera 'dni' como int y 'cuit' como string, envía ambos si es necesario
                dni: data.dni, 
                // cuit: data.cuit, // Si tu modelo empleado tiene campo cuit
                clave: data.clave,
                id_rol: data.id_rol,
                id_sucursal: data.id_sucursal
            };

            await createEmpleado(nuevoEmpleado).unwrap();
            
            alert("¡Empleado creado exitosamente!");
            navigate('/admin/usuarios/listado');

        } catch (error) {
            console.error("Error al crear:", error);
            const mensaje = error.data?.error || "Error al crear el empleado";
            alert(mensaje);
        }
    };

    return (
        <section className={Style.nuevoContainer}>
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
                
                {/* Nombre */}
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

                {/* DNI (Numérico para la DB) */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="dni" className={Style.label}>
                        <IconId size={18} className={Style.iconLabel}/> DNI (Usuario)
                    </label>
                    <input 
                        type="number" 
                        id="dni" 
                        className={Style.input}
                        placeholder="Ej: 30123456"
                        {...register("dni")} 
                    />
                    {errors.dni && <span className={Style.errorText}>⚠ {errors.dni.message}</span>}
                </fieldset>

                {/* CUIT (String con guiones) - Opcional si solo usas DNI */}
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

                {/* Rol */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="id_rol" className={Style.label}>
                        <IconBriefcase size={18} className={Style.iconLabel}/> Rol
                    </label>
                    <select id="id_rol" className={Style.select} {...register("id_rol")}>
                        <option value="">Seleccione un rol...</option>
                        {roles.map(rol => (
                            <option key={rol.id} value={rol.id}>{rol.rol}</option>
                        ))}
                    </select>
                    {errors.id_rol && <span className={Style.errorText}>⚠ {errors.id_rol.message}</span>}
                </fieldset>

                {/* Sucursal */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="id_sucursal" className={Style.label}>
                        <IconBuildingStore size={18} className={Style.iconLabel}/> Sucursal
                    </label>
                    <select id="id_sucursal" className={Style.select} {...register("id_sucursal")}>
                        {sucursales.map(suc => (
                            <option key={suc.id} value={suc.id}>{suc.nombre}</option>
                        ))}
                    </select>
                    {errors.id_sucursal && <span className={Style.errorText}>⚠ {errors.id_sucursal.message}</span>}
                </fieldset>

                {/* Clave */}
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
                    <button type="submit" className={Style.btnSubmit} disabled={isLoading}>
                        <IconDeviceFloppy size={20} /> 
                        {isLoading ? "Guardando..." : "Crear Usuario"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Nuevo;