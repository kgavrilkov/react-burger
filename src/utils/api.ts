import { fetchWithRefresh } from './wrapper';
import { TIngredients, TOrder, TUser, TUserInfo } from './types'

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const WSS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';

export const WSS_ORDER_URL = 'wss://norma.nomoreparties.space/orders';

export const checkResponse = <T>(res: Response): Promise<T> => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then((res) => checkResponse<TIngredients>(res))
};

export const getOrderNumber = (ingredientsId: string) => {
  const accessToken = localStorage.getItem('accessToken')!;
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    body: JSON.stringify({ingredients: ingredientsId})
  })
    .then((res) => checkResponse<TOrder>(res))
    .then((data) => {
      if (data) {
        localStorage.setItem('number', JSON.stringify(data.order.number));
        return data;
      } else {
        return;
      }
    })
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