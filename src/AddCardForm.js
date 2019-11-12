import React from "react";
//f
export default class AddCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const cardTitle = this.textInput.value.trim();
    const cardDescription = this.textInputTwo.value.trim();
    console.log("taskText", cardTitle);
    console.log("this.props", this.props);

    if (cardTitle && this.props.onAdd) {
      this.props.onAdd(cardTitle, cardDescription, this.props.id);
    }
    this.textInput.value = "";
    this.textInputTwo.value = "";
    this.setEditing(false);
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
          <a href="#">Add card</a>
        </div>
      );
    }
    return (
      <form className="card add-task-form" onSubmit={e => this.onSubmit(e)}>
        <input
          type="text"
          className="task-input"
          ref={input => (this.textInput = input)}
          placeholder="Title Card"
        />
        <input
          type="text"
          className="task-input"
          ref={input => (this.textInputTwo = input)}
          placeholder="Description Card"
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
