import {showPopup} from "./index.js";

//Класс карточки фотографии
export default class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._popupTypeImg = document.querySelector('.popup_type_img');
        this._popupImg = this._popupTypeImg.querySelector('.popup__img');
        this._popupDescImg = this._popupTypeImg.querySelector('.popup__desc-img');
    }

    //Метод для получения копии шаблона из файла разметки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.place-card')
            .cloneNode(true);

        return cardElement;
    }
    //Публичный метод создания карточки фотографии
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
    //Метод для установки слушателей
    _setEventListeners() {
        this._btnLike.addEventListener("click", () => {this._likeToggle()});
        this._btnDelete.addEventListener("click", () => {this._deleteCard()});
        this._cardImage.addEventListener("click", () => {this._openImgPopup()});
    }

    _likeToggle() {
        this._btnLike.classList.toggle("place-card__like-btn_active");
    }

    _deleteCard() {
        this._element.remove();
    }

    //Метод наполнения и открытия поп-апа
    _openImgPopup() {
        this._popupImg.src = this._link;
        this._popupImg.alt = this._name;
        this._popupDescImg.textContent = this._name

        return showPopup(this._popupTypeImg);
    }
}