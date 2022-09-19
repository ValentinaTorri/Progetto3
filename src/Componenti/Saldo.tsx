import React from "react";
import { useSelector } from "react-redux";

export const Saldo = () => {
    const saldo = useSelector((stato: any) => stato.SaldoReducer);

    return (
        <div className="Saldo">
            <h1 className="saldo">Saldo: {saldo}€</h1>
        </div>
    );
};
