import { Box, Button, TextField, Paper, Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import createTodoApi from "../../api/createTodoApi";
import { useSelector } from "react-redux";
import extractDataFromForm from "../../utils/extractDataFromForm";
import useLocalStorage from "../../hooks/useLocalStorage";

const CreateTodo = () => {
  const userid = useSelector((state) => state.login.user.id)
  const [token] = useLocalStorage("token", "");
  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = extractDataFromForm(formData);
    data.userid = userid;
    const response = await  createTodoApi(data,token);
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

const TodoItem = ({ title }) => {
  return (
    <Paper
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography color="primary">{title}</Typography>
      <Box>
        <Button>
          <DoneIcon fontSize="small" color="success" />
        </Button>
        <Button>
          <ClearIcon fontSize="small" color="error" />
        </Button>
      </Box>
    </Paper>
  );
};

const Todo = () => {
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
            gap: 1,
          }}
        >
          <TodoItem title={"Example Title"} />
          <TodoItem title={"Second example"} />
          <TodoItem title={"Example Title"} />
          <TodoItem title={"Example Title"} />
          <TodoItem title={"Second example"} />
          <TodoItem title={"Example Title"} />
          <TodoItem title={"Second example"} />
          <TodoItem title={"Example Title"} />
          <TodoItem title={"Second example"} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Todo;
