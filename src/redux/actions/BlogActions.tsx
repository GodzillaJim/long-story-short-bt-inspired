import { IArticle } from '../../screens/CreateArticleContainer';
import { Dispatch } from 'react';
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
  PUBLISH_ARTICLE_FAIL,
  PUBLISH_ARTICLE_REQUEST,
  PUBLISH_ARTICLE_SUCCESS,
  UNPUBLISH_ARTICLE_FAIL,
  UNPUBLISH_ARTICLE_REQUEST,
  UNPUBLISH_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
} from '../constants/Constants';
import { getArticles, getCategories, getTags } from '../../data/Articles';

export const createBlogAction =
  (blog: IArticle) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: CREATE_BLOG_REQUEST });
      const data = { ...blog, id: 1 };
      //TODO: Implement axios post create blog
      dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
    } catch (exception: any) {
      dispatch({ type: CREATE_BLOG_FAIL, payload: exception.message });
    }
  };
export const fetchBlogDetailsAction =
  (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: FETCH_BLOG_REQUEST });
      //TODO: IMplement axios fetch blog details
      const data = getArticles()[0];
      dispatch({ type: FETCH_BLOG_SUCCESS, payload: data });
    } catch (exception: any) {
      dispatch({ type: FETCH_BLOG_FAIL, error: exception });
    }
  };
export const publishArticleAction =
  (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: PUBLISH_ARTICLE_REQUEST });
      //TODO: Implement axios publish article
      dispatch({ type: PUBLISH_ARTICLE_SUCCESS });
    } catch (exception: any) {
      dispatch({ type: PUBLISH_ARTICLE_FAIL });
    }
  };
export const unPublishArticleAction =
  (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: UNPUBLISH_ARTICLE_REQUEST });
      //TODO: Implement axios unpublish article
      dispatch({ type: UNPUBLISH_ARTICLE_SUCCESS });
    } catch (exception: any) {
      dispatch({ type: UNPUBLISH_ARTICLE_FAIL });
    }
  };
export const fetchCategoriesAction = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    //TODO: Implement axios get categories
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: getCategories() });
  } catch (exception: any) {
    dispatch({ type: FETCH_CATEGORIES_FAIL, payload: exception.message });
  }
};

export const fetchTagsAction = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: FETCH_TAGS_REQUEST });
    //TODO: Implement axios get categories
    dispatch({ type: FETCH_TAGS_SUCCESS, payload: getTags() });
  } catch (exception: any) {
    dispatch({ type: FETCH_TAGS_FAIL, payload: exception.message });
  }
};

export const addTagAction =
  (tag: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: ADD_TAG_REQUEST });
      //TODO: Implement axios add tag
      dispatch({ type: ADD_TAG_SUCCESS });
    } catch (exception: any) {
      dispatch({ type: ADD_TAG_FAIL, payload: exception.message });
    }
  };

export const addTagsBulkAction =
  (tags: string[]) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: ADD_TAGS_BULK_REQUEST });
      //TODO: Implement axios add many tags
      dispatch({ type: ADD_TAGS_BULK_SUCCESS });
    } catch (exception: any) {
      dispatch({ type: ADD_TAGS_BULK_FAIL, payload: exception.message });
    }
  };
interface IIDAarticle extends IArticle {
  id: number;
}
export const updateArticleAction =
  (article: IIDAarticle) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: UPDATE_ARTICLE_REQUEST });
      // TODO: Implement axios update article
      dispatch({ type: UPDATE_ARTICLE_SUCCESS });
      dispatch(fetchBlogDetailsAction(article.id));
    } catch (exception: any) {
      dispatch({ type: UPDATE_ARTICLE_FAIL, payload: exception.message });
    }
  };
