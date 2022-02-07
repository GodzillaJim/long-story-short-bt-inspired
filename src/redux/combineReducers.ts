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
  updateCategoryReducer, deleteCategoryReducer, archiveCategoryReducer, unArchiveCategoryReducer, activeCategoryReducer, archiveArticleReducer, unArchiveArticleReducer
} from "./reducers/BlogReducers";
import {
  activateUserReducer,
  allUsersReducer,
  changePasswordReducer,
  createUserReducer,
  deactivateUserReducer,
  demoteAdminReducer,
  makeAdminReducer,
  updateUserReducer,
  userReducer, 
} from "./reducers/UsersReducer";

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
  createUser: createUserReducer,
  user: userReducer,
  changePassword: changePasswordReducer,
  makeAdmin: makeAdminReducer,
  demoteAdmin: demoteAdminReducer,
  activateUser: activateUserReducer,
  deactivateUser: deactivateUserReducer,
  updateUser: updateUserReducer,
  deleteCategory: deleteCategoryReducer,
  archiveCategory: archiveCategoryReducer,
  unArchiveCategory: unArchiveCategoryReducer,
  activeCategory: activeCategoryReducer,
  archiveArticle: archiveArticleReducer,
  unArchiveArticle: unArchiveArticleReducer
});
export type RootState = ReturnType<typeof combinedReducer>;
