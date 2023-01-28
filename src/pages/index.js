import { initialCards, config, templateSelector, containerSelector} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js'; 
import { UserInfo } from '../components/UserInfo.js';

import './index.css';



const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddOpenButton = document.querySelector('.profile__add-button');

const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');

const inputCardName = formAdd.querySelector('.popup__input_type_card-name');
const inputCardLink = formAdd.querySelector('.popup__input_type_card-link');


const validationEditForm = new FormValidator(config, formEdit);
validationEditForm.enableValidation();

const validationAddForm = new FormValidator(config, formAdd);
validationAddForm.enableValidation();

const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage('.popup_type_view-image');
  popupWithImage.open(name, link);
  popupWithImage.setEventListeners();
}

const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, templateSelector, handleCardClick);
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
  }
}, containerSelector)

cardList.renderItems();

const userInfo = new UserInfo ({name: '.profile__name', about: '.profile__profession'});

const handlerEditSubmitForm = (data) => {
  userInfo.setUserInfo(data);
  popupEdit.close();
}

const popupEdit = new PopupWithForm('.popup_type_edit', handlerEditSubmitForm);
popupEdit.setEventListeners();

popupEditOpenButton.addEventListener('click', () => {
  //при повторном открытии после сохранения кнопка будет активна
  validationEditForm.enableButton();
  //для предотвращения вывода ошибки при повторном открытии, после закрытия невалидной формы
  validationEditForm.resetInputErrors(formEdit);
  //забираем данные со страницы
  const userData = userInfo.getUserInfo();
  //подставляем данные в форму при открытии
  popupEdit.setInputValues(userData);
  popupEdit.open();
})

const handlerAddSumbitForm = () => {
  //собираем данные с инпутов
  const newCardData = {
    name: inputCardName.value,
    link: inputCardLink.value
  }
  //создаем карточку с новыми данными и размещаем ее в Секции
  const newCard = new Card(newCardData, templateSelector, handleCardClick);
  const newCardElement = newCard.generateCard();
  cardList.setItem(newCardElement);

  popupAdd.close();
}

const popupAdd = new PopupWithForm('.popup_type_add', handlerAddSumbitForm);
popupAdd.setEventListeners();

popupAddOpenButton.addEventListener('click', () => {
  popupAdd.open();
})