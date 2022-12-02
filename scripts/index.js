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
const formEdit = document.querySelector('.popup__content_type_edit');
const formAdd = document.querySelector('.popup__content_type_add');

const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_profession');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const inputCardName = formAdd.querySelector('.popup__input_type_card-name');
const inputCardLink = formAdd.querySelector('.popup__input_type_card-link');


const cardTemplate = document.querySelector("#card-template").content.querySelector('.elements__item');
const elementsListElement = document.querySelector('.elements__list');



function createElement(item) {
  
  const card = cardTemplate.cloneNode(true); 
  const cardText = card.querySelector('.elements__text');
  const cardImage = card.querySelector('.elements__image');
 
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardText.textContent = item.name; 

  card.querySelector('.elements__trash').addEventListener('click', function() {
    card.remove();
  });

  card.querySelector('.elements__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });

  cardImage.addEventListener('click', function(data) {
    bigImage.src = cardImage.src;
    bigImage.alt = item.name;
    bigImageCaption.textContent = item.name;
    openPopup(popupViewImage);
  });
 
  return card;
}

initialCards.forEach(function(item) {
  const element = createElement(item);
  elementsListElement.append(element);
})


const openPopup = function(item) {
  item.classList.add('popup_opened');
}

const openPopupEdit = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupEdit);
}

const openPopupAdd = function() {
  openPopup(popupAdd);
}

const closePopup = function(item) {
  item.classList.remove('popup_opened');
  console.log('close');
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


function formEditSubmitHandler (evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  closePopupEdit();
}


function formAddSubmitHandler (evt) {
  evt.preventDefault()

  const newCard = {
    name: inputCardName.value,
    link: inputCardLink.value
  }

  const element = createElement(newCard);
  elementsListElement.prepend(element);
  
  
  closePopupAdd();
  formAdd.reset();
}

popupEditOpenButton.addEventListener('click', openPopupEdit);
popupAddOpenButton.addEventListener('click', openPopupAdd);
popupEditCloseButton.addEventListener('click', closePopupEdit);
popupAddCloseButton.addEventListener('click', closePopupAdd);
popupViewImageCloseButton.addEventListener('click', closePopupViewImage);

formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);