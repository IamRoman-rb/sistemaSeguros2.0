import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconPlus, IconCurrencyDollar } from '@tabler/icons-react';
import Style from "../../Styles/Caja/Ingreso.module.css";

import { useCreateMovimientoMutation } from '../../Redux/api/movimientosApi';

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

const Ingreso = () => {
    const navigate = useNavigate();
    const [createMovimiento, { isLoading }] = useCreateMovimientoMutation();

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm({
        resolver: zodResolver(schema)
    });

    const user = { id: 1, name: "Admin User", role: "admin" };

    const onSubmit = async (data) => {
        try {
            const payload = {
                importe: Number(data.monto),
                motivo: data.motivo,
                descripcion: data.descripcion,
                es_ingreso: true,
                id_empleado: user.id
            };

            await createMovimiento(payload).unwrap();
            
            alert("Ingreso registrado correctamente");
            reset();
            navigate(`/${user.role}/caja/listado`);
            
        } catch (error) {
            console.error("Error al registrar ingreso:", error);
            alert(error.data?.error || "Ocurrió un error al registrar el movimiento.");
        }
    };

    return (
        <section className={Style.formContainer}>
            <header className={Style.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link to={`/${user.role}/caja/listado`} className={Style.btnBack} title="Volver a Caja">
                        <IconArrowLeft size={20} />
                    </Link>
                    <h2>Nuevo Ingreso</h2>
                </div>
                <p className={Style.subtitle}>Registrar entrada de dinero extra (no pólizas)</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
                
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
                            disabled={isLoading}
                        />
                    </div>
                    {errors.monto && <span className={Style.errorMsg}>{errors.monto.message}</span>}
                </div>

                <div className={Style.inputGroup}>
                    <label htmlFor="motivo" className={Style.label}>Motivo / Concepto</label>
                    <input 
                        type="text" 
                        id="motivo" 
                        placeholder="Ej: Venta de cartón, Ajuste, etc."
                        className={`${Style.input} ${errors.motivo ? Style.inputError : ''}`}
                        {...register("motivo")}
                        disabled={isLoading}
                    />
                    {errors.motivo && <span className={Style.errorMsg}>{errors.motivo.message}</span>}
                </div>

                <div className={Style.inputGroup}>
                    <label htmlFor="descripcion" className={Style.label}>Descripción Detallada</label>
                    <textarea 
                        id="descripcion" 
                        rows="3"
                        placeholder="Detalles adicionales sobre el ingreso..."
                        className={`${Style.input} ${errors.descripcion ? Style.inputError : ''}`}
                        {...register("descripcion")}
                        disabled={isLoading}
                    ></textarea>
                    {errors.descripcion && <span className={Style.errorMsg}>{errors.descripcion.message}</span>}
                </div>

                <div className={Style.footer}>
                    <button type="submit" className={Style.btnSubmit} disabled={isLoading}>
                        <IconPlus size={18} />
                        {isLoading ? "Procesando..." : "Registrar Ingreso"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Ingreso;