import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import Style from "../../Styles/Coberturas/Editar.module.css";
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

    const [coberturas, setCoberturas] = useState([
        { codigo: "A", nombre: "Responsabilidad Civil" },
        { codigo: "B", nombre: "Terceros Completo" },
        { codigo: "C", nombre: "Todo Riesgo con Franquicia" },
        { codigo: "D", nombre: "Todo Riesgo sin Franquicia" },
        { codigo: "RC", nombre: "Resp. Civil Básica" },
        { codigo: "C1", nombre: "Terceros + Granizo" },
        { codigo: "PACK", nombre: "Pack Ahorro" },
        { codigo: "TR", nombre: "Todo Riesgo" },
        { codigo: "GR", nombre: "Granizo Total" }
    ]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        const cobertura = coberturas.find((c, index) => c.codigo === coberturas[id].codigo)
        if (cobertura) {
            reset({
                codigo: cobertura.codigo,
                nombre: cobertura.nombre
            }
            )
        } else {
            console.log("Cobertura no encontrada");
        }
    }, [id, reset])

    const onSubmit = () => {
        return
    }
    return (
        <section className={Style.formContainer}>
            <header>
                <h2>Editar Cobertura</h2>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
                <fieldset className={Style.fieldset}>
                    <label htmlFor="nombre" className={Style.label}>Nombre (Código)</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Ej: A, B, C, C1"
                        className={`${Style.input} ${errors.nombre ? Style.inputError : ''}`}
                        {...register("codigo")}
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
                        {...register("nombre")}
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

export default Editar;