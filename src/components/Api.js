export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getUser() {
        const link = `${this._baseUrl}/users/me`;
        return fetch(link, {
            headers: this._headers,
        })
            .then(this._handleResponse);
    };

    getInitialCards() {
        const link = `${this._baseUrl}/cards`;
        return fetch(link, {
            headers: this._headers,
        }).then(this._handleResponse);
    }

    addCard(card) {
        const link = `${this._baseUrl}/cards`;
        return fetch(link, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(card),
        }).then(this._handleResponse);
    };

    deleteCard(cardId) {
        const link = `${this._baseUrl}/cards/${cardId}`;
        return fetch(link, {
            headers: this._headers,
            method: "DELETE",
        }).then(this._handleResponse);
    };

    addLike(cardId) {
        const link = `${this._baseUrl}/cards/likes/${cardId}`;
        return fetch(link, {
            method: "PUT",
            headers: this._headers,
        }).then(this._handleResponse);
    };

    removeLike(cardId) {
        const link = `${this._baseUrl}/cards/likes/${cardId}`;
        return fetch(link, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._handleResponse);
    };

    editUserProfile(user) {
        const link = `${this._baseUrl}/users/me`;
        return fetch(link, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(user),
        }).then(this._handleResponse);
    };

    editUserAvatar(user) {
        const link = `${this._baseUrl}/users/me/avatar`;
        return fetch(link, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(user),
        }).then(this._handleResponse);
    };
}