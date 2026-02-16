import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Style from "../../Styles/Polizas/Nueva.module.css";
import { IconCar, IconDeviceFloppy, IconSearch, IconLoader } from '@tabler/icons-react';

import { 
    useCreatePolizaMutation, 
    useUpdatePolizaMutation, 
    useAddVehiculoToPolizaMutation,
    useLazyGetVehiculoByPatenteQuery
} from '../../Redux/api/polizasApi';

import { useGetEmpresasQuery } from '../../Redux/api/empresasApi';
import { useGetMarcasQuery } from '../../Redux/api/marcasApi';
import { 
    useCreateVehiculoMutation, 
    useUpdateVehiculoMutation
} from '../../Redux/api/vehiculosApi';

const automotorSchema = z.object({
    nPoliza: z.string().min(1, "Requerido"),
    inicioVigencia: z.string(),
    periodo: z.string(),
    cuotas: z.coerce.number().min(1),
    marca: z.coerce.number().min(1, "Marca requerida"),
    modelo: z.string().min(1, "Modelo requerido"),
    patente: z.string().min(6, "Patente inválida"),
    anio: z.coerce.number().min(1900),
    sumaAsegurada: z.coerce.number().min(0),
    chasis: z.string().optional(),
    motor: z.string().optional(),
    combustible: z.string(),
    premioTotal: z.coerce.number().min(1),
    tipoUso: z.string(),
    compania: z.string().optional(),
    cobertura: z.string().optional()
});

const FormularioAutomotor = ({ clientePreseleccionado, tipoPolizaId, defaults, isEditing = false }) => {
    const navigate = useNavigate();
    const [vehiculoExistente, setVehiculoExistente] = useState(false);

    // --- HOOKS ---
    const [createPoliza, { isLoading: isCreatingP }] = useCreatePolizaMutation();
    const [updatePoliza, { isLoading: isUpdatingP }] = useUpdatePolizaMutation();
    const [createVehiculo, { isLoading: isCreatingV }] = useCreateVehiculoMutation();
    const [updateVehiculo, { isLoading: isUpdatingV }] = useUpdateVehiculoMutation();
    const [addVehiculoToPoliza, { isLoading: isLinking }] = useAddVehiculoToPolizaMutation();
    
    // Lazy Query desde PolizasApi
    const [buscarVehiculo, { isFetching: isSearchingVehiculo }] = useLazyGetVehiculoByPatenteQuery();

    const { data: empresas } = useGetEmpresasQuery();
    const { data: marcas } = useGetMarcasQuery();

    const { register, handleSubmit, watch, setValue, reset, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(automotorSchema),
        defaultValues: {
            cuotas: 1,
            periodo: "semestral",
            tipoUso: "particular",
            combustible: "nafta",
            ...defaults
        }
    });

    useEffect(() => {
        if (defaults) {
            reset(defaults);
            setVehiculoExistente(true);
        }
    }, [defaults, reset]);

    const selectedCompania = watch("compania");

    const coberturasDisponibles = useMemo(() => {
        if (!empresas || !selectedCompania) return [];
        const empresa = empresas.find(e => e.id.toString() === selectedCompania.toString());
        return empresa?.cobertura_empresas || [];
    }, [empresas, selectedCompania]);

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

    // --- FUNCIÓN PARA BUSCAR PATENTE ---
    const handleBuscarPatente = async () => {
        const patente = getValues("patente");
        if (!patente || patente.length < 6) {
            alert("Ingrese una patente válida para buscar.");
            return;
        }

        try {
            // Usamos el hook de polizasApi
            const vehiculoData = await buscarVehiculo(patente).unwrap();
            
            if (vehiculoData) {
                setValue("modelo", vehiculoData.modelo);
                setValue("anio", vehiculoData.anio);
                setValue("marca", vehiculoData.id_marca);
                setValue("sumaAsegurada", vehiculoData.suma);
                setValue("chasis", vehiculoData.chasis);
                setValue("motor", vehiculoData.motor);
                
                setVehiculoExistente(true);
            }
        } catch (error) {
            console.log("Vehículo no encontrado, se creará uno nuevo.");
            setVehiculoExistente(false);
        }
    };

    const onSubmit = async (data) => {
        const isLoading = isCreatingP || isCreatingV || isLinking || isUpdatingP || isUpdatingV;
        if (isLoading) return;
        
        try {
            const datosVehiculo = {
                patente: data.patente,
                modelo: data.modelo,
                anio: data.anio,
                suma: data.sumaAsegurada,
                chasis: data.chasis,
                motor: data.motor,
                id_marca: Number(data.marca),
            };

            const datosPoliza = {
                numero: data.nPoliza,
                inicio: new Date(data.inicioVigencia).toISOString(),
                fin: calcularFechaFin(data.inicioVigencia, data.periodo),
                periodo: data.periodo === 'anual' ? 12 : 6,
                cuotas: data.cuotas,
                premio: data.premioTotal,
                id_tipo_poliza: Number(tipoPolizaId),
                id_cliente: clientePreseleccionado.dni,
                id_sucursal: 1, 
                id_empleado: 1,
                emision: new Date().toISOString(),
                valido: true
            };

            // 1. GESTIONAR VEHÍCULO
            try {
                if (vehiculoExistente || isEditing) {
                    await updateVehiculo(datosVehiculo).unwrap();
                } else {
                    await createVehiculo(datosVehiculo).unwrap();
                }
            } catch (err) {
                console.warn("Error vehículo (posible duplicado), intentando actualizar...", err);
                await updateVehiculo(datosVehiculo).unwrap();
            }

            // 2. GESTIONAR PÓLIZA
            if (isEditing) {
                await updatePoliza(datosPoliza).unwrap();
                alert("¡Póliza actualizada exitosamente!");
                navigate(`/admin/polizas/detalle/${data.nPoliza}`);
            } else {
                await createPoliza(datosPoliza).unwrap();
                // 3. VINCULAR
                await addVehiculoToPoliza({
                    numero_poliza: data.nPoliza,
                    patente_vehiculo: data.patente
                }).unwrap();
                
                alert("¡Póliza y Vehículo registrados exitosamente!");
                navigate('/admin/polizas/listado');
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + (error.data?.error || "Ocurrió un error al procesar."));
        }
    };

    return (
        <form className={Style.formCard} onSubmit={handleSubmit(onSubmit)}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h3 className={Style.subTitle}>
                    <IconCar size={22} /> {isEditing ? "Editar" : "Nueva"} Póliza Automotor
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
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Período</label>
                    <select className={Style.select} {...register("periodo")}>
                        <option value="semestral">Semestral</option>
                        <option value="mensual">Mensual</option>
                        <option value="cuatrimestral">Cuatrimestral</option>
                        <option value="anual">Anual</option>
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Cuotas</label>
                    <select className={Style.select} {...register("cuotas")}>
                        {[1, 2, 3, 4, 5, 6, 12].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Uso</label>
                    <select className={Style.select} {...register("tipoUso")}>
                        <option value="particular">Particular</option>
                        <option value="comercial">Comercial</option>
                    </select>
                </div>

                <div className={`${Style.fieldGroup} ${Style.fullWidth}`}>
                    <label className={Style.label}>Cobertura</label>
                    <div className={Style.doubleField}>
                        <div style={{ flex: 1 }}>
                             <select className={Style.select} {...register("compania")}>
                                <option value="">Seleccione Compañía...</option>
                                {empresas?.map(e => (
                                    <option key={e.id} value={e.id}>{e.empresa}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <select className={Style.select} {...register("cobertura")}>
                                <option value="">Seleccione Cobertura...</option>
                                {coberturasDisponibles.map(ce => (
                                    <option key={ce.id} value={ce.cobertura.id}>
                                        {ce.cobertura.cobertura} - {ce.cobertura.descripcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Patente (Buscar)</label>
                    <div style={{display: 'flex', gap: '5px'}}>
                        <input 
                            type="text" 
                            className={Style.input} 
                            style={{ textTransform: 'uppercase', fontWeight: 'bold' }} 
                            placeholder="AA123BB"
                            {...register("patente")} 
                            disabled={isEditing}
                        />
                        {!isEditing && (
                            <button 
                                type="button" 
                                onClick={handleBuscarPatente}
                                disabled={isSearchingVehiculo}
                                style={{
                                    background: 'var(--french-blue)', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '6px', 
                                    padding: '0 10px', 
                                    cursor: 'pointer'
                                }}
                            >
                                {isSearchingVehiculo ? <IconLoader className="spin" size={20}/> : <IconSearch size={20}/>}
                            </button>
                        )}
                    </div>
                    {errors.patente && <span className={Style.errorText}>{errors.patente.message}</span>}
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Marca</label>
                    <select className={Style.select} {...register("marca")}>
                        <option value="">Seleccione...</option>
                        {marcas?.map(m => (
                            <option key={m.id} value={m.id}>{m.marca}</option>
                        ))}
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Modelo</label>
                    <input type="text" className={Style.input} {...register("modelo")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Año</label>
                    <input type="number" className={Style.input} {...register("anio")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Suma Asegurada ($)</label>
                    <input type="number" className={Style.input} {...register("sumaAsegurada")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Chasis</label>
                    <input type="text" className={Style.input} {...register("chasis")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Motor</label>
                    <input type="text" className={Style.input} {...register("motor")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Combustible</label>
                    <select className={Style.select} {...register("combustible")}>
                        <option value="nafta">Nafta</option>
                        <option value="diesel">Diesel</option>
                        <option value="gnc">GNC</option>
                    </select>
                </div>

                <div className={`${Style.fieldGroup} ${Style.fullWidth}`}>
                    <label className={Style.label}>Premio Total ($)</label>
                    <input type="number" className={Style.input} style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--deep-twilight)' }} {...register("premioTotal")} />
                </div>
            </div>

            <div className={Style.formActions}>
                <button type="button" className={Style.btnCancel} onClick={() => navigate(-1)}>Cancelar</button>
                <button type="submit" className={Style.btnSubmit} disabled={isCreatingP || isUpdatingP || isSearchingVehiculo}>
                    <IconDeviceFloppy size={18} />
                    {isEditing ? "Guardar Cambios" : "Emitir Póliza"}
                </button>
            </div>
        </form>
    );
};

export default FormularioAutomotor;