import { useState } from "react";
import Style from "../../Styles/Polizas/Buscador.module.css";

const Buscador = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        const valor = e.target.value;
        setInputValue(valor);
        
        onSearch(valor);
    };

    return (
        <form className={Style.buscadorContainer} onSubmit={(e) => e.preventDefault()}>
            <h3 className={Style.h3Buscador}>Buscar Póliza</h3>
            <fieldset className={Style.fieldset}>
                <input
                    type="text"
                    placeholder="Buscar póliza, cliente, patente o cobertura..."
                    value={inputValue}
                    onChange={handleChange}
                    className={Style.inputBuscador}
                />
            </fieldset>
        </form>
    );
};

export default Buscador;