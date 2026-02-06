import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Style from "../../Styles/Clientes/Nuevo.module.css";
import { useCreateClienteMutation } from '../../Redux/api/clientesApi';

const clienteSchema = z.object({
    dni: z.coerce.number({ invalid_type_error: "El DNI debe ser un número" })
        .int("El DNI debe ser un número entero")
        .positive("El DNI debe ser positivo")
        .min(1, "El DNI es obligatorio"),
    nombre: z.string()
        .min(1, "El nombre es obligatorio")
        .max(100, "El nombre no puede exceder los 100 caracteres"),
    nacimiento: z.string()
        .refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Fecha inválida" }),
    direccion: z.string()
        .min(1, "La dirección es obligatoria")
        .max(200, "La dirección no puede exceder los 200 caracteres"),
    telefono: z.string()
        .min(1, "El teléfono es obligatorio")
        .max(15, "El teléfono no puede exceder los 15 caracteres"),
    id_localidad: z.coerce.number({ invalid_type_error: "Seleccione una localidad válida" })
        .int()
        .positive("Debe seleccionar una localidad")
});

const Nuevo = () => {
    const navigate = useNavigate();
    const [createCliente, { isLoading }] = useCreateClienteMutation();

    const provincias = [
        "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba",
        "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa",
        "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro",
        "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
        "Santiago del Estero", "Tierra del Fuego", "Tucumán"
    ];

    // --- CAMBIO 1: Las localidades ahora tienen ID numérico para coincidir con el Schema ---
    const localidades = [
        { id: 1, nombre: "Capital" },
        { id: 2, nombre: "Godoy Cruz" },
        { id: 3, nombre: "Guaymallén" },
        { id: 4, nombre: "Las Heras" },
        { id: 5, nombre: "Maipú" },
        { id: 6, nombre: "San Rafael" }
    ];

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(clienteSchema)
    });

    const onSubmit = async (data) => {
        console.log("Enviando datos...", data); // Para depurar
        try {
            const payload = {
                ...data,
                nacimiento: new Date(data.nacimiento).toISOString(),
            };

            await createCliente(payload).unwrap();
            alert("¡Cliente creado exitosamente!");
            navigate('/clientes');

        } catch (error) {
            console.error("Error al crear cliente:", error);
            const msg = error.data?.error || error.data?.errors?.[0]?.msg || "Ocurrió un error al guardar.";
            alert("Error: " + msg);
        }
    };

    // Función para ver errores en consola si el formulario no se envía
    const onError = (errors) => {
        console.log("Errores de validación:", errors);
    };

    return (
        <section className={Style.nuevoContainer}>
            <header className={Style.headerNuevo}>
                <h2>Nuevo Cliente</h2>
            </header>

            {/* Agregamos onError al handleSubmit para ver por qué falla */}
            <form onSubmit={handleSubmit(onSubmit, onError)} className={Style.formGrid}>
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
                    <label htmlFor="dni" className={Style.label}>DNI (sin puntos):</label>
                    <input
                        className={Style.input}
                        type="number" // Cambiado a number para ayudar al usuario
                        id="dni"
                        placeholder="Ej: 30123456"
                        {...register("dni")}
                    />
                    {errors.dni && <span className={Style.errorText}>⚠ {errors.dni.message}</span>}
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
                    <label htmlFor="provincia" className={Style.label}>Provincia:</label>
                    {/* Este campo no se valida en el schema, así que puede ser un select simple o registrarse si lo necesitas */}
                    <select className={Style.input} id="provincia">
                        <option value="">Seleccione...</option>
                        {provincias.map((prov, index) => (
                            <option key={index} value={prov}>{prov}</option>
                        ))}
                    </select>
                </fieldset>

                <fieldset className={Style.fieldset}>
                    <label htmlFor="id_localidad" className={Style.label}>Localidad:</label>
                    {/* CAMBIO 2: Usar SELECT en lugar de INPUT/DATALIST */}
                    <select
                        className={Style.input}
                        id="id_localidad"
                        {...register("id_localidad")}
                    >
                        <option value="">Seleccione Localidad...</option>
                        {localidades.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.id_localidad && <span className={Style.errorText}>⚠ {errors.id_localidad.message}</span>}
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

                <button
                    type="submit"
                    className={Style.btnSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Guardando..." : "Guardar Cliente"}
                </button>
            </form>
        </section>
    );
};

export default Nuevo;