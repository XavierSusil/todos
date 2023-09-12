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
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import UndoIcon from "@mui/icons-material/Undo";
import DeleteIcon from "@mui/icons-material/Delete";

import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { deleteTodo, updateTodoStatus } from "../../redux/slices/loginSlice";

import { updateTodoStatusApi } from "../../api/updateTodoApi";
import deleteTodoApi from "../../api/deleteTodoApi";
import { red } from "@mui/material/colors";

const TodoItem = ({ id }) => {
  const [token] = useLocalStorage("token", "");
  const todo = useSelector((state) =>
    state.login.user.todos.find((t) => t.id === id)
  );
  const [showDescription, setShowDescription] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

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

  const handleDelete = async () => {
    await deleteTodoApi(id, token);
    dispatch(deleteTodo(id));
  };

  const handleShowDescription = () => {
    setShowDescription((prev) => !prev);
  };

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

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
          </Collapse>
        </Grid>
      </Grid>
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
          fullWidth
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
    </Paper>
  );
};

export default TodoItem;
