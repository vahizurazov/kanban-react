import * as React from "react";
import "./Board.css";
import AddColumnForm from "./AddColumnForm";
import AddCardForm from "./AddCardForm";

type State = {
  boardColumn: Object
};

class Board extends React.Component<State> {
  constructor(props) {
    super(props);

    this.state = {
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
  }
  addColumn = colunmTitle => {
    this.setState(prevState => ({
      boardColumn: prevState.boardColumn.concat({
        colunmTitle,
        id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
      })
    }));
  };
  removeColumn = id => {
    this.setState(prevState => ({
      boardColumn: prevState.boardColumn.filter(item => item.id !== id)
    }));
  };

  addCard = (cardTitle, cardDescription, id) => {
    console.log("cardTitle", cardTitle);
    console.log("cardDescription", cardDescription);
    console.log("id", id);

    const cardId = {
      cardTitle,
      cardDescription
    };

    this.setState({
      card: cardId
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
        {/* <button onClick={() => this.addColumn()}>Add column</button> */}
        <AddColumnForm
          onAdd={(colunmTitle, id) => this.addColumn(colunmTitle, id)}
        />
        <ul className="boardColumn">{boardColumn}</ul>
      </div>
    );
  }
}

export default Board;
