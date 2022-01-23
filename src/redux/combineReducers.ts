import { combineReducers } from "redux";
import { authReducer } from "./reducers/AuthReducer";
import { blogDetailsReducer, createBlogReducer } from "./reducers/BlogReducers";

export const combinedReducer = combineReducers({
    auth: authReducer,
    createBlog: createBlogReducer,
    blogDetails: blogDetailsReducer
})
export type RootState = ReturnType<typeof combinedReducer>