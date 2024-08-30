const initialState = {
  todos: [],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case "MOVE_TODO":
      const { id, direction } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index === -1) return state;

      const newTodos = [...state.todos];
      const [movedItem] = newTodos.splice(index, 1);

      if (direction === "up" && index > 0) {
        newTodos.splice(index - 1, 0, movedItem);
      } else if (direction === "down" && index < newTodos.length) {
        newTodos.splice(index + 1, 0, movedItem);
      }

      return {
        ...state,
        todos: newTodos,
      };
    default:
      return state;
  }
}

export default todoReducer;
