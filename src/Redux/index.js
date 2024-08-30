import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import todoReducer from "./todoReducer";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
