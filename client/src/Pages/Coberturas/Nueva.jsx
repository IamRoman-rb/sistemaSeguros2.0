import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from 'react-router-dom';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import Style from "../../Styles/Coberturas/Nueva.module.css";

const schema = z.object({
    nombre: z.string()
        .min(1, "El nombre es obligatorio")
        .max(10, "El nombre debe ser corto (Ej: A, B, C1)"),
    descripcion: z.string()
        .min(5, "La descripción debe tener al menos 5 caracteres")
        .max(100, "La descripción es muy larga")
});

const Nueva = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(schema)
    });

    const user = {
        name: "Walter Perez",
        role: "admin"
    }
    const onSubmit = (data) => {
        console.log("Datos válidos:", data);
        alert("Cobertura creada correctamente");
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
                    <button type="submit" className={Style.btnSubmit}>
                        <IconDeviceFloppy size={18} />
                        Crear Cobertura
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Nueva;