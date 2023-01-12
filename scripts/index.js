import { initialCards, config, templateSelector} from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
 
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupViewImage = document.querySelector('.popup_type_view-image');
const bigImage = popupViewImage.querySelector('.popup__image');
const bigImageCaption = popupViewImage.querySelector('.popup__image-text');

const popupEditCloseButton = popupEdit.querySelector('.popup__close_type_edit');
const popupAddCloseButton = popupAdd.querySelector('.popup__close_type_add');
const popupViewImageCloseButton = popupViewImage.querySelector('.popup__close_type_view-image');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');

const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_profession');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const inputCardName = formAdd.querySelector('.popup__input_type_card-name');
const inputCardLink = formAdd.querySelector('.popup__input_type_card-link');

const elementsListElement = document.querySelector('.elements__list');


const validationEditForm = new FormValidator(config, formEdit);
validationEditForm.enableValidation();

const validationAddForm = new FormValidator(config, formAdd);
validationAddForm.enableValidation();

const handleOpenPopup = (name, link) => {
  bigImage.src = link;
  bigImage.alt = name;
  bigImageCaption.textContent = name;
  openPopup(popupViewImage);
};

function renderCard(data) {
  const card = new Card(data, templateSelector, handleOpenPopup);
  const cardElement = card.generateCard();

  return cardElement;
}

initialCards.forEach((data) => {
  elementsListElement.append(renderCard(data));
})

function formAddSubmitHandler (evt) {
  evt.preventDefault()

  const newCard = {
    name: inputCardName.value,
    link: inputCardLink.value
  }

  const element = renderCard(newCard);
  elementsListElement.prepend(element);
  
  
  closePopupAdd();
  formAdd.reset();
}


const handlerKeyUp = (e) => {
  if(e.key === 'Escape') {
    const openModal = document.querySelector('.popup_opened');
    closePopup(openModal);
  };
}

const openPopup = function(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', handlerKeyUp);
  item.addEventListener('click', closePopupByClickOverlay);
}

const openPopupEdit = function() {
  //при повторном открытии после сохранения кнопка будет активна
  const submitButton = formEdit.querySelector('.popup__submit');
  submitButton.classList.remove('popup__submit_inactive');
  submitButton.disabled = false;
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  validationEditForm.resetInputErrors(formEdit);
  openPopup(popupEdit);
}

const openPopupAdd = function() {
  openPopup(popupAdd);
}

const closePopup = function(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keyup', handlerKeyUp);
  item.removeEventListener('click', closePopupByClickOverlay);
}

const closePopupEdit = function() {
  closePopup(popupEdit);
}

const closePopupAdd = function() {
  closePopup(popupAdd);
}

const closePopupViewImage = function() {
  closePopup(popupViewImage);
}

const closePopupByClickOverlay = function(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function formEditSubmitHandler (evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  closePopupEdit();
}




popupEditOpenButton.addEventListener('click', openPopupEdit);
popupAddOpenButton.addEventListener('click', openPopupAdd);
popupEditCloseButton.addEventListener('click', closePopupEdit);
popupAddCloseButton.addEventListener('click', closePopupAdd);
popupViewImageCloseButton.addEventListener('click', closePopupViewImage);


formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);