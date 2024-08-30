export const setTodos = (todos) => ({
  type: "SET_TODOS",
  payload: todos,
});

export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:3001/todos");
      const todos = await res.json();
      dispatch(setTodos(todos));
    } catch (error) {
      console.error("fetching todos:", error);
    }
  };
};

export const addTodo = (todo) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const createdTodo = await res.json();
      dispatch({
        type: "ADD_TODO",
        payload: createdTodo,
      });
    } catch (error) {
      console.error(" adding todo:", error);
    }
  };
};

export const updateTodo = (id, updatedTodo) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const todo = await res.json();
      dispatch({
        type: "UPDATE_TODO",
        payload: todo,
      });
    } catch (error) {
      console.error(" updating todo:", error);
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });
    } catch (error) {
      console.error(" deleting todo:", error);
    }
  };
};

export const moveTodo = (id, direction) => ({
  type: "MOVE_TODO",
  payload: { id, direction },
});
