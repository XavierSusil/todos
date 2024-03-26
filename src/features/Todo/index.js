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
import React, { useEffect, useReducer, useState } from "react";
import { FilterComponent } from "../../components/FilterComponent";
import { SortComponent } from "../../components/SortComponent";
import useDeletedTodos from "../../hooks/useDeletedTodos";
import useSmallScreen from "../../hooks/useSmallScreen";
import CreateTodo from "./CreateTodo";
import DeletedTodos from "./DeletedTodos";
import TodoItem from "./TodoItem";
import useMasonryTodos from "./useMasonryTodos";
import CircularLoadingOverlayWrapper from "../../components/LoadingOverlay";

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
  const deletedTodos = useDeletedTodos();
  const masonryTodos = useMasonryTodos();
  const {isCreatingTodo} = useReducer((state) => state?.login?.isCreatingTodo);
  console.log("isCreatingTodo",isCreatingTodo);
  const isEmptyTodos = () => {
    return masonryTodos.every((list) => list.length === 0);
  };
  const handleCreateTodoDialogClose = () => {
    setOpenCreateTodoDialog(false);
  };

  const handleShowDeletedTodos = () => {
    let curr = !showDeletedTodos;
    if (deletedTodos.length === 0) curr = false;
    setShowDeletedTodos(curr);
  };

  /**
   * this useEffect is use to set the showDeletedTodos value after the
   * deleted todos items have been modified
   */
  useEffect(() => {
    if (deletedTodos.length === 0) setShowDeletedTodos(false);
  }, [deletedTodos, setShowDeletedTodos]);
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
            <CircularLoadingOverlayWrapper isLoading={undefined}>
            <Box
              sx={{
                width: showDeletedTodos ? "100%" : "70vw",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Grid container spacing={1}>
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
                <Grid container spacing={2}>
                  {masonryTodos?.map((list, index) => (
                    <Grid item xs={4} key={index}>
                      <Grid container spacing={1}>
                        {list.map((val) => (
                          <Grid item xs={12} key={val.id}>
                            <TodoItem id={val.id} />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                {isEmptyTodos() && (
                  <EmptyTodoList
                    setCreateTodoDialog={setOpenCreateTodoDialog}
                  />
                )}
              </Box>
            </Box>
            </CircularLoadingOverlayWrapper>
          </Grid>
          {showDeletedTodos && deletedTodos?.length !== 0 && (
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
        {deletedTodos?.length !== 0 && (
          <Button onClick={handleShowDeletedTodos}>view deleted todos </Button>
        )}
      </Box>

  );
};

export default Todo;
