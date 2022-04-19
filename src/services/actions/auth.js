import { register, login, logout } from '../../utils/auth.js';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const registerAction = (name, email, password) => {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    register(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
          });
          window.location.assign('/login');
        } else {
          dispatch({
            type: REGISTER_FAILED
          });
        }
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FAILED
        });
        setTimeout(() => window.location.reload(), 3000);
      });
  };
};

export const loginAction = (email, password) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    login(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user
          });
        } else {
          dispatch({
            type: LOGIN_FAILED
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FAILED
        });
        setTimeout(() => window.location.reload(), 3000);
      });
  };
};

export const logoutAction = () => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logout()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS
          });
        } else {
          dispatch({
            type: LOGOUT_FAILED
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FAILED
        });
      });
  };
};