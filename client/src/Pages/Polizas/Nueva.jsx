import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { Link, useSearchParams } from "react-router-dom"; 
import Style from "../../Styles/Polizas/Nueva.module.css";
import FormularioAutomotor from "./FormularioAutomotor";
import FormularioOtrosRiesgos from "./FormularioOtrosRiesgos";
import { IconChevronLeft, IconUser, IconFiles } from '@tabler/icons-react';
import { useGetClientesQuery } from '../../Redux/api/clientesApi';
import { useGetTiposPolizaQuery } from '../../Redux/api/polizasApi';

const Nueva = () => {
    const [searchParams] = useSearchParams();
    const dniPreseleccionado = searchParams.get("dni");
    const { data: clientesData, isLoading: isLoadingClientes } = useGetClientesQuery();

    const { data: tiposPolizaData, isLoading: isLoadingTipos } = useGetTiposPolizaQuery();

    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [tipoPolizaId, setTipoPolizaId] = useState("");

    const opcionesClientes = useMemo(() => {
        if (!clientesData) return [];
        return clientesData.map(c => ({
            value: c.dni,
            label: `${c.nombre} - DNI: ${c.dni}`,
            datosCompletos: c
        }));
    }, [clientesData]);

    useEffect(() => {
        if (dniPreseleccionado && opcionesClientes.length > 0) {
            const encontrado = opcionesClientes.find(op => op.value.toString() === dniPreseleccionado.toString());
            if (encontrado) {
                setClienteSeleccionado(encontrado.datosCompletos);
            }
        }
    }, [dniPreseleccionado, opcionesClientes]);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? 'var(--french-blue)' : 'var(--pale-slate-2)',
            boxShadow: state.isFocused ? '0 0 0 3px var(--light-cyan)' : 'none',
            borderRadius: '0.3rem',
            padding: '0.2rem',
            fontSize: '1.1rem',
            fontFamily: 'var(--font-primary)',
            cursor: 'pointer',
            '&:hover': { borderColor: 'var(--french-blue)' }
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected 
                ? 'var(--deep-twilight)' 
                : state.isFocused ? 'var(--bright-snow)' : 'white',
            color: state.isSelected ? 'white' : 'var(--gunmetal)',
            fontFamily: 'var(--font-primary)',
            cursor: 'pointer',
        }),
        input: (base) => ({ ...base, fontFamily: 'var(--font-primary)' }),
        placeholder: (base) => ({ ...base, color: 'var(--slate-grey)', fontFamily: 'var(--font-primary)' })
    };

    const handleClienteChange = (opcion) => {
        setClienteSeleccionado(opcion ? opcion.datosCompletos : null);
    };

    const handleTipoChange = (e) => {
        setTipoPolizaId(e.target.value);
    };

    const tipoSeleccionadoObj = tiposPolizaData?.find(t => t.id === Number(tipoPolizaId));
    const isAutomotor = tipoSeleccionadoObj 
        ? /auto|moto|camion|rodado/i.test(tipoSeleccionadoObj.tipo) 
        : false;

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <h2 className={Style.title}>Nueva Póliza</h2>
                <div className={Style.headerButtons}>
                    {clienteSeleccionado ? (
                         <Link to={`/admin/clientes/detalle/${clienteSeleccionado.dni}`} className={Style.btnVolver}>
                            <IconChevronLeft size={16} style={{marginBottom:-2}}/> Volver a Cliente
                         </Link>
                    ) : (
                        <Link to="/admin/clientes/listado" className={Style.btnVolver}>
                            <IconChevronLeft size={16} style={{marginBottom:-2}}/> Clientes
                        </Link>
                    )}
                    
                    <Link to="/admin/polizas/listado" className={Style.btnVolver}>
                        <IconChevronLeft size={16} style={{marginBottom:-2}}/> Pólizas
                    </Link>
                </div>
            </header>

            <div className={Style.selectorCard}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem'}}>
                    <IconUser size={20} color="var(--deep-twilight)"/>
                    <label htmlFor="selectorCliente" className={Style.selectorLabel} style={{marginBottom:0}}>
                        1. Busque y Seleccione el Cliente Tomador:
                    </label>
                </div>
                
                <Select
                    id="selectorCliente"
                    value={clienteSeleccionado 
                        ? opcionesClientes.find(op => op.value === clienteSeleccionado.dni) 
                        : null
                    }
                    options={opcionesClientes}
                    onChange={handleClienteChange}
                    styles={customStyles}
                    placeholder={isLoadingClientes ? "Cargando clientes..." : "Escriba nombre o DNI para buscar..."}
                    noOptionsMessage={() => isLoadingClientes ? "Cargando..." : "No se encontraron clientes"}
                    isClearable={true} 
                    isDisabled={isLoadingClientes}
                />
            </div>

            {clienteSeleccionado && (
                <div className={Style.selectorCard} style={{animation: 'fadeIn 0.3s ease-in-out'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                        <IconFiles size={20} color="var(--deep-twilight)"/>
                        <label htmlFor="selectorTipo" className={Style.selectorLabel} style={{marginBottom:0}}>
                            2. Seleccione el Tipo de Póliza a emitir:
                        </label>
                    </div>
                    
                    <select 
                        id="selectorTipo" 
                        className={Style.select} 
                        value={tipoPolizaId} 
                        onChange={handleTipoChange}
                        disabled={isLoadingTipos}
                        style={{fontSize: '1.1rem', padding: '1rem'}}
                    >
                        <option value="" disabled>
                            {isLoadingTipos ? "Cargando tipos..." : "-- Seleccionar Tipo --"}
                        </option>

                        {tiposPolizaData?.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>
                                {tipo.tipo}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div style={{marginTop: '2rem'}}>
                
                {clienteSeleccionado && tipoPolizaId && isAutomotor && (
                    <FormularioAutomotor 
                        clientePreseleccionado={clienteSeleccionado} 
                        tipoPolizaId={tipoPolizaId} 
                    />
                )}
                
                {clienteSeleccionado && tipoPolizaId && !isAutomotor && (
                    <FormularioOtrosRiesgos 
                        clientePreseleccionado={clienteSeleccionado}
                        tipoPolizaId={tipoPolizaId}
                    />
                )}
                {!clienteSeleccionado && !isLoadingClientes && (
                    <div style={{textAlign: 'center', color: 'var(--slate-grey)', fontStyle: 'italic', marginTop: '2rem'}}>
                        <p>Utilice el buscador superior para encontrar al cliente por nombre o DNI.</p>
                    </div>
                )}
                
                {clienteSeleccionado && !tipoPolizaId && (
                    <div style={{textAlign: 'center', color: 'var(--slate-grey)', fontStyle: 'italic', marginTop: '2rem'}}>
                        <p>Cliente seleccionado: <strong>{clienteSeleccionado.nombre}</strong>. Ahora seleccione el tipo de riesgo.</p>
                    </div>
                )}
            </div>

        </section>
    );
};

export default Nueva;