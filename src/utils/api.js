const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

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

export const getUserInfo = (accessToken) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(checkResponse)
    .then((data) => {
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      } else {
        return;
      }
    })
};

export const setUserInfo = (accessToken, {name, email}) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({name, email})
  })
    .then(checkResponse)
};