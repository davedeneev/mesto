const setPopup = document.querySelector('.popup');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnExitProfile = document.querySelector('.popup__profile-exit-btn');
const btnSaveProfile = document.querySelector('.popup__profile-form');
const setName = document.querySelector('.profile__name');
const setDesc = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__profile-name');
const inputDesc = document.querySelector('.popup__profile-desc');
const btnLike = document.querySelectorAll('.place-card__like-btn');

btnProfileEdit.addEventListener('click', function () {
    inputName.value = setName.textContent;
    inputDesc.value = setDesc.textContent;
    setPopup.classList.add('popup_opened');
});

btnExitProfile.addEventListener('click', function () {
    setPopup.classList.remove('popup_opened');
});

btnSaveProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    setName.textContent = inputName.value;
    setDesc.textContent = inputDesc.value;
    setPopup.classList.remove('popup_opened');
});

for (let i = 0; i < btnLike.length; i++) {
    btnLike[i].addEventListener('click', function () {
        if (btnLike[i].className === 'place-card__like-btn') {
            btnLike[i].classList.replace('place-card__like-btn', 'place-card__like-btn_active')
        } else {
            btnLike[i].classList.replace('place-card__like-btn_active', 'place-card__like-btn')
        }
    });
}