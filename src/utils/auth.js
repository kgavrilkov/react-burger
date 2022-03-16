const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password}),
  })
    .then(checkResponse)
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
    .then((data) => {
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
        return data;
      } else {
        return;
      }
    })
};

export const refreshToken = (refreshToken) => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({refreshToken})
  })
    .then(checkResponse)
};

export const logout = (refreshToken) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({refreshToken})
  })
    .then(checkResponse)
    .then((data) => {
      if (data.success) {
        localStorage.removeItem('refreshToken');
      }
    })
};