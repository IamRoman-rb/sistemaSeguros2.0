import Style from "../../Styles/Clientes/Buscador.module.css";

const Buscador = ({ onSearch }) => {
    
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <form className={Style.buscadorContainer} onSubmit={(e) => e.preventDefault()}>
            <h3 className={Style.h3Buscador}>Buscar Cliente</h3>
            <fieldset className={Style.fieldset}>
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    placeholder="Buscar por nombre, CUIT, teléfono" 
                    className={Style.inputBuscador}
                    onChange={handleInputChange} // Evento clave
                    autoComplete="off"
                />
            </fieldset>
        </form>
    );
};

export default Buscador;