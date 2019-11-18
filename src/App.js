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
      // console.log("stateDidMount", state);
      if (JSON.stringify(state) !== JSON.stringify(this.state)) {
        this.setState({ ...state });
      }
    });
  }

  // componentDidUpdate() {
  //   this.socket.emit("new state", this.state);
  // }

  onDataChange = newState => {
    this.socket.emit("new state", newState);
  };

  render() {
    const { lanes } = this.state;

    if (!lanes) return null;

    return (
      <div className="board" id="boardId">
        <Board
          data={this.state}
          draggable
          editable
          onDataChange={this.onDataChange}
          canAddLanes
        />
      </div>
    );
  }
}

export default App;
