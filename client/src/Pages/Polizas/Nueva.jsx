import React, { useState } from "react";
import Select from "react-select"; // 1. Importamos la librería
import Style from "../../Styles/Polizas/Nueva.module.css";
import FormularioAutomotor from "./FormularioAutomotor";
import FormularioOtrosRiesgos from "./FormularioOtrosRiesgos";
import { Link } from "react-router-dom";
import { IconChevronLeft, IconUser, IconFiles } from '@tabler/icons-react';

const Nueva = () => {
    // Listas de datos simulados
    const clientes = [
        { id: 1, nombre: "Juan Mateo Pérez", cuit: "20-34567890-3" },
        { id: 2, nombre: "María Elena Rodríguez", cuit: "27-28901234-6" },
        { id: 3, nombre: "Logística S.R.L.", cuit: "30-70123456-8" },
        { id: 4, nombre: "Carlos Alberto Gómez", cuit: "20-12345678-9" },
        { id: 5, nombre: "Ana Sofía Martínez", cuit: "27-98765432-1" },
        { id: 6, nombre: "Lucas Gabriel Fernández", cuit: "23-56789012-4" }
    ];

    // 2. Preparamos las opciones para React-Select
    // La librería necesita objetos con formato { value: algo, label: "lo que se ve" }
    const opcionesClientes = clientes.map(c => ({
        value: c.id,
        label: `${c.nombre} - ${c.cuit}`, // Mostramos Nombre y CUIT para buscar mejor
        datosCompletos: c // Guardamos el objeto original por si lo necesitamos
    }));

    // ESTADOS
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [tipoPoliza, setTipoPoliza] = useState("");

    // 3. Estilos personalizados para que React-Select use TUS variables CSS
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
            '&:hover': {
                borderColor: 'var(--french-blue)'
            }
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected 
                ? 'var(--deep-twilight)' 
                : state.isFocused 
                    ? 'var(--bright-snow)' 
                    : 'white',
            color: state.isSelected ? 'white' : 'var(--gunmetal)',
            fontFamily: 'var(--font-primary)',
            cursor: 'pointer',
            ':active': {
                backgroundColor: 'var(--french-blue)'
            }
        }),
        singleValue: (base) => ({
            ...base,
            color: 'var(--carbon-black)',
            fontFamily: 'var(--font-primary)',
            fontWeight: '500'
        }),
        input: (base) => ({
            ...base,
            color: 'var(--carbon-black)',
            fontFamily: 'var(--font-primary)',
        }),
        placeholder: (base) => ({
            ...base,
            color: 'var(--slate-grey)',
            fontFamily: 'var(--font-primary)',
        })
    };

    // HANDLERS
    const handleClienteChange = (opcion) => {
        // React-select devuelve el objeto completo de la opción, o null si se borra
        setClienteSeleccionado(opcion ? opcion.datosCompletos : null);
    };

    const handleTipoChange = (e) => {
        setTipoPoliza(e.target.value);
    };

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <h2 className={Style.title}>Nueva Póliza</h2>
                <div className={Style.headerButtons}>
                    <Link to="/admin/clientes/listado" className={Style.btnVolver}>
                        <IconChevronLeft size={16} style={{marginBottom:-2}}/> Clientes
                    </Link>
                    <Link to="/admin/polizas/listado" className={Style.btnVolver}>
                        <IconChevronLeft size={16} style={{marginBottom:-2}}/> Pólizas
                    </Link>
                </div>
            </header>

            {/* PASO 1: SELECCIONAR CLIENTE (CON BUSCADOR INTELIGENTE) */}
            <div className={Style.selectorCard}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem'}}>
                    <IconUser size={20} color="var(--deep-twilight)"/>
                    <label htmlFor="selectorCliente" className={Style.selectorLabel} style={{marginBottom:0}}>
                        1. Busque y Seleccione el Cliente Tomador:
                    </label>
                </div>
                
                {/* REEMPLAZO DEL SELECT NATIVO POR REACT-SELECT */}
                <Select
                    id="selectorCliente"
                    options={opcionesClientes}
                    onChange={handleClienteChange}
                    styles={customStyles} // Aplicamos tus estilos
                    placeholder="Escriba nombre o CUIT para buscar..."
                    noOptionsMessage={() => "No se encontraron clientes"}
                    isClearable={true} // Permite borrar la selección con una X
                />
            </div>

            {/* PASO 2: SELECCIONAR TIPO DE PÓLIZA */}
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
                        value={tipoPoliza} 
                        onChange={handleTipoChange}
                        style={{fontSize: '1.1rem', padding: '1rem'}}
                    >
                        <option value="" disabled>-- Seleccionar Tipo --</option>
                        <option value="automotor">Automotor (Autos, Motos, Camiones)</option>
                        <option value="otros">Otros Riesgos (Hogar, Comercio, Vida, etc.)</option>
                    </select>
                </div>
            )}

            {/* PASO 3: FORMULARIO DE CARGA */}
            <div style={{marginTop: '2rem'}}>
                {clienteSeleccionado && tipoPoliza === "automotor" && (
                    <FormularioAutomotor clientePreseleccionado={clienteSeleccionado} />
                )}
                
                {clienteSeleccionado && tipoPoliza === "otros" && (
                    <FormularioOtrosRiesgos clientePreseleccionado={clienteSeleccionado} />
                )}
                
                {/* Mensajes de ayuda */}
                {!clienteSeleccionado && (
                    <div style={{textAlign: 'center', color: 'var(--slate-grey)', fontStyle: 'italic', marginTop: '2rem'}}>
                        <p>Utilice el buscador superior para encontrar al cliente por nombre o CUIT.</p>
                    </div>
                )}
                
                {clienteSeleccionado && !tipoPoliza && (
                    <div style={{textAlign: 'center', color: 'var(--slate-grey)', fontStyle: 'italic', marginTop: '2rem'}}>
                        <p>Cliente seleccionado: <strong>{clienteSeleccionado.nombre}</strong>. Ahora seleccione el tipo de riesgo.</p>
                    </div>
                )}
            </div>

        </section>
    );
};

export default Nueva;