import { BASE_URL, checkResponse } from './api';
import { TForgotPasswordInitialState, TForgotPassword, TResetPasswordInitialState, TResetPassword } from './types';

export const forgotPassword = ({email}: TForgotPasswordInitialState) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email}),
  })
    .then((res) => checkResponse<TForgotPassword>(res))
    .then((data) => {
      if (data) {
        localStorage.setItem('message', data.message);
        return data;
      } else {
        return;
      }
    })
};

export const resetPassword = ({password, token}: TResetPasswordInitialState) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, token}),
  })
    .then((res) => checkResponse<TResetPassword>(res))
    .then((data) => {
      if (data) {
        localStorage.setItem('resetMessage', data.message);
        return data;
      } else {
        return;
      }
    })
};