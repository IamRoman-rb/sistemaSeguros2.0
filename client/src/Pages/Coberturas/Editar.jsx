import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import Style from "../../Styles/Coberturas/Nueva.module.css"; // Reutilizamos estilos de Nueva para consistencia

// Hooks de Redux
import { useGetCoberturaByIdQuery, useUpdateCoberturaMutation } from "../../Redux/api/coberturasApi";

const schema = z.object({
    nombre: z.string()
        .min(1, "El nombre es obligatorio")
        .max(10, "El nombre debe ser corto (Ej: A, B, C1)"),
    descripcion: z.string()
        .min(5, "La descripción debe tener al menos 5 caracteres")
        .max(100, "La descripción es muy larga")
});

const Editar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. Obtener la cobertura actual por ID
    const { data: coberturaData, isLoading: loadingData, error } = useGetCoberturaByIdQuery(id);
    
    // 2. Mutación para actualizar
    const [updateCobertura, { isLoading: updating }] = useUpdateCoberturaMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema)
    });

    // Simulamos el rol del usuario (ajustar según tu lógica de auth)
    const user = { role: "admin" };

    // 3. Cargar datos en el formulario
    useEffect(() => {
        if (coberturaData) {
            reset({
                // Mapeo: Backend 'cobertura' -> Form 'nombre'
                nombre: coberturaData.cobertura, 
                descripcion: coberturaData.descripcion
            });
        }
    }, [coberturaData, reset]);

    const onSubmit = async (data) => {
        try {
            await updateCobertura({
                id: Number(id), // ID necesario para la URL PUT /coberturas/:id
                cobertura: data.nombre, // Mapeo inverso
                descripcion: data.descripcion
            }).unwrap();

            alert("Cobertura actualizada correctamente");
            navigate(`/${user.role}/coberturas/listado`);

        } catch (err) {
            console.error("Error al actualizar:", err);
            alert(err.data?.error || "Error al actualizar la cobertura");
        }
    };

    if (loadingData) return <div style={{textAlign:'center', marginTop:'2rem'}}>Cargando datos...</div>;
    if (error) return <div style={{textAlign:'center', color:'red'}}>Error al cargar la cobertura</div>;

    return (
        <section className={Style.formContainer}>
            <header className={Style.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link to={`/${user.role}/coberturas/listado`} className={Style.btnBack} title="Volver">
                        <IconArrowLeft size={20} />
                    </Link>
                    <h2>Editar Cobertura</h2>
                </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
                <fieldset className={Style.fieldset}>
                    <label htmlFor="nombre" className={Style.label}>Nombre (Código)</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Ej: A, B, C, C1"
                        className={`${Style.input} ${errors.nombre ? Style.inputError : ''}`}
                        {...register("nombre")}
                    />
                    {errors.nombre && <span className={Style.errorMsg}>{errors.nombre.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="descripcion" className={Style.label}>Descripción</label>
                    <input
                        type="text"
                        id="descripcion"
                        placeholder="Ej: Robo, incendio total y parcial..."
                        className={`${Style.input} ${errors.descripcion ? Style.inputError : ''}`}
                        {...register("descripcion")}
                    />
                    {errors.descripcion && <span className={Style.errorMsg}>{errors.descripcion.message}</span>}
                </fieldset>

                <div className={Style.footer}>
                    <button type="submit" className={Style.btnSubmit} disabled={updating}>
                        <IconDeviceFloppy size={18} />
                        {updating ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Editar;