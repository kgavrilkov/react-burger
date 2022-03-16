import { getUserInfo, setUserInfo } from '../../utils/api';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_INFO_SUCCESS = 'SET_USER_INFO_SUCCESS';
export const SET_USER_INFO_FAILED = 'SET_USER_INFO_FAILED';

export const getUser = (accessToken) => {
  return function(dispatch) {
    dispatch({
      type: GET_USER_INFO
    });
    getUserInfo(accessToken)
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

export const setUser = (accessToken, {name, email}) => {
  return function(dispatch) {
    dispatch({
      type: SET_USER_INFO
    });
    setUserInfo(accessToken, {name, email})
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_INFO_SUCCESS,
            payload: res.user
          });
        } else {
          dispatch({
            type: SET_USER_INFO_FAILED
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