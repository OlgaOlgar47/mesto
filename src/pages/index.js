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
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "./index.css";

const popupEditOpenButton = document.querySelector(".profile__edit-button");
const popupEditAvatarOpenButon = document.querySelector(
  ".profile__editAvatar-button"
);
const popupAddOpenButton = document.querySelector(".profile__add-button");

const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add");
const formEditAvatar = document.querySelector(".popup__form_type_edit-avatar");

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

const validatiomEditAvatarForm = new FormValidator(config, formEditAvatar);
validatiomEditAvatarForm.enableValidation();

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

const popupWitnConfirmation = new PopupWithConfirmation(".popup_type_confirm");
popupWitnConfirmation.setEventListeners();

let userId;
const createCard = (data) => {
  const card = new Card(
    data,
    userId,
    templateSelector,
    handleCardClick,
    {
      handleDeleteClick: (id) => {
        popupWitnConfirmation.setSubmitCallback(() => {
          api
            .deleteCard(id)
            .then((res) => {
              card.removeCard();
              popupWitnConfirmation.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
        popupWitnConfirmation.open();
      },
    },
    {
      handleLikeClick: (id) => {
        if (card.isLikedByMe()) {
          api
            .deleteLike(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .likeCard(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
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

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const handleEditSubmitForm = (values) => {
  // меняю текст на кнопке
  popupEdit.setButtonText("Сохранение...");
  // отключаю кнопку на время запроса (чтобы не было возможности отправить еще один)
  validationEditForm.disableButton();
  api
    .editUserData(values)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //разблокирую кнопку, меняю текст обратно
      validationAddForm.enableButton();
      popupAdd.setButtonText("Создать");
    });
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
  validationAddForm.disableButton();
  api
    .createCard(values)
    .then((res) => {
      const cardElement = createCard(res);
      cardList.setItem(cardElement);
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      validationAddForm.enableButton();
      popupAdd.setButtonText("Создать");
    });
};

const popupAdd = new PopupWithForm(".popup_type_add", handleAddSumbitForm);
popupAdd.setEventListeners();

popupAddOpenButton.addEventListener("click", () => {
  validationAddForm.disableButton();
  popupAdd.open();
});

const handleEditAvatarForm = (link) => {
  popupEditAvatar.setButtonText("Сохранение...");
  validatiomEditAvatarForm.disableButton();
  api
    .changeAvatar(link)
    .then((res) => {
      userInfo.changeAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      validatiomEditAvatarForm.enableButton();
      popupEditAvatar.setButtonText("Создать");
    });
};

const popupEditAvatar = new PopupWithForm(
  ".popup_type_updateAvatar",
  handleEditAvatarForm
);
popupEditAvatar.setEventListeners();

popupEditAvatarOpenButon.addEventListener("click", () => {
  validatiomEditAvatarForm.disableButton();
  popupEditAvatar.open();
});
