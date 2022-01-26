import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_RESET,
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
  UPDATE_ARTICLE_RESET,
  UPDATE_ARTICLE_SUCCESS,
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

export const publishArticleReducer = (
  state = DefaultState,
  action: IAction
) => {
  switch (action.type) {
    case PUBLISH_ARTICLE_REQUEST:
      return { loading: true, error: null, blog: false };
    case PUBLISH_ARTICLE_SUCCESS:
      return { loading: false, error: null, blog: true };
    case PUBLISH_ARTICLE_FAIL:
      return { loading: false, error: action.payload, blog: false };
    default:
      return state;
  }
};
export const unPublishArticleReducer = (
  state = DefaultState,
  action: IAction
) => {
  switch (action.type) {
    case UNPUBLISH_ARTICLE_REQUEST:
      return { loading: true, error: null, blog: false };
    case UNPUBLISH_ARTICLE_SUCCESS:
      return { loading: false, error: null, blog: true };
    case UNPUBLISH_ARTICLE_FAIL:
      return { loading: false, error: action.payload, blog: false };
    default:
      return state;
  }
};

export const categoriesReducer = (state = DefaultState, action: IAction) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { loading: true, error: null, blog: null };
    case FETCH_CATEGORIES_SUCCESS:
      return { loading: false, error: null, blog: action.payload };
    case FETCH_CATEGORIES_FAIL:
      return { loading: false, error: action.payload, blog: null };
    default:
      return state;
  }
};
export const tagsReducer = (state = DefaultState, action: IAction) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return { loading: true, error: null, blog: null };
    case FETCH_TAGS_SUCCESS:
      return { loading: false, error: null, blog: action.payload };
    case FETCH_TAGS_FAIL:
      return { loading: false, error: action.payload, blog: null };
    default:
      return state;
  }
};
export const updateArticleReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case UPDATE_ARTICLE_REQUEST:
      return { loading: true, error: null, success: false };
    case UPDATE_ARTICLE_SUCCESS:
      return { loading: false, error: null, success: true };
    case UPDATE_ARTICLE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case UPDATE_ARTICLE_RESET:
      return { loading: true, error: null, success: false };
    default:
      return state;
  }
};
