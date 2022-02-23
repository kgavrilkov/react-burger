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
    body: JSON.stringify({
      ingredients: ingredientsId
    })
  })
    .then(checkResponse)
};