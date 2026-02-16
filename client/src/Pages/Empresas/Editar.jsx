import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";
import { useParams, Link, useNavigate } from "react-router-dom";
import Style from "../../Styles/Empresas/Editar.module.css";
import { 
    IconBuildingSkyscraper, 
    IconShieldCheck, 
    IconDeviceFloppy, 
    IconChevronLeft 
} from '@tabler/icons-react';

// Hooks de Redux
import { 
    useGetEmpresaByIdQuery, 
    useUpdateEmpresaMutation,
    useAddCoberturaToEmpresaMutation,
    useRemoveCoberturaFromEmpresaMutation
} from '../../Redux/api/empresasApi';
import { useGetCoberturasQuery } from '../../Redux/api/coberturasApi';

const empresaSchema = z.object({
    nombre: z.string().min(2, "El nombre es obligatorio"),
    // El array de objetos del select
    coberturas: z.array(z.object({
        value: z.number(), // ID de cobertura (usualmente número)
        label: z.string()
    })).min(1, "Debe seleccionar al menos una cobertura")
});

const Editar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. Obtener Empresa y Coberturas
    const { data: empresa, isLoading: loadingEmpresa } = useGetEmpresaByIdQuery(id);
    const { data: todasLasCoberturas = [], isLoading: loadingCoberturas } = useGetCoberturasQuery();

    // 2. Mutaciones
    const [updateEmpresa, { isLoading: updating }] = useUpdateEmpresaMutation();
    const [addCobertura] = useAddCoberturaToEmpresaMutation();
    const [removeCobertura] = useRemoveCoberturaFromEmpresaMutation();

    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch,
        reset,
        trigger,
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(empresaSchema)
    });

    const coberturasSeleccionadas = watch("coberturas");

    // 3. Preparar opciones para el Select
    const opcionesCoberturas = useMemo(() => {
        return todasLasCoberturas.map(c => ({
            value: c.id,
            label: `${c.cobertura} - ${c.descripcion || c.nombre}` // Ajusta según tu modelo
        }));
    }, [todasLasCoberturas]);

    // 4. Cargar datos iniciales
    useEffect(() => {
        if (empresa) {
            // Mapear las coberturas que la empresa YA tiene
            // Nota: Ajusta 'cobertura_empresas' si tu backend usa otro nombre para la relación
            const coberturasActuales = empresa.cobertura_empresas?.map(rel => ({
                value: rel.cobertura.id,
                label: `${rel.cobertura.cobertura} - ${rel.cobertura.descripcion}`
            })) || [];

            reset({
                nombre: empresa.empresa || empresa.nombre,
                coberturas: coberturasActuales
            });
        }
    }, [empresa, reset]);

    const onSubmit = async (data) => {
        try {
            // 1. Actualizar datos básicos (Nombre)
            await updateEmpresa({ id: Number(id), empresa: data.nombre }).unwrap();

            // 2. Gestionar Relaciones (Agregar/Quitar)
            // IDs seleccionados actualmente en el form
            const idsSeleccionados = data.coberturas.map(c => c.value);
            
            // IDs que ya tenía la empresa en base de datos
            const idsOriginales = empresa.cobertura_empresas?.map(rel => rel.cobertura.id) || [];

            // A) Detectar Nuevas (Están en seleccionados pero NO en originales)
            const nuevas = idsSeleccionados.filter(idCob => !idsOriginales.includes(idCob));
            
            // B) Detectar Eliminadas (Estaban en originales pero NO en seleccionados)
            const eliminadas = idsOriginales.filter(idCob => !idsSeleccionados.includes(idCob));

            // Ejecutar promesas en paralelo
            const promesas = [
                ...nuevas.map(idCob => addCobertura({ empresaId: Number(id), coberturaId: idCob }).unwrap()),
                ...eliminadas.map(idCob => removeCobertura({ empresaId: Number(id), coberturaId: idCob }).unwrap())
            ];

            await Promise.all(promesas);

            alert("¡Empresa actualizada correctamente!");
            navigate('/admin/empresas/listado');

        } catch (error) {
            console.error("Error al editar:", error);
            alert("Ocurrió un error al actualizar la empresa.");
        }
    };

    // Estilos personalizados para react-select (Mantenidos igual)
    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? 'var(--french-blue)' : 'var(--pale-slate-2)',
            boxShadow: state.isFocused ? '0 0 0 3px var(--light-cyan)' : 'none',
            borderRadius: '0.3rem',
            padding: '0.2rem',
            fontFamily: 'var(--font-primary)',
            backgroundColor: '#fcfcfc'
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: 'var(--light-cyan)',
            borderRadius: '4px',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: 'var(--deep-twilight)',
            fontWeight: '600',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: 'var(--deep-twilight)',
            ':hover': {
                backgroundColor: 'var(--night-bordeaux)',
                color: 'white',
            },
        }),
    };

    if (loadingEmpresa || loadingCoberturas) return <div style={{textAlign:'center', padding:'2rem'}}>Cargando datos...</div>;

    return(
        <section className={Style.editarContainer}>
            <header className={Style.header}>
                <div className={Style.headerTop}>
                    <Link to="/admin/empresas/listado" className={Style.btnVolver}>
                        <IconChevronLeft size={18} /> Volver
                    </Link>
                    <h2 className={Style.titulo}>Editar Empresa</h2>
                </div>
                <p className={Style.subtitulo}>Modificando datos de la empresa ID: {id}</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className={Style.formCard}>
                
                <fieldset className={Style.fieldset}>
                    <label htmlFor="nombre" className={Style.label}>
                        <IconBuildingSkyscraper size={18} className={Style.iconLabel}/> Nombre Empresa
                    </label>
                    <input 
                        type="text" 
                        id="nombre" 
                        className={Style.input}
                        placeholder="Ej: Sancor Seguros"
                        {...register("nombre")} 
                    />
                    {errors.nombre && <span className={Style.errorText}>⚠ {errors.nombre.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label className={Style.label}>
                        <IconShieldCheck size={18} className={Style.iconLabel}/> Coberturas Ofrecidas
                    </label>
                    <Select
                        isMulti
                        options={opcionesCoberturas}
                        styles={customStyles}
                        placeholder="Seleccione coberturas..."
                        closeMenuOnSelect={false}
                        value={coberturasSeleccionadas} 
                        onChange={(val) => {
                            setValue("coberturas", val);
                            trigger("coberturas");
                        }}
                    />
                    {errors.coberturas && <span className={Style.errorText}>⚠ {errors.coberturas.message}</span>}
                </fieldset>

                <div className={Style.actions}>
                    <button type="submit" className={Style.btnSubmit} disabled={updating}>
                        <IconDeviceFloppy size={20} /> 
                        {updating ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Editar;