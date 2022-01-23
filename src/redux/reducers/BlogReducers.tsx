import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_RESET,
  CREATE_BLOG_SUCCESS,
  FETCH_BLOG_FAIL,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
} from '../constants/Constants';

export interface IDefaultState {
  loading: boolean;
  error: any;
  blog: any;
}
const DefaultState = { loading: false, error: null, blog: null };
export interface IAction {
  type: string;
  payload: any;
}
export const createBlogReducer = (state = DefaultState, action: IAction) => {
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

export const blogDetailsReducer = (state = DefaultState, action: IAction) => {
  switch (action.type) {
    case FETCH_BLOG_REQUEST:
      return { loading: true, error: null, blog: null };
    case FETCH_BLOG_SUCCESS:
      return { loading: false, error: null, blog: action.payload };
    case FETCH_BLOG_FAIL:
      return { loading: false, error: action.payload, blog: null };
    default:
      return state;
  }
};
