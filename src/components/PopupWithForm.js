import Popup from './Popup';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);

        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputsList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const formValues = {};
        this._inputsList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        this.close();
        return formValues;
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