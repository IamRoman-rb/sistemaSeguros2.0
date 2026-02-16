import React, { useMemo } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import Style from "../../Styles/Empresas/Nueva.module.css";
import { 
    IconBuildingSkyscraper, 
    IconShieldCheck, 
    IconDeviceFloppy, 
    IconChevronLeft 
} from '@tabler/icons-react';

// Hooks de Redux
import { 
    useCreateEmpresaMutation, 
    useAddCoberturaToEmpresaMutation 
} from '../../Redux/api/empresasApi';
import { useGetCoberturasQuery } from '../../Redux/api/coberturasApi';

// Esquema actualizado (value ahora es un number para coincidir con la BD)
const empresaSchema = z.object({
    nombre: z.string().min(2, "El nombre es obligatorio"),
    coberturas: z.array(z.object({
        value: z.number(), 
        label: z.string()
    })).min(1, "Debe seleccionar al menos una cobertura")
});

const Nueva = () => {
    const navigate = useNavigate();

    // 1. Obtener coberturas de la BD
    const { data: todasLasCoberturas = [], isLoading: loadingCoberturas } = useGetCoberturasQuery();

    // 2. Mutaciones
    const [createEmpresa, { isLoading: isCreating }] = useCreateEmpresaMutation();
    const [addCobertura] = useAddCoberturaToEmpresaMutation();

    const { 
        register, 
        handleSubmit, 
        setValue,
        trigger,
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(empresaSchema)
    });

    // 3. Mapear opciones para el Select
    const opcionesCoberturas = useMemo(() => {
        return todasLasCoberturas.map(c => ({
            value: c.id,
            label: `${c.cobertura} - ${c.descripcion || ''}`
        }));
    }, [todasLasCoberturas]);

    const onSubmit = async (data) => {
        try {
            // 1. Crear la empresa base
            // Según tu controlador, espera { empresa: "Nombre" }
            const nuevaEmpresa = await createEmpresa({ empresa: data.nombre }).unwrap();

            // 2. Asociar coberturas a la empresa creada
            // nuevaEmpresa debería devolver el objeto insertado con su ID
            const promesasCoberturas = data.coberturas.map(cob => 
                addCobertura({ 
                    empresaId: nuevaEmpresa.id, 
                    coberturaId: cob.value 
                }).unwrap()
            );

            // Ejecutamos todas las inserciones en paralelo
            await Promise.all(promesasCoberturas);

            alert("¡Empresa registrada exitosamente!");
            navigate("/admin/empresas/listado");

        } catch (error) {
            console.error("Error al guardar empresa:", error);
            alert("Ocurrió un error al registrar la empresa o sus coberturas.");
        }
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
                        placeholder={loadingCoberturas ? "Cargando coberturas..." : "Seleccione una o varias coberturas..."}
                        isDisabled={loadingCoberturas}
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
                    <button type="submit" className={Style.btnSubmit} disabled={isCreating || loadingCoberturas}>
                        <IconDeviceFloppy size={20} /> 
                        {isCreating ? "Guardando..." : "Guardar Empresa"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Nueva;