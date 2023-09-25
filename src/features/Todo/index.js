import { Box, Typography, Button, Dialog } from "@mui/material";

import TodoItem from "./TodoItem";
import CreateTodo from "./CreateTodo";
import TodoFilters from "./TodoFilters";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import useSearchedTodos from "./useSearchedTodos";

const Todo = () => {
  const [openCreateTodoDialog, setCreateTodoDialog] = useState(false);

  const handleCreateTodoDialogOpen = () => {
    setCreateTodoDialog(true);
  };

  const handleCreateTodoDialogClose = () => {
    setCreateTodoDialog(false);
  };

  const todos = useSearchedTodos();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
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
            <AddCircleOutlineIcon />
            <Typography> Todo</Typography>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            color="primary"
            variant="h3"
            fontFamily="'Cormorant Garamond', serif"
          >
            TODO LIST
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width:'100%',
              maxWidth: "50vw",
              alignItems: "center",
            }}
          >
            <TodoFilters />
            <Box
              sx={{
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 1,
                width: "95%",
                maxHeight: "50vh",
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
            </Box>
          </Box>
        </Box>
        <Dialog
          open={openCreateTodoDialog}
          onClose={handleCreateTodoDialogClose}
          fullWidth
          maxWidth="md"
        >
          <CreateTodo close={handleCreateTodoDialogClose} />
        </Dialog>
      </Box>
    </>
  );
};

export default Todo;
