export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputs = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError = (error, input) => {
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError = (error, input) => {
    error.textContent = "";
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _disableButton = () => {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton = () => {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState = () => {
    const isFormValid = this._inputs.every((input) => input.validity.valid);
 
    if (isFormValid) {
      this._enableButton();
    } else {
      this._disableButton();
    };
   }

  _checkInputValidity = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);

    if (input.validity.valid) {
      this._hideInputError(error, input);
    } else {
      this._showInputError(error, input);
    };
  }
  

  enableValidation = () => {
    const forms = [...document.querySelectorAll(this._formSelector)];
    forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._disableButton();
      });
        this._inputs.forEach((input) => {
          input.addEventListener("input", () => {
            this._checkInputValidity(input);
            this._toggleButtonState();
          });
        });
    });
  }

//?????????????? ?????????????? ?????????? ???????????????????? ???????????? ?? ?????????????? ??????????, 
//?????????? ?????????? ???????????????? ???????????????????? ?????????? ???????? ???? ???????????????????? ????????????????
  resetInputErrors = () => { 
    this._inputs.forEach((input) => {
      const error = this._formElement.querySelector(`#${input.id}-error`);
      this._hideInputError(error, input);
    });
  }
}