import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createTodoApi from "../../api/createTodoApi";
import { updateTodoApi } from "../../api/updateTodoApi";

import { enqueue } from "./snackbarSlice";
/**
 *
 * @param {state of the slice} state
 * @param {*} action
 *
 * This is  a reusable function meant to use in  reducers section of
 * the slice as well as  extrareducer section of the slice
 */
const addTodoReducer = (state, action) => {
  if (state.isLoggedIn) {
    if (state?.user?.todos === null) state.user.todos = [];
    state.user.todos.unshift(action?.payload);
  }
};

export const createTodoThunk = createAsyncThunk(
  "login/createTodoThunk",
  async ({ data, token }, { rejectWithValue, getState, dispatch }) => {
    if (
      getState().login?.user?.todos.find((todo) => todo.title === data.title)
    ) {
      dispatch(enqueue({ message: "Todo already exists", variant: "error" }));
      return rejectWithValue("Todo already exists");
    }

    const response = await createTodoApi(data, token);

    if (response.hasOwnProperty("title")) {
      dispatch(enqueue({ message: "Todo Added", variant: "success" }));
      return response;
    }
    dispatch(enqueue({ message: "Todo cannot be created", variant: "error" }));
    return rejectWithValue("error creating todo");
  }
);

/**
 *    Structure of data => 
 *    data : {
      title: "title",
      description: "description",
      priority: "priority",
    };
 */

export const updateTodoThunk = createAsyncThunk(
  "login/updateTodoThunk",
  async ({ id, data, token }, { rejectWithValue, dispatch }) => {
    const response = await updateTodoApi(id, data, token);
    console.log(response);
    if (response.hasOwnProperty("title")) {
      dispatch(enqueue({ message: "Todo Updated", variant: "success" }));
      return response;
    }
    dispatch(enqueue({ message: "Todo cannot be updated", variant: "error" }));
    return rejectWithValue("error updating todo");
  }
);

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
    addTodo: addTodoReducer,

    updateTodoStatus: (state, action) => {
      state.user.todos.find((t) => t.id === action.payload.id).status =
        action.payload.status;
    },
    deleteTodo: (state, action) => {
      state.user.todos.find((t) => t.id === action.payload).status = "DELETED";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodoThunk.fulfilled, addTodoReducer)
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        if (state.isLoggedIn) {
          const todo = state.user.todos.find((t) => t.id === action.payload.id);
          todo.title = action.payload.title;
          todo.description = action.payload.description;
          todo.priority = action.payload.priority;
        }
      });
  },
});

export const selectTodoById = (state, id) =>
  state?.login?.user?.todos?.find((t) => t.id === id);

export const { login, logout, addTodo, updateTodoStatus, deleteTodo } =
  loginSlice.actions;

export default loginSlice.reducer;
