import Popup from './Popup';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);

        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputsList = this._form.querySelectorAll('.popup__input');
        this._saveBtn = this._popup.querySelector(".popup__save-btn");
    }

    _getInputValues() {
        const formValues = {};
        this._inputsList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    updateTitleText() {
        if(this._saveBtn.textContent === "Сохранить") {
            this._saveBtn.textContent = "Сохранение...";
        } else if (this._saveBtn.textContent === "Сохранение...") {
            this._saveBtn.textContent = "Сохранить";
        } else if (this._saveBtn.textContent === "Создать") {
            this._saveBtn.textContent = "Создание...";
        } else {
            this._saveBtn.textContent = "Создать";
        }
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }
}