import {
  BottomNavigation,
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import propTypes from "prop-types";
import React, { useRef, useState } from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import CreateTodo from "./CreateTodo";
import DeletedTodos from "./DeletedTodos";
import TodoItem from "./TodoItem";
import useSearchedTodos from "./useSearchedTodos";
import { SortComponent } from "../../components/SortComponent";
import { FilterComponent } from "../../components/FilterComponent";

const CreateTodoWindow = ({
  setCreateTodoDialog,
  isSmallScreen,
  justifyCenter,
}) => {
  const handleCreateTodoDialogOpen = () => {
    setCreateTodoDialog(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: justifyCenter ? "center" : "flex-end",
      }}
    >
      <Button
        variant="contained"
        onClick={handleCreateTodoDialogOpen}
        sx={{
          borderRadius: 5,
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AddCircleOutlineIcon fontSize={isSmallScreen ? "large" : "medium"} />
        {!isSmallScreen && <Typography> Todo</Typography>}
      </Button>
    </Box>
  );
};

CreateTodoWindow.propTypes = {
  isSmallScreen: propTypes.bool,
  setCreateTodoDialog: propTypes.func,
  justifyCenter: propTypes.bool,
};

const EmptyTodoList = ({ setCreateTodoDialog }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "50%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
        }}
        elevation={24}
      >
        <Typography variant="h5">Todo List is empty </Typography>
        <Typography variant="subtitle2">
          {" "}
          Click below to Add a new todo
        </Typography>
        <CreateTodoWindow
          setCreateTodoDialog={setCreateTodoDialog}
          justifyCenter
        />
      </Paper>
    </Box>
  );
};

EmptyTodoList.propTypes = {
  setCreateTodoDialog: propTypes.func.isRequired,
};

const Todo = () => {
  const [openCreateTodoDialog, setOpenCreateTodoDialog] = useState(false);
  const [showDeletedTodos, setShowDeletedTodos] = useState(false);
  const isSmallScreen = useSmallScreen();
  const TodoItemRef = useRef();
  const handleCreateTodoDialogClose = () => {
    setOpenCreateTodoDialog(false);
  };

  const handleShowDeletedTodos = () => {
    setShowDeletedTodos((prev) => !prev);
  };

  const todos = useSearchedTodos();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "98%",
      }}
    >
      <Grid container spacing={1}>
        <Grid
          item
          xs={showDeletedTodos ? 8 : 12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              width: showDeletedTodos ? '100%':'70vw',
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {
              todos?.length !== 0 && <Grid container spacing={1}>
              <Grid item xs={4}>
                <Button
                  onClick={setOpenCreateTodoDialog}
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  New Todo
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Box
                  border={1}
                  borderRadius={1}
                  borderColor="primary.main"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <SortComponent />
                  <FilterComponent />
                </Box>
              </Grid>
            </Grid>
            }
            <Box
              sx={{
                overflowY: "auto",
                overflowX: "hidden",
                gap: 1,
                p: 1,
                width: "95%",
                height: "70vh",
                "&::-webkit-scrollbar": {
                  width: "0.3em",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "0.6em",
                  backgroundColor: "#888",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              <Grid container spacing={2} ref={TodoItemRef}>
                {todos?.map((val) => (
                  <Grid item key={val.id} xs={4}>
                    <TodoItem id={val.id} />
                  </Grid>
                ))}
              </Grid>
              {todos?.length === 0 && (
                <EmptyTodoList setCreateTodoDialog={setOpenCreateTodoDialog} />
              )}
            </Box>
          </Box>
        </Grid>
        {showDeletedTodos && (
          <Grid item xs={4}>
            <DeletedTodos />
          </Grid>
        )}
      </Grid>
      <Dialog
        open={openCreateTodoDialog}
        onClose={handleCreateTodoDialogClose}
        fullWidth
        maxWidth="md"
      >
        <CreateTodo close={handleCreateTodoDialogClose} />
      </Dialog>
      {isSmallScreen && (
        <BottomNavigation
          sx={{ p: 1, position: "fixed", bottom: "5vh", right: "1vw" }}
          label="New Todo"
        >
          <CreateTodoWindow
            isSmallScreen
            setCreateTodoDialog={setOpenCreateTodoDialog}
          />
        </BottomNavigation>
      )}
      <Button onClick={handleShowDeletedTodos}>deleted todos</Button>
    </Box>
  );
};

export default Todo;
