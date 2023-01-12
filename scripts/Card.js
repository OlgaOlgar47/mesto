export class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.elements__image');
    this._elementName = this._element.querySelector('.elements__text');
    

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;

    this._setEventListeners();

    return this._element;

  }

  _setEventListeners() {
    //слушатель клика на картинку
    this._elementImage.addEventListener('click', () => {
    this._handleOpenPopup(this._name,this._link);
    });
    //удаление картинки
    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._element.remove();
    });
    //лайк
    this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like-button_active');
    });

  }
}



