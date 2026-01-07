import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Style from "../../Styles/Clientes/Nuevo.module.css"; 
const clienteSchema = z.object({
    nombre: z.string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    cuit: z.string()
        .regex(/^\d{2}-\d{8}-\d{1}$/, { message: "El formato debe ser XX-XXXXXXXX-X" }),
    nacimiento: z.string()
        .refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Fecha inválida" }),
    email: z.string()
        .email({ message: "Email inválido" }),
    provincia: z.string()
        .min(1, { message: "Debe seleccionar una provincia" }),
    localidad: z.string()
        .min(1, { message: "Debe seleccionar una localidad" }),
    direccion: z.string()
        .min(5, { message: "La dirección es muy corta" }),
    telefono: z.string()
        .min(8, { message: "El teléfono debe tener al menos 8 dígitos" })
        .regex(/^[0-9\s-]+$/, { message: "Solo se permiten números, espacios y guiones" }),
});

const Nuevo = () => {
    const provincias = [
        "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", 
        "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", 
        "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", 
        "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", 
        "Santiago del Estero", "Tierra del Fuego", "Tucumán"
    ];

    const localidades = [
        "Capital", "Godoy Cruz", "Guaymallén", "Las Heras", "Maipú", "San Rafael"
    ];
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(clienteSchema)
    });

    const onSubmit = (data) => {
        console.log("Datos válidos listos para enviar:", data);
    };

return (
        <section className={Style.nuevoContainer}>
            <header className={Style.headerNuevo}>
                <h2>Nuevo Cliente</h2>
            </header>
            
            <form onSubmit={handleSubmit(onSubmit)} className={Style.formGrid}> 
                <h3 className={Style.subTitle}>Datos Personales y Contacto</h3>
                
                <fieldset className={Style.fieldset}>
                    <label htmlFor="nombre" className={Style.label}>Nombre:</label>
                    <input 
                        className={Style.input}
                        type="text" 
                        id="nombre" 
                        placeholder="Nombre completo" 
                        {...register("nombre")} 
                    />
                    {errors.nombre && <span className={Style.errorText}>⚠ {errors.nombre.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="cuit" className={Style.label}>CUIT:</label>
                    <input 
                        className={Style.input}
                        type="text" 
                        id="cuit" 
                        placeholder="20-xxxxxxxx-x" 
                        {...register("cuit")}
                    />
                    {errors.cuit && <span className={Style.errorText}>⚠ {errors.cuit.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="nacimiento" className={Style.label}>Fecha de Nacimiento:</label>
                    <input 
                        className={Style.input}
                        type="date" 
                        id="nacimiento" 
                        {...register("nacimiento")}
                    />
                    {errors.nacimiento && <span className={Style.errorText}>⚠ {errors.nacimiento.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="email" className={Style.label}>Email:</label>
                    <input 
                        className={Style.input}
                        type="email" 
                        id="email" 
                        placeholder="cliente@email.com" 
                        {...register("email")}
                    />
                    {errors.email && <span className={Style.errorText}>⚠ {errors.email.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="provincia" className={Style.label}>Provincia:</label>
                    <input 
                        className={Style.input}
                        list="lista-provincias" 
                        id="provincia" 
                        placeholder="Escriba o seleccione..." 
                        {...register("provincia")}
                    />
                    <datalist id="lista-provincias">
                        {provincias.map((prov, index) => (
                            <option key={index} value={prov} />
                        ))}
                    </datalist>
                    {errors.provincia && <span className={Style.errorText}>⚠ {errors.provincia.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="localidad" className={Style.label}>Localidad:</label>
                    <input 
                        className={Style.input}
                        list="lista-localidades" 
                        id="localidad" 
                        placeholder="Escriba o seleccione..." 
                        {...register("localidad")}
                    />
                    <datalist id="lista-localidades">
                        {localidades.map((loc, index) => (
                            <option key={index} value={loc} />
                        ))}
                    </datalist>
                    {errors.localidad && <span className={Style.errorText}>⚠ {errors.localidad.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="direccion" className={Style.label}>Dirección:</label>
                    <input 
                        className={Style.input}
                        type="text" 
                        id="direccion" 
                        placeholder="Calle y altura" 
                        {...register("direccion")}
                    />
                    {errors.direccion && <span className={Style.errorText}>⚠ {errors.direccion.message}</span>}
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="telefono" className={Style.label}>Teléfono:</label>
                    <input 
                        className={Style.input}
                        type="text" 
                        id="telefono" 
                        placeholder="Cod. Área + Número" 
                        {...register("telefono")}
                    />
                    {errors.telefono && <span className={Style.errorText}>⚠ {errors.telefono.message}</span>}
                </fieldset>

                <button type="submit" className={Style.btnSubmit}>Guardar Cliente</button>
            </form>
        </section>
    );
};

export default Nuevo;