import React from 'react';
import Style from "../../Styles/Polizas/Nueva.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { IconHome } from '@tabler/icons-react';
import { useCreatePolizaMutation, useGetTiposPolizaQuery } from '../../Redux/api/polizasApi';

// --- Esquema de Validación Simplificado ---
const otrosRiesgosSchema = z.object({
    nPoliza: z.string().min(1, "Requerido"),
    inicioVigencia: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Fecha inválida" }),
    periodo: z.string(),
    cuotas: z.coerce.number().min(1),
    premioTotal: z.coerce.number().min(1, "Requerido"),
    compania: z.string().optional(),
    tipoRiesgo: z.string().optional(),
    ubicacion: z.string().optional(),
    sumaAsegurada: z.coerce.number().optional()
});

const FormularioOtrosRiesgos = ({ clientePreseleccionado }) => {
    const navigate = useNavigate();
    const [createPoliza, { isLoading }] = useCreatePolizaMutation();
    const { data: tiposPoliza } = useGetTiposPolizaQuery();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(otrosRiesgosSchema),
        defaultValues: {
            cuotas: 1,
            periodo: "anual"
        }
    });

    const onSubmit = async (data) => {
        if (!clientePreseleccionado) {
            alert("Error: No hay cliente seleccionado.");
            return;
        }

        // Buscamos un tipo que no sea auto, o usamos el ID 2
        const tipoOtros = tiposPoliza?.find(t => !t.tipo.toLowerCase().includes('auto'))?.id || 2;

        const fechaInicio = new Date(data.inicioVigencia);
        const fechaFin = new Date(fechaInicio);
        // Lógica simple de fecha fin
        if (data.periodo === 'anual') fechaFin.setFullYear(fechaFin.getFullYear() + 1);
        else fechaFin.setMonth(fechaFin.getMonth() + (data.periodo === 'semestral' ? 6 : 1));

        try {
            const nuevaPoliza = {
                numero: data.nPoliza,
                emision: new Date().toISOString(),
                inicio: fechaInicio.toISOString(),
                fin: fechaFin.toISOString(),
                periodo: data.periodo === 'anual' ? 12 : (data.periodo === 'semestral' ? 6 : 1),
                cuotas: data.cuotas,
                premio: data.premioTotal,
                valido: true,
                id_tipo_poliza: tipoOtros,
                id_cliente: clientePreseleccionado.dni,
                id_sucursal: 1,
                id_empleado: 1
            };

            await createPoliza(nuevaPoliza).unwrap();
            alert("¡Póliza creada con éxito!");
            navigate('/admin/polizas/listado');

        } catch (error) {
            console.error("Error:", error);
            alert(error.data?.error || "Error al crear póliza");
        }
    };

    return (
        <form className={Style.formCard} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={Style.subTitle}><IconHome size={22} /> Datos de Póliza - Otros Riesgos</h3>

            <div className={Style.grid}>
                <div className={Style.fieldGroup}>
                    <label className={Style.label}>N° Póliza</label>
                    <input type="text" className={Style.input} {...register("nPoliza")} />
                    {errors.nPoliza && <span className={Style.errorText}>{errors.nPoliza.message}</span>}
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Inicio Vigencia</label>
                    <input type="date" className={Style.input} {...register("inicioVigencia")} />
                    {errors.inicioVigencia && <span className={Style.errorText}>{errors.inicioVigencia.message}</span>}
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Período de Vigencia</label>
                    <select className={Style.select} {...register("periodo")}>
                        <option value="semestral">Semestral</option>
                        <option value="mensual">Mensual</option>
                        <option value="cuatrimestral">Cuatrimestral</option>
                        <option value="anual">Anual</option>
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Cantidad de Cuotas</label>
                    <select className={Style.select} {...register("cuotas")}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Compañía / Empresa</label>
                    <select className={Style.select} {...register("compania")}>
                        <option value="">Seleccione...</option>
                        <option value="sancor">Sancor Seguros</option>
                        <option value="federacion">Federación Patronal</option>
                        <option value="allianz">Allianz</option>
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Tipo de Riesgo</label>
                    <input type="text" className={Style.input} placeholder="Ej: Comercio, Hogar..." {...register("tipoRiesgo")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Ubicación del Riesgo</label>
                    <input type="text" className={Style.input} placeholder="Dirección" {...register("ubicacion")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Suma Asegurada ($)</label>
                    <input type="number" className={Style.input} {...register("sumaAsegurada")} />
                </div>

                <div className={`${Style.fieldGroup} ${Style.fullWidth}`}>
                    <label className={Style.label}>Premio Total ($)</label>
                    <input type="number" className={Style.input} style={{ fontWeight: 'bold' }} {...register("premioTotal")} />
                    {errors.premioTotal && <span className={Style.errorText}>{errors.premioTotal.message}</span>}
                </div>
            </div>

            <div className={Style.formActions}>
                <button type="button" className={Style.btnCancel} onClick={() => navigate(-1)}>Cancelar</button>
                <button type="submit" className={Style.btnSubmit} disabled={isLoading}>
                    {isLoading ? "Emitiendo..." : "Emitir Póliza"}
                </button>
            </div>
        </form>
    );
};

export default FormularioOtrosRiesgos;