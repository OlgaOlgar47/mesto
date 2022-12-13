const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    error.textContent = "";
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  };
};


const toggleButtonState = (inputs, button, config) => {
 const isFormValid = inputs.every((input) => input.validity.valid);

      if (isFormValid) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
      } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
      };
}


const enableValidation = (config) => {
  const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, ...restConfig} = config;
  const forms = [...document.querySelectorAll(config.formSelector)];

  forms.forEach((form) => {
  const inputs = [...form.querySelectorAll(inputSelector)];
  const button = form.querySelector(submitButtonSelector);

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      button.classList.add(inactiveButtonClass);
      button.disabled = true;
    });

      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          checkInputValidity(input, restConfig);
          toggleButtonState(inputs, button, config);

      });
  });
});
}

//функция которая будет сбрасывать ошибки с текущей формы, 
//чтобы при закрытии невалидной формы ошибки не оставались красными
const resetInputErrors = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];
      forms.forEach((form) => {
      const inputs = [...form.querySelectorAll(config.inputSelector)];
        inputs.forEach((input) => {
          checkInputValidity(input, config);
        });
});
}


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
} 

enableValidation(config);