//открытие и закрытие попапа
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

//событие Submit
// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_profession');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault()// Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileNameElement = document.querySelector('.profile__name');
    let profileProfessionElement = document.querySelector('.profile__profession');// Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    
  profileNameElement.textContent = nameInput.value;
  profileProfessionElement.textContent = jobInput.value;

  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
console.log('сработало');
