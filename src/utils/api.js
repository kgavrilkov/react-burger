const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
const URL = 'https://norma.nomoreparties.space/api/orders';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getCards = () => {
  return fetch(BASE_URL)
    .then(checkResponse)
};

export const saveOrder = () => {
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'ingredients': [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733cc',
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733cf',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d2',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4'
      ]
    })
  })
    .then(checkResponse)
};