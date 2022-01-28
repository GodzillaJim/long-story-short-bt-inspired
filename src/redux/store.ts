import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { combinedReducer } from "./combineReducers";

const data = sessionStorage.getItem("data");
const { token, username, isAdmin } = data
  ? JSON.parse(data)
  : { token: "", username: null, isAdmin: false };
const initialState = {
  auth: {
    authToken: token,
    user: username,
    isAdmin,
    loading: false,
    error: null,
  },
};
const middleware = [thunk];
const store = createStore(
  combinedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
