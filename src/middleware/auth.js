export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    //a status code of 201 means successfully created
    //a status code of 400 means error/already exists
    // console.log('response from auth:', response);
    // console.log('response status in auth:',response.status);
    return response.json();
  })
  .then((res) => {

    console.log('res in auth 2nd then:', res);
    // console.log('res error msg in auth:', res.error);
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        return data;
      }
    })
    .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
