import {Dispatch} from 'redux';
import {FETCH_USERS_FAIL, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS} from '../constants/UserConstants';
import {getUsers} from '../../data/Users';

export const getAllUsersAction = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({type: FETCH_USERS_REQUEST});
    // TODO: Implement get all users axios
    dispatch({type: FETCH_USERS_SUCCESS, payload: getUsers()});
  } catch (exception:any) {
    dispatch({type: FETCH_USERS_FAIL, payload: exception.message || 'Something went wrong'});
  }
};

