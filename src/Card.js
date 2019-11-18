import React, { Component } from "react";

class Card extends Component {
  render() {
    const { card, column } = this.props;

    return (
      <div className="card" key={card.id} id={card.id}>
        <p>Title: {card.cardTitle}</p>
        <p>Description: {card.cardDescription}</p>

        <span
          href="#"
          className="remove-card"
          onClick={() => this.removeCard(column.id, card.id)}
        ></span>
      </div>
    );
  }
}

export default Card;
