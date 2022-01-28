import {Dispatch} from 'react';

import {IArticle} from '../../screens/CreateArticleContainer';
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
  FETCH_ALL_ARTICLES_SUCCESS, FETCH_ALL_ARTICLES_FAIL, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAIL,
} from '../constants/Constants';
import {getArticles, getCategories, getTags, ICategory} from '../../data/Articles';

export const createBlogAction =
  (blog: IArticle) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: CREATE_BLOG_REQUEST});
      const data = {...blog, id: 1};
      // TODO: Implement axios post create blog
      dispatch({type: CREATE_BLOG_SUCCESS, payload: data});
    } catch (exception: any) {
      dispatch({type: CREATE_BLOG_FAIL, payload: exception.message});
    }
  };
export const fetchAllArticlesAction = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({type: FETCH_ALL_ARTICLES_REQUEST});
    // TODO: Implement axios get all articles
    dispatch({type: FETCH_ALL_ARTICLES_SUCCESS, payload: getArticles()});
  } catch (exception:any) {
    dispatch({type: FETCH_ALL_ARTICLES_FAIL, payload: exception.message || "Something went wrong"});
  }
};
export const fetchBlogDetailsAction =
  (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: FETCH_BLOG_REQUEST});
      // TODO: IMplement axios fetch blog details
      const data = getArticles()[0];
      dispatch({type: FETCH_BLOG_SUCCESS, payload: data});
    } catch (exception: any) {
      dispatch({type: FETCH_BLOG_FAIL, error: exception});
    }
  };
export const publishArticleAction =
  (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: PUBLISH_ARTICLE_REQUEST});
      // TODO: Implement axios publish article
      dispatch({type: PUBLISH_ARTICLE_SUCCESS});
    } catch (exception: any) {
      dispatch({type: PUBLISH_ARTICLE_FAIL});
    }
  };
export const unPublishArticleAction =
  (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: UNPUBLISH_ARTICLE_REQUEST});
      // TODO: Implement axios unpublish article
      dispatch({type: UNPUBLISH_ARTICLE_SUCCESS});
    } catch (exception: any) {
      dispatch({type: UNPUBLISH_ARTICLE_FAIL});
    }
  };
interface IIDAarticle extends IArticle {
  id: number;
}
export const updateArticleAction =
  (article: IIDAarticle) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: UPDATE_ARTICLE_REQUEST});
      // TODO: Implement axios update article
      dispatch({type: UPDATE_ARTICLE_SUCCESS});
      dispatch(fetchBlogDetailsAction(article.id));
    } catch (exception: any) {
      dispatch({type: UPDATE_ARTICLE_FAIL, payload: exception.message});
    }
  };

export const fetchTagsAction = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({type: FETCH_TAGS_REQUEST});
    // TODO: Implement axios get categories
    dispatch({type: FETCH_TAGS_SUCCESS, payload: getTags()});
  } catch (exception: any) {
    dispatch({type: FETCH_TAGS_FAIL, payload: exception.message});
  }
};

export const addTagAction =
  (tag: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: ADD_TAG_REQUEST});
      // TODO: Implement axios add tag
      dispatch({type: ADD_TAG_SUCCESS});
    } catch (exception: any) {
      dispatch({type: ADD_TAG_FAIL, payload: exception.message});
    }
  };

export const addTagsBulkAction =
  (tags: string[]) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: ADD_TAGS_BULK_REQUEST});
      // TODO: Implement axios add many tags
      dispatch({type: ADD_TAGS_BULK_SUCCESS});
    } catch (exception: any) {
      dispatch({type: ADD_TAGS_BULK_FAIL, payload: exception.message});
    }
  };
export const fetchCategoriesAction = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({type: FETCH_CATEGORIES_REQUEST});
    // TODO: Implement axios get categories
    dispatch({type: FETCH_CATEGORIES_SUCCESS, payload: getCategories()});
  } catch (exception: any) {
    dispatch({type: FETCH_CATEGORIES_FAIL, payload: exception.message});
  }
};
export const getCategoryArticlesAction = (categoryId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({type: GET_ARTICLES_BY_CATEGORIES_REQUEST});
    // TODO: Implement axios get articles by category
    dispatch({type: GET_ARTICLES_BY_CATEGORIES_SUCCESS, payload: getArticles().slice(1, 5)});
  } catch (exception:any) {
    dispatch({type: GET_ARTICLES_BY_CATEGORIES_FAIL, payload: exception.message || "Something went wrong"});
  }
};

export const updateCategoryAction = (category: ICategory) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({type: UPDATE_CATEGORY_REQUEST});
    // TODO: Implement axios post update category
    dispatch({type: UPDATE_CATEGORY_SUCCESS});
  } catch (exception:any) {
    dispatch({type: UPDATE_CATEGORY_FAIL, payload: exception.message || "Something went wrong"});
  }
};

export const addCategoryAction = (categories: string []) => async (dispatch : Dispatch<any>) => {
  try {
    dispatch({type: ADD_CATEGORY_REQUEST});
    // TODO: Implement axios post create category
    dispatch({type: ADD_CATEGORY_SUCCESS});
  } catch (exception:any) {
    dispatch({type: ADD_CATEGORY_FAIL, payload: exception.message || "Something went wrong"});
  }
};
