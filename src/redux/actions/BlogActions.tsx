import { IArticle } from '../../screens/CreateArticleContainer';
import { Dispatch } from 'react';
import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  FETCH_BLOG_FAIL,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
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
const Error = { message: 'Your network is down' };
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
