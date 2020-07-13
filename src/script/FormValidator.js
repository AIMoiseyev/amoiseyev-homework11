"use strict";
export class FormValidator {
  constructor(container) {
    this.container = container;
  }

  checkInputValidity = (input) => {
    if (input.tagName !== "INPUT") {
      return true;
    }

    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity("Это обязательное поле");
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity("Должно быть от 2 до 30 символов");
      return false;
    }

    if (input.validity.typeMismatch && input.type === "url") {
      input.setCustomValidity("Здесь должна быть ссылка");
      return false;
    }

    return input.checkValidity();
  };

  checkCustomValidity = (input) => {
    const error = input.nextElementSibling;
    const correct = this.checkInputValidity(input);
    error.textContent = input.validationMessage;
    return correct;
  };

  setSubmitButtonState = (button, state) => {
    if (state) {
      button.removeAttribute("disabled");
      button.classList.add("popup__button_active");
      button.classList.remove("popup__button_disabled");
    } else {
      button.setAttribute("disabled", "");
      button.classList.add("popup__button_disabled");
      button.classList.remove("popup__button_active");
    }
  };

  setEventListeners = (event) => {
    this.container.addEventListener("input", this.checkValidation);
  };

  checkValidation = (event) => {
    event.preventDefault();

    const submit = this.container.querySelector(".button");
    const inputs = Array.from(this.container.elements);

    this.checkCustomValidity(event.target);

    if (inputs.every(this.checkInputValidity)) {
      this.setSubmitButtonState(submit, true);
    } else {
      this.setSubmitButtonState(submit, false);
    }
  };
}
