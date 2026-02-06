import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Style from "../../Styles/Polizas/Nueva.module.css";
import { IconCar } from '@tabler/icons-react';
import { useCreatePolizaMutation, useGetTiposPolizaQuery } from '../../Redux/api/polizasApi';

// --- Esquema de Validación ---
const automotorSchema = z.object({
    nPoliza: z.string().min(1, "El número de póliza es obligatorio"),
    inicioVigencia: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Fecha inválida" }),
    periodo: z.string(), // "semestral", "mensual", etc.
    cuotas: z.coerce.number().min(1),
    // Vehículo
    marca: z.string().min(1, "Marca requerida"),
    modelo: z.string().min(1, "Modelo requerido"),
    patente: z.string().min(6, "Patente inválida"), // AA000AA son 7 chars, AAA000 son 6
    anio: z.coerce.number().min(1900).max(new Date().getFullYear() + 1),
    sumaAsegurada: z.coerce.number().min(0),
    chasis: z.string().optional(),
    motor: z.string().optional(),
    combustible: z.string(),
    // Económico
    premioTotal: z.coerce.number().min(1, "El premio debe ser mayor a 0"),
    // Datos extra
    tipoUso: z.string(),
    compania: z.string().optional(),
    cobertura: z.string().optional()
});

const FormularioAutomotor = ({ clientePreseleccionado }) => {
    const navigate = useNavigate();
    const [createPoliza, { isLoading }] = useCreatePolizaMutation();
    const { data: tiposPoliza } = useGetTiposPolizaQuery();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(automotorSchema),
        defaultValues: {
            cuotas: 1,
            periodo: "semestral",
            tipoUso: "particular",
            combustible: "nafta"
        }
    });

    // Función auxiliar para calcular fecha de fin
    const calcularFechaFin = (inicio, periodoStr) => {
        const fecha = new Date(inicio);
        let meses = 6;
        if (periodoStr === 'mensual') meses = 1;
        if (periodoStr === 'cuatrimestral') meses = 4;
        if (periodoStr === 'semestral') meses = 6;
        if (periodoStr === 'anual') meses = 12;
        
        fecha.setMonth(fecha.getMonth() + meses);
        return fecha.toISOString();
    };

    const onSubmit = async (data) => {
        if (!clientePreseleccionado) {
            alert("Error: No hay cliente seleccionado.");
            return;
        }

        // 1. Buscar el ID del tipo de póliza "Automotor" (o usar 1 por defecto)
        const tipoAutomotor = tiposPoliza?.find(t => t.tipo.toLowerCase().includes('auto'))?.id || 1;

        try {
            // 2. Preparar Payload para la API
            const nuevaPoliza = {
                numero: data.nPoliza,
                emision: new Date().toISOString(), // Fecha actual
                inicio: new Date(data.inicioVigencia).toISOString(),
                fin: calcularFechaFin(data.inicioVigencia, data.periodo),
                periodo: 6, // Hardcodeado a meses o mapear data.periodo a número
                cuotas: data.cuotas,
                premio: data.premioTotal,
                valido: true,
                id_tipo_poliza: tipoAutomotor,
                id_cliente: clientePreseleccionado.dni, // Usamos DNI como ID según tu esquema anterior
                id_sucursal: 1, // Default
                id_empleado: 1  // Default
            };

            // 3. Crear Póliza
            await createPoliza(nuevaPoliza).unwrap();

            alert("¡Póliza Automotor creada con éxito!");
            navigate('/admin/polizas/listado');

        } catch (error) {
            console.error("Error al crear póliza:", error);
            const msg = error.data?.error || "Error al guardar la póliza.";
            alert(msg);
        }
    };

    return (
        <form className={Style.formCard} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={Style.subTitle}><IconCar size={22}/> Datos de Póliza Automotor</h3>
            
            <div className={Style.grid}>
                <div className={Style.fieldGroup}>
                    <label className={Style.label}>N° Póliza</label>
                    <input type="text" className={Style.input} {...register("nPoliza")} placeholder="Ej: 900-123456" />
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
                        {[1,2,3,4,5,6, 7, 8, 9, 10, 11, 12].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>

                {/* DATOS ESPECÍFICOS AUTO */}
                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Tipo de Uso</label>
                    <select className={Style.select} {...register("tipoUso")}>
                        <option value="particular">Particular</option>
                        <option value="comercial">Comercial / Taxi / Remis</option>
                    </select>
                </div>

                {/* FILA DOBLE: EMPRESA Y COBERTURA */}
                <div className={`${Style.fieldGroup} ${Style.fullWidth}`}>
                    <label className={Style.label}>Datos de Cobertura</label>
                    <div className={Style.doubleField}>
                        <div style={{flex: 1}}>
                             <select className={Style.select} {...register("compania")}>
                                <option value="">Seleccione Compañía...</option>
                                <option value="sancor">Sancor Seguros</option>
                                <option value="federacion">Federación Patronal</option>
                            </select>
                        </div>
                        <div style={{flex: 1}}>
                            <select className={Style.select} {...register("cobertura")}>
                                <option value="">Seleccione Cobertura...</option>
                                <option value="A">A - Resp. Civil</option>
                                <option value="C">C - Terceros Completo</option>
                                <option value="D">D - Todo Riesgo</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* DATOS DEL VEHÍCULO */}
                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Marca del Vehículo</label>
                    <input type="text" className={Style.input} placeholder="Ej: Ford" {...register("marca")} />
                    {errors.marca && <span className={Style.errorText}>{errors.marca.message}</span>}
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Modelo del Vehículo</label>
                    <input type="text" className={Style.input} placeholder="Ej: Focus Titanium" {...register("modelo")} />
                    {errors.modelo && <span className={Style.errorText}>{errors.modelo.message}</span>}
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Patente</label>
                    <input type="text" className={Style.input} style={{textTransform: 'uppercase'}} placeholder="AA 123 BB" {...register("patente")} />
                    {errors.patente && <span className={Style.errorText}>{errors.patente.message}</span>}
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Año</label>
                    <input type="number" className={Style.input} placeholder="2024" {...register("anio")} />
                    {errors.anio && <span className={Style.errorText}>{errors.anio.message}</span>}
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Suma Asegurada ($)</label>
                    <input type="number" className={Style.input} {...register("sumaAsegurada")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>N° Chasis</label>
                    <input type="text" className={Style.input} {...register("chasis")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>N° Motor</label>
                    <input type="text" className={Style.input} {...register("motor")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Combustible</label>
                    <select className={Style.select} {...register("combustible")}>
                        <option value="nafta">Nafta</option>
                        <option value="diesel">Diesel</option>
                        <option value="hibrido">Híbrido</option>
                        <option value="gnc">GNC</option>
                    </select>
                </div>

                <div className={`${Style.fieldGroup} ${Style.fullWidth}`}>
                    <label className={Style.label}>Premio Total de la Póliza ($)</label>
                    <input type="number" className={Style.input} style={{fontWeight: 'bold', fontSize: '1.1rem'}} {...register("premioTotal")} />
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

export default FormularioAutomotor;