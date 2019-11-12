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
        card: [
          {
            cardDescription:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            cardTitle: "First card",
            id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
              36
            )
          },
          {
            cardDescription:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            cardTitle: "Second card",
            id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
              36
            )
          },
          {
            cardDescription:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            cardTitle: "Third card",
            id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
              36
            )
          }
        ]
      },
      {
        colunmTitle: "In Dev",
        id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
        card: [
          {
            cardDescription:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            cardTitle: "First card in DEV",
            id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
              36
            )
          },
          {
            cardDescription:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            cardTitle: "Second card in DEV",
            id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
              36
            )
          }
        ]
      },
      {
        colunmTitle: "Done",
        id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
        card: [
          {
            cardDescription:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            cardTitle: "First card DONE",
            id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
              36
            )
          },
          {
            cardDescription:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            cardTitle: "Second card DONE",
            id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
              36
            )
          },
          {
            cardDescription:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            cardTitle: "Third card DONE",
            id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
              36
            )
          }
        ]
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
      if (item.id === id) {
        this.setState(prevState =>
          prevState.boardColumn[index].card.push(cardId)
        );
      }
    });
  };
  removeCard = (columnId, cardId) => {
    this.setState({});
    this.state.boardColumn.map((item, index) => {
      if (item.id === columnId) {
        this.setState(prevState => {
          prevState.boardColumn[index].card.map((el, ind) => {
            if (el.id === cardId) {
              prevState.boardColumn[index].card.splice(ind, 1);
            }
          });
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
        <h4>{list.colunmTitle}</h4>
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
