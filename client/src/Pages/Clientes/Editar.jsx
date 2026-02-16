import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Style from "../../Styles/Clientes/Nuevo.module.css";
import { IconArrowLeft } from '@tabler/icons-react';
import Formulario from "./Formulario";

// Hooks
import { useGetClienteByDniQuery, useUpdateClienteMutation } from '../../Redux/api/clientesApi';
import { useGetProvinciasQuery } from "../../Redux/api/provinciasApi";

const Editar = () => {
    const { id } = useParams(); // ID es el DNI
    const navigate = useNavigate();
    
    // 1. Obtener Cliente
    const { data: cliente, isLoading: loadingCliente, error } = useGetClienteByDniQuery(id);
    
    // 2. Obtener Provincias (necesario para calcular cuál pre-seleccionar)
    const { data: provincias } = useGetProvinciasQuery();
    
    // 3. Mutación de actualización
    const [updateCliente, { isLoading: updating }] = useUpdateClienteMutation();

    const [defaultValues, setDefaultValues] = useState(null);

    // LÓGICA: Calcular los valores iniciales
    useEffect(() => {
        if (cliente && provincias) {
            // El cliente tiene id_localidad, pero el form necesita 'provincia' (string)
            // Buscamos en todas las provincias cuál contiene esa localidad
            const provinciaEncontrada = provincias.find(p => 
                p.localidades.some(loc => loc.id === cliente.id_localidad)
            );

            // Formatear fecha para el input type="date" (YYYY-MM-DD)
            const fechaFormateada = cliente.nacimiento 
                ? new Date(cliente.nacimiento).toISOString().split('T')[0] 
                : "";

            setDefaultValues({
                nombre: cliente.nombre,
                dni: cliente.dni,
                direccion: cliente.direccion,
                telefono: cliente.telefono,
                nacimiento: fechaFormateada,
                id_localidad: cliente.id_localidad,
                provincia: provinciaEncontrada ? (provinciaEncontrada.provincia || provinciaEncontrada.nombre) : ""
            });
        }
    }, [cliente, provincias]);

    const onSubmit = async (data) => {
        try {
            const { provincia, ...restoDatos } = data;
            
            const payload = {
                ...restoDatos,
                nacimiento: new Date(data.nacimiento).toISOString(),
            };

            // Aseguramos enviar el ID original si tu backend lo requiere en la URL o body
            // updateCliente normalmente espera { id, ...data } o data con id dentro
            await updateCliente(payload).unwrap();
            
            alert("¡Cliente actualizado exitosamente!");
            navigate('/clientes');

        } catch (error) {
            console.error("Error al actualizar:", error);
            const msg = error.data?.error || "Error al actualizar.";
            alert("Error: " + msg);
        }
    };

    if (loadingCliente) return <div className={Style.loading}>Cargando datos...</div>;
    if (error || !cliente) return <div className={Style.error}>No se encontró el cliente</div>;

    return (
        <section className={Style.nuevoContainer}>
            <header className={Style.headerNuevo}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <Link to="/admin/clientes/listado" className={Style.btnVolver}>
                        <IconArrowLeft size={24} />
                    </Link>
                    <h2>Editar Cliente</h2>
                </div>
            </header>
            
            {/* Solo renderizamos el form cuando tenemos los valores calculados */}
            {defaultValues && (
                <Formulario 
                    onSubmit={onSubmit} 
                    isLoading={updating} 
                    defaultValues={defaultValues}
                    isEditing={true}
                />
            )}
        </section>
    )
}

export default Editar;