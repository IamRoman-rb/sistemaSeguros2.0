import Style from "../../Styles/Polizas/Nueva.module.css";
import { useForm } from "react-hook-form";
import { IconFilePlus, IconCar, IconUser, IconCalendar } from '@tabler/icons-react';
const FormularioAutomotor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Datos Automotor:", data);
    };

    return (
        <form className={Style.formCard} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={Style.subTitle}><IconCar size={22}/> Datos de Póliza Automotor</h3>
            
            <div className={Style.grid}>
                {/* COLUMNA IZQUIERDA: DATOS GENERALES */}
                <div className={Style.fieldGroup}>
                    <label className={Style.label}>N° Póliza</label>
                    <input type="text" className={Style.input} {...register("nPoliza", { required: true })} />
                    {errors.nPoliza && <span className={Style.errorText}>Requerido</span>}
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Inicio Vigencia</label>
                    <input type="date" className={Style.input} {...register("inicioVigencia")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Período de Vigencia</label>
                    <select className={Style.select} {...register("periodo")}>
                        <option value="semestral">Semestral</option>
                        <option value="anual">Anual</option>
                        <option value="mensual">Mensual</option>
                    </select>
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Cantidad de Cuotas</label>
                    <select className={Style.select} {...register("cuotas")}>
                        <option value="1">1</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
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
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Modelo del Vehículo</label>
                    <input type="text" className={Style.input} placeholder="Ej: Focus Titanium" {...register("modelo")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Patente</label>
                    <input type="text" className={Style.input} style={{textTransform: 'uppercase'}} placeholder="AA 123 BB" {...register("patente")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Año</label>
                    <input type="number" className={Style.input} placeholder="2024" {...register("anio")} />
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
                </div>
            </div>

            <div className={Style.formActions}>
                <button type="button" className={Style.btnCancel}>Cancelar</button>
                <button type="submit" className={Style.btnSubmit}>Emitir Póliza</button>
            </div>
        </form>
    );
};

export default FormularioAutomotor;