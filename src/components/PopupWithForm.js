import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = [...this._popupForm.querySelectorAll('.popup__input')];   
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }

  _getInputValues() {
  // создаём пустой объект
  this._formValues = {};
  // добавляем в этот объект значения всех полей
  this._inputList.forEach((input) => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;   
  }

  setEventListeners() { 
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      console.log(this._getInputValues());
    });
  }
}