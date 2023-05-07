import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const formSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type-edit_profile');
const popupCard = document.querySelector('.popup_type-add_card');
const popupTypeImg = document.querySelector('.popup_type_img');
const popupImg = popupTypeImg.querySelector('.popup__img');
const popupDescImg = popupTypeImg.querySelector('.popup__desc-img');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const closeButtons = document.querySelectorAll('.popup__exit-btn');
const formProfile = document.forms["profile-edit"];
const formCard = document.forms["card-add"];
const btnAddCard = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('input.popup__input.popup__input_type_name[name="profile-name"]');
const profileDescInput = document.querySelector('input.popup__input.popup__input_type_desc[name="profile-desc"]');
const cardNameInput = document.querySelector('input.popup__input.popup__input_type_name[name="card-name"]');
const cardUrlInput = document.querySelector('input.popup__input.popup__input_type_desc[name="card-url"]');
const placesSection = document.querySelector('.places');

const validatorPopupProfile = new FormValidator(formSettings, popupProfile);
const validatorPopupCard = new FormValidator(formSettings, popupCard);

//Функция добавления карточки в разметку
function addCard(card) {
    placesSection.prepend(card);
}

//Функция показа поп-апа
export function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
}

//Метод наполнения и открытия поп-апа
function handleCardClick(name, link) {
    popupImg.src = link;
    popupImg.alt = name;
    popupDescImg.textContent = name;

    return showPopup(popupTypeImg);
}

//Функция создания карточки
function generateNewCard(card) {
    const newCard = new Card(card, "#card-template", handleCardClick).generateCard();
    return newCard;
}

//Функция скрытия поп-апа
function hidePopup() {
    const popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
}

//Функция закрытия поп-апа по клавише Esc
function handleEscape(evt) {
    if (evt.key === 'Escape') {
        hidePopup();
    }
}

//Функция сохранения введенных в поп-ап данных
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDesc.textContent = profileDescInput.value;
    hidePopup();
}

//Функция добавления карточки из поп-апа
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardTemplate = [];
    cardTemplate.link = cardUrlInput.value;
    cardTemplate.name = cardNameInput.value;

    addCard(generateNewCard(cardTemplate));
    formCard.reset();
    validatorPopupCard.resetValidation();
    hidePopup();
}

validatorPopupProfile.enableValidation();
validatorPopupCard.enableValidation();

//Загружаем карточки по-умолчанию
initialCards.reverse().forEach((item) => {
    addCard(generateNewCard(item));
});

//Обработчик закрытия поп-апа
closeButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
        hidePopup();
    })
});

formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);

btnProfileEdit.addEventListener('click', function () {
    showPopup(popupProfile);
    profileNameInput.value = profileName.textContent;
    profileDescInput.value = profileDesc.textContent;
});

btnAddCard.addEventListener('click', function () {
    showPopup(popupCard);

    if (!cardUrlInput.value && !cardNameInput.value) {
        validatorPopupCard.resetValidation();
    }
});

//Закрытие поп-апа по нажатию на оверлей
popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            hidePopup();
        }
    });
});