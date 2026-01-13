import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";
import { Link } from "react-router-dom";
import Style from "../../Styles/Empresas/Nueva.module.css";
import { IconBuildingSkyscraper, IconShieldCheck, IconId, IconMail, IconDeviceFloppy, IconChevronLeft } from '@tabler/icons-react';

const empresaSchema = z.object({
    nombre: z.string().min(2, "El nombre es obligatorio"),
    coberturas: z.array(z.object({
        value: z.string(),
        label: z.string()
    })).min(1, "Debe seleccionar al menos una cobertura")
});

const Nueva = () => {
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
        trigger,
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(empresaSchema)
    });

    const onSubmit = (data) => {
        const payload = {
            ...data,
            coberturas: data.coberturas.map(c => c.value) 
        };
        console.log("Enviando Empresa:", payload);
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
        <section className={Style.nuevoContainer}>
            <header className={Style.header}>
                <div className={Style.headerTop}>
                    <Link to="/admin/empresas/listado" className={Style.btnVolver}>
                        <IconChevronLeft size={18} /> Volver
                    </Link>
                    <h2 className={Style.titulo}>Nueva Empresa</h2>
                </div>
                <p className={Style.subtitulo}>Registre una nueva compañía aseguradora y sus coberturas.</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className={Style.formCard}>
                
                <div className={Style.gridForm}>
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
                </div>
                <fieldset className={Style.fieldset}>
                    <label className={Style.label}>
                        <IconShieldCheck size={18} className={Style.iconLabel}/> Coberturas Disponibles
                    </label>
                    <Select
                        isMulti
                        options={opcionesCoberturas}
                        styles={customStyles}
                        placeholder="Seleccione una o varias coberturas..."
                        closeMenuOnSelect={false}
                        onChange={(val) => {
                            setValue("coberturas", val);
                            trigger("coberturas");
                        }}
                    />
                    {errors.coberturas && <span className={Style.errorText}>⚠ {errors.coberturas.message}</span>}
                    <p className={Style.helperText}>Puede seleccionar múltiples opciones de la lista.</p>
                </fieldset>

                <div className={Style.actions}>
                    <button type="submit" className={Style.btnSubmit}>
                        <IconDeviceFloppy size={20} /> Guardar Empresa
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Nueva;