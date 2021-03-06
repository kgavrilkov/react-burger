import { fetchWithRefresh } from './wrapper';
import { TIngredient, TUser, TUserInfo } from './types'

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = <T>(res: Response): Promise<T> => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then((res) => checkResponse<Array<TIngredient>>(res))
};

export const getOrderNumber = (ingredientsId: string) => {;
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredients: ingredientsId})
  })
    .then((res) => checkResponse<number>(res))
};

export const getUserInfo = () => {
  const accessToken = localStorage.getItem('accessToken')!;
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    }
  })
    .then((res) => checkResponse<TUser>(res))
};

export const setUserInfo = ({name, email, password}: TUserInfo) => {
  const accessToken = localStorage.getItem('accessToken')!;
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    body: JSON.stringify({name, email, password})
  })
    .then((res) => checkResponse<TUser>(res))
    .then((data) => {
      if (data) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      } else {
        return;
      }
    })
};