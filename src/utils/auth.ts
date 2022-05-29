import { BASE_URL, checkResponse } from './api';
import { TRegisterInitialState, TRegister, TLoginInitialState, TLogin, TRefreshToken, TLogout } from './types';

export const register = ({name, email, password}: TRegisterInitialState) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password}),
  })
    .then((res) => checkResponse<TRegister>(res))
};

export const login = ({email, password}: TLoginInitialState) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => checkResponse<TLogin>(res))
    .then((data) => {
      if (data) {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      } else {
        return;
      }
    })
};

export const refreshToken = () => {
  const token = localStorage.getItem('refreshToken');
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token})
  })
    .then((res) => checkResponse<TRefreshToken>(res))
    .then((data) => {
      if (data) {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        return data;
      } else {
        return;
      }
    })
};

export const logout = () => {
  const token = localStorage.getItem('refreshToken'); 
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token})
  })
    .then((res) => checkResponse<TLogout>(res))
};