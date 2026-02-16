import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import Style from "../../Styles/Coberturas/Nueva.module.css";

// Importamos el hook de Redux
import { useCreateCoberturaMutation } from '../../Redux/api/coberturasApi';

const schema = z.object({
    nombre: z.string()
        .min(1, "El nombre es obligatorio")
        .max(10, "El nombre debe ser corto (Ej: A, B, C1)"),
    descripcion: z.string()
        .min(5, "La descripción debe tener al menos 5 caracteres")
        .max(100, "La descripción es muy larga")
});

const Nueva = () => {
    const navigate = useNavigate();
    
    // Inicializamos la mutación
    const [createCobertura, { isLoading }] = useCreateCoberturaMutation();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(schema)
    });

    // Simulación de usuario (puedes reemplazarlo con tu auth context real)
    const user = {
        name: "Walter Perez",
        role: "admin"
    };

    const onSubmit = async (data) => {
        try {
            // Mapeo: El backend espera "cobertura" y "descripcion"
            const payload = {
                cobertura: data.nombre, // 'nombre' del form -> 'cobertura' del backend
                descripcion: data.descripcion
            };

            await createCobertura(payload).unwrap();
            
            alert("Cobertura creada correctamente");
            navigate(`/${user.role}/coberturas/listado`);

        } catch (error) {
            console.error("Error al crear:", error);
            const msg = error.data?.error || "Error al crear la cobertura (Verifique si el código ya existe)";
            alert(msg);
        }
    };

    return(
        <section className={Style.formContainer}>
            <header className={Style.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link to={`/${user.role}/coberturas/listado`} className={Style.btnBack} title="Volver">
                        <IconArrowLeft size={20} />
                    </Link>
                    <h2>Nueva Cobertura</h2>
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                    />
                    {errors.descripcion && <span className={Style.errorMsg}>{errors.descripcion.message}</span>}
                </fieldset>

                <div className={Style.footer}>
                    <button type="submit" className={Style.btnSubmit} disabled={isLoading}>
                        <IconDeviceFloppy size={18} />
                        {isLoading ? "Guardando..." : "Crear Cobertura"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Nueva;