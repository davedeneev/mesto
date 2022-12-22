const setPopup = document.querySelector('.popup');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnExitProfile = document.querySelector('.popup__exit-btn');
const formProfile = document.querySelector('.popup__form');
const setName = document.querySelector('.profile__name');
const setDesc = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDesc = document.querySelector('.popup__input_type_desc');

function showProfilePopup() {
    inputName.value = setName.textContent;
    inputDesc.value = setDesc.textContent;
    setPopup.classList.toggle('popup_opened');
}

function saveProfilePopup(evt) {
    evt.preventDefault();
    setName.textContent = inputName.value;
    setDesc.textContent = inputDesc.value;
    setPopup.classList.remove('popup_opened');
}

btnProfileEdit.addEventListener('click', showProfilePopup);
btnExitProfile.addEventListener('click', showProfilePopup);
formProfile.addEventListener('submit', saveProfilePopup);