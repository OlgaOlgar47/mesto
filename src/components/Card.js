export class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleCardClick,
    { handleDeleteClick },
    { handleLikeClick }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  _removeDeleteButton = () => {
    if (this._ownerId === this._userId.userId) {
      this._buttonDelete.style.visibility = "visible";
    } else {
      this._buttonDelete.style.visibility = "hidden";
    }
  };

  setLikes(likes) {
    console.log("setlikes");
    this._likes = likes;
    this._numberOfLikes.textContent = this._likes.length;
    this._buttonLike.classList.toggle("elements__like-button_active");
  }

  checkIfIsLikedByMe = () => {
    const isLikedByMe = this._likes.some((like) => like._id === this._userId);
    return isLikedByMe;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".elements__image");
    this._elementName = this._element.querySelector(".elements__text");
    this._buttonLike = this._element.querySelector(".elements__like-button");
    this._numberOfLikes = this._element.querySelector(
      ".elements__number-of-likes"
    );
    this._buttonDelete = this._element.querySelector(".elements__trash");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._numberOfLikes.textContent = this._likes.length;

    //console.log(this._ownerId)
    //console.log(this._userId)
    this._removeDeleteButton();
    // this._checkIfIsLikedByMe();
    this._setEventListeners();
    return this._element;
  }

  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    //слушатель клика на картинку
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    //удаление картинки
    this._buttonDelete.addEventListener("click", () =>
      this._handleDeleteClick(this._id)
    );
    //лайк
    this._buttonLike.addEventListener("click", () =>
      this._handleLikeClick(this._id, this._likes)
    );
  }
}
