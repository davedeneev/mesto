import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
    initialCards,
    formSettings,
    popupProfile,
    popupCard,
    popupTypeImg,
    btnProfileEdit,
    btnAddCard,
    profileName,
    profileDesc,
    profileNameInput,
    profileDescInput,
    placesSection
} from '../utils/constants.js';

const validatorPopupProfile = new FormValidator(formSettings, popupProfile);
const validatorPopupCard = new FormValidator(formSettings, popupCard);

const cards = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const cardItem = generateNewCard(item);
            cards.addItem(cardItem);
        },
    },
    placesSection
);

const userData = new UserInfo({
    profileName: profileName,
    profileDesc: profileDesc,
});

function generateNewCard(card) {
    const newCard = new Card(card, "#card-template", handleCardClick).generateCard();
    return newCard;
}

const popupEditProfile = new PopupWithForm(popupProfile, (inputs) => userData.setUserInfo(inputs));
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupCard, (data) => { cards.addItem(generateNewCard(data)); });
popupAddCard.setEventListeners();

const popupImgSetup = new PopupWithImage(popupTypeImg);
popupImgSetup.setEventListeners();

function handleCardClick(event) {
    popupImgSetup.open(event.target)
}

validatorPopupProfile.enableValidation();
validatorPopupCard.enableValidation();

cards.renderItems(initialCards.reverse());

btnProfileEdit.addEventListener('click', function () {
    popupEditProfile.open();
    const { profileName, profileDesc } = userData.getUserInfo();
    profileNameInput.value = profileName;
    profileDescInput.value = profileDesc;
    validatorPopupProfile.resetValidation();
});

btnAddCard.addEventListener('click', function () {
    popupAddCard.open();
    validatorPopupCard.resetValidation();
});