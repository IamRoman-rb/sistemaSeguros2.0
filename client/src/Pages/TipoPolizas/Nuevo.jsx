import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { IconCategory, IconDeviceFloppy, IconArrowLeft } from '@tabler/icons-react';
import Style from "../../Styles/TipoPolizas/Nuevo.module.css";
import { useCreateTipoPolizaMutation } from '../../Redux/api/polizasApi';

const tipoPolizaSchema = z.object({
    tipo: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre es muy largo")
        .nonempty("El campo es obligatorio")
});

const Nuevo = () => {
    const navigate = useNavigate();
    const [createTipo, { isLoading }] = useCreateTipoPolizaMutation();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(tipoPolizaSchema)
    });

    const onSubmit = async (data) => {
        try {
            await createTipo(data).unwrap();
            
            alert("¡Tipo de póliza creado exitosamente!");
            navigate('/admin/tipo_polizas/listado');

        } catch (error) {
            const msg = error.data?.error || "Error al guardar el tipo de póliza.";
            alert(msg);
        }
    };

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link to="/admin/tipo-polizas/listado" className={Style.btnBack}>
                        <IconArrowLeft size={24} />
                    </Link>
                    <h2 className={Style.title}>Nuevo Tipo de Póliza</h2>
                </div>
            </header>

            <form className={Style.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={Style.formGroup}>
                    <label htmlFor="tipo" className={Style.label}>Nombre de la Categoría</label>
                    <div className={Style.inputWrapper}>
                        <IconCategory className={Style.iconInput} size={20} />
                        <input 
                            type="text" 
                            id="tipo" 
                            className={`${Style.input} ${errors.tipo ? Style.inputError : ''}`}
                            placeholder="Ej: Automotor, Hogar, Vida..." 
                            {...register("tipo")}
                        />
                    </div>
                    {errors.tipo && <span className={Style.errorText}>{errors.tipo.message}</span>}
                </div>

                <div className={Style.actions}>
                    <Link to="/admin/tipo-polizas/listado" className={Style.btnCancel}>
                        Cancelar
                    </Link>
                    <button 
                        type="submit" 
                        className={Style.btnSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Guardando..." : (
                            <>
                                <IconDeviceFloppy size={18} /> Crear Tipo
                            </>
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Nuevo;