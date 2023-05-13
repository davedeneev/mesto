export const initialCards = [
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

export const formSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

export const popupProfile = '.popup_type-edit_profile';
export const popupCard = '.popup_type-add_card';
export const popupTypeImg = '.popup_type_img';
export const btnProfileEdit = document.querySelector('.profile__edit-btn');
export const btnAddCard = document.querySelector('.profile__add-btn');
export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__description');
export const profileNameInput = document.querySelector('input.popup__input.popup__input_type_name[name="name"]');
export const profileDescInput = document.querySelector('input.popup__input.popup__input_type_desc[name="description"]');
export const placesSection = '.places';