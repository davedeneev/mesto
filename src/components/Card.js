//Класс карточки фотографии
export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.place-card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.place-card__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.place-card__title').textContent = this._name;
        this._btnLike = this._element.querySelector('.place-card__like-btn');
        this._btnDelete = this._element.querySelector('.place-card__delete-btn');
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._btnLike.addEventListener("click", () => {this._toggleLike()});
        this._btnDelete.addEventListener("click", () => {this._deleteCard()});
        this._cardImage.addEventListener('click', this._handleCardClick);
    }

    _toggleLike() {
        this._btnLike.classList.toggle("place-card__like-btn_active");
    }

    _deleteCard() {
        this._element.remove();
    }
}