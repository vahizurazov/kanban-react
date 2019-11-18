import React, { Component } from "react";
import "./Board.css";
import AddColumnForm from "./AddColumnForm";
import Column from "./Column";
// import Dragula from "react-dragula";
import io from "socket.io-client";
import Board from "react-trello";

class App extends Component {
  constructor(...props) {
    super(...props);
    // this.onColumnInit = this._onColumnInit.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this.socket = io("http://localhost:8000");
    this.socket.on("new state", state => {
      // console.log("state", state);
      if (JSON.stringify(state) !== JSON.stringify(this.state)) {
        this.setState({ ...state });
      }
    });

    // this.drake = Dragula([], dragulaOptions);

    // console.log(this.drake);

    // this.drake.on("drop", (...args) => {
    //   this.onCardDrop(...args);
    // });
  }

  componentDidUpdate() {
    this.socket.emit("new state", this.state);
  }

  // onCardDrop(el, target, source, sibling) {
  //   console.log(this.state);
  //   const { columns } = this.state;
  //   const copyColumns = columns.slice();
  //   const cardId = el.getAttribute("id");
  //   const newColumnId = target.getAttribute("id");
  //   const oldColumnId = source.getAttribute("id");

  //   let oldColumn, newColumn;

  //   for (let i = 0; i < copyColumns.length; i++) {
  //     if (oldColumn && newColumn) {
  //       break;
  //     }
  //     if (copyColumns[i].id === oldColumnId) {
  //       oldColumn = copyColumns[i];
  //       continue;
  //     }
  //     if (copyColumns[i].id === newColumnId) {
  //       newColumn = copyColumns[i];
  //       continue;
  //     }
  //   }

  //   const cardIndex = oldColumn.cards.findIndex(card => card.id === cardId);
  //   const card = oldColumn.cards[cardIndex];

  //   delete oldColumn.cards[cardIndex];
  //   newColumn.cards.push(card);

  //   this.setState({
  //     columns: copyColumns
  //   });
  // }

  // addColumn = colunmTitle => {
  //   this.setState(prevState => ({
  //     columns: prevState.columns.concat({
  //       colunmTitle,
  //       id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36),
  //       card: []
  //     })
  //   }));
  // };
  // removeColumn = id => {
  //   this.setState(prevState => ({
  //     columns: prevState.columns.filter(item => item.id !== id)
  //   }));
  // };

  // addCard = (cardTitle, cardDescription, id) => {
  //   const cardId = {
  //     cardTitle,
  //     cardDescription,
  //     id: Math.floor(+new Date() + Math.random() * 0xffffffff).toString(36)
  //   };
  //   this.state.columns.map((item, index) => {
  //     if (item.id === id) {
  //       this.setState(prevState => prevState.columns[index].card.push(cardId));
  //     }
  //   });
  // };
  // removeCard = (columnId, cardId) => {
  //   const { columns } = this.state;
  //   const columnIndex = columns.findIndex(el => el.id === columnId);
  //   const filteredCards = columns[columnIndex].card.filter(
  //     el => el.id !== cardId
  //   );
  //   const updatedColumn = { ...columns[columnIndex], card: filteredCards };
  //   const filteredcolumns = columns.filter(el => el.id !== columnId);
  //   filteredcolumns.splice(columnIndex, 0, updatedColumn);
  //   this.setState({ columns: filteredcolumns });
  // };

  render() {
    // console.log("STATE", this.state.columns);
    const { columns } = this.state;

    if (!columns) return null;

    return (
      <div className="board" id="boardId">
        <Board data={this.state} draggable editable onCardAdd={e => e} />
      </div>
    );
  }
}

export default App;
