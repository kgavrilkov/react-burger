import { forgotPassword, resetPassword } from '../../utils/password';

export const FORGOT_REQUEST = 'FORGOT_REQUEST';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_FAILED = 'FORGOT_FAILED';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILED = 'RESET_FAILED';

export const CLEAR = 'CLEAR';

export const forgotPasswordAction = (email) => {
  return function(dispatch) {
    dispatch({
      type: FORGOT_REQUEST
    });
    forgotPassword(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_SUCCESS,
          });
        } else {
          dispatch({
            type: FORGOT_FAILED
          });
        }
      })
      .catch(() => {
        dispatch({
          type: FORGOT_FAILED
        });
      });
  };
};

export const resetPasswordAction = (password, token) => {
  return function(dispatch) {
    dispatch({
      type: RESET_REQUEST
    });
    resetPassword(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_SUCCESS,
          });
        } else if (!res && res.success) {
          dispatch({
            type: RESET_FAILED
          });
        } else {
          dispatch({
            type: CLEAR
          });
        }
      })
      .catch(() => {
        dispatch({
          type: RESET_FAILED
        });
      });
  };
};