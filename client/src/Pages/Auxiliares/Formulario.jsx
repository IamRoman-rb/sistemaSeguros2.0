import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import Style from "../../Styles/Auxiliares/Nuevo.module.css";
import { IconCar, IconPlus, IconDeviceFloppy } from '@tabler/icons-react';

const Formulario = ({ onSubmit, defaultValues, isLoading, buttonLabel }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: defaultValues || { marca: "" }
    });
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
            <div className={Style.inputGroup}>
                <label htmlFor="marca" className={Style.label}>Nombre de la marca</label>
                <div className={Style.inputWrapper}>
                    <IconCar stroke={1.5} size={20} className={Style.inputIcon} />
                    <input
                        type="text"
                        id="marca"
                        placeholder="Ej: Toyota, Ford, Honda..."
                        className={Style.input}
                        {...register("marca", { required: "El nombre es obligatorio" })}
                    />
                </div>
                {errors.marca && <span style={{color: 'red', fontSize: '0.8rem', marginTop: '5px'}}>{errors.marca.message}</span>}
            </div>

            <div className={Style.btnGroup}>
                <button type="submit" className={Style.btnSubmit} disabled={isLoading}>
                    {isLoading ? "Guardando..." : (
                        <>
                            {buttonLabel === "Editar" ? <IconDeviceFloppy size={18}/> : <IconPlus size={18} />}
                            {buttonLabel || "Guardar"}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default Formulario;