import {
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_RESET,
  ADD_CATEGORY_SUCCESS,
  ADD_TAGS_BULK_FAIL,
  ADD_TAGS_BULK_REQUEST,
  ADD_TAGS_BULK_SUCCESS,
  ADD_TAG_FAIL,
  ADD_TAG_REQUEST,
  ADD_TAG_SUCCESS,
  ARCHIVE_CATEGORY_FAIL,
  ARCHIVE_CATEGORY_REQUEST,
  ARCHIVE_CATEGORY_RESET,
  ARCHIVE_CATEGORY_SUCCESS,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_RESET,
  CREATE_BLOG_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_RESET,
  DELETE_CATEGORY_SUCCESS,
  FETCH_ALL_ARTICLES_FAIL,
  FETCH_ALL_ARTICLES_REQUEST,
  FETCH_ALL_ARTICLES_SUCCESS,
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
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  PUBLISH_ARTICLE_FAIL,
  PUBLISH_ARTICLE_REQUEST,
  PUBLISH_ARTICLE_SUCCESS,
  UNARCHIVE_CATEGORY_FAIL,
  UNARCHIVE_CATEGORY_REQUEST,
  UNARCHIVE_CATEGORY_RESET,
  UNARCHIVE_CATEGORY_SUCCESS,
  UNPUBLISH_ARTICLE_FAIL,
  UNPUBLISH_ARTICLE_REQUEST,
  UNPUBLISH_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_RESET,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_RESET,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/ArticleConstants";

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
export const allArticlesReducer = (
  state = { loading: false, error: null, articles: null },
  action: IAction
) => {
  switch (action.type) {
    case FETCH_ALL_ARTICLES_REQUEST:
      return { loading: true, error: null, articles: null };
    case FETCH_ALL_ARTICLES_SUCCESS:
      return { loading: false, error: null, articles: action.payload };
    case FETCH_ALL_ARTICLES_FAIL:
      return { loading: false, error: action.payload, articles: null };
    default:
      return state;
  }
};
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
export const categoryArticlesReducer = (
  state = { loading: false, error: null, articles: null },
  action: IAction
) => {
  switch (action.type) {
    case GET_ARTICLES_BY_CATEGORIES_REQUEST:
      return { loading: true, error: null, articles: null };
    case GET_ARTICLES_BY_CATEGORIES_SUCCESS:
      return { loading: false, error: null, articles: action.payload };
    case GET_ARTICLES_BY_CATEGORIES_FAIL:
      return { loading: false, error: action.payload, articles: null };
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
export const addTagReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case ADD_TAG_REQUEST:
      return { loading: true, error: null, success: false };
    case ADD_TAG_SUCCESS:
      return { loading: false, error: null, success: true };
    case ADD_TAG_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
export const addTagBulkReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case ADD_TAGS_BULK_REQUEST:
      return { loading: true, error: null, success: false };
    case ADD_TAGS_BULK_SUCCESS:
      return { loading: false, error: null, success: true };
    case ADD_TAGS_BULK_FAIL:
      return { loading: false, error: action.payload, success: false };
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

export const activeCategoryReducer = (
  state = { loading: false, error: null, category: null },
  action: IAction
) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { loading: true, error: null, category: null };
    case GET_CATEGORY_SUCCESS:
      return { loading: false, error: null, category: action.payload };
    case GET_CATEGORY_FAIL:
      return { loading: false, error: action.payload, category: null };
    default:
      return state;
  }
};
export const updateCategoryReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { loading: true, error: null, success: false };
    case UPDATE_CATEGORY_SUCCESS:
      return { loading: false, error: null, success: true };
    case UPDATE_CATEGORY_RESET:
      return { loading: false, error: null, success: false };
    case UPDATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const addCategoryReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return { loading: true, error: null, success: false };
    case ADD_CATEGORY_SUCCESS:
      return { loading: false, error: null, success: true };
    case ADD_CATEGORY_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ADD_CATEGORY_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};

export const deleteCategoryReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true, error: null, success: false };
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, error: null, success: true };
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload, success: false };
    case DELETE_CATEGORY_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};

export const archiveCategoryReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case ARCHIVE_CATEGORY_REQUEST:
      return { loading: true, error: null, success: false };
    case ARCHIVE_CATEGORY_SUCCESS:
      return { loading: false, error: null, success: true };
    case ARCHIVE_CATEGORY_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ARCHIVE_CATEGORY_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};
export const unArchiveCategoryReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case UNARCHIVE_CATEGORY_REQUEST:
      return { loading: true, error: null, success: false };
    case UNARCHIVE_CATEGORY_SUCCESS:
      return { loading: false, error: null, success: true };
    case UNARCHIVE_CATEGORY_FAIL:
      return { loading: false, error: action.payload, success: false };
    case UNARCHIVE_CATEGORY_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};
