const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
const URL = 'https://norma.nomoreparties.space/api/orders';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getIngredients = () => {
  return fetch(BASE_URL)
    .then(checkResponse)
};

export const getOrderNumber = (ingredientsId) => {;
  return fetch(URL, {
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