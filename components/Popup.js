export class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscCLose = this._handleEscCLose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscCLose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscCLose);
  }

  _handleEscCLose(evt) {
    if  (evt.key === 'Escape') {
     this.close();
    }
  }

  setEventListeners() {
    
    this._popupElement.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
      });
    this._popupElement.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
      this.close();
      }
    })  
  }
}