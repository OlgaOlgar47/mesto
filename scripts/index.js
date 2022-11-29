const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add');
const popupViewElement = document.querySelector('.popup_type_view-image');
const bigImageElement = document.querySelector('.popup__image');
const bigImageCaption = document.querySelector('.popup__image-text');

const popupCloseButtonElement = document.querySelector('.popup__close_type_edit');
const popupCloseAddButtonElement = popupAddElement.querySelector('.popup__close_type_add');
const popupCloseViewButtonElement = popupViewElement.querySelector('.popup__close_type_view-image');
const popupOpenEditButtonElement = document.querySelector('.profile__edit-button');
const popupOpenAddButtonElement = document.querySelector('.profile__add-button');
const formEditElement = document.querySelector('.popup__content_type_edit');
const formAddElement = document.querySelector('.popup__content_type_add');

const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_profession');

const profileNameElement = document.querySelector('.profile__name');
const profileProfessionElement = document.querySelector('.profile__profession');

const inputCardName = formAddElement.querySelector('.popup__input_type_card-name');
const inputCardLink = formAddElement.querySelector('.popup__input_type_card-link');


const cardTemplate = document.querySelector("#card-template").content.querySelector('.elements__item');
const elementsListElement = document.querySelector('.elements__list');



function createElement(item) {
  
  const card = cardTemplate.cloneNode(true); 
  const cardText = card.querySelector('.elements__text');
  const cardImage = card.querySelector('.elements__image');
 
  cardImage.src = item.link;
  cardText.textContent = item.name; 

  card.querySelector('.elements__trash').addEventListener('click', function(evt) {

    evt.target.parentNode.remove();
    console.log('work');
  })

  card.querySelector('.elements__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like-button_active');
    console.log('work!');
  })

  // const viewImageHandler = function(item) {
  //   ImageElement.src = cardImage.src;
  //   ImageCaption.textContent = item.name;
  //   openPopup(popupViewElement); 
  // }
  // cardImage.addEventListener('click', viewImageHandler);

  cardImage.addEventListener('click', function(data) {
    bigImageElement.src = cardImage.src;
    bigImageCaption.textContent = item.name;
    openPopup(popupViewElement);
  })
 
  return card;
}

initialCards.forEach(function(item) {
    const element = createElement(item);
    elementsListElement.append(element);
})


const openPopup = function(item) {
  item.classList.add('popup_opened');
}

const openEditPopup = function() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileProfessionElement.textContent;
  openPopup(popupEditElement);
}

const openAddPopup = function() {
  openPopup(popupAddElement);
}

const closePopup = function(item) {
    item.classList.remove('popup_opened');
    console.log('close');
}

const closeEditPopup = function() {
  closePopup(popupEditElement);
}

const closeAddPopup = function() {
  closePopup(popupAddElement);
}

const closeViewPopup = function() {
  closePopup(popupViewElement);
}


function formEditSubmitHandler (evt) {
    evt.preventDefault()
  profileNameElement.textContent = nameInput.value;
  profileProfessionElement.textContent = jobInput.value;

  closeEditPopup();
}


function formAddSubmitHandler (evt) {
  evt.preventDefault()

 const newCard = {

   name: inputCardName.value,
   link: inputCardLink.value
 }

 console.log(newCard);

 const element = createElement(newCard);
 elementsListElement.prepend(element);
  closeAddPopup();
}

popupOpenEditButtonElement.addEventListener('click', openEditPopup);
popupOpenAddButtonElement.addEventListener('click', openAddPopup);
popupCloseButtonElement.addEventListener('click', closeEditPopup);
popupCloseAddButtonElement.addEventListener('click', closeAddPopup);
popupCloseViewButtonElement.addEventListener('click', closeViewPopup);

formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddElement.addEventListener('submit', formAddSubmitHandler);