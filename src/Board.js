//@flow
import * as React from "react";
import "./Board.css";
import AddColumnForm from "./AddColumnForm";
import AddCardForm from "./AddCardForm";

State: type State = {
  boardColumn: any,
  colunmTitle: string,
  id: string
};
class Board extends React.Component<State> {
  state = {
    boardColumn: [
      {
        colunmTitle: "Backlog",
        id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
        card: []
      },
      {
        colunmTitle: "In Dev",
        id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
        card: []
      },
      {
        colunmTitle: "Done",
        id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
        card: []
      }
    ]
  };

  addColumn = colunmTitle => {
    this.setState(prevState => ({
      boardColumn: prevState.boardColumn.concat({
        colunmTitle,
        id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
        card: []
      })
    }));
  };
  removeColumn = id => {
    this.setState(prevState => ({
      boardColumn: prevState.boardColumn.filter(item => item.id !== id)
    }));
  };

  addCard = (cardTitle, cardDescription, id) => {
    const cardId = {
      cardTitle,
      cardDescription,
      id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
    };
    this.state.boardColumn.map((item, index) => {
      // console.log("item", item);
      // console.log("index", index);
      if (item.id === id) {
        this.setState(prevState =>
          prevState.boardColumn[index].card.push(cardId)
        );
      }
    });
  };
  removeCard = (columnId, cardId) => {
    console.log(columnId);

    this.state.boardColumn.map((item, index) => {
      if (item.id === columnId) {
        this.setState(prevState => {
          // console.log('prevState.boardColumn[index].card.filter(el=>)',prevState.boardColumn[index].card.filter(el=>));
          // prevState.boardColumn[index].card.filter(el =>
          //   console.log(el.id !== cardId)
          // );
          prevState.boardColumn[index].card.filter(el => el.id !== cardId);
        });
      }
    });
  };

  // addTaskCard(taskText, listNumber) {
  //   console.log("taskText", taskText);
  //   console.log("listNumber", listNumber);

  //   const newTask = {
  //     taskText,
  //     listNumber,
  //     timeId: new Date().valueOf()
  //   };

  //   //sync state and localStorage
  //   this.setState({
  //     lists: parsedLS
  //   });
  // }

  render() {
    console.log("STATE", this.state);

    const boardColumn = this.state.boardColumn.map(list => (
      <li className={`boardColumn-wrapper ${list.id}`} key={list.id}>
        {list.colunmTitle}
        <span
          href="#"
          className="close"
          onClick={() => this.removeColumn(list.id)}
        ></span>
        <ul className="card-list">
          {list.card.map(el => (
            <li className="card" key={el.id}>
              <p>Title: {el.cardTitle}</p>
              <p>Description: {el.cardDescription}</p>

              <span
                href="#"
                className="remove-card"
                onClick={() => this.removeCard(list.id, el.id)}
              ></span>
            </li>
          ))}
        </ul>
        <AddCardForm
          onAdd={(cardTitle, cardDescription, id) =>
            this.addCard(cardTitle, cardDescription, id)
          }
          id={list.id}
        />
      </li>
    ));

    return (
      <div className="board">
        <AddColumnForm
          onAdd={(colunmTitle, id) => this.addColumn(colunmTitle, id)}
        />
        <ul className="boardColumn">{boardColumn}</ul>
      </div>
    );
  }
}

export default Board;
