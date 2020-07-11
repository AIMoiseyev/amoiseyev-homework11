"use strict";
class Card {
  constructor(cardsArray, increaseImage, api) {
    this.cardsArray = cardsArray;
    this.image = this.cardsArray.link;
    this.name = this.cardsArray.name;
    this.increaseImage = increaseImage;
    this.id = this.cardsArray._id;
    this.likes = this.cardsArray.likes;
    this.owner = this.cardsArray.owner._id;
    this.api = api;
  }

  create() {
    const card = document.createElement("div");
    const cardImage = document.createElement("div");
    const cardButtonDelete = document.createElement("button");
    const cardDescription = document.createElement("div");
    const cardName = document.createElement("h3");
    const likeContainer = document.createElement("div");
    const likeCounter = document.createElement("span");
    const cardButtonLike = document.createElement("button");

    card.classList.add("place-card");
    card.setAttribute("id", this.id);
    cardImage.classList.add("place-card__image");
    cardImage.style.backgroundImage = `url(${this.image})`;
    cardImage.style.cursor = "pointer";
    cardButtonDelete.classList.add("place-card__delete-icon");
    if (this.owner !== "4b286c9d349ccf6c5fec0201") {
      cardButtonDelete.style.display = "none";
    }
    cardDescription.classList.add("place-card__description");
    cardName.classList.add("place-card__name");
    cardName.textContent = this.name;
    likeContainer.classList.add("place-card__like-container");
    likeCounter.classList.add("place-card__like-counter");
    likeCounter.textContent = this.likes.length;
    cardButtonLike.classList.add("place-card__like-icon");
    this.likes.forEach((like) => {

      if (like._id == "4b286c9d349ccf6c5fec0201") {
        cardButtonLike.classList.add("place-card__like-icon_liked");
      }
    });

    cardImage.appendChild(cardButtonDelete);
    likeContainer.appendChild(cardButtonLike);
    likeContainer.appendChild(likeCounter);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeContainer);
    card.appendChild(cardImage);
    card.appendChild(cardDescription);

    this.cardElement = card;
    this.cardImage = cardImage;
    this.likeCounter = likeCounter;
    this.cardButtonLike = cardButtonLike;
    this.setEventListeners();
    return card;
  }

  setEventListeners(event) {

    this.cardElement
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.likeHandler);
    this.cardElement
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);

    this.cardImage.addEventListener("click", this.increaseImage);
  }

  addLike = (event) => {
    this.api
      .addLike(this.id)
      .then((res) => {
        event.target.classList.add("place-card__like-icon_liked");
        this.likeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  };

  removeLike = (event) => {
    this.api
      .removeLike(this.id)
      .then((res) => {
        event.target.classList.remove("place-card__like-icon_liked");
        this.likeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  };

  likeHandler = (event) => {
    if (event.target.classList.contains("place-card__like-icon_liked")) {
      this.removeLike(event);
    } else {
      this.addLike(event);
    }
  };

  remove = () => {
    if(window.confirm("Вы действительно хотите цдалить эту карточку?")) {
      this.api
      .deleteCard(this.id)
      .then(() => {
        this.cardElement.remove();
      })
      .catch((err) => console.log(err));
  }; // лишняя ;
    }
    
}
