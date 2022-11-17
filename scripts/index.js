const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_profession');

let profileNameElement = document.querySelector('.profile__name');
let profileProfessionElement = document.querySelector('.profile__profession');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault()
  profileNameElement.textContent = nameInput.value;
  profileProfessionElement.textContent = jobInput.value;

  closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);