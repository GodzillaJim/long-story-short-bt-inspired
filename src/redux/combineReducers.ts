import { combineReducers } from "redux";
import { authReducer } from "./reducers/AuthReducer";
import { addTagBulkReducer, addTagReducer, blogDetailsReducer, categoriesReducer, createBlogReducer, publishArticleReducer, tagsReducer, unPublishArticleReducer, updateArticleReducer } from "./reducers/BlogReducers";

export const combinedReducer = combineReducers({
    auth: authReducer,
    createBlog: createBlogReducer,
    blogDetails: blogDetailsReducer,
    publishArticle: publishArticleReducer,
    unPublishArticle: unPublishArticleReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
    updateArticle: updateArticleReducer,
    addTag: addTagReducer,
    addTagsBulk: addTagBulkReducer
})
export type RootState = ReturnType<typeof combinedReducer>