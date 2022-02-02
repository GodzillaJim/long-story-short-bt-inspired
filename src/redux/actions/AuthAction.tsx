import { Dispatch } from "redux";
import { useHttp } from "../../hooks/client";
import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCESS,
  AUTH_LOGOUT_REQUEST,
} from "../constants/ArticleConstants";
export const logoutAction = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: AUTH_LOGOUT_REQUEST });
  sessionStorage.removeItem("data");
};
export const loginAction =
  (loginRequest: { username: string; password: string }) =>
  async (dispatch: any) => {
    const axios = useHttp();
    dispatch({ type: AUTH_LOGIN_REQUEST });
    try {
      const { data } = await axios.post("/api/v1/public/auth/signin", {
        username: loginRequest.username,
        password: loginRequest.password,
      });
      const { token, username, roles } = data;
      let isAdmin = false;
      roles.map((role: string) => {
        if (role === "ROLE_ADMIN") {
          isAdmin = true;
        }
        return role;
      });
      sessionStorage.setItem("data", JSON.stringify({ ...data, isAdmin }));
      dispatch({
        type: AUTH_LOGIN_SUCESS,
        payload: { user: username, authToken: token, isAdmin },
      });
    } catch (exception: any) {
      dispatch({ type: AUTH_LOGIN_FAIL, payload: exception.message });
      console.log(exception);
    }
  };
