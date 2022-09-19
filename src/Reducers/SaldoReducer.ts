export default function SaldoReducer(state: number=0, action: any) {
    switch (action.type) {
        case "SALDO":
            return state + action.importo;
        default:
            return state;
    }
}
