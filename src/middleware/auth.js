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
  .then((response) => response.json())
  .then((res) => res)
  .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
  .catch((err) => console.log(err));
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTViODFjMjY3YzBjODAwMTMxZWFhOTEiLCJpYXQiOjE2MzMzODY5ODJ9.aRCTkcWIc5CLYZZRrvekguDWKPcSzzOGyd-tDjhky1s
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
