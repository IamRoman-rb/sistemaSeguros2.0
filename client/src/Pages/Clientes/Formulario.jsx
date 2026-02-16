import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Style from "../../Styles/Clientes/Nuevo.module.css";
import { useGetProvinciasQuery } from "../../Redux/api/provinciasApi";

// Exportamos el esquema para que pueda ser usado o extendido si fuera necesario
export const clienteSchema = z.object({
    dni: z.coerce.number({ invalid_type_error: "El DNI debe ser un número" })
        .int().positive().min(1, "El DNI es obligatorio"),
    nombre: z.string().min(1, "Requerido").max(100),
    nacimiento: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Fecha inválida" }),
    direccion: z.string().min(1, "Requerido").max(200),
    telefono: z.string().min(1, "Requerido").max(15),
    provincia: z.string().min(1, "Seleccione una provincia"),
    id_localidad: z.coerce.number({ invalid_type_error: "Seleccione una localidad" })
        .int().positive("Seleccione una localidad")
});

const Formulario = ({ onSubmit, defaultValues, isLoading, isEditing = false }) => {
    // Traemos provincias aquí para llenar los selects
    const { data: provincias = [] } = useGetProvinciasQuery();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(clienteSchema),
        defaultValues: defaultValues || {}
    });

    // Efecto para cargar los datos cuando vienen del padre (Editar)
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    // Lógica de filtrado de localidades
    const provinciaSeleccionada = watch("provincia");

    const localidadesFiltradas = useMemo(() => {
        if (!provinciaSeleccionada) return [];
        const provinciaEncontrada = provincias.find(
            (p) => p.provincia === provinciaSeleccionada || p.nombre === provinciaSeleccionada
        );
        return provinciaEncontrada?.localidades || [];
    }, [provincias, provinciaSeleccionada]);

    const onError = (errors) => console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={Style.formGrid}>
            <h3 className={Style.subTitle}>Datos Personales y Contacto</h3>

            <fieldset className={Style.fieldset}>
                <label htmlFor="nombre" className={Style.label}>Nombre:</label>
                <input className={Style.input} type="text" id="nombre" placeholder="Nombre completo" {...register("nombre")} />
                {errors.nombre && <span className={Style.errorText}>⚠ {errors.nombre.message}</span>}
            </fieldset>

            <fieldset className={Style.fieldset}>
                <label htmlFor="dni" className={Style.label}>DNI:</label>
                <input 
                    className={Style.input} 
                    type="number" 
                    id="dni" 
                    placeholder="Ej: 30123456" 
                    {...register("dni")}
                />
                {errors.dni && <span className={Style.errorText}>⚠ {errors.dni.message}</span>}
            </fieldset>

            <fieldset className={Style.fieldset}>
                <label htmlFor="nacimiento" className={Style.label}>Fecha de Nacimiento:</label>
                <input className={Style.input} type="date" id="nacimiento" {...register("nacimiento")} />
                {errors.nacimiento && <span className={Style.errorText}>⚠ {errors.nacimiento.message}</span>}
            </fieldset>

            <fieldset className={Style.fieldset}>
                <label htmlFor="provincia" className={Style.label}>Provincia:</label>
                <select 
                    className={Style.input} 
                    id="provincia" 
                    {...register("provincia", {
                        onChange: () => setValue("id_localidad", "") 
                    })}
                >
                    <option value="">Seleccione...</option>
                    {provincias.map((prov, index) => (
                        // Ajustamos para leer prov.provincia o prov.nombre según tu API
                        <option key={index} value={prov.provincia || prov.nombre}>
                            {prov.provincia || prov.nombre}
                        </option>
                    ))}
                </select>
                {errors.provincia && <span className={Style.errorText}>⚠ {errors.provincia.message}</span>}
            </fieldset>

            <fieldset className={Style.fieldset}>
                <label htmlFor="id_localidad" className={Style.label}>Localidad:</label>
                <select
                    className={Style.input}
                    id="id_localidad"
                    disabled={!provinciaSeleccionada}
                    {...register("id_localidad")}
                >
                    <option value="">
                        {provinciaSeleccionada ? "Seleccione Localidad..." : "Seleccione Provincia primero"}
                    </option>
                    {localidadesFiltradas.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                            {loc.nombre || loc.localidad}
                        </option>
                    ))}
                </select>
                {errors.id_localidad && <span className={Style.errorText}>⚠ {errors.id_localidad.message}</span>}
            </fieldset>

            <fieldset className={Style.fieldset}>
                <label htmlFor="direccion" className={Style.label}>Dirección:</label>
                <input className={Style.input} type="text" id="direccion" placeholder="Calle y altura" {...register("direccion")} />
                {errors.direccion && <span className={Style.errorText}>⚠ {errors.direccion.message}</span>}
            </fieldset>

            <fieldset className={Style.fieldset}>
                <label htmlFor="telefono" className={Style.label}>Teléfono:</label>
                <input className={Style.input} type="text" id="telefono" placeholder="Cod. Área + Número" {...register("telefono")} />
                {errors.telefono && <span className={Style.errorText}>⚠ {errors.telefono.message}</span>}
            </fieldset>

            <button type="submit" className={Style.btnSubmit} disabled={isLoading}>
                {isLoading ? "Guardando..." : (isEditing ? "Actualizar Cliente" : "Guardar Cliente")}
            </button>
        </form>
    );
};

export default Formulario;