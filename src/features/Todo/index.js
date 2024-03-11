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
import React, { useEffect, useRef, useState } from "react";
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
  const [todoItemHeight, setTodoItemHeight] = useState(0);
  const isSmallScreen = useSmallScreen();
  const TodoItemRef = useRef();
  const handleCreateTodoDialogClose = () => {
    setOpenCreateTodoDialog(false);
  };

  /**
   *   /**
   *   const WrapperRef = useRef();
  const isSmallScreen = useSmallScreen();
  useEffect(() => {
    if (!searchBarWidth) {
      setSearchBarWidth(WrapperRef?.current?.getBoundingClientRect().width);
    }
  }, [searchBarWidth]);
   */
  useEffect(() => {
    if (!todoItemHeight) {
      setTodoItemHeight(TodoItemRef?.current?.getBoundingClientRect().height);
    }
  }, [todoItemHeight]);

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
        <Grid item xs={8}>
          <Grid container>
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
              <SortComponent />
              <FilterComponent />
            </Grid>
          </Grid>
          <Box
            sx={{
              maxWidth: isSmallScreen ? "90vw" : "55vw",
              alignItems: "center",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
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
            <Grid container spacing={1} ref={TodoItemRef}>
              {!todoItemHeight ? (
                <Grid item xs={6}>
                  <TodoItem showDescription={true} />
                </Grid>
              ) : (
                todos?.map((val) => (
                  <Grid item xs={6}>
                    <TodoItem
                      key={val.id}
                      id={val.id}
                      height={todoItemHeight}
                    />
                  </Grid>
                ))
              )}
            </Grid>
            {todos?.length === 0 && (
              <EmptyTodoList setCreateTodoDialog={setOpenCreateTodoDialog} />
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <DeletedTodos />
        </Grid>
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
    </Box>
  );
};

export default Todo;
