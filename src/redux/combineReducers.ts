import { combineReducers } from "redux";
import { authReducer } from "./reducers/AuthReducer";
import { createBlogReducer } from "./reducers/BlogReducers";

export const combinedReducer = combineReducers({
    auth: authReducer,
    createBlog: createBlogReducer
})
export type RootState = ReturnType<typeof combinedReducer>