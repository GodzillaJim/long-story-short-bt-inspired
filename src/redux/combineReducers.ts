import { combineReducers } from "redux";
import { authReducer } from "./reducers/AuthReducer";

export const combinedReducer = combineReducers({
    auth: authReducer
})