import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_RESET,
  CREATE_BLOG_SUCCESS,
} from '../constants/Constants';

export const createBlogReducer = (
  state = { loading: false, error: null, blog: null },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case CREATE_BLOG_REQUEST:
      return { ...state, loading: true, blog: null, error: null };
    case CREATE_BLOG_SUCCESS:
      return { ...state, loading: false, blog: action.payload, error: null };
    case CREATE_BLOG_FAIL:
      return { ...state, loading: false, blog: null, error: action.payload };
    case CREATE_BLOG_RESET:
      return { loading: false, error: null, blog: null };
    default:
      return state;
  }
};
