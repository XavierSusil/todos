import {
  BottomNavigation,
  Box,
  Button,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PropTypes from "prop-types";
import React, { useState } from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import CreateTodo from "./CreateTodo";
import DeletedTodos from "./DeletedTodos";
import TodoItem from "./TodoItem";
import useSearchedTodos from "./useSearchedTodos";

const CreateTodoWindow = ({ setCreateTodoDialog, isSmallScreen }) => {
  const handleCreateTodoDialogOpen = () => {
    setCreateTodoDialog(true);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
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
  isSmallScreen: PropTypes.bool,
  setCreateTodoDialog: PropTypes.func,
};

const Todo = () => {
  const [openCreateTodoDialog, setOpenCreateTodoDialog] = useState(false);
  const isSmallScreen = useSmallScreen();

  const handleCreateTodoDialogClose = () => {
    setOpenCreateTodoDialog(false);
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
      {!isSmallScreen && (
        <CreateTodoWindow setCreateTodoDialog={setOpenCreateTodoDialog} open ={openCreateTodoDialog} />
      )}
      <Grid container spacing={1}>
        <Grid item xs={8}>
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
              maxHeight: "70vh",
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
            {todos?.map((val) => (
              <TodoItem key={val.id} id={val.id} />
            ))}
            {
              todos?.length === 0 && <Typography>Todo List is empty </Typography>
            }
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
