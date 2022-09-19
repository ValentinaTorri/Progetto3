import { IProdotto } from "../interfacce";

export default function ScontrinoReducer(state: Array<IProdotto> = [], action: any) {
    switch (action.type) {
        case "AGGIUNGI":            
            action.selezionato.quantita= action.quant
            action.selezionato.costo= action.costounit * action.quant           
            
            return [...state, action.selezionato];

        case "RIMUOVI":
            return state.filter((prod) => prod != action.selezionato);
        case "AZZERA":
            return [];
        case "MODIFICA":
            let modificato: Array<IProdotto> = [];
            state.map((prod: IProdotto) => {
                if (prod.descrizione == action.selezionato.descrizione ) {
                    prod.quantita += action.quant ;
                    
                    prod.costo += action.costounit *action.quant;

                }
                if(prod.quantita > 0){
                    modificato.push(prod);
                }
                
            });
            return modificato;
        default:
            return state;
    }
}
