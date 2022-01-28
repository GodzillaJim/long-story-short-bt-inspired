import {
  FETCH_USERS_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
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
