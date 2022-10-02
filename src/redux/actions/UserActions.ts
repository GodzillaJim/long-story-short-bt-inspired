import { Dispatch } from "redux";
import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DEMOTE_ADMIN_REQUEST,
  DEMOTE_ADMIN_SUCCESS,
  DEMOTE_ADMIN_FAIL,
  FETCH_USERS_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  MAKE_ADMIN_FAIL,
  MAKE_ADMIN_REQUEST,
  MAKE_ADMIN_SUCCESS,
  ACTIVATE_USER_REQUEST,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAIL,
  DEACTIVATE_USER_REQUEST,
  DEACTIVATE_USER_SUCCESS,
  DEACTIVATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../constants/UserConstants";
import { getUsers, IUser } from "../../data/Users";
import { useHttp } from "../../hooks/client";
import { IRegisterRequest } from "../../types";

export const getAllUsersAction = () => async (dispatch: Dispatch<any>) => {
  try {
    const axios = useHttp();
    dispatch({ type: FETCH_USERS_REQUEST });
    // TODO: Implement get all users axios
    const { data } = await axios.get("/api/v1/admin/users/all");
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (exception: any) {
    dispatch({
      type: FETCH_USERS_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};
export const createUserAction =
  (user: IRegisterRequest) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp()
      dispatch({ type: CREATE_USER_REQUEST });
      await axios.post(`/api/v1/public/auth/signup`, user)
      dispatch(getAllUsersAction())
      dispatch({ type: CREATE_USER_SUCCESS });
    } catch (exception: any) {
      dispatch({ type: CREATE_USER_FAIL, payload: exception.message });
    }
  };

export const getUserAction =
  (id: string) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: FETCH_USER_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/users/${id}`);
      dispatch({ type: FETCH_USER_SUCCESS, payload: data });
    } catch (exception: any) {
      dispatch({
        type: FETCH_USER_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };
export const changePasswordAction =
  (passwords: { oldPassword: string; newPassword: string }) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: CHANGE_PASSWORD_REQUEST });
      await axios.post(`/api/v1/admin/users/password`, passwords);
      dispatch({ type: CHANGE_PASSWORD_SUCCESS });
    } catch (exception: any) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };

export const adminChangePasswordAction =
  (
    userId: string | number,
    passwords: { oldPassword: string; newPassword: string }
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: CHANGE_PASSWORD_REQUEST });
      await axios.post(`/api/v1/admin/users/${userId}/password`, passwords);
      dispatch({ type: CHANGE_PASSWORD_SUCCESS });
    } catch (exception: any) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };

export const makeAdminAction =
  (userId: string) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: MAKE_ADMIN_REQUEST });
      await axios.get(`/api/v1/admin/users/${userId}/admin`);
      dispatch(getUserAction(userId));
      dispatch({ type: MAKE_ADMIN_SUCCESS });
      dispatch(getAllUsersAction())
    } catch (exception: any) {
      dispatch({
        type: MAKE_ADMIN_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };
export const demoteAdminAction =
  (userId: string) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: DEMOTE_ADMIN_REQUEST });
      await axios.get(`/api/v1/admin/users/${userId}/demote`);
      dispatch(getUserAction(userId));
      dispatch({ type: DEMOTE_ADMIN_SUCCESS });
      dispatch(getAllUsersAction())
    } catch (exception: any) {
      dispatch({
        type: DEMOTE_ADMIN_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };
export const activateUserAction =
  (userId: string) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: ACTIVATE_USER_REQUEST });
      await axios.get(`/api/v1/admin/users/${userId}/activate`);
      dispatch(getUserAction(userId));
      dispatch({ type: ACTIVATE_USER_SUCCESS });
      dispatch(getAllUsersAction())
    } catch (exception: any) {
      dispatch({
        type: ACTIVATE_USER_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };
export const deactivateUserAction =
  (userId: string) => async (dispatch: Dispatch<any>) => {
    try {
      const axios = useHttp();
      dispatch({ type: DEACTIVATE_USER_REQUEST });
      await axios.get(`/api/v1/admin/users/${userId}/deactivate`);
      dispatch(getUserAction(userId));
      dispatch(getAllUsersAction())
      dispatch({ type: DEACTIVATE_USER_SUCCESS });
    } catch (exception: any) {
      dispatch({
        type: DEACTIVATE_USER_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };

export const updateUserAction =
  (user: IUser) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      // TODO: Implement GET Activate users admin axios
      dispatch({ type: UPDATE_USER_SUCCESS, payload: getUsers()[0] });
      dispatch(getUserAction(user.id));
    } catch (exception: any) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: exception.message || "Something went wrong",
      });
    }
  };
