import ScontrinoReducer from "./ScontrinoReducer";
import SaldoReducer from "./SaldoReducer";

import { combineReducers } from "redux";

export default combineReducers(
    {
        ScontrinoReducer,
        SaldoReducer
    }
)