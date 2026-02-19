const Recibo = () => {
    return (
        <div className={Style.reciboContainer}>
            <header className={Style.reciboHeader}>
                <h2>Recibo de Pago</h2>
                <button className={Style.btnPrint} onClick={() => window.print()}>
                    <IconPrinter size={18} /> Imprimir Recibo
                </button>
            </header>
            <div className={Style.reciboContent}>
                {/* Aquí iría el contenido del recibo, similar al detalle pero con un diseño más compacto */}
                <p>Contenido del recibo...</p>
            </div>
        </div>
    );
}   

export default Recibo;