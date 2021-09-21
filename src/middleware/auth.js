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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ5MmVhZTY3YzBjODAwMTMxZWE0YjciLCJpYXQiOjE2MzIxODYyMDB9.kAaTEDy9I84hIXvD0UOKHU96jazQ25FToK5Fh9AJjps
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ5MmVhZTY3YzBjODAwMTMxZWE0YjciLCJpYXQiOjE2MzIxODYzMzh9.zQqmPJTFQUNs--aFUuOvPk89j8gxWIF5RwiCzQjyt30"
export const authorize = (identifier, password) => {
  console.log('entered auth:', identifier);
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  })
    .then((response) => {
      console.log('response:', response);
      return response.json();
    })
    .then((data) => {
      console.log('data:', data);

      /*
      if (data.jwt) {
        console.log('data.jwt', data.jwt);
        localStorage.setItem('jwt', data.jwt);
        return data;
      }
      */
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
