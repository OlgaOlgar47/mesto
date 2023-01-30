import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); 
    this._bigImage = this._popupElement.querySelector('.popup__image');
    this._bigImageText = this._popupElement.querySelector('.popup__image-text');
  }

  open(name, link) {
    this._bigImage.src = link;
    this._bigImage.alt = name;
    this._bigImageText.textContent = name;
    super.open();
  }
}