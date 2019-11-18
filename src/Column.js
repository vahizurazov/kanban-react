import React, { Component } from "react";
import Card from "./Card";
import AddCardForm from "./AddCardForm";

class Column extends Component {
  componentDidMount() {
    // const { column } = this.props;
    // onColumnInit(column, this.columnWrapperEl);
  }
  onAdd(cardTitle, cardDescription, id) {
    this.addCard(cardTitle, cardDescription, id);
  }
  render() {
    const { column } = this.props;

    return (
      <div
        className="wrapper-for-column"
        key={column.id}
        ref={el => (this.columnEl = el)}
      >
        <div className="wrap-title">
          <h4>{column.colunmTitle}</h4>
          <span
            href="#"
            className="close"
            onClick={() => this.removeColumn(column.id)}
          ></span>
        </div>

        <div
          className={`columns-wrapper`}
          id={`${column.id}`}
          ref={el => (this.columnWrapperEl = el)}
        >
          {column.cards.map(card => (
            <Card card={card} key={card.id} />
          ))}
        </div>
        <AddCardForm onAdd={this.onAdd} id={column.id} />
      </div>
    );
  }
}

export default Column;
