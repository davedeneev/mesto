import Popup from './Popup';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._img = this._popup.querySelector('.popup__img');
        this._imgDesc = this._popup.querySelector('.popup__desc-img');
    }

    open(data) {
        this._img.src = data.src;
        this._img.alt = data.alt;
        this._imgDesc.textContent = data.alt;
        super.open();
    }
}