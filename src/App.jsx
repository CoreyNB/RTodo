import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "./Redux/todoActions";
import Forms from "./components/Forms";
import TodoList from "./components/TodoList";
import "./components/TodoList.css";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <Forms />
      {todos.length > 0 &&
        todos.map(
          (item) => !item.parentId && <TodoList key={item.id} item={item} />
        )}
    </div>
  );
}

export default App;
