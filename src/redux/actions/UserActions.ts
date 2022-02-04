import { Dispatch } from "redux";
import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DEMOTE_ADMIN_REQUEST, DEMOTE_ADMIN_SUCCESS, DEMOTE_ADMIN_FAIL,
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

export const getAllUsersAction = () => async (dispatch: Dispatch<any>) => {
  try {
    const axios = useHttp()
    dispatch({ type: FETCH_USERS_REQUEST });
    // TODO: Implement get all users axios
    const { data } = await axios.get("/api/v1/admin/users/all")
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (exception: any) {
    dispatch({
      type: FETCH_USERS_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};
export const createUserAction = (user: IUser) => async (dispatch: Dispatch<any>) => {
  try{
    dispatch({ type: CREATE_USER_REQUEST })
    // TODO: Implement axios post new user
    dispatch({ type: CREATE_USER_SUCCESS, payload: getUsers()[0] })
  }catch(exception: any){
    dispatch({ type: CREATE_USER_FAIL, payload: exception.message })
  }
}

export const getUserAction = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: FETCH_USER_REQUEST });
    // TODO: Implement get one user by ID axios
     dispatch({ type: FETCH_USER_SUCCESS, payload: getUsers()[0] });
  } catch (exception: any) {
    dispatch({
      type: FETCH_USER_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};
export const changePasswordAction = (passwords: { password: string, newPassword: string }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    // TODO: Implement POST new users password axios
     dispatch({ type: CHANGE_PASSWORD_SUCCESS });
  } catch (exception: any) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};
export const makeAdminAction = (userId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: MAKE_ADMIN_REQUEST });
    // TODO: Implement GET make users admin axios
     dispatch({ type: MAKE_ADMIN_SUCCESS });
  } catch (exception: any) {
    dispatch({
      type: MAKE_ADMIN_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};
export const demoteAdminAction = (userId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: DEMOTE_ADMIN_REQUEST });
    // TODO: Implement GET DEMOTE users admin axios
     dispatch({ type: DEMOTE_ADMIN_SUCCESS });
  } catch (exception: any) {
    dispatch({
      type: DEMOTE_ADMIN_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};
export const activateUserAction = (userId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: ACTIVATE_USER_REQUEST });
    // TODO: Implement GET Activate users admin axios
     dispatch({ type: ACTIVATE_USER_SUCCESS });
  } catch (exception: any) {
    dispatch({
      type: ACTIVATE_USER_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};
export const deactivateUserAction = (userId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: DEACTIVATE_USER_REQUEST });
    // TODO: Implement GET Activate users admin axios
     dispatch({ type: DEACTIVATE_USER_SUCCESS });
  } catch (exception: any) {
    dispatch({
      type: DEACTIVATE_USER_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};

export const updateUserAction = (user: IUser) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    // TODO: Implement GET Activate users admin axios
     dispatch({ type: UPDATE_USER_SUCCESS, payload: getUsers()[0] });
     dispatch(getUserAction(user.id))
  } catch (exception: any) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: exception.message || "Something went wrong",
    });
  }
};