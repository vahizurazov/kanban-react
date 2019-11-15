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
    const { boardColumn } = this.state;
    // find target column index
    const columnIndex = boardColumn.findIndex(el => el.id === columnId);
    console.log("columnIndex", columnIndex);
    // remove target card from target column
    const filteredCards = boardColumn[columnIndex].card.filter(
      el => el.id !== cardId
    );
    console.log("filteredCards", filteredCards);

    // creare new target column
    const updatedColumn = { ...boardColumn[columnIndex], card: filteredCards };

    // remove target column from state
    console.log("updatedColumn", updatedColumn);

    const filteredBoardColumn = boardColumn.filter(el => el.id !== columnId);
    // add updated column to state
    console.log("filteredBoardColumn", filteredBoardColumn);

    filteredBoardColumn.splice(columnIndex, 0, updatedColumn);
    this.setState({ boardColumn: filteredBoardColumn });
  };

  dragulaDecorator = () => {
    const { boardColumn } = this.state;
    let options = {
      copy: false,
      copySortSource: false,
      direction: "horizontal",
      isContainer: function(el) {
        return el.classList.contains("boardColumn-wrapper");
      }
    };
    const arr = [];
    boardColumn.map(item => {
      arr.push(document.querySelector(`#${item.id}`));
    });
    // Dragula(arr, options);
    Dragula(arr, options).on("drop", (el, target, source, sibling) => {
      // console.log("el", el);
      // console.log("target", target);
      // console.log("source", source);
      // console.log("sibling", sibling);
      // const getId = getIdD => {
      //   getIdD.getAttribute("id");
      // };
      // const getIndex = searchIndex =>
      //   boardColumn.findIndex(el => el.id === getId(searchIndex));
      const elId = el.getAttribute("id");
      const targetId = target.getAttribute("id");
      const sourseId = source.getAttribute("id");

      const sourceIndex = boardColumn.findIndex(
        element => element.id === sourseId
      );
      const elIndex = boardColumn[sourceIndex].card.findIndex(
        element => element.id === elId
      );
      const targetIndex = boardColumn.findIndex(
        element => element.id === targetId
      );

      const filteredCards = boardColumn[sourceIndex].card.filter(
        el => el.id !== elId
      );
      console.log("filteredCards", filteredCards);
      const updatedColumn = {
        ...boardColumn[sourceIndex],
        card: filteredCards
      };

      console.log("updatedColumn", updatedColumn);
      const filteredBoardColumn = boardColumn.filter(el => el.id !== sourseId);
      console.log("filteredBoardColumn", filteredBoardColumn);

      filteredBoardColumn.splice(sourceIndex, 0, updatedColumn);

      // this.setState({ boardColumn: filteredBoardColumn });
      // this.setState(prevState => {
      //   //   prevState.boardColumn[sourceIndex].card: prevState.boardColumn[sourceIndex].card
      //   //     .splice(elIndex, 1)
      //   //     .concat(prevState.boardColumn[targetIndex].card)
      // });
    });
  };

  render() {
    console.log("STATE", this.state.boardColumn);
    const { boardColumn } = this.state;
    if (!boardColumn) return null;

    return (
      <div className="board" id="boardId" ref={this.dragulaDecorator}>
        <AddColumnForm
          onAdd={(colunmTitle, id) => this.addColumn(colunmTitle, id)}
        />
        <div className="boardColumn">
          {boardColumn.map(list => (
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
