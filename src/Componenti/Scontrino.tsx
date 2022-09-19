import React, { useEffect, useState } from "react";
import { isDotDotDotToken } from "typescript";
import { IProdotto } from "../interfacce";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Saldo } from "./Saldo";
//var listaScontrino: Array<IProdotto> = [];


export const Scontrino = () => {
   
    //const [quantita, setQuantita] = useState(0);

    let ortaggi: Array<IProdotto> = [
        { descrizione: "fagiolini", costo: 5, quantita: 0 },
        { descrizione: "broccolo", costo: 3, quantita: 0 },
        { descrizione: "peperone", costo: 4, quantita: 0 },
        { descrizione: "pomodoro", costo: 2, quantita: 0 },
        { descrizione: "zucchina", costo: 3, quantita: 0 },
        { descrizione: "carciofo", costo: 5, quantita: 0 },
        { descrizione: "bietola", costo: 4, quantita: 0 },
    ];
    let frutta: Array<IProdotto> = [
        { descrizione: "pesca", costo: 3, quantita: 0 },
        { descrizione: "uva", costo: 4, quantita: 0 },
        { descrizione: "mela", costo: 3, quantita: 0 },
        { descrizione: "fragola", costo: 2, quantita: 0 },
        { descrizione: "susina", costo: 3, quantita: 0 },
        { descrizione: "anguria", costo: 5, quantita: 0 },
        { descrizione: "pera", costo: 4, quantita: 0 },
    ];
    let carne: Array<IProdotto> = [
        { descrizione: "pollo", costo: 8, quantita: 0 },
        { descrizione: "tacchino", costo: 9, quantita: 0 },
        { descrizione: "coniglio", costo: 5, quantita: 0 },
        { descrizione: "manzo", costo: 15, quantita: 0 },
        { descrizione: "vitello", costo: 13, quantita: 0 },
        { descrizione: "maiale", costo: 9, quantita: 0 },
        { descrizione: "cavallo", costo: 20, quantita: 0 },
    ];
    let pesce: Array<IProdotto> = [
        { descrizione: "spigola", costo: 10, quantita: 0 },
        { descrizione: "orata", costo: 9, quantita: 0 },
        { descrizione: "merluzzo", costo: 8, quantita: 0 },
        { descrizione: "acciuga", costo: 7, quantita: 0 },
        { descrizione: "tonno", costo: 15, quantita: 0 },
        { descrizione: "calamari", costo: 9, quantita: 0 },
        { descrizione: "gamberi", costo: 14, quantita: 0 },
    ];
    let curaPersona: Array<IProdotto> = [
        { descrizione: "shampoo", costo: 3, quantita: 0 },
        { descrizione: "balsamo", costo: 4, quantita: 0 },
        { descrizione: "dentifricio", costo: 2, quantita: 0 },
        { descrizione: "bagnoschiuma", costo: 2, quantita: 0 },
        { descrizione: "spazzolino", costo: 2, quantita: 0 },
    ];

    const [prezzoUnitario, setPrezzoUnitario] = useState<number>(0);
    const [quantita, setQuantita] = useState<number>(1);    
    const [descrizioneProd, setDescrizioneProd] = useState<string>("");
    //const [listaProdotti, setListaProdotti] = useState(listaScontrino);

    let tagQuantita: any = "";
    let contatore: number = 0;

    const avviaDispatch = useDispatch();

    let scontrino = useSelector((stato: any) => stato.ScontrinoReducer);
    

    let nuovoProdotto: IProdotto = {
        descrizione: descrizioneProd,
        costo: quantita * prezzoUnitario,
        quantita: quantita,
    };
       

    if (prezzoUnitario != 0 ) {
       
        


        tagQuantita = (
            <div>
                <label htmlFor="">Quantità:</label>
                <input
                    type="number"
                    value={quantita}
                    onChange={(val) => {
                        setQuantita(parseInt(val.target.value));
                        
                        
                    }}
                    
                />
                
                <button
                    onClick={() => {
                        let scontrinoFiltrato: Array<IProdotto> = scontrino.filter((prod: IProdotto) => prod.descrizione == nuovoProdotto.descrizione);
                        if (scontrinoFiltrato.length == 0) {    
                                                    
                            avviaDispatch({
                                type: "AGGIUNGI",
                                selezionato: nuovoProdotto,
                                quant: quantita,
                                costounit: prezzoUnitario

                            });
                           // setDescrizioneProd("Inizio")
                        } else {                            
                            avviaDispatch({
                                type: "MODIFICA",
                                selezionato: nuovoProdotto,
                                quant: quantita,
                                costounit: prezzoUnitario

                            });
                        }
                       setQuantita(1)
                       
                    }}
                >
                    AGGIUNGI SPESA
                </button>
                <br />
                <h2>Conto</h2>
                <ul>
                    {scontrino.map((prod: IProdotto, indice: number) => {
                        return (
                            <li key={indice}>
                                {prod.descrizione} x{prod.quantita} - {prod.costo}€
                                <button className="bottone"
                                    onClick={() => {
                                        avviaDispatch({
                                            type:'RIMUOVI',
                                            selezionato: prod
                                        })
                                        setDescrizioneProd("Sfoglia il catalogo")
                                    }}
                                >
                                    ELIMINA
                                </button>
                                <br /><br />
                            </li>
                            
                        );
                    })}
                </ul>
                <br />
                <button
                    onClick={() => {
                        contatore += 1;
                        let tot: number = 0;
                        scontrino.map((prod: IProdotto) => {
                            tot += prod.costo;
                        });
                        avviaDispatch({
                            type: "SALDO",
                            importo: tot,
                        });
                        avviaDispatch({
                            type: "AZZERA",

                        });
                        setPrezzoUnitario(0)    
                        //setDescrizioneProd("Inizio")                    
                    }}
                >
                    CHIUDI SCONTRINO
                </button>

            </div>
        );
    }
    

    let stringa: string = "";
    return (
        <div className="Scontrino">
            <header>
                <h1>SUPERMARKET</h1>
            </header>
            <h2>Catalogo</h2>
            <select
                onChange={(prod) => {
                    setPrezzoUnitario(parseInt(prod.target.value.split(",")[0]));
                    setDescrizioneProd(prod.target.value.split(",")[1]);
                    
                }}
               // value= {descrizioneProd}
            >
                <option value="Inizio">Sfoglia il catalogo</option>
                <optgroup label="Ortaggi"></optgroup>
                {ortaggi.map((ort: IProdotto, indice: number) => {
                    stringa = `${ort.costo},${ort.descrizione}`;

                    return (
                        <option key={indice} value={stringa}>
                            {ort.descrizione}
                        </option>
                    );
                })}
                <optgroup label="Frutta"></optgroup>
                {frutta.map((frutta: IProdotto, indice: number) => {
                    stringa = `${frutta.costo},${frutta.descrizione}`;

                    return (
                        <option key={indice} value={stringa}>
                            {frutta.descrizione}
                        </option>
                    );
                })}
                <optgroup label="Carne"></optgroup>
                {carne.map((carne: IProdotto, indice: number) => {
                    stringa = `${carne.costo},${carne.descrizione}`;

                    return (
                        <option key={indice} value={stringa}>
                            {carne.descrizione}
                        </option>
                    );
                })}

                <optgroup label="Pesce"></optgroup>
                {pesce.map((pesce: IProdotto, indice: number) => {
                    stringa = `${pesce.costo},${pesce.descrizione}`;

                    return (
                        <option key={indice} value={stringa}>
                            {pesce.descrizione}
                        </option>
                    );
                })}
                <optgroup label="Cura della Persona"></optgroup>
                {curaPersona.map((cura: IProdotto, indice: number) => {
                    stringa = `${cura.costo},${cura.descrizione}`;
                    return (
                        <option key={indice} value={stringa}>
                            {cura.descrizione}
                        </option>
                    );
                })}
            </select>
            <br /><br />
            {tagQuantita}
        </div>
    );
}



