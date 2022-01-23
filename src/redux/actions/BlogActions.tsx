import { IArticle } from '../../screens/CreateArticleContainer';
import { Dispatch } from 'react';
import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
} from '../constants/Constants';

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
