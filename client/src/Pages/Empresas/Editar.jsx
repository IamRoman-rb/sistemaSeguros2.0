import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";
import { useParams, Link } from "react-router-dom";
import Style from "../../Styles/Empresas/Editar.module.css";
import { 
    IconBuildingSkyscraper, 
    IconShieldCheck, 
    IconDeviceFloppy, 
    IconChevronLeft 
} from '@tabler/icons-react';

const empresaSchema = z.object({
    nombre: z.string().min(2, "El nombre es obligatorio"),
    coberturas: z.array(z.object({
        value: z.string(),
        label: z.string()
    })).min(1, "Debe seleccionar al menos una cobertura")
});

const Editar = () => {
    const { id } = useParams();
    const empresasDB = [
        {
            id: 1,
            nombre: "Sancor Seguros",
            coberturas: [
                { codigo: "A", nombre: "Responsabilidad Civil" },
                { codigo: "B", nombre: "Terceros Completo" },
                { codigo: "C", nombre: "Todo Riesgo con Franquicia" },
                { codigo: "D", nombre: "Todo Riesgo sin Franquicia" }
            ]
        },
        {
            id: 2,
            nombre: "Federación Patronal",
            coberturas: [
                { codigo: "RC", nombre: "Resp. Civil Básica" },
                { codigo: "C1", nombre: "Terceros + Granizo" }
            ]
        },
        {
            id: 3,
            nombre: "La Caja",
            coberturas: [
                { codigo: "PACK", nombre: "Pack Ahorro" },
                { codigo: "TR", nombre: "Todo Riesgo" },
                { codigo: "GR", nombre: "Granizo Total" }
            ]
        }
    ];

    const opcionesCoberturas = [
        { value: "A", label: "A - Responsabilidad Civil" },
        { value: "B", label: "B - Terceros Completo" },
        { value: "C", label: "C - Todo Riesgo c/ Franquicia" },
        { value: "D", label: "D - Todo Riesgo s/ Franquicia" },
        { value: "C1", label: "C1 - Terceros + Granizo" },
        { value: "RC", label: "RC - Básica" },
        { value: "AP", label: "AP - Accidentes Personales" }
    ];

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
    useEffect(() => {
        const empresaEncontrada = empresasDB.find(e => e.id === Number(id));

        if (empresaEncontrada) {
            const coberturasFormatoSelect = empresaEncontrada.coberturas.map(c => ({
                value: c.codigo,
                label: c.nombre
            }));
            reset({
                nombre: empresaEncontrada.nombre,
                coberturas: coberturasFormatoSelect
            });
        }
    }, [id, reset]);

    const onSubmit = (data) => {
        const payload = {
            id: Number(id),
            nombre: data.nombre,
            coberturas: data.coberturas.map(c => c.value)
        };
        console.log("Editando Empresa:", payload);
    };
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
                    <button type="submit" className={Style.btnSubmit}>
                        <IconDeviceFloppy size={20} /> Guardar Cambios
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Editar;