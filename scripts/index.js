const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_profession');

const profileNameElement = document.querySelector('.profile__name');
const profileProfessionElement = document.querySelector('.profile__profession');

const initialCards = [
  {
    name: 'Atlantic clouds',
    link: './images/Atlantic_clouds.jpeg'
  },
  {
    name: 'Cloudy storm',
    link: './images/Cloudy_storm.jpeg'
  },
  {
    name: 'Cloudy drops',
    link: './images/Cloudy_drops.jpeg'
  },
  {
    name: 'Mediterranian clouds',
    link: './images/Mediterranian_clouds.jpeg'
  },
  {
    name: 'Un poco clouds',
    link: './images/Un_poco_clouds.jpeg'
  },
  {
    name: 'Clouds rosados',
    link: './images/Clouds_rosados.jpeg'
  }
];

const cardTemplate = document.querySelector("#card-template").content.querySelector('.elements__item');
const elementsListElement = document.querySelector('.elements__list');



function createElement(item) {
  
  const card = cardTemplate.cloneNode(true); 
  const cardText = card.querySelector('.elements__text');
  const cardImage = card.querySelector('.elements__image');
  cardImage.src = item.link;
  cardText.textContent = item.name; 
  console.log(cardText);

  return card;
  


}

initialCards.forEach(function(item) {
    const element = createElement(item);
    elementsListElement.append(element);
})

const form = document.querySelector('.popup__content');
 


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