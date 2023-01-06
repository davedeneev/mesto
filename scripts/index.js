const setPopup = document.querySelector('.popup');
const setPopupImg = document.querySelector('.popup_type_img');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnExit = document.querySelectorAll('.popup__exit-btn');
const formProfile = document.querySelector('.popup__form');
const btnAddCard = document.querySelector('.profile__add-btn');
const popupTitle = setPopup.querySelector('.popup__title');
const popupBtnName = setPopup.querySelector('.popup__save-btn');
const setName = document.querySelector('.profile__name');
const setDesc = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDesc = document.querySelector('.popup__input_type_desc');
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
//Меняем "none" на "flex", чтобы при открытии страницы поп-ап не появлялся, а transition работал
setPopup.setAttribute('style', 'display:flex');
setPopupImg.setAttribute('style', 'display:flex');

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

function setPlaceholder(title, name, desc, btn) {
    inputName.value = '';
    inputDesc.value = '';
    popupTitle.textContent = title;
    inputName.setAttribute('placeholder', name);
    inputDesc.setAttribute('placeholder', desc);
    popupBtnName.textContent = btn;
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
    setName.textContent = inputName.value;
    setDesc.textContent = inputDesc.value;
    hidePopup();
}

function addCardPopup(evt) {
    evt.preventDefault();
    modifyCard(inputName.value, inputDesc.value);
    hidePopup();
}

btnProfileEdit.addEventListener('click', function () {
    setPlaceholder('Редактировать профиль', 'Имя', 'О себе', 'Сохранить');
    showPopup(setPopup);
    inputName.value = setName.textContent;
    inputDesc.value = setDesc.textContent;
    formProfile.addEventListener('submit', savePopup);
});

btnAddCard.addEventListener('click', function () {
    setPlaceholder('Новое место', 'Название', 'Ссылка на картинку', 'Создать');
    showPopup(setPopup);
    formProfile.addEventListener('submit', addCardPopup);
});