import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate, Link } from "react-router-dom";
import Style from "../../Styles/Pagos/Pagar.module.css"; // Estilos definidos abajo
import { 
    IconCurrencyDollar, 
    IconDeviceFloppy, 
    IconArrowLeft, 
    IconUser, 
    IconFileDescription 
} from '@tabler/icons-react';

// Hooks Redux
import { useGetPolizaByNumeroQuery } from '../../Redux/api/polizasApi';
import { useCreatePagoMutation } from '../../Redux/api/pagosApi';
import { useGetMetodosQuery } from '../../Redux/api/metodosApi';

// Esquema de Validación
const pagoSchema = z.object({
    importe: z.coerce.number().min(1, "El importe debe ser mayor a 0"),
    id_metodo: z.coerce.number().min(1, "Seleccione un método de pago"),
    observacion: z.string().optional()
});

const Pagar = () => {
    const { id: numeroPoliza } = useParams(); // Asumiendo ruta /pagos/nuevo/:id
    const navigate = useNavigate();

    // 1. Obtener datos de la Póliza
    const { data: poliza, isLoading: loadingPoliza, error: errorPoliza } = useGetPolizaByNumeroQuery(numeroPoliza);
    
    // 2. Obtener métodos de pago
    const { data: metodos = [] } = useGetMetodosQuery();

    // 3. Mutación para crear pago
    const [createPago, { isLoading: isPaying }] = useCreatePagoMutation();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(pagoSchema)
    });

    // Precargar importe sugerido (ej: valor de cuota promedio)
    useEffect(() => {
        if (poliza) {
            const valorCuota = poliza.premio / poliza.cuotas;
            setValue("importe", Math.round(valorCuota)); // Sugerimos el valor de 1 cuota
        }
    }, [poliza, setValue]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                importe: data.importe,
                observacion: data.observacion,
                id_poliza: poliza.numero,
                id_metodo: data.id_metodo,
                id_empleado: 1, // HARDCODED: Debería venir de tu contexto de Auth
            };

            await createPago(payload).unwrap();
            
            alert("¡Pago registrado exitosamente!");
            navigate(`/admin/polizas/detalle/${poliza.numero}`); // Volver al detalle

        } catch (error) {
            console.error("Error al pagar:", error);
            alert("Error al registrar el pago: " + (error.data?.error || "Error desconocido"));
        }
    };

    if (loadingPoliza) return <div className={Style.loading}>Cargando datos...</div>;
    if (errorPoliza || !poliza) return <div className={Style.error}>Póliza no encontrada</div>;

    const cliente = poliza.cliente;

    return (
        <section className={Style.container}>
            <header className={Style.header}>
                <Link to={`/admin/polizas/detalle/${numeroPoliza}`} className={Style.btnVolver}>
                    <IconArrowLeft size={20} /> Cancelar
                </Link>
                <h2 className={Style.titulo}>Registrar Pago</h2>
            </header>

            <div className={Style.gridLayout}>
                {/* COLUMNA IZQUIERDA: INFORMACIÓN */}
                <div className={Style.infoColumn}>
                    
                    {/* Tarjeta Cliente */}
                    <article className={Style.cardInfo}>
                        <div className={Style.cardHeader}>
                            <IconUser size={20} /> Datos del Cliente
                        </div>
                        <div className={Style.cardBody}>
                            <p><strong>Nombre:</strong> {cliente?.nombre}</p>
                            <p><strong>DNI:</strong> {cliente?.dni}</p>
                            <p><strong>Dirección:</strong> {cliente?.direccion}</p>
                        </div>
                    </article>

                    {/* Tarjeta Póliza */}
                    <article className={Style.cardInfo}>
                        <div className={Style.cardHeader}>
                            <IconFileDescription size={20} /> Detalle de Póliza
                        </div>
                        <div className={Style.cardBody}>
                            <p><strong>Póliza N°:</strong> {poliza.numero}</p>
                            <p><strong>Tipo:</strong> {poliza.tipo_poliza?.tipo}</p>
                            <p><strong>Vigencia:</strong> {new Date(poliza.fin).toLocaleDateString()}</p>
                            <div className={Style.divider}></div>
                            <p className={Style.total}>
                                <strong>Premio Total:</strong> 
                                <span>${poliza.premio?.toLocaleString()}</span>
                            </p>
                            <p><strong>Plan:</strong> {poliza.cuotas} cuotas</p>
                        </div>
                    </article>
                </div>

                {/* COLUMNA DERECHA: FORMULARIO DE PAGO */}
                <div className={Style.formColumn}>
                    <form onSubmit={handleSubmit(onSubmit)} className={Style.formCard}>
                        <h3 className={Style.formTitle}>Nuevo Ingreso</h3>

                        <fieldset className={Style.fieldset}>
                            <label className={Style.label}>Importe a Pagar ($)</label>
                            <input 
                                type="number" 
                                className={Style.inputHuge} 
                                placeholder="0.00"
                                step="0.01"
                                disabled={true}
                                {...register("importe")} 
                            />
                            {errors.importe && <span className={Style.errorText}>{errors.importe.message}</span>}
                        </fieldset>

                        <fieldset className={Style.fieldset}>
                            <label className={Style.label}>Método de Pago</label>
                            <select className={Style.select} {...register("id_metodo")}>
                                <option value="">Seleccione...</option>
                                {metodos.map(m => (
                                    <option key={m.id} value={m.id}>{m.nombre || m.metodo}</option>
                                ))}
                            </select>
                            {errors.id_metodo && <span className={Style.errorText}>{errors.id_metodo.message}</span>}
                        </fieldset>

                        <fieldset className={Style.fieldset}>
                            <label className={Style.label}>Observaciones (Opcional)</label>
                            <textarea 
                                rows="3"
                                className={Style.textarea} 
                                placeholder="Ej: Pago de cuota 2, cliente solicita factura A..."
                                {...register("observacion")} 
                            />
                        </fieldset>

                        <div className={Style.actions}>
                            <button type="submit" className={Style.btnSubmit} disabled={isPaying}>
                                <IconCurrencyDollar size={22} />
                                {isPaying ? "Procesando..." : "Confirmar Pago"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Pagar;