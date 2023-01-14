const setPopupProfile = document.querySelector('.popup_type-edit_profile');
const setPopupCard = document.querySelector('.popup_type-add_card');
const setPopupImg = document.querySelector('.popup_type_img');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const listBtnExit = document.querySelectorAll('.popup__exit-btn');
const formProfile = document.querySelector('form[name="profile-edit"]');
const formCard = document.querySelector('form[name="card-add"]');
const btnAddCard = document.querySelector('.profile__add-btn');
const setProfileName = document.querySelector('.profile__name');
const setProfileDesc = document.querySelector('.profile__description');
const inputProfileName = document.querySelector('input.popup__input.popup__input_type_name[name="profile-name"]');
const inputProfileDesc = document.querySelector('input.popup__input.popup__input_type_desc[name="profile-desc"]');
const inputCardName = document.querySelector('input.popup__input.popup__input_type_name[name="card-name"]');
const inputCardUrl = document.querySelector('input.popup__input.popup__input_type_desc[name="card-url"]');
const cardTemplate = document.querySelector('#card-template').content;
const placesSection = document.querySelector('.places');
const popupImg = setPopupImg.querySelector('.popup__img');
const popupDescImg = setPopupImg.querySelector('.popup__desc-img');
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

//Функция создания карточки
function createCard(nameCard, linkCard) {
    const cardElement = cardTemplate.querySelector('.place-card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.place-card__title');
    const cardImage = cardElement.querySelector('.place-card__image');
    const btnLike = cardElement.querySelector('.place-card__like-btn');
    const btnDelete = cardElement.querySelector('.place-card__delete-btn');

    cardTitle.textContent = nameCard;
    cardImage.setAttribute('src', linkCard);
    cardImage.setAttribute('alt', nameCard);

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
        popupImg.setAttribute('src', cardImage.src);
        popupImg.setAttribute('alt', cardImage.alt);
        popupDescImg.textContent = (cardTitle.textContent);
        showPopup(setPopupImg);
    });

    return cardElement
}
//Функция добавления карточки
function addCard(card) {
    placesSection.prepend(card);
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
//Функция закрытия поп-апа по клавише Esc
function handleEscape(evt) {
    if (evt.key === 'Escape') {
        hidePopup();
    }
}
//Функция показа поп-апа
function showPopup(popupClass) {
    popupClass.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
    //Закрытие поп-апа по нажатию на оверлей
    popupClass.addEventListener("mousedown",(evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            hidePopup();
        }
    })
}
//Функция скрытия поп-апа
function hidePopup() {
    const popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
}
//Функция сохранения введенных в поп-ап данных
function savePopup(evt) {
    evt.preventDefault();
    setProfileName.textContent = inputProfileName.value;
    setProfileDesc.textContent = inputProfileDesc.value;
    hidePopup();
}
//Функция добавления карточки из поп-апа
function addCardPopup(evt) {
    evt.preventDefault();
    addCard(createCard(inputCardName.value, inputCardUrl.value));
    hidePopup();
}

formProfile.addEventListener('submit', savePopup);
formCard.addEventListener('submit', addCardPopup);

btnProfileEdit.addEventListener('click', function () {
    showPopup(setPopupProfile);
    inputProfileName.value = setProfileName.textContent;
    inputProfileDesc.value = setProfileDesc.textContent;
});

btnAddCard.addEventListener('click', function () {
    inputCardName.value = '';
    inputCardUrl.value = '';
    showPopup(setPopupCard);
});