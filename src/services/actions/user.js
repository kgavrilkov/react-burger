import { getUserInfo, setUserInfo } from '../../utils/api.js';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_INFO_SUCCESS = 'SET_USER_INFO_SUCCESS';
export const SET_USER_INFO_FAILED = 'SET_USER_INFO_FAILED';

export const DELETE = 'DELETE';

export const getUserAction = () => {
  return function(dispatch) {
    dispatch({
      type: GET_USER_INFO
    });
    getUserInfo()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_INFO_SUCCESS,
            payload: res.user
          });
        } else {
          dispatch({
            type: GET_USER_INFO_FAILED
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_USER_INFO_FAILED
        });
      });
  };
};

export const setUserAction = (name, email, password) => {
  return function(dispatch) {
    dispatch({
      type: SET_USER_INFO
    });
    setUserInfo(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_INFO_SUCCESS,
            payload: res.user
          });
        } else if (!res && res.success) {
          dispatch({
            type: SET_USER_INFO_FAILED
          });
        } else {
          dispatch({
            type: DELETE
          });
        }
      })
      .catch(() => {
        dispatch({
          type: SET_USER_INFO_FAILED
        });
      });
  };
};