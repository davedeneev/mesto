//Класс валидации данных в формах
export default class FormValidator {
    constructor(formSelectors, formElement) {
        this._formElement = formElement;
        this._formSelectors = formSelectors;
        this._buttonElement = this._formElement.querySelector(this._formSelectors.submitButtonSelector);
        this._inputList = Array.from(formElement.querySelectorAll(this._formSelectors.inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._formSelectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._formSelectors.errorClass);
    }

    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._formSelectors.inputErrorClass);
        errorElement.classList.remove(this._formSelectors.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._formSelectors.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._formSelectors.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}