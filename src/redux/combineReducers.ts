import { combineReducers } from "redux";
import { authReducer } from "./reducers/AuthReducer";

export const combinedReducer = combineReducers({
    auth: authReducer
})
export type RootState = ReturnType<typeof combinedReducer>