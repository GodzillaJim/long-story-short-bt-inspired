import { composeWithDevTools } from "@redux-devtools/extension"
import {  applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { combinedReducer } from "./combineReducers"

const initialState = {}
const middleware = [thunk]
const store = createStore(
    combinedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
)
export default store;