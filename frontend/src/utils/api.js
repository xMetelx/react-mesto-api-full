class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json() //вернется promise
    }
    return Promise.reject('Сервер недоступен')
  }

  // данные пользователя
  getUserInfo () {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse) 
  }

  // данные карточки - рендерим имеющиеся на сервере
  getCards () {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  // меняем имя и деятельность в профайле
  patchProfile (name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name, 
        about: about
      })
    })
    .then(this._checkResponse)
  }

  //отправляем свою карточку на сервер  
  postCard (name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    const setLike = {
      method: 'PUT',
      headers: this._headers
    }
    const deleteLike = {
      method: 'DELETE',
      headers: this._headers
    }

    return fetch(`${this._baseUrl + '/cards/likes'}/${cardId}`, isLiked ? deleteLike : setLike)
    .then(this._checkResponse)
  }

  // удаляем карточку
  removeCard (cardId) {
    return fetch (`${this._baseUrl + '/cards'}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then (this._checkResponse)
  }

 //меняем аватар пользователя
  patchAvatar (avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse)
  }
}

export default new Api ({
  baseUrl: 'https://api.metel.nomoredomains.sbs',
  headers: {
    'authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
})
