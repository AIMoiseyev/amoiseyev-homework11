"use strict";
export class Popup {
  constructor(container, onClose) {
    this.container = container;
    this.onClose = onClose;
  }

  setEventListeners = (event) => {
    this.container
      .querySelector(".popup__close")
      .addEventListener("click", this.closeClickHandler);
    this.container
      .closest("body")
      .addEventListener("keyup", this.closeClickHandlerByKey);
  };

  destroyEventListeners = () => {
    this.container
      .closest("body")
      .removeEventListener("keyup", this.closeClickHandlerByKey);
    this.container
      .querySelector(".popup__close")
      .removeEventListener("click", this.closeClickHandler);
  };

  closeClickHandler = () => {
    if (this.onClose) {
      this.onClose();
    }
    this.close();
    this.destroyEventListeners();
  };

  closeClickHandlerByKey = (event) => {
    if (event.code === "Escape") {
      this.closeClickHandler();
    }
  };

  open = () => {
    this.container.classList.add("popup_is-opened");
    this.setEventListeners(event)
  };

  close = () => {
    this.container.classList.remove("popup_is-opened");
    this.destroyEventListeners()
  };
}
