import React, { Component } from "react";
import "./Board.css";

import io from "socket.io-client";
import Board from "react-trello";

class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {};
  }

  componentDidMount() {
    this.socket = io("http://localhost:8000");
    this.socket.on("new state", state => {
      console.log("stateDidMount", state);
      if (JSON.stringify(state) !== JSON.stringify(this.state)) {
        this.setState({ ...state });
      }
    });
  }

  componentDidUpdate() {
    this.socket.emit("new state", this.state);
  }

  onDataChange = newState => {
    console.log("newState", newState);
    this.socket.emit("new state", newState);
  };

  render() {
    console.log("stateRender", this.state);
    const { lanes } = this.state;

    if (!lanes) return null;

    return (
      <div className="board" id="boardId">
        <Board
          data={this.state}
          draggable
          editable
          onCardAdd={e => e}
          onDataChange={this.onDataChange}
        />
      </div>
    );
  }
}

export default App;
