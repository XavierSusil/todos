import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      if (state.user.todos !== null)
        state.user.todos.sort((a, b) => b.id - a.id);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    addTodo: (state, action) => {
      if (state.isLoggedIn) {
        if (state.user.todos ===  null)  state.user.todos = [];
        state.user.todos.unshift(action.payload);
      }
    },
    updateTodoStatus: (state, action) => {
      if (state.isLoggedIn) {
        state.user.todos.find((t) => t.id === action.payload.id).status =
          action.payload.status;
      }
    },
    deleteTodo: (state, action) => {
       state.user.todos=state.user.todos.filter((t) => t.id !== action.payload);
    },
  },
});

export const { login, logout, addTodo, updateTodoStatus, deleteTodo } =
  loginSlice.actions;

export default loginSlice.reducer;
