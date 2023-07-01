import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);

        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
    }

    open(card) {
        super.open();
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitForm(this._card);
        });
    }
}