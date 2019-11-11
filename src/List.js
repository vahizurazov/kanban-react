import React from "react";
// import TaskCard from "./TaskCard";
import AddTaskForm from "./AddColumnForm";

export default class List extends React.Component {
  render() {
    return (
      <>
        <h2 className={`name-header name-${this.props.id}`}>
          {this.props.title}
        </h2>
        {this.props.id === 0 ? (
          <div className="add-list-wrapper">
            <AddTaskForm formNum={this.props.id} onAdd={this.props.onAdd} />
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
