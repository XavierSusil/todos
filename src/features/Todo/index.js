import { Box, Button, TextField, Paper, Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import createTodoApi from "../../api/createTodoApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import extractDataFromForm from "../../utils/extractDataFromForm";
import useLocalStorage from "../../hooks/useLocalStorage";

import {
  addTodo as addTodoAction,
  deleteTodo,
  updateTodoStatus,
} from "../../redux/slices/loginSlice";

import { changeStatus as changeStatusAction } from "../../redux/slices/filterStatusSlice";

import { updateTodoStatusApi } from "../../api/updateTodoApi";
import deleteTodoApi from "../../api/deleteTodoApi";
import { enqueueSnackbar } from "notistack";
import useFilteredTodos from "../../hooks/useFilteredTodos";

const CreateTodo = () => {
  const userid = useSelector((state) => state.login.user.id);
  const [token] = useLocalStorage("token", "");
  const dispatch = useDispatch();

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = extractDataFromForm(formData);
    data.userid = userid;

    const response = await createTodoApi(data, token);

    if (response.hasOwnProperty("title")) {
      enqueueSnackbar("Todo Added", {
        variant: "success",
      });
      dispatch(addTodoAction(response));
    } else {
      enqueueSnackbar("Todo Cannot Be Created", {
        variant: "error",
      });
    }
    console.log(response);
  };

  return (
    <Box
      component="form"
      onSubmit={handleTodoSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "95%",
        gap: 1,
        marginTop: "2px",
        p: 1,
      }}
    >
      <Typography
        color="primary"
        component="h3"
        variant="h6"
        sx={{
          paddingTop: "2px",
        }}
      >
        CREATE NEW TODO
      </Typography>
      <TextField
        label="Title"
        id="todoTitle"
        name="title"
        type="text"
        multiline
        rows={1}
        fullWidth
        required
      />
      <TextField
        label="Description"
        id="todoDescription"
        name="description"
        type="text"
        multiline
        rows={4}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" sx={{ width: "50%" }}>
        CREATE
      </Button>
    </Box>
  );
};

const TodoItem = ({ id }) => {

  console.log("id of the todo item " + id);
  const [token] = useLocalStorage("token", "");
  const dispatch = useDispatch();

  const todo = useSelector((state) =>
    state.login.user.todos.find((t) => t.id === id)
  );
  console.log(todo);

  const handleDoneButton = async () => {
    await updateTodoStatusApi(id, "COMPLETED", token);
    dispatch(updateTodoStatus({ id, status: "COMPLETED" }));
  };

  const handleDeleteButton = async () => {
    await deleteTodoApi(id, token);
    dispatch(deleteTodo(id));
  };

  return (
    <Paper
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography >
       {todo?.title}
      </Typography>
      <Box>
        {
          todo?.status === 'COMPLETED' ? <> </> :
          <Button onClick={handleDoneButton}>
          <DoneIcon fontSize="small" color="success" />
        </Button>
        }
        <Button onClick={handleDeleteButton}>
          <ClearIcon fontSize="small" color="error" />
        </Button>
      </Box>
    </Paper>
  );
};

const TodoFilters = () => {
  const currentFilter = useSelector((state) => state.filterStatus);
  const dispatch = useDispatch();

  const handleAllButtonClick = () => {
    dispatch(changeStatusAction("ALL"));
  };

  const handleProgressButtonClick = () => {
    dispatch(changeStatusAction("IN_PROGRESS"));
  };

  const handleDoneButtonClick = () => {
    dispatch(changeStatusAction("COMPLETED"));
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant={currentFilter === 'ALL'?'contained':'outlined'} fullWidth onClick={handleAllButtonClick}
          color = {currentFilter === 'ALL'?'secondary':'primary'}>
            All
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant={currentFilter === 'IN_PROGRESS'?'contained':'outlined'} 
            fullWidth
            onClick={handleProgressButtonClick}
            color = {currentFilter === 'IN_PROGRESS'?'secondary':'primary'}
          >
            In Progress
          </Button>
        </Grid>

        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant={currentFilter === 'COMPLETED'?'contained':'outlined'}  fullWidth onClick={handleDoneButtonClick}
          color = {currentFilter === 'COMPLETED'?'secondary':'primary'}>
            Completed
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const Todo = () => {

  const todos = useFilteredTodos();
  
  useEffect(() => {
    console.log("todos inside Main Todo Component",todos)
  },[todos])
  
  return (
    <Grid container rowSpacing={1}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
        }}
      >
        <CreateTodo />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography color="primary" component="h3" variant="h6">
          TODO LIST
        </Typography>
        <Box
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TodoFilters />
          {todos?.map((val) => (
            <TodoItem key={val.id} id={val.id} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Todo;
