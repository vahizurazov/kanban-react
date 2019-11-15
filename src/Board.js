//@flow
import * as React from "react";
import "./Board.css";
import AddColumnForm from "./AddColumnForm";
import AddCardForm from "./AddCardForm";
import Dragula from "react-dragula";
import io from "socket.io-client";
// import { subscribeToTimer } from './server/api';

// State: type State = {
//   boardColumn: any,
//   colunmTitle: string,
//   id: string
// };
class Board extends React.Component<State> {
  state = {
    // boardColumn: [
    //   {
    //     colunmTitle: "Backlog",
    //     id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
    //     card: [
    //       {
    //         cardDescription:
    //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         cardTitle: "First card",
    //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
    //           36
    //         )
    //       },
    //       {
    //         cardDescription:
    //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         cardTitle: "Second card",
    //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
    //           36
    //         )
    //       },
    //       {
    //         cardDescription:
    //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         cardTitle: "Third card",
    //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
    //           36
    //         )
    //       }
    //     ]
    //   },
    //   {
    //     colunmTitle: "In Dev",
    //     id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
    //     card: [
    //       {
    //         cardDescription:
    //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         cardTitle: "First card in DEV",
    //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
    //           36
    //         )
    //       },
    //       {
    //         cardDescription:
    //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         cardTitle: "Second card in DEV",
    //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
    //           36
    //         )
    //       }
    //     ]
    //   },
    //   {
    //     colunmTitle: "Done",
    //     id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
    //     card: [
    //       {
    //         cardDescription:
    //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         cardTitle: "First card DONE",
    //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
    //           36
    //         )
    //       },
    //       {
    //         cardDescription:
    //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         cardTitle: "Second card DONE",
    //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
    //           36
    //         )
    //       },
    //       {
    //         cardDescription:
    //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         cardTitle: "Third card DONE",
    //         id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(
    //           36
    //         )
    //       }
    //     ]
    //   }
    // ],
  };

  componentDidMount() {
    this.socket = io("http://localhost:8000");
    this.socket.on("new state", state => {
      console.log("state", state);

      if (JSON.stringify(state) !== JSON.stringify(this.state)) {
        this.setState({ ...state });
      }
    });
  }

  componentDidUpdate() {
    this.socket.emit("new state", this.state);
  }

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
    console.log(columnId);
    console.log(cardId);
    this.state.boardColumn.map((item, index) => {
      if (item.id === columnId) {
        this.setState(prevState => {
          prevState.boardColumn[index].card.map((el, ind) => {
            if (el.id === cardId) {
              console.log(prevState.boardColumn[index].card.splice(ind, 1));
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
        return el.classList.contains("boardColumn-wrapper");
      }
    };
    const arr = [];
    this.state.boardColumn.map(item => {
      arr.push(document.querySelector(`#${item.id}`));
    });
    // Dragula(arr, options);
    Dragula(arr, options).on("drop", (el, target, source, sibling) => {
      // console.log("el", el);
      // console.log("target", target);
      // console.log("source", source);
      // console.log("sibling", sibling);
      const elId = el.getAttribute("id");
      const targetId = target.getAttribute("id");
      const sourseId = source.getAttribute("id");

      const sourceIndex = this.state.boardColumn.findIndex(
        element => element.id === sourseId
      );
      const elIndex = this.state.boardColumn[sourceIndex].card.findIndex(
        element => element.id === elId
      );
      const targetIndex = this.state.boardColumn.findIndex(
        element => element.id === targetId
      );
      console.log("targetIndex", targetIndex);
      this.setState(prevState => {
        console.log("this.state BEFORE", this.state);
        // return {
        //   boardColumn: prevState.boardColumn[sourceIndex].card
        //     .splice(elIndex, 1)
        //     .concat(prevState.boardColumn[targetIndex].card)
        // };
      });
      console.log("this.state", this.state.boardColumn);
      // console.log("sourceIndex", sourceIndex);
      // console.log("elIndex", elIndex);
    });
  };

  render() {
    console.log("STATE", this.state.boardColumn);
    if (!this.state.boardColumn) return null;

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
                  <div className="card" key={el.id} id={el.id}>
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
      </div>
    );
  }
}

export default Board;
