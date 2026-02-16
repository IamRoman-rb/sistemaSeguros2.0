import React, { useEffect } from 'react';
import Style from "../../Styles/Polizas/Nueva.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { IconHome, IconDeviceFloppy } from '@tabler/icons-react';
import { useGetEmpresasQuery } from '../../Redux/api/empresasApi';
import { useCreatePolizaMutation, useUpdatePolizaMutation } from '../../Redux/api/polizasApi';

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

const FormularioOtrosRiesgos = ({ clientePreseleccionado, tipoPolizaId, defaults, isEditing = false }) => {
    const navigate = useNavigate();
    
    // Hooks API
    const [createPoliza, { isLoading: isCreating }] = useCreatePolizaMutation();
    const [updatePoliza, { isLoading: isUpdating }] = useUpdatePolizaMutation();
    const { data: empresas = [] } = useGetEmpresasQuery();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: zodResolver(otrosRiesgosSchema),
        defaultValues: { 
            cuotas: 1, 
            periodo: "anual",
            tipoRiesgo: "",
            ubicacion: "",
            sumaAsegurada: 0
        }
    });

    // --- LÓGICA DE PRECARGA DE DATOS ---
    useEffect(() => {
        if (defaults) {
            // 1. Mapeo de datos básicos (que sí existen en tu JSON)
            const formData = {
                nPoliza: defaults.numero,
                premioTotal: defaults.premio,
                cuotas: defaults.cuotas,
                // Cortar fecha ISO (2026-02-16T...) para input date
                inicioVigencia: defaults.inicio ? defaults.inicio.split('T')[0] : '',
                periodo: defaults.periodo === 12 ? 'anual' : (defaults.periodo === 1 ? 'mensual' : 'semestral'),
            };

            // 2. RECUPERAR "TIPO DE RIESGO"
            // Como no tienes columna 'tipoRiesgo', usamos el nombre del tipo de póliza (ej: "Hogar")
            if (defaults.tipo_poliza?.tipo) {
                formData.tipoRiesgo = defaults.tipo_poliza.tipo;
            }

            // 3. RECUPERAR "UBICACIÓN"
            // Si no hay ubicación guardada, asumimos la dirección del cliente
            if (defaults.cliente?.direccion) {
                formData.ubicacion = defaults.cliente.direccion;
            }

            // 4. RECUPERAR "SUMA ASEGURADA" y otros datos desde OBSERVACIONES (si existen)
            // Esto sirve si guardaste los datos concatenados anteriormente
            if (defaults.observaciones) {
                const partes = defaults.observaciones.split(' - ');
                const partUbicacion = partes.find(p => p.includes("Ubicación:"));
                const partSuma = partes.find(p => p.includes("Suma:"));
                
                if (partUbicacion) formData.ubicacion = partUbicacion.replace("Ubicación: ", "").trim();
                if (partSuma) formData.sumaAsegurada = Number(partSuma.replace("Suma: ", ""));
            } 
            // Si la suma viene en columna propia 'suma' en la DB
            else if (defaults.suma) {
                formData.sumaAsegurada = defaults.suma;
            }

            // 5. RECUPERAR "COMPAÑÍA"
            // Intentamos sacarla de las coberturas relacionadas si existen
            if (defaults.poliza_coberturas && defaults.poliza_coberturas.length > 0) {
                const idEmpresa = defaults.poliza_coberturas[0].cobertura?.id_empresa;
                if (idEmpresa) formData.compania = idEmpresa.toString();
            }

            // Aplicamos los datos al formulario
            reset(formData);
        }
    }, [defaults, reset]);

    const onSubmit = async (data) => {
        if (!clientePreseleccionado && !isEditing) {
            alert("Error: No hay cliente seleccionado.");
            return;
        }

        const fechaInicio = new Date(data.inicioVigencia);
        const fechaFin = new Date(fechaInicio);

        // Calcular fin de vigencia
        if (data.periodo === 'anual') fechaFin.setFullYear(fechaFin.getFullYear() + 1);
        else if (data.periodo === 'semestral') fechaFin.setMonth(fechaFin.getMonth() + 6);
        else fechaFin.setMonth(fechaFin.getMonth() + 1);

        try {
            // Empaquetamos los datos extra en un string para 'observaciones'
            // Así persistimos la ubicación y el tipo específico aunque no tengas columnas en la DB
            const observacionesStr = `Riesgo: ${data.tipoRiesgo} - Ubicación: ${data.ubicacion} - Suma: ${data.sumaAsegurada}`;

            const polizaData = {
                numero: data.nPoliza,
                inicio: fechaInicio.toISOString(),
                fin: fechaFin.toISOString(),
                periodo: data.periodo === 'anual' ? 12 : 6,
                cuotas: data.cuotas,
                premio: data.premioTotal,
                id_cliente: clientePreseleccionado ? clientePreseleccionado.dni : defaults.id_cliente,
                // Guardamos los datos extra en observaciones
                observaciones: observacionesStr, 
                // Si agregaste columna 'suma' en la DB, descomenta esto:
                // suma: data.sumaAsegurada 
            };

            if (isEditing) {
                // Actualizar
                await updatePoliza({
                    ...polizaData,
                    id_tipo_poliza: Number(tipoPolizaId)
                }).unwrap();
                
                alert("¡Póliza actualizada correctamente!");
                navigate(`/admin/polizas/detalle/${data.nPoliza}`);
            } else {
                // Crear
                const nuevaPoliza = {
                    ...polizaData,
                    id_tipo_poliza: Number(tipoPolizaId),
                    emision: new Date().toISOString(),
                    valido: true,
                    id_sucursal: 1, // Ajustar según auth
                    id_empleado: 1  // Ajustar según auth
                };
                
                await createPoliza(nuevaPoliza).unwrap();
                alert("¡Póliza creada exitosamente!");
                navigate('/admin/polizas/listado');
            }

        } catch (error) {
            console.error("Error al guardar:", error);
            const msg = error.data?.error || "Ocurrió un error al procesar la solicitud.";
            alert("Error: " + msg);
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <form className={Style.formCard} onSubmit={handleSubmit(onSubmit)}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h3 className={Style.subTitle}>
                    <IconHome size={22} /> {isEditing ? "Editar" : "Nueva"} Póliza - Otros Riesgos
                </h3>
                {isEditing && <span className={Style.tagEdit}>Modo Edición</span>}
            </div>

            <div className={Style.grid}>
                <div className={Style.fieldGroup}>
                    <label className={Style.label}>N° Póliza</label>
                    <input 
                        type="text" 
                        className={Style.input} 
                        {...register("nPoliza")} 
                        disabled={isEditing} 
                        style={isEditing ? {backgroundColor: '#f0f0f0', cursor: 'not-allowed'} : {}}
                    />
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
                        <option value="anual">Anual</option>
                        <option value="semestral">Semestral</option>
                        <option value="mensual">Mensual</option>
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Cantidad de Cuotas</label>
                    <select className={Style.select} {...register("cuotas")}>
                        {[1, 2, 3, 4, 5, 6, 12].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Compañía / Empresa</label>
                    <select className={Style.select} {...register("compania")}>
                        <option value="">Seleccione...</option>
                        {empresas?.map(e => (
                            <option key={e.id} value={e.id}>{e.empresa || e.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Tipo de Riesgo</label>
                    <input 
                        type="text" 
                        className={Style.input} 
                        placeholder="Ej: Comercio, Hogar, Incendio..." 
                        {...register("tipoRiesgo")} 
                    />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Ubicación del Riesgo</label>
                    <input 
                        type="text" 
                        className={Style.input} 
                        placeholder="Dirección del riesgo" 
                        {...register("ubicacion")} 
                    />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Suma Asegurada ($)</label>
                    <input type="number" className={Style.input} {...register("sumaAsegurada")} />
                </div>

                <div className={`${Style.fieldGroup} ${Style.fullWidth}`}>
                    <label className={Style.label}>Premio Total ($)</label>
                    <input 
                        type="number" 
                        className={Style.input} 
                        style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--deep-twilight)' }} 
                        {...register("premioTotal")} 
                    />
                    {errors.premioTotal && <span className={Style.errorText}>{errors.premioTotal.message}</span>}
                </div>
            </div>

            <div className={Style.formActions}>
                <button type="button" className={Style.btnCancel} onClick={() => navigate(-1)}>Cancelar</button>
                <button type="submit" className={Style.btnSubmit} disabled={isLoading}>
                    <IconDeviceFloppy size={18} />
                    {isLoading ? "Procesando..." : (isEditing ? "Guardar Cambios" : "Emitir Póliza")}
                </button>
            </div>
        </form>
    );
};

export default FormularioOtrosRiesgos;