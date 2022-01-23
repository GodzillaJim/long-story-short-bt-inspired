import { combineReducers } from "redux";
import { authReducer } from "./reducers/AuthReducer";
import { blogDetailsReducer, createBlogReducer, publishArticleReducer, unPublishArticleReducer } from "./reducers/BlogReducers";

export const combinedReducer = combineReducers({
    auth: authReducer,
    createBlog: createBlogReducer,
    blogDetails: blogDetailsReducer,
    publishArticle: publishArticleReducer,
    unPublishArticle: unPublishArticleReducer
})
export type RootState = ReturnType<typeof combinedReducer>