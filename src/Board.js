//@flow
import * as React from "react";
import "./Board.css";
import AddColumnForm from "./AddColumnForm";
import AddCardForm from "./AddCardForm";
import Dragula from "react-dragula";

import { subscribeToTimer } from "./api";

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
    ],
    timestamp: "no timestamp yet"
  };

  subscribeToTimer = (err, timestamp) =>
    this.setState({
      timestamp
    });

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
    this.dragulaDecorator();
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

  dragulaDecorator = () => {
    let options = {
      copy: false,
      copySortSource: false,
      direction: "horizontal",
      isContainer: function(el) {
        // console.log(el);

        return el.classList.contains("boardColumn-wrapper");
      }
      // removeOnSpill: true
    };
    const arr = [];
    this.state.boardColumn.map(item => {
      arr.push(document.querySelector(`#${item.id}`));
    });

    Dragula(arr, options);
  };

  render() {
    console.log("STATE", this.state);

    // const boardColumn = ;

    return (
      <div className="board" id="boardId" ref={this.dragulaDecorator}>
        <AddColumnForm
          onAdd={(colunmTitle, id) => this.addColumn(colunmTitle, id)}
        />
        <div className="boardColumn">
          {this.state.boardColumn.map(list => (
            <div className="wrapper-for-list" key={list.id}>
              <div className="wrap-title">
                <h4>{list.colunmTitle}</h4>
                <span
                  href="#"
                  className="close"
                  onClick={() => this.removeColumn(list.id)}
                ></span>
              </div>

              <div className={`boardColumn-wrapper`} id={`${list.id}`}>
                {list.card.map(el => (
                  <div className="card" key={el.id}>
                    <p>Title: {el.cardTitle}</p>
                    <p>Description: {el.cardDescription}</p>

                    <span
                      href="#"
                      className="remove-card"
                      onClick={() => this.removeCard(list.id, el.id)}
                    ></span>
                  </div>
                ))}
              </div>
              <AddCardForm
                onAdd={(cardTitle, cardDescription, id) =>
                  this.addCard(cardTitle, cardDescription, id)
                }
                id={list.id}
              />
            </div>
          ))}
        </div>

        <div className="time">{this.state.timestamp}</div>
      </div>
    );
  }
}

export default Board;
