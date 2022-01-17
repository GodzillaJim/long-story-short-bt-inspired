import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCESS,
  AUTH_LOGOUT_REQUEST,
} from '../constants/Constants';

export const authReducer = (
  state = {
    authToken: '',
    user: null,
    isAdmin: false,
    loading: false,
    error: null,
  },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
        isAdmin: false,
        authToken: '',
        error: null,
      };
    case AUTH_LOGIN_SUCESS:
      return { ...state, loading: false, ...action.payload, error: null };
    //TODO: Include user, authToken, isAdmin in action.payload
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        authToken: '',
      };
    case AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        loading: false,
        error: null,
        user: null,
        isAdmin: false,
      };
    default:
      return state;
  }
};
