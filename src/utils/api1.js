class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  addCard({ link, name }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        link,
        name
      })
    }).then(this.handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "DELETE"
      }).then(this.handleResponse);

    } else {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "PUT"
      }).then(this.handleResponse);
    }
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this.handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this.handleResponse);
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE"
    }).then(this.handleResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar
      })
    }).then(this.handleResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about
      })
    }).then(this.handleResponse);
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-4",
  headers: {
    authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
    "Content-Type": "application/json"
  }
});

export default api;
