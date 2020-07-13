"use strict";
import "./pages/index.css";
import { Api } from "./script/Api";
import { Card } from "./script/Card";
import { CardList } from "./script/CardList";
import { FormValidator } from "./script/FormValidator";
import { Popup } from "./script/Popup";
import { UserInfo } from "./script/UserInfo";

(function () {
  //переменные
  const API_URL =
    NODE_ENV === "production" ? "https://praktikum.tk" : "http://praktikum.tk";
  const api = new Api({
    baseUrl: `${API_URL}/cohort11`,
    headers: {
      authorization: "edfcd44f-5530-4ce9-877d-55e05dc9806d",
      "Content-Type": "application/json",
    },
  });
  const newCardForm = document.forms.new;
  const profileForm = document.forms.newProfile;
  const newAvatarForm = document.forms.newAvatar;
  const popupCardForm = document.getElementById("card");
  const popupProfile = document.getElementById("profile");
  const popupAvatar = document.getElementById("avatar");
  const imagePopup = document.getElementById("image");
  const cardContainer = document.querySelector(".places-list");
  const cardsButton = document.querySelector(".user-info__button");
  const profileButton = document.querySelector(".user-info__profile-button");
  const avatarButton = document.querySelector(".user-info__photo");
  const increaseImage = function (event) {
    if (event.target.classList.contains("place-card__image")) {
      const link = event.target.style.backgroundImage.slice(5, -2);
      imagePopup.querySelector(".popup__image").setAttribute("src", link);
      popupImageForm.open();
      popupImageForm.setEventListeners(event);
    }
  };

  const renderLoading = function (popup, isLoading) {
    if (isLoading) {
      popup
        .querySelector(".popup__button-name")
        .classList.add("popup__button-name_hidden");
      popup
        .querySelector(".popup__button-load-name")
        .classList.add("popup__button-load-name_visible");
    } else {
      popup
        .querySelector(".popup__button-load-name")
        .classList.remove("popup__button-load-name_visible");
      popup
        .querySelector(".popup__button-name")
        .classList.remove("popup__button-name_hidden");
    }
  };

  const setClassDisabled = function (popup) {
    const button = popup.querySelector(".popup__button");
    button.classList.add("popup__button_disabled");
    button.setAttribute("disabled", "");
  };

  const removeClassActive = function (popup) {
    const button = popup.querySelector(".popup__button");
    button.setAttribute("disabled", "");
    button.classList.remove("popup__button_active");
  };

  const resetValidation = function (form) {
    const error = form.querySelectorAll(".error");
    error.forEach((item) => (item.textContent = ""));
  };
  const addInitialCards = function (cardsArray) {
    const card = new Card(cardsArray, increaseImage, api);
    return card.create();
  };
  const cardList = new CardList(cardContainer, api, addInitialCards);
  cardList.render();

  const profile = new UserInfo(document.querySelector(".profile"), api);
  profile.setUserInfo();

  const popupCards = new Popup(popupCardForm, () => {
    resetValidation(popupCardForm);
    newCardForm.reset();

    removeClassActive(popupCardForm);
  });

  const popupProfileForm = new Popup(popupProfile, () => {
    resetValidation(popupProfile);
    profileForm.reset();
    removeClassActive(popupProfile);
  });

  const popupAvatarForm = new Popup(popupAvatar, () => {
    resetValidation(popupAvatar);
    newAvatarForm.reset();
    removeClassActive(popupAvatar);
  });

  const popupImageForm = new Popup(imagePopup);
  const form = new FormValidator(profileForm);
  form.setEventListeners(event);

  const formData = new FormValidator(newCardForm);
  formData.setEventListeners();

  const formAvatar = new FormValidator(newAvatarForm);
  formAvatar.setEventListeners();

  function addCards(event) {
    event.preventDefault();

    const name = newCardForm.elements.name.value;
    const link = newCardForm.elements.link.value;

    renderLoading(popupCardForm, true);
    api
      .addCard(name, link)
      .then((data) => {
        const card = new Card(data, increaseImage, api);
        cardList.addCard(card.create());
      })
      .then(() => {
        removeClassActive(popupCardForm);

        newCardForm.reset();
        popupCards.close();
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(popupCardForm, false));
  }

  function changeProfile(event) {
    event.preventDefault();

    const name = profileForm.elements.fullname.value;
    const about = profileForm.elements.information.value;

    renderLoading(popupProfile, true);
    api
      .updateProfile(name, about)
      .then((res) => {
        profile.updateUserInfo(res.name, res.about);
      })
      .then(() => {
        profileForm.reset();
        popupProfileForm.close();
        removeClassActive(popupProfile);
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(popupProfile, false));
  }

  function changeAvatar(event) {
    event.preventDefault();

    const photo = newAvatarForm.elements.link.value;

    renderLoading(popupAvatar, true);
    api
      .updateAvatar(photo)
      .then((res) => {
        profile.updateAvatar(res.avatar);
      })
      .then(() => {
        newAvatarForm.reset();
        removeClassActive(popupAvatar);
        popupAvatarForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(popupAvatar, false));
  }

  function openCardPopup(event) {
    popupCards.open();
    setClassDisabled(popupCardForm);
    newCardForm.reset();
  }

  function openProfilePopup(event) {
    popupProfileForm.open();
    setClassDisabled(popupProfile);

    profileForm.fullname.value = document.querySelector(
      ".user-info__name"
    ).textContent;
    profileForm.information.value = document.querySelector(
      ".user-info__job"
    ).textContent;
  }

  function openAvatarPopup(event) {
    popupAvatarForm.open();
    setClassDisabled(popupAvatar);
    newAvatarForm.reset();
  }
  // слушатели событий
  newCardForm.addEventListener("submit", addCards);
  profileForm.addEventListener("submit", changeProfile);
  newAvatarForm.addEventListener("submit", changeAvatar);
  cardsButton.addEventListener("click", openCardPopup);
  profileButton.addEventListener("click", openProfilePopup);
  avatarButton.addEventListener("click", openAvatarPopup);
})();
