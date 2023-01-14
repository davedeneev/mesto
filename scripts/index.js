const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type-edit_profile');
const popupCard = document.querySelector('.popup_type-add_card');
const popupTypeImg = document.querySelector('.popup_type_img');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const listBtnExit = document.querySelectorAll('.popup__exit-btn');
const formProfile = document.querySelector('form[name="profile-edit"]');
const formCard = document.querySelector('form[name="card-add"]');
const btnAddCard = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('input.popup__input.popup__input_type_name[name="profile-name"]');
const profileDescInput = document.querySelector('input.popup__input.popup__input_type_desc[name="profile-desc"]');
const cardNameInput = document.querySelector('input.popup__input.popup__input_type_name[name="card-name"]');
const cardUrlInput = document.querySelector('input.popup__input.popup__input_type_desc[name="card-url"]');
const cardTemplate = document.querySelector('#card-template').content;
const placesSection = document.querySelector('.places');
const popupImg = popupTypeImg.querySelector('.popup__img');
const popupDescImg = popupTypeImg.querySelector('.popup__desc-img');
const placeCard = cardTemplate.querySelector('.place-card');
const cardFormSubmitButton = popupCard.querySelector('.popup__save-btn')
const cardFormInputs = Array.from(popupCard.querySelectorAll(".popup__input"));

//Функция создания карточки
function createCard(nameCard, linkCard) {
    const cardElement = placeCard.cloneNode(true);
    const cardTitle = cardElement.querySelector('.place-card__title');
    const cardImage = cardElement.querySelector('.place-card__image');
    const btnLike = cardElement.querySelector('.place-card__like-btn');
    const btnDelete = cardElement.querySelector('.place-card__delete-btn');

    cardTitle.textContent = nameCard;
    cardImage.src = linkCard;
    cardImage.alt =  nameCard;

    //Обработчик кнопки "лайк"
    btnLike.addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('place-card__like-btn_active');
    });
    //Обработчик кнопки "удалить"
    btnDelete.addEventListener('click', function () {
        const cardDelete = btnDelete.closest('.place-card');
        cardDelete.remove();
    });
    //Обработчик нажатия на фотографию
    cardImage.addEventListener('click', function () {
        popupImg.src =  cardImage.src;
        popupImg.alt = cardImage.alt;
        popupDescImg.textContent = cardTitle.textContent;
        showPopup(popupTypeImg);
    });

    return cardElement
}
//Функция добавления карточки
function addCard(card) {
    placesSection.prepend(card);
}
//Функция закрытия поп-апа по клавише Esc
function handleEscape(evt) {
    if (evt.key === 'Escape') {
        hidePopup();
    }
}
//Функция показа поп-апа
function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
}

//Функция скрытия поп-апа
function hidePopup() {
    const popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
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
    addCard(createCard(cardNameInput.value, cardUrlInput.value));
    formCard.reset();
    toggleButtonState(cardFormInputs,  cardFormSubmitButton, formSettings);
    hidePopup();
}
//Загружаем карточки по-умолчанию
initialCards.reverse().forEach((item) => {
    const nameCardDefault =  item.name;
    const linkCardDefault =  item.link;
    addCard(createCard(nameCardDefault, linkCardDefault));
});
//Обработчик закрытия поп-апа
listBtnExit.forEach((btn) => {
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
    cardNameInput.value = '';
    cardUrlInput.value = '';
    showPopup(popupCard);
});

//Закрытие поп-апа по нажатию на оверлей
popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            hidePopup();
        }
    });
});