import { Dispatch } from "react";

import {
  ADD_TAGS_BULK_FAIL,
  ADD_TAGS_BULK_REQUEST,
  ADD_TAGS_BULK_SUCCESS,
  ADD_TAG_FAIL,
  ADD_TAG_REQUEST,
  ADD_TAG_SUCCESS,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  FETCH_BLOG_FAIL,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_TAGS_FAIL,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  GET_ARTICLES_BY_CATEGORIES_FAIL,
  GET_ARTICLES_BY_CATEGORIES_REQUEST,
  GET_ARTICLES_BY_CATEGORIES_SUCCESS,
  PUBLISH_ARTICLE_FAIL,
  PUBLISH_ARTICLE_REQUEST,
  PUBLISH_ARTICLE_SUCCESS,
  UNPUBLISH_ARTICLE_FAIL,
  UNPUBLISH_ARTICLE_REQUEST,
  UNPUBLISH_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  FETCH_ALL_ARTICLES_REQUEST,
  FETCH_ALL_ARTICLES_SUCCESS,
  FETCH_ALL_ARTICLES_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  ARCHIVE_CATEGORY_REQUEST,
  ARCHIVE_CATEGORY_SUCCESS,
  ARCHIVE_CATEGORY_FAIL,
  UNARCHIVE_CATEGORY_REQUEST,
  UNARCHIVE_CATEGORY_SUCCESS,
  UNARCHIVE_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  ARCHIVE_ARTICLE_FAIL,
  ARCHIVE_ARTICLE_REQUEST,
  ARCHIVE_ARTICLE_SUCCESS,
  UNARCHIVE_ARTICLE_REQUEST,
  UNARCHIVE_ARTICLE_SUCCESS,
  UNARCHIVE_ARTICLE_FAIL,
} from "../constants/ArticleConstants";
import { ICategory } from "../../data/Articles";
import { useHttp } from "../../hooks/client";
import { IArticle } from "../../types";

export const createBlogAction =
  (blog: IArticle) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: CREATE_BLOG_REQUEST });
      const { data } = await axios.post("/api/v1/admin/blog", blog);
      dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
    } catch (exception: any) {
      dispatch({ type: CREATE_BLOG_FAIL, payload: exception.message });
    }
  };
export const fetchAllArticlesAction = () => async (dispatch: Dispatch<any>) => {
  try {
    const axios = useHttp();
    dispatch({ type: FETCH_ALL_ARTICLES_REQUEST });
    const { data } = await axios.get("/api/v1/public/blog");
    dispatch({ type: FETCH_ALL_ARTICLES_SUCCESS, payload: data });
  } catch (exception: any) {
    dispatch({
      type: FETCH_ALL_ARTICLES_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};
export const fetchBlogDetailsAction =
  (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: FETCH_BLOG_REQUEST });
      const { data } = await axios.get(`/api/v1/public/blog/${id}`);
      dispatch({ type: FETCH_BLOG_SUCCESS, payload: data });
    } catch (exception: any) {
      dispatch({ type: FETCH_BLOG_FAIL, error: exception });
    }
  };
export const publishArticleAction =
  (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: PUBLISH_ARTICLE_REQUEST });
      await axios.get(`/api/v1/admin/blog/${id}/publish`);
      dispatch({ type: PUBLISH_ARTICLE_SUCCESS });
      dispatch(fetchBlogDetailsAction(id));
    } catch (exception: any) {
      dispatch({ type: PUBLISH_ARTICLE_FAIL });
    }
  };
export const unPublishArticleAction =
  (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: UNPUBLISH_ARTICLE_REQUEST });
      await axios.get(`/api/v1/admin/blog/${id}/unpublish`);
      dispatch({ type: UNPUBLISH_ARTICLE_SUCCESS });
      dispatch(fetchBlogDetailsAction(id));
    } catch (exception: any) {
      dispatch({ type: UNPUBLISH_ARTICLE_FAIL });
    }
  };

export const updateArticleAction =
  (article: IArticle) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: UPDATE_ARTICLE_REQUEST });
      console.log(article);
      await axios.put(`/api/v1/admin/blog/${article.id}`, article);
      dispatch({ type: UPDATE_ARTICLE_SUCCESS });
      dispatch(fetchBlogDetailsAction(article.id));
    } catch (exception: any) {
      dispatch({ type: UPDATE_ARTICLE_FAIL, payload: exception.message });
    }
  };

export const fetchTagsAction = () => async (dispatch: Dispatch<any>) => {
  try {
    const axios = useHttp();
    dispatch({ type: FETCH_TAGS_REQUEST });
    // TODO: Implement axios get categories
    const { data } = await axios.get("/api/v1/public/tag");
    dispatch({ type: FETCH_TAGS_SUCCESS, payload: data });
  } catch (exception: any) {
    dispatch({ type: FETCH_TAGS_FAIL, payload: exception.message });
  }
};

export const addTagAction =
  (tag: string) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: ADD_TAG_REQUEST });
      await axios.post("/api/v1/admin/tag", { tag: tag, id: 0 });
      // TODO: Implement axios add tag
      dispatch({ type: ADD_TAG_SUCCESS });
      dispatch(fetchTagsAction());
    } catch (exception: any) {
      dispatch({ type: ADD_TAG_FAIL, payload: exception.message });
    }
  };

export const addTagsBulkAction =
  (tags: string[]) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: ADD_TAGS_BULK_REQUEST });
      // TODO: Implement axios add many tags
      dispatch({ type: ADD_TAGS_BULK_SUCCESS });
    } catch (exception: any) {
      dispatch({ type: ADD_TAGS_BULK_FAIL, payload: exception.message });
    }
  };
export const fetchCategoriesAction = () => async (dispatch: Dispatch<any>) => {
  const axios = useHttp();
  try {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    const { data } = await axios.get("/api/v1/public/category");
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
  } catch (exception: any) {
    console.log(JSON.stringify(exception));
    dispatch({ type: FETCH_CATEGORIES_FAIL, payload: exception.message });
  }
};
export const getCategoryArticlesAction =
  (categoryId: string) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: GET_ARTICLES_BY_CATEGORIES_REQUEST });
      const { data } = await axios.get(
        `/api/v1/public/blog/category/${categoryId}`
      );
      dispatch({
        type: GET_ARTICLES_BY_CATEGORIES_SUCCESS,
        payload: data,
      });
    } catch (exception: any) {
      dispatch({
        type: GET_ARTICLES_BY_CATEGORIES_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };

export const updateCategoryAction =
  (category: ICategory) => async (dispatch: Dispatch<any>) => {
    const axios = useHttp();
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });
      await axios.put(`/api/v1/admin/category/${category.id}`, category);
      dispatch({ type: UPDATE_CATEGORY_SUCCESS });
      dispatch(getCategoryAction(category.id));
    } catch (exception: any) {
      dispatch({
        type: UPDATE_CATEGORY_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };

export const addCategoryAction =
  (categories: string[]) => async (dispatch: Dispatch<any>) => {
    const axios = useHttp();
    const data = categories.map((c: string) => ({ name: c }));
    try {
      dispatch({ type: ADD_CATEGORY_REQUEST });
      await axios.post("/api/v1/admin/category/bulk", data);
      dispatch({ type: ADD_CATEGORY_SUCCESS });
      dispatch(fetchCategoriesAction());
    } catch (exception: any) {
      dispatch({
        type: ADD_CATEGORY_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };

export const deleteCategoryAction =
  (categoryId: string | number) => async (dispatch: Dispatch<any>) => {
    const axios = useHttp();
    try {
      dispatch({ type: DELETE_CATEGORY_REQUEST });
      await axios.delete(`/api/v1/admin/category/${categoryId}`);
      dispatch({ type: DELETE_CATEGORY_SUCCESS });
      dispatch(fetchCategoriesAction());
    } catch (exception: any) {
      dispatch({
        type: DELETE_CATEGORY_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };
export const archiveCategoryAction =
  (categoryId: string | number) => async (dispatch: Dispatch<any>) => {
    const axios = useHttp();
    try {
      dispatch({ type: ARCHIVE_CATEGORY_REQUEST });
      await axios.get(`/api/v1/admin/category/${categoryId}/archive`);
      dispatch({ type: ARCHIVE_CATEGORY_SUCCESS });
      dispatch(getCategoryAction(categoryId));
    } catch (exception: any) {
      dispatch({ type: ARCHIVE_CATEGORY_FAIL, payload: exception.message });
    }
  };
export const unArchiveCategoryAction =
  (categoryId: string | number) => async (dispatch: Dispatch<any>) => {
    const axios = useHttp();
    try {
      dispatch({ type: UNARCHIVE_CATEGORY_REQUEST });
      await axios.get(`/api/v1/admin/category/${categoryId}/unarchive`);
      dispatch({ type: UNARCHIVE_CATEGORY_SUCCESS });
      dispatch(getCategoryAction(categoryId));
    } catch (exception: any) {
      dispatch({ type: UNARCHIVE_CATEGORY_FAIL, payload: exception.message });
    }
  };
export const getCategoryAction =
  (categoryId: string | number) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: GET_CATEGORY_REQUEST });
      const { data } = await axios.get(`/api/v1/public/category/${categoryId}`);
      dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
      dispatch(getCategoryArticlesAction(data.name));
    } catch (exception: any) {
      dispatch({ type: GET_CATEGORY_FAIL, payload: exception.message });
    }
  };
export const archiveArticleAction =
  (articleId: number) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: ARCHIVE_ARTICLE_REQUEST });
      await axios.get(`/api/v1/admin/blog/${articleId}/archive`);
      dispatch(fetchBlogDetailsAction(articleId));
      dispatch({ type: ARCHIVE_ARTICLE_SUCCESS });
    } catch (exception: any) {
      dispatch({ type: ARCHIVE_ARTICLE_FAIL });
    }
  };
export const unArchiveArticleAction =
  (articleId: number) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: UNARCHIVE_ARTICLE_REQUEST });
      await axios.get(`/api/v1/admin/blog/${articleId}/unarchive`);
      dispatch(fetchBlogDetailsAction(articleId));
      dispatch({ type: UNARCHIVE_ARTICLE_SUCCESS });
    } catch (exception: any) {
      dispatch({ type: UNARCHIVE_ARTICLE_FAIL });
    }
  };
