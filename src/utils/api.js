import { fetchWithRefresh } from './wrapper.js';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
};

export const getOrderNumber = (ingredientsId) => {;
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredients: ingredientsId})
  })
    .then(checkResponse)
};

export const getUserInfo = () => {
  const accessToken = localStorage.getItem('accessToken');
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    }
  })
    .then(checkResponse)
};

export const setUserInfo = ({name, email, password}) => {
  const accessToken = localStorage.getItem('accessToken');
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    body: JSON.stringify({name, email, password})
  })
    .then(checkResponse)
    .then((data) => {
      if (data) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      } else {
        return;
      }
    })
};