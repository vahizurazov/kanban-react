import React from "react";

export default class AddColumnForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const colunmTitle = this.textInput.value.trim();
    console.log("taskText", colunmTitle);
    console.log("this.props", this.props);

    if (colunmTitle && this.props.onAdd) {
      this.props.onAdd(colunmTitle);
    }
    this.textInput.value = "";
  }

  setEditing(editing) {
    this.setState({
      editing
    });
  }

  render() {
    if (!this.state.editing) {
      return (
        <div className="open-add-button" onClick={() => this.setEditing(true)}>
          <a href="#">Add task</a>
        </div>
      );
    }
    return (
      <form className="card add-task-form" onSubmit={e => this.onSubmit(e)}>
        <input
          type="text"
          className="task-input"
          ref={input => (this.textInput = input)}
          aria-label="Add a task"
        />
        <div>
          <button className="button add-button">Add Task</button>
          <button
            className="button cancel-button"
            onClick={() => this.setEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}