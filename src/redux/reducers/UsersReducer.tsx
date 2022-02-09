import { IUser } from "../../data/Users";
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  MAKE_ADMIN_REQUEST,
  MAKE_ADMIN_SUCCESS,
  MAKE_ADMIN_FAIL,
  DEMOTE_ADMIN_REQUEST,
  DEMOTE_ADMIN_SUCCESS,
  DEMOTE_ADMIN_FAIL,
  ACTIVATE_USER_REQUEST,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAIL,
  DEACTIVATE_USER_REQUEST,
  DEACTIVATE_USER_SUCCESS,
  DEACTIVATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  CHANGE_PASSWORD_RESET,
  MAKE_ADMIN_RESET,
  DEMOTE_ADMIN_RESET,
  ACTIVATE_USER_RESET,
  DEACTIVATE_USER_RESET,
  ADMIN_CHANGE_PASSWORD_REQUEST,
  ADMIN_CHANGE_PASSWORD_SUCCESS,
  ADMIN_CHANGE_PASSWORD_FAIL,
  ADMIN_CHANGE_PASSWORD_RESET,
  CREATE_USER_RESET,
} from "../constants/UserConstants";

interface IDefaultState {
  loading: boolean;
  error: string | null;
  users: any[] | null;
}
const defaultState: IDefaultState = {
  loading: false,
  error: null,
  users: null,
};
interface IAction {
  type: string;
  payload: any;
}
export const allUsersReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { loading: true, error: null, users: null };
    case FETCH_USERS_SUCCESS:
      return { loading: false, error: null, users: action.payload };
    case FETCH_USERS_FAIL:
      return { loading: false, error: action.payload, users: null };
    default:
      return state;
  }
};
export const createUserReducer = (
  state: { loading: boolean; error: any; user: IUser | null } = {
    loading: false,
    error: null,
    user: null,
  },
  action: IAction
) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { loading: true, error: null, user: null };
    case CREATE_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case CREATE_USER_FAIL:
      return { loading: false, error: action.payload, user: null };
    case CREATE_USER_RESET:
      return { loading: false, error: null, user: null };
    default:
      return state;
  }
};
export const userReducer = (
  state = { loading: false, error: null, user: null },
  action: IAction
) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { loading: true, error: null, user: null };
    case FETCH_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case FETCH_USER_FAIL:
      return { loading: false, error: action.payload, user: null };
    default:
      return state;
  }
};
export const changePasswordReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true, error: null, success: false };
    case CHANGE_PASSWORD_SUCCESS:
      return { loading: false, error: null, success: true };
    case CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload, success: false };
    case CHANGE_PASSWORD_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};
export const adminChangePasswordReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case ADMIN_CHANGE_PASSWORD_REQUEST:
      return { loading: true, error: null, success: false };
    case ADMIN_CHANGE_PASSWORD_SUCCESS:
      return { loading: false, error: null, success: true };
    case ADMIN_CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ADMIN_CHANGE_PASSWORD_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};
export const makeAdminReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case MAKE_ADMIN_REQUEST:
      return { loading: true, error: null, success: false };
    case MAKE_ADMIN_SUCCESS:
      return { loading: false, error: null, success: true };
    case MAKE_ADMIN_FAIL:
      return { loading: false, error: action.payload, success: false };
    case MAKE_ADMIN_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};
export const demoteAdminReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case DEMOTE_ADMIN_REQUEST:
      return { loading: true, error: null, success: false };
    case DEMOTE_ADMIN_SUCCESS:
      return { loading: false, error: null, success: true };
    case DEMOTE_ADMIN_FAIL:
      return { loading: false, error: action.payload, success: false };
    case DEMOTE_ADMIN_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};

export const activateUserReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case ACTIVATE_USER_REQUEST:
      return { loading: true, error: null, success: false };
    case ACTIVATE_USER_SUCCESS:
      return { loading: false, error: null, success: true };
    case ACTIVATE_USER_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ACTIVATE_USER_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};

export const deactivateUserReducer = (
  state = { loading: false, error: null, success: false },
  action: IAction
) => {
  switch (action.type) {
    case DEACTIVATE_USER_REQUEST:
      return { loading: true, error: null, success: false };
    case DEACTIVATE_USER_SUCCESS:
      return { loading: false, error: null, success: true };
    case DEACTIVATE_USER_FAIL:
      return { loading: false, error: action.payload, success: false };
    case DEACTIVATE_USER_RESET:
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};

export const updateUserReducer = (
  state = { loading: false, error: null, user: false },
  action: IAction
) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { loading: true, error: null, user: false };
    case UPDATE_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case UPDATE_USER_FAIL:
      return { loading: false, error: action.payload, user: false };
    default:
      return state;
  }
};
