export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    
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
    this._buttonLike =  this._element.querySelector('.elements__like-button');
    this._buttonDelete = this._element.querySelector('.elements__trash');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _likeCard = () => {
    this._buttonLike.classList.toggle('elements__like-button_active');
  }


  _setEventListeners() {
    //слушатель клика на картинку
    this._elementImage.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
    });
    //удаление картинки
    this._buttonDelete.addEventListener('click', this._deleteCard);
    //лайк
    this._buttonLike.addEventListener('click', this._likeCard)

  }
}