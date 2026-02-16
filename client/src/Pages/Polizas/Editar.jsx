import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Style from "../../Styles/Polizas/Editar.module.css"; // Puedes reutilizar Nueva.module.css si quieres
import { IconArrowLeft } from '@tabler/icons-react';
import { useGetPolizaByNumeroQuery } from '../../Redux/api/polizasApi';

// Importamos los formularios reutilizables
import FormularioAutomotor from "./FormularioAutomotor";
import FormularioOtrosRiesgos from "./FormularioOtrosRiesgos";

const Editar = () => {
    const { id: numeroPoliza } = useParams();
    
    // 1. Obtener la póliza actual
    const { data: poliza, isLoading, error } = useGetPolizaByNumeroQuery(numeroPoliza);

    // 2. Mapear datos de la API al formato que espera el formulario
    const datosIniciales = useMemo(() => {
        if (!poliza) return null;

        const vehiculo = poliza.poliza_vehiculos?.[0]?.vehiculo;
        // Obtenemos la compañía desde la primera cobertura (si existe)
        const primeraCobertura = poliza.poliza_coberturas?.[0]; // { id_cobertura, id_empresa, cobertura: {...} }
        const idEmpresa = primeraCobertura?.id_empresa?.toString();
        const idCobertura = primeraCobertura?.id_cobertura?.toString();

        return {
            nPoliza: poliza.numero,
            inicioVigencia: poliza.inicio ? poliza.inicio.split('T')[0] : "",
            periodo: poliza.periodo === 12 ? "anual" : poliza.periodo === 1 ? "mensual" : "semestral",
            cuotas: poliza.cuotas,
            tipoUso: "particular", // Dato que quizás falta en tu JSON de respuesta, asumir o agregar al backend
            combustible: "nafta", // Dato que falta en el vehiculo de respuesta del backend (según tu JSON anterior)
            premioTotal: poliza.premio,
            
            // Datos Empresa/Cobertura
            compania: idEmpresa,
            cobertura: idCobertura,

            // Datos Vehículo (si es automotor)
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