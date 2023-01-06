const setPopupProfile = document.querySelector('.popup_type-edit_profile');
const setPopupCard = document.querySelector('.popup_type-add_card');
const setPopupImg = document.querySelector('.popup_type_img');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnExit = document.querySelectorAll('.popup__exit-btn');
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

//Функция добавления карточки
function modifyCard(nameCard, linkCard) {
    const cardElement = cardTemplate.querySelector('.place-card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.place-card__title');
    const cardImage = cardElement.querySelector('.place-card__image');
    const btnLike = cardElement.querySelector('.place-card__like-btn');
    const btnDelete = cardElement.querySelector('.place-card__delete-btn');

    cardTitle.append(nameCard);
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
        const popupImg = setPopupImg.querySelector('.popup__img');
        const popupDescImg = setPopupImg.querySelector('.popup__desc-img');
        popupImg.setAttribute('src', cardImage.src);
        popupImg.setAttribute('alt', cardImage.alt);
        popupDescImg.textContent = (cardTitle.textContent);
        showPopup(setPopupImg);
    });
    placesSection.prepend(cardElement);
}
//Загружаем карточки по-умолчанию
initialCards.reverse().forEach((item) => {
    const nameCardDefault =  item.name;
    const linkCardDefault =  item.link;
    modifyCard(nameCardDefault, linkCardDefault);
});
//Обработчик закрытия поп-апа
btnExit.forEach((btn) => {
    btn.addEventListener('click', function () {
        hidePopup();
    })
});

function showPopup(popupClass) {
    popupClass.classList.add('popup_opened');
}

function hidePopup() {
    const listPopupOpened = document.querySelectorAll('.popup_opened');
    listPopupOpened.forEach((popup) => {
        if (popup.classList.contains('popup_opened')) {
            popup.classList.remove('popup_opened');
        }
    })
    formProfile.removeEventListener('submit', addCardPopup);
    formProfile.removeEventListener('submit', savePopup);
}

function savePopup(evt) {
    evt.preventDefault();
    setProfileName.textContent = inputProfileName.value;
    setProfileDesc.textContent = inputProfileDesc.value;
    hidePopup();
}

function addCardPopup(evt) {
    evt.preventDefault();
    modifyCard(inputCardName.value, inputCardUrl.value);
    hidePopup();
}

btnProfileEdit.addEventListener('click', function () {
    showPopup(setPopupProfile);
    inputProfileName.value = setProfileName.textContent;
    inputProfileDesc.value = setProfileDesc.textContent;
    formProfile.addEventListener('submit', savePopup);
});

btnAddCard.addEventListener('click', function () {
    inputCardName.value = '';
    inputCardUrl.value = '';
    showPopup(setPopupCard);
    formCard.addEventListener('submit', addCardPopup);
});