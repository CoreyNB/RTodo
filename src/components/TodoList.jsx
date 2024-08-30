import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  updateTodo,
  moveTodo,
  addTodo,
} from "../Redux/todoActions";

function TodoList({ item }) {
  const [showForm, setShowForm] = useState(false);
  const [addChild, setAddChild] = useState("");
  const [text, setText] = useState(item.title);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const submitHandler = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch(updateTodo(item.id, { title: text }));
      setShowForm(false);
      setText("");
    }
  };

  const cancelHandler = () => {
    setShowForm(false);
    setText(item.title);
  };

  const deleteHandler = () => {
    dispatch(deleteTodo(item.id));
  };

  const addSubtaskHandler = (e) => {
    e.preventDefault();
    if (addChild.trim() !== "") {
      const newTask = {
        title: addChild,
        parentId: item.id,
        completed: false,
      };
      dispatch(addTodo(newTask));
      setAddChild("");
    }
  };

  const moveHandler = (direction) => {
    dispatch(moveTodo(item.id, direction));
  };

  const index = todos.findIndex((task) => task.id === item.id);
  const isFirst = index === 0;
  const isLast = index === todos.length - 1;

  return (
    <div className="app-todo">
      <div className="todo-item">
        <h4>{item.title}</h4>
        <button onClick={() => setShowForm((prev) => !prev)}>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={() => moveHandler("up")} disabled={isFirst}>
          👆
        </button>
        <button onClick={() => moveHandler("down")} disabled={isLast}>
          👇
        </button>
      </div>
      {showForm && (
        <form onSubmit={submitHandler}>
          <div className="tasks-item">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </form>
      )}
      <form onSubmit={addSubtaskHandler}>
        <div className="subTask">
          <input
            type="text"
            value={addChild}
            onChange={(e) => setAddChild(e.target.value)}
          />
          <button type="submit">Add</button>
        </div>
      </form>

      {todos
        .filter((sub) => sub.parentId === item.id)
        .map((val) => (
          <TodoList key={val.id} item={val} />
        ))}
    </div>
  );
}

export default TodoList;
