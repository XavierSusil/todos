import {
  Box,
  Button,
  Paper,
  Grid,
  Typography,
  Collapse,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Popover,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import UndoIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { deleteTodo, updateTodoStatus ,updateTodoThunk} from "../../redux/slices/loginSlice";

import { updateTodoStatusApi } from "../../api/updateTodoApi";
import deleteTodoApi from "../../api/deleteTodoApi";
import { deepPurple, red } from "@mui/material/colors";

const DeleteDialog = ({ id, deleteDialog, setDeleteDialog }) => {
  const [token] = useLocalStorage("token", "");

  const dispatch = useDispatch();

  const handleDelete = async () => {
    await deleteTodoApi(id, token);
    dispatch(deleteTodo(id));
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  return (
    <>
      <Dialog open={deleteDialog} onClose={closeDeleteDialog}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar sx={{ bgcolor: red[500] }}>
            <DeleteIcon />
          </Avatar>
        </DialogTitle>
        <DialogContent>
          <Typography> Are you sure you want to delete this Todo?</Typography>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button
            onClick={closeDeleteDialog}
            color="primary"
            variant="contained"
            fullWidth
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            autoFocus
            variant="contained"
            fullWidth
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const PopoverForm = ({ id, title, description, priority ,close}) => {
  const [titleUse, setTitle] = useState(title);
  const [descriptionUse, setDescription] = useState(description);
  const [priorityUse, setPriority] = useState(priority);
  const [token] = useLocalStorage("token", "");
  const dispatch = useDispatch();

  const handleTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleDescription = (e) => {
    setDescription(e.currentTarget.value);
  };

  const handlePriority = (e) => {
    setPriority(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: titleUse,
      description: descriptionUse,
      priority: priorityUse,
    };
    dispatch(updateTodoThunk({ id, data, token }));
    close();
  };

  return (
    <>
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            <EditIcon />
          </Avatar>
        </Box>
        <TextField
          label="Title"
          multiline
          rows={1}
          value={titleUse}
          onChange={handleTitle}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={descriptionUse}
          onChange={handleDescription}
        />

        <FormControl>
          <FormLabel>Priority</FormLabel>
          <RadioGroup
            name="priority"
            value={priorityUse}
            onChange={handlePriority}
            row
          >
            <FormControlLabel
              value="LOW" // values should be in capital letters
              control={<Radio color="green" />}
              label="low"
            />
            <FormControlLabel
              value="MEDIUM"
              control={<Radio color="yellow" />}
              label="medium"
            />
            <FormControlLabel
              value="HIGH"
              control={<Radio color="red" />}
              label="high"
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="secondary">
          <DoneIcon />
        </Button>
      </Box>
    </>
  );
};

const TodoItem = ({ id }) => {
  const [token] = useLocalStorage("token", "");
  const todo = useSelector((state) =>
    state.login.user.todos.find((t) => t.id === id)
  );
  const [showDescription, setShowDescription] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const updateStatusHelper = async (state) => {
    await updateTodoStatusApi(id, state, token);
    dispatch(updateTodoStatus({ id, status: state }));
  };

  const priority = todo?.priority;

  const redOrYellow = priority === "MEDIUM" ? "yellow" : "red";

  const handleDoneButton = async () => {
    updateStatusHelper("COMPLETED");
  };

  const handleUndoButton = async () => {
    updateStatusHelper("IN_PROGRESS");
  };

  const handleShowDescription = () => {
    setShowDescription((prev) => !prev);
  };

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  };

  const openPopOver = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closePopOver = () => {
    setAnchorEl(null);
  };

  const isPopOverOpen = Boolean(anchorEl);
  const popOverId = isPopOverOpen ? "pop" + id : undefined;

  return (
    <Paper elevation={1}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            p: 1,
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: showDescription ? "500" : "regular",
              cursor: "pointer",
            }}
            onClick={handleShowDescription}
          >
            <Radio checked color={priority === "LOW" ? "green" : redOrYellow} />{" "}
            {todo?.title}
          </Typography>
          <Box>
            {todo?.status === "COMPLETED" ? (
              <Button onClick={handleUndoButton} sx={{ minWidth: "0px" }}>
                <UndoIcon fontSize="small" color="success" />
              </Button>
            ) : (
              <Button onClick={handleDoneButton} sx={{ minWidth: "0px" }}>
                <DoneIcon fontSize="small" color="success" />
              </Button>
            )}
            <Button onClick={openDeleteDialog} sx={{ minWidth: "0px" }}>
              <ClearIcon fontSize="small" color="error" />
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Collapse in={showDescription}>
            <Typography sx={{ p: 1, fontSize: "85%" }}>
              {todo?.description}
            </Typography>
            <Button onClick={openPopOver}>
              <EditIcon />
            </Button>
          </Collapse>
        </Grid>
      </Grid>
      <DeleteDialog
        id={id}
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
      />
      <Popover
        id={popOverId}
        open={isPopOverOpen}
        anchorEl={anchorEl}
        onClose={closePopOver}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <PopoverForm
          title={todo?.title}
          description={todo?.description}
          priority={todo?.priority}
          userid={todo?.userid}
          id={todo?.id}
          status={todo?.status}
          close={closePopOver}
        />
      </Popover>
    </Paper>
  );
};

export default TodoItem;
