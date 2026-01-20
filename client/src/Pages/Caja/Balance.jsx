import React from 'react';
import Style from '../../Styles/Caja/Listado.module.css'; // Asegúrate de apuntar al CSS correcto

const Balance = ({ totalPagos, totalIngresos, totalEgresos }) => {
    const totalCaja = (totalPagos + totalIngresos) - totalEgresos;

    return (
        <div className={Style.balanceContainer}>
            <div className={`${Style.balanceCard} ${Style.borderBlue}`}>
                <div className={Style.cardTitle}>Total Pagos Pólizas (+)</div>
                <div className={`${Style.cardAmount} ${Style.incomeText}`}>
                    ${totalPagos.toLocaleString()}
                </div>
            </div>
            
            <div className={`${Style.balanceCard} ${Style.borderGreen}`}>
                <div className={Style.cardTitle}>Otros Ingresos (+)</div>
                <div className={`${Style.cardAmount} ${Style.incomeText}`}>
                    ${totalIngresos.toLocaleString()}
                </div>
            </div>

            <div className={`${Style.balanceCard} ${Style.borderRed}`}>
                <div className={Style.cardTitle}>Gastos / Egresos (-)</div>
                <div className={`${Style.cardAmount} ${Style.expenseText}`}>
                    ${totalEgresos.toLocaleString()}
                </div>
            </div>

            <div className={`${Style.balanceCard} ${Style.borderDark}`}>
                <div className={Style.cardTitle}>Total en Caja (=)</div>
                <div className={Style.cardAmount}>
                    ${totalCaja.toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default Balance;