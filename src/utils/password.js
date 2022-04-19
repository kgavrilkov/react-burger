const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const forgotPassword = ({email}) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email}),
  })
    .then(checkResponse)
    .then((data) => {
      if (data) {
        localStorage.setItem('message', data.message);
        return data;
      } else {
        return;
      }
    })
};

export const resetPassword = ({password, token}) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, token}),
  })
    .then(checkResponse)
};