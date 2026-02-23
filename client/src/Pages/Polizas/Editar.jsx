import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Style from "../../Styles/Polizas/Editar.module.css";
import { IconArrowLeft } from '@tabler/icons-react';
import { useGetPolizaByNumeroQuery } from '../../Redux/api/polizasApi';
import FormularioAutomotor from "./FormularioAutomotor";
import FormularioOtrosRiesgos from "./FormularioOtrosRiesgos";

const Editar = () => {
    const { id: numeroPoliza } = useParams();
    const { data: poliza, isLoading, error } = useGetPolizaByNumeroQuery(numeroPoliza);
    const datosIniciales = useMemo(() => {
        if (!poliza) return null;

        const vehiculo = poliza.poliza_vehiculos?.[0]?.vehiculo;
        const primeraCobertura = poliza.poliza_coberturas?.[0];
        const idEmpresa = primeraCobertura?.id_empresa?.toString();
        const idCobertura = primeraCobertura?.id_cobertura?.toString();

        return {
            nPoliza: poliza.numero,
            inicioVigencia: poliza.inicio ? poliza.inicio.split('T')[0] : "",
            periodo: poliza.periodo === 12 ? "anual" : poliza.periodo === 1 ? "mensual" : "semestral",
            cuotas: poliza.cuotas,
            tipoUso: "particular",
            combustible: "nafta",
            premioTotal: poliza.premio,
            compania: idEmpresa,
            cobertura: idCobertura,
            marca: vehiculo?.id_marca,
            modelo: vehiculo?.modelo,
            patente: vehiculo?.patente,
            anio: vehiculo?.anio,
            sumaAsegurada: vehiculo?.suma,
            chasis: vehiculo?.chasis,
            motor: vehiculo?.motor
        };
    }, [poliza]);

    if (isLoading) return <div className={Style.loading}>Cargando póliza...</div>;
    if (error || !poliza) return <div className={Style.error}>Error al cargar póliza</div>;

    const isAutomotor = poliza.tipo_poliza?.tipo?.toLowerCase().includes("auto");

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link to={`/admin/polizas/detalle/${numeroPoliza}`} style={{ color: 'var(--slate-grey)', display: 'flex' }}>
                        <IconArrowLeft size={24} />
                    </Link>
                    <h2 className={Style.title}>Editar Póliza</h2>
                </div>
                <div style={{marginLeft: 'auto', fontWeight: 'bold', color: 'var(--french-blue)'}}>
                    {poliza.tipo_poliza?.tipo}
                </div>
            </header>

            {isAutomotor ? (
                <FormularioAutomotor 
                    clientePreseleccionado={poliza.cliente}
                    tipoPolizaId={poliza.id_tipo_poliza}
                    defaults={datosIniciales}
                    isEditing={true}
                />
            ) : (
                <FormularioOtrosRiesgos 
                    clientePreseleccionado={poliza.cliente}
                    tipoPolizaId={poliza.id_tipo_poliza}
                    defaults={datosIniciales}
                    isEditing={true}
                />
            )}
        </section>
    );
}

export default Editar;