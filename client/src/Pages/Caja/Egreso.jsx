import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from 'react-router-dom';
import { IconArrowLeft, IconMinus, IconCurrencyDollar } from '@tabler/icons-react';
import Style from "../../Styles/Caja/Egreso.module.css";

const schema = z.object({
    monto: z.number({ invalid_type_error: "El monto es obligatorio" })
        .positive("El monto debe ser mayor a 0")
        .min(1, "El monto mínimo es 1"),
    motivo: z.string()
        .min(3, "El motivo debe tener al menos 3 caracteres")
        .max(50, "El motivo es muy largo"),
    descripcion: z.string()
        .min(5, "La descripción debe ser más detallada")
        .max(200, "La descripción es muy larga")
});

const Egreso = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        alert("Egreso registrado correctamente");
        reset();
    };

    const user = { id: 1, name: "Admin User", role: "admin" };

    return (
        <section className={Style.formContainer}>
            <header className={Style.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link to={`/${user.role}/caja/listado/`} className={Style.btnBack} title="Volver a Caja">
                        <IconArrowLeft size={20} />
                    </Link>
                    <h2>Nuevo Egreso</h2>
                </div>
                <p className={Style.subtitle}>Registrar salida de dinero o gasto administrativo</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
                
                {/* Campo: Monto */}
                <div className={Style.inputGroup}>
                    <label htmlFor="monto" className={Style.label}>Monto</label>
                    <div className={Style.inputWrapper}>
                        <IconCurrencyDollar size={18} className={Style.inputIcon} />
                        <input 
                            type="number" 
                            id="monto" 
                            step="0.01"
                            placeholder="0.00"
                            className={`${Style.input} ${Style.inputWithIcon} ${errors.monto ? Style.inputError : ''}`}
                            {...register("monto", { valueAsNumber: true })}
                        />
                    </div>
                    {errors.monto && <span className={Style.errorMsg}>{errors.monto.message}</span>}
                </div>

                {/* Campo: Motivo */}
                <div className={Style.inputGroup}>
                    <label htmlFor="motivo" className={Style.label}>Motivo / Concepto</label>
                    <input 
                        type="text" 
                        id="motivo" 
                        placeholder="Ej: Librería, Limpieza, Café..."
                        className={`${Style.input} ${errors.motivo ? Style.inputError : ''}`}
                        {...register("motivo")}
                    />
                    {errors.motivo && <span className={Style.errorMsg}>{errors.motivo.message}</span>}
                </div>

                {/* Campo: Descripción */}
                <div className={Style.inputGroup}>
                    <label htmlFor="descripcion" className={Style.label}>Descripción Detallada</label>
                    <textarea 
                        id="descripcion" 
                        rows="3"
                        placeholder="Detalle del gasto realizado..."
                        className={`${Style.input} ${errors.descripcion ? Style.inputError : ''}`}
                        {...register("descripcion")}
                    ></textarea>
                    {errors.descripcion && <span className={Style.errorMsg}>{errors.descripcion.message}</span>}
                </div>

                <div className={Style.footer}>
                    <button type="submit" className={Style.btnSubmit}>
                        <IconMinus size={18} />
                        Registrar Egreso
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Egreso;