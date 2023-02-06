import {
  config,
  templateSelector,
  containerSelector,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "./index.css";

const popupEditOpenButton = document.querySelector(".profile__edit-button");
const popupAddOpenButton = document.querySelector(".profile__add-button");

const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add");

const api = new Api({
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "14108236-2953-4b21-88a6-cac7407c6c52",
    "Content-Type": "application/json",
  },
});

const validationEditForm = new FormValidator(config, formEdit);
validationEditForm.enableValidation();

const validationAddForm = new FormValidator(config, formAdd);
validationAddForm.enableValidation();

const popupWithImage = new PopupWithImage(".popup_type_view-image");
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__profession",
  avatar: ".profile__avatar",
});
//const popupConfirm = new PopupWithForm('.popup_type_confirm', handleDeleteClick);

const createCard = (data) => {
  const card = new Card(
    data,
    { userId: userInfo.id },
    templateSelector,
    handleCardClick,
    {
      handleDeleteClick: () => {
        const popupConfirm = new PopupWithForm(".popup_type_confirm", {
          handleConfirm: (id) => {
            api.deleteCard(id).then((res) => {
              //console.log(id);
              card.removeCard();
            });
          },
        });
        popupConfirm.open();
      },
    },
    {
      handleLikeClick: (id) => {
        if (card.checkIfIsLikedByMe()) {
          api.deleteCard(id).then((res) => {
            console.log("уже есть лайк");
            card.setLikes(res.likes);
          });
        } else {
          api.likeCard(id).then((res) => {
            console.log(res);
            card.setLikes(res.likes);
          });
        }
      },
    }
  );

  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.setItem(cardElement);
    },
  },
  containerSelector
);

Promise.all([api.getUserData(), api.getInitialCards()]).then(
  ([userData, initialCards]) => {
    console.log([userData, initialCards]);
    userInfo.id = userData._id;
    console.log(userInfo.id);
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  }
);

// api.getInitialCards()
//   .then(res => {
//     //console.log(res);
//     cardList.renderItems(res);
//   })

// api.getUserInfo()
//   .then(res => {
//     userInfo.setUserInfo(res);
//   })

const handleEditSubmitForm = (values) => {
  api.editUserData(values).then((res) => {
    console.log(res);
    userInfo.setUserInfo(res);
  });
  popupEdit.close();
};

const popupEdit = new PopupWithForm(".popup_type_edit", handleEditSubmitForm);
popupEdit.setEventListeners();

popupEditOpenButton.addEventListener("click", () => {
  //при повторном открытии после сохранения кнопка будет активна
  validationEditForm.enableButton();
  //для предотвращения вывода ошибки при повторном открытии, после закрытия невалидной формы
  validationEditForm.resetInputErrors(formEdit);
  //забираем данные со страницы
  const userData = userInfo.getUserInfo();
  //подставляем данные в форму при открытии
  popupEdit.setInputValues(userData);
  popupEdit.open();
});

const handleAddSumbitForm = (values) => {
  popupAdd.setButtonText("Сохраниение...");
  api
    .createCard(values)
    .then((res) => {
      console.log(res);
      const cardElement = createCard(res);
      cardList.setItem(cardElement);
    })
    .finally(() => {
      popupAdd.setButtonText("Создать");
    });

  popupAdd.close();
};

const popupAdd = new PopupWithForm(".popup_type_add", handleAddSumbitForm);
popupAdd.setEventListeners();

popupAddOpenButton.addEventListener("click", () => {
  validationAddForm.disableButton();
  popupAdd.open();
});
