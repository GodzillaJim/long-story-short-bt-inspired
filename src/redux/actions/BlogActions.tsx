import { IArticle } from '../../screens/CreateArticleContainer';
import { Dispatch } from 'react';
import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  FETCH_BLOG_FAIL,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  PUBLISH_ARTICLE_FAIL,
  PUBLISH_ARTICLE_REQUEST,
  PUBLISH_ARTICLE_SUCCESS,
  UNPUBLISH_ARTICLE_FAIL,
  UNPUBLISH_ARTICLE_REQUEST,
  UNPUBLISH_ARTICLE_SUCCESS,
} from '../constants/Constants';
import { getArticles } from '../../data/Articles';

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
