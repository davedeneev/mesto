//Класс карточки фотографии
export default class Card {
    constructor(data, userID, templateSelector, handleCardClick, deleteCard, uploadAddLike, uploadRemoveLike) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._uploadAddLike = uploadAddLike;
        this._uploadRemoveLike = uploadRemoveLike;
        this._id = data._id;
        this._userID = userID;
        this._ownerID = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._deleteCard = deleteCard;
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
        this._likesCounter = this._element.querySelector('.place-card__like-counter');
        this._btnDelete = this._element.querySelector('.place-card__delete-btn');
        if (this._ownerID !== this._userID) {
            this._btnDelete.remove();
        }
        this._setEventListeners();
        this._countLikes();
        return this._element;
    }

    isLiked() {
        return this._likes.some((like) => like._id === this._userID)
    }

    like() {
        this._btnLike.classList.add("place-card__like-btn_active");
    }

    dislike() {
        this._btnLike.classList.remove("place-card__like-btn_active");
    }

    _countLikes() {
        this._likesCounter.textContent = this._likes.length;
        this._btnLike.classList.toggle("place-card__like-btn_active", this.isLiked());
    }

    updateLikes(data) {
        this._likes = data.likes;
        this._countLikes()
    }

    removeCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._btnLike.addEventListener("click", () => {
            if (this._btnLike.classList.contains("place-card__like-btn_active")) {
                this._uploadRemoveLike(this);
            } else {
                this._uploadAddLike(this);
            }
        });
        this._btnDelete.addEventListener("click", () => {this._deleteCard(this)});
        this._cardImage.addEventListener('click', this._handleCardClick);
    }
}