"use strict";
export class CardList {
  constructor(container, api, addInitialCards) {
    this.container = container;
    this.api = api;
    this.addInitialCards = addInitialCards;
  }

  addCard(card) {
    this.container.appendChild(card);
  }

  render() {
    this.api
      .getInitialCards()
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          this.addCard(this.addInitialCards(data[i]));
        }
      })
      .catch((err) => console.log(err));
  }
}
