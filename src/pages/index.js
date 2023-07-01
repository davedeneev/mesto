import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
    formSettings,
    popupProfile,
    popupAvatar,
    popupCard,
    popupTypeImg,
    popupConfirm,
    btnProfileEdit,
    btnAddCard,
    profileName,
    profileDesc,
    profileNameInput,
    profileDescInput,
    placesSection,
    profileAvatar,
    btnAvatarEdit
} from '../utils/constants.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
    headers: {
        authorization: 'aac91b4b-cd9c-449e-a05e-4878339d70cf',
        'Content-Type': 'application/json'
    }
});

const validatorPopupProfile = new FormValidator(formSettings, popupProfile);
const validatorPopupAvatar = new FormValidator(formSettings, popupAvatar);
const validatorPopupCard = new FormValidator(formSettings, popupCard);

const userData = new UserInfo({
    profileName: profileName,
    profileDesc: profileDesc,
    profileAvatar: profileAvatar
});


function submitCardForm(data) {
    popupAddCard.updateTitleText();
    api.addCard(data)

    .then((card) => {
        popupAddCard.updateTitleText();
        cards.addItem(generateNewCard(card))
        popupAddCard.close();
    })
    .catch((error) => {
        console.log(`Ошибка: ${error}`);
    });
}

function submitProfileForm(user) {
    popupEditProfile.updateTitleText();
    api.editUserProfile(user)

    .then((inputs) => {
        popupEditProfile.updateTitleText();
        userData.setUserInfo(inputs);
        popupEditProfile.close();
    })
    .catch((error) => {
        console.log(`Ошибка: ${error}`);
    });
}

function submitAvatarForm(user) {
    popupEditAvatar.updateTitleText();
    api.editUserAvatar(user)

    .then((inputs) => {
        popupEditAvatar.updateTitleText();
        userData.setUserInfo(inputs);
        popupEditAvatar.close();
    })
    .catch((error) => {
        console.log(`Ошибка: ${error}`);
    });
}

function submitConfirmationForm(card) {
    api.deleteCard(card._id)

    .then(() => {
        card.removeCard();
        popupConfirmation.close();
    })
    .catch((error) => {
        console.log(`Ошибка: ${error}`);
    });
}

function handleCardClick(event) {
    popupImgSetup.open(event.target);
}

function uploadAddLike(card) {
    api.addLike(card._id)
    .then((data) => {
        card.like();
        card.updateLikes(data);
    })
    .catch((error) => {
        console.log(`Ошибка: ${error}`);
    });
}

function uploadRemoveLike(card) {
    api.removeLike(card._id)
    .then((data) => {
        card.dislike();
        card.updateLikes(data);
    })
    .catch((error) => {
        console.log(`Ошибка: ${error}`);
    });
}

function generateNewCard(card) {
    const newCard = new Card(
        card,
        userData.getUserInfo().profileID,
        "#card-template",
        handleCardClick,
        (cardObj) => {popupConfirmation.open(cardObj)},
        (cardObj) => {uploadAddLike(cardObj)},
        (cardObj) => {uploadRemoveLike(cardObj)}).generateCard();
    return newCard;
}

const cards = new Section(
    {
        renderer: (item) => {
            const cardItem = generateNewCard(item);
            cards.addItem(cardItem);
        },
    },
    placesSection
);

const popupEditProfile = new PopupWithForm(popupProfile, submitProfileForm);
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupAvatar, submitAvatarForm);
popupEditAvatar.setEventListeners();

const popupAddCard = new PopupWithForm(popupCard, submitCardForm);
popupAddCard.setEventListeners();

const popupImgSetup = new PopupWithImage(popupTypeImg);
popupImgSetup.setEventListeners();

const popupConfirmation = new PopupConfirmation(popupConfirm, submitConfirmationForm);
popupConfirmation.setEventListeners();

validatorPopupProfile.enableValidation();
validatorPopupAvatar.enableValidation();
validatorPopupCard.enableValidation();

btnProfileEdit.addEventListener('click', function () {
    popupEditProfile.open();
    const userInfo = userData.getUserInfo();
    profileNameInput.value = userInfo.profileName;
    profileDescInput.value = userInfo.profileDesc;
    validatorPopupProfile.resetValidation();
});

btnAvatarEdit.addEventListener('click', function () {
    popupEditAvatar.open();
    validatorPopupAvatar.resetValidation();
});

btnAddCard.addEventListener('click', function () {
    popupAddCard.open();
    validatorPopupCard.resetValidation();
});

Promise.all([api.getUser(), api.getInitialCards()])
    .then(([userInfo, initialCards]) => {
        userData.setUserInfo(userInfo);
        cards.renderItems(initialCards.reverse());
    })

    .catch((error) => console.log(`Ошибка: ${error}`));