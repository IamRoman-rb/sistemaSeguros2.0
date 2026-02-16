import { useNavigate } from "react-router-dom";
import Style from "../../Styles/Clientes/Nuevo.module.css";
import { useCreateClienteMutation } from '../../Redux/api/clientesApi';
import Formulario from "./Formulario";

const Nuevo = () => {
    const navigate = useNavigate();
    const [createCliente, { isLoading }] = useCreateClienteMutation();

    const onSubmit = async (data) => {
        try {
            // Quitamos 'provincia' del payload final, solo sirve para la UI
            const { provincia, ...restoDatos } = data;
            
            const payload = {
                ...restoDatos,
                nacimiento: new Date(data.nacimiento).toISOString(),
            };

            await createCliente(payload).unwrap();
            alert("¡Cliente creado exitosamente!");
            navigate('/clientes');

        } catch (error) {
            console.error("Error al crear cliente:", error);
            const msg = error.data?.error || "Ocurrió un error al guardar.";
            alert("Error: " + msg);
        }
    };

    return (
        <section className={Style.nuevoContainer}>
            <header className={Style.headerNuevo}>
                <h2>Nuevo Cliente</h2>
            </header>
            
            <Formulario 
                onSubmit={onSubmit} 
                isLoading={isLoading} 
                isEditing={false}
            />
        </section>
    );
};

export default Nuevo;