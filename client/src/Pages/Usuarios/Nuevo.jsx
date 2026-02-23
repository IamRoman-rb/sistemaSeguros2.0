import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Style from '../../Styles/Usuarios/Nuevo.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { IconUser, IconId, IconLock, IconDeviceFloppy, IconChevronLeft, IconBriefcase, IconBuildingStore } from '@tabler/icons-react';

// Hooks de Redux
import { useCreateEmpleadoMutation } from '../../Redux/api/empleadosApi';
import { useGetRolesQuery } from '../../Redux/api/rolesApi';
import { useGetSucursalesQuery } from '../../Redux/api/sucursalesApi'; // <-- Importado

const usuarioSchema = z.object({
    nombre: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre es muy largo"),
    dni: z.coerce.number().min(1, "DNI es requerido"), 
    clave: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    id_rol: z.coerce.number().min(1, "Debe seleccionar un rol"),
    id_sucursal: z.coerce.number().min(1, "Debe seleccionar una sucursal")
});

const Nuevo = () => {
    const navigate = useNavigate();
    
    // Hooks de API
    const [createEmpleado, { isLoading: isCreating }] = useCreateEmpleadoMutation();
    
    // Consultas para los selects
    const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
    const { data: sucursales = [], isLoading: isLoadingSucursales } = useGetSucursalesQuery(); // <-- Conectado
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(usuarioSchema),
        defaultValues: {
            id_sucursal: 1 
        }
    });

    const onSubmit = async (data) => {
        try {
            const nuevoEmpleado = {
                nombre: data.nombre,
                dni: data.dni, 
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

    // Mostrar un pequeño indicador mientras cargan los datos de los selects
    const isLoadingData = isLoadingRoles || isLoadingSucursales;

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
                        disabled={isCreating || isLoadingData}
                    />
                    {errors.nombre && <span className={Style.errorText}>⚠ {errors.nombre.message}</span>}
                </fieldset>

                {/* DNI */}
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
                        disabled={isCreating || isLoadingData}
                    />
                    {errors.dni && <span className={Style.errorText}>⚠ {errors.dni.message}</span>}
                </fieldset>

                {/* Rol */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="id_rol" className={Style.label}>
                        <IconBriefcase size={18} className={Style.iconLabel}/> Rol
                    </label>
                    <select 
                        id="id_rol" 
                        className={Style.select} 
                        {...register("id_rol")}
                        disabled={isCreating || isLoadingRoles}
                    >
                        <option value="">Seleccione un rol...</option>
                        {roles.map(rol => (
                            <option key={rol.id} value={rol.id}>{rol.rol}</option>
                        ))}
                    </select>
                    {errors.id_rol && <span className={Style.errorText}>⚠ {errors.id_rol.message}</span>}
                </fieldset>

                {/* Sucursal conectada al backend */}
                <fieldset className={Style.fieldset}>
                    <label htmlFor="id_sucursal" className={Style.label}>
                        <IconBuildingStore size={18} className={Style.iconLabel}/> Sucursal
                    </label>
                    <select 
                        id="id_sucursal" 
                        className={Style.select} 
                        {...register("id_sucursal")}
                        disabled={isCreating || isLoadingSucursales}
                    >
                        <option value="">Seleccione una sucursal...</option>
                        {sucursales.map(suc => (
                            // Asegúrate de que tu modelo devuelva 'sucursal' o 'nombre'
                            // Por convención Prisma, podría ser suc.nombre o suc.sucursal
                            <option key={suc.id} value={suc.id}>{suc.sucursal || suc.nombre}</option>
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
                        disabled={isCreating || isLoadingData}
                    />
                    {errors.clave && <span className={Style.errorText}>⚠ {errors.clave.message}</span>}
                </fieldset>

                <div className={Style.actions}>
                    <button type="submit" className={Style.btnSubmit} disabled={isCreating || isLoadingData}>
                        <IconDeviceFloppy size={20} /> 
                        {isCreating ? "Guardando..." : "Crear Usuario"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Nuevo;