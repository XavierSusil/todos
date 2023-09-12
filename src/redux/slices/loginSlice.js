import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createTodoApi from "../../api/createTodoApi";

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
  async ({ data, token }, { rejectWithValue, getState ,dispatch}) => {

    if (getState().login?.user?.todos.find((todo) => todo.title === data.title)) {
      dispatch(enqueue({message:'Todo already exists',variant:'error'}));
      return rejectWithValue("Todo already exists");
    }

    const response = await createTodoApi(data, token);

    if (response.hasOwnProperty("title")) {
      dispatch(enqueue({message:'Todo Added',variant:'success'}))
      return response;
    }
    dispatch(enqueue({message:'Todo cannot be created',variant:'error'}))
    return rejectWithValue("error creating todo");
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
      if (state.isLoggedIn) {
        state.user.todos.find((t) => t.id === action.payload.id).status =
          action.payload.status;
      }
    },
    deleteTodo: (state, action) => {
      state.user.todos = state.user.todos.filter(
        (t) => t.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTodoThunk.fulfilled, addTodoReducer);
  },
});

export const { login, logout, addTodo, updateTodoStatus, deleteTodo } =
  loginSlice.actions;

export default loginSlice.reducer;
