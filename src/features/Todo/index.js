import { Box, Grid, Typography } from "@mui/material";

import TodoItem from "./TodoItem";
import CreateTodo from "./CreateTodo";
import TodoFilters from "./TodoFilters";
import useFilteredAndSortedTodos from "../../hooks/useFilteredAndSortedTodos";

const Todo = () => {
  const todos = useFilteredAndSortedTodos();

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
            width: "85%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
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
      </Grid>
    </Grid>
  );
};

export default Todo;
