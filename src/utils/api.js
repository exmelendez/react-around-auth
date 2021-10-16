const BASE_URL = 'https://around.nomoreparties.co/v1/group-4';

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

export const addCard = ({ link, name }) => {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ link, name })
  })
  .then(handleResponse);
}

export const changeLikeCardStatus = (cardId, isLiked) => {
  if (isLiked) {
    return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
      headers: {
        authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    }).then(handleResponse);

  } else {
    return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
      headers: {
        authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
        "Content-Type": "application/json"
      },
      method: "PUT"
    }).then(handleResponse);
  }
}

export const getCardList = () => {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
        authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
        "Content-Type": "application/json"
      }
  }).then(handleResponse);
}

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
        authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
        "Content-Type": "application/json"
      }
  }).then(handleResponse);
}

export const removeCard = (cardId) => {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    headers: {
        authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
        "Content-Type": "application/json"
      },
    method: "DELETE"
  }).then(handleResponse);
}

export const setUserAvatar = ({ avatar }) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    headers: {
        authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
        "Content-Type": "application/json"
      },
    method: "PATCH",
    body: JSON.stringify({
      avatar
    })
  }).then(handleResponse);
}

export const setUserInfo = ({ name, about }) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
        authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
        "Content-Type": "application/json"
      },
    method: "PATCH",
    body: JSON.stringify({
      name,
      about
    })
  }).then(handleResponse);
}