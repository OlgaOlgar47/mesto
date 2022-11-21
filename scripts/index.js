const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_profession');

const profileNameElement = document.querySelector('.profile__name');
const profileProfessionElement = document.querySelector('.profile__profession');

const openPopup = function() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileProfessionElement.textContent;
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