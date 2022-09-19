import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Scontrino } from "./Componenti/Scontrino";
import { Saldo } from "./Componenti/Saldo";

function App() {
    return (
        <div className="App">
            <Scontrino></Scontrino>
            <Saldo></Saldo>
        </div>
    );
}

export default App;
