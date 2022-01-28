import { combineReducers } from "redux";

import { authReducer } from "./reducers/AuthReducer";
import {
  addCategoryReducer,
  addTagBulkReducer,
  addTagReducer,
  allArticlesReducer,
  blogDetailsReducer,
  categoriesReducer,
  categoryArticlesReducer,
  createBlogReducer,
  publishArticleReducer,
  tagsReducer,
  unPublishArticleReducer,
  updateArticleReducer,
  updateCategoryReducer,
} from "./reducers/BlogReducers";
import { allUsersReducer } from "./reducers/UsersReducer";

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
  addTagsBulk: addTagBulkReducer,
  categoryArticles: categoryArticlesReducer,
  allArticles: allArticlesReducer,
  updateCategory: updateCategoryReducer,
  addCategory: addCategoryReducer,
  allUsers: allUsersReducer,
});
export type RootState = ReturnType<typeof combinedReducer>;
