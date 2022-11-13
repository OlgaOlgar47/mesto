const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_profession');


function formSubmitHandler (evt) {
    evt.preventDefault()

    
    let profileNameElement = document.querySelector('.profile__name');
    let profileProfessionElement = document.querySelector('.profile__profession');
    
  profileNameElement.textContent = nameInput.value;
  profileProfessionElement.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);