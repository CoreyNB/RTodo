import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../Redux/todoActions";

function Forms() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const newTodo = {
        title: inputValue,
        parentId: null,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      setInputValue("");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="main-container">
        <input type="text" value={inputValue} onChange={inputChangeHandler} />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default Forms;
