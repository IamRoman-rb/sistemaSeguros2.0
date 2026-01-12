import Style from "../../Styles/Polizas/Nueva.module.css";
import { useForm } from "react-hook-form";
import { IconHome } from '@tabler/icons-react';
const FormularioOtrosRiesgos = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log("Datos Otros Riesgos:", data);
    };

    return (
        <form className={Style.formCard} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={Style.subTitle}><IconHome size={22}/> Datos de Póliza - Otros Riesgos</h3>
            
            <div className={Style.grid}>
                <div className={Style.fieldGroup}>
                    <label className={Style.label}>N° Póliza</label>
                    <input type="text" className={Style.input} {...register("nPoliza", { required: true })} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Inicio Vigencia</label>
                    <input type="date" className={Style.input} {...register("inicioVigencia")} />
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
                        <option value="1">1</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                    </select>
                </div>

                {/* CAMPOS ESPECÍFICOS DE OTROS RIESGOS */}
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
                    <label className={Style.label}>Tipo de Riesgo / Póliza</label>
                    <input type="text" className={Style.input} placeholder="Ej: Integral de Comercio, Combinado Familiar..." {...register("tipoRiesgo")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Ubicación del Riesgo</label>
                    <input type="text" className={Style.input} placeholder="Dirección del inmueble/comercio" {...register("ubicacion")} />
                </div>

                <div className={Style.fieldGroup}>
                    <label className={Style.label}>Suma Asegurada ($)</label>
                    <input type="number" className={Style.input} {...register("sumaAsegurada")} />
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

export default FormularioOtrosRiesgos;