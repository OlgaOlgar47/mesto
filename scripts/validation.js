const showInputError = (error, input, config) => {
  error.textContent = input.validationMessage;
  error.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
}

const hideInputError = (error, input, config) => {
  error.textContent = "";
  error.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
}

const disableButton = (button, config) => {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

const enableButton = (button, config) => {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
}

const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    hideInputError(error, input, config);
  } else {
    showInputError(error, input, config);
  };
};


const toggleButtonState = (inputs, button, config) => {
 const isFormValid = inputs.every((input) => input.validity.valid);

      if (isFormValid) {
        enableButton(button, config);
      } else {
        disableButton(button, config);
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
      disableButton(button, config);
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
//чтобы после закрытия невалидной формы поля не оставались красными
const resetInputErrors = (form, config) => {
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  
  inputs.forEach((input) => {
    const error = document.querySelector(`#${input.id}-error`);
    hideInputError(error, input, config);
  });
}




enableValidation(config);