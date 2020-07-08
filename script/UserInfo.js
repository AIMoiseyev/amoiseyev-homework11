"use strict";
class UserInfo {
  constructor(container, api) {
    this.container = container;
    this.api = api;
  }

  setUserInfo = () => {
    this.api
      .getProfile()
      .then((data) => {
        this.container.querySelector(".user-info__name").textContent =
          data.name;
        this.container.querySelector(".user-info__job").textContent =
          data.about;
        this.container.querySelector(
          ".user-info__photo"
        ).style.backgroundImage = `url(${data.avatar})`;
      })
      .catch((err) => console.log(err));
  };

  updateUserInfo = (name, about) => {
    this.container.querySelector(".user-info__name").textContent = name;
    this.container.querySelector(".user-info__job").textContent = about;
  };

  updateAvatar = (link) => {
    this.container.querySelector(
      ".user-info__photo"
    ).style.backgroundImage = `url(${link})`;
  };
}
