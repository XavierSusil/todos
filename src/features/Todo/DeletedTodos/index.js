import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import deleteTodoApi from "../../../api/deleteTodoApi";
import { updateTodoStatusApi } from "../../../api/updateTodoApi";

import { DeleteForever } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import { red } from "@mui/material/colors";
import propTypes from "prop-types";

import { useState } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { deleteTodo, updateTodoStatus } from "../../../redux/slices/loginSlice";
import { enqueue } from "../../../redux/slices/snackbarSlice";
import useDeletedTodos from "./useDeletedTodos";

export const DeleteDialog = ({ id, deleteDialog, setDeleteDialog }) => {
  const [token] = useLocalStorage("token", "");

  const dispatch = useDispatch();

  const handleDelete = async () => {
    await deleteTodoApi(id, token);
    dispatch(deleteTodo(id));
    dispatch(
      enqueue({ message: "Todo deleted Permanently", variant: "success" })
    );
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  return (
    <Dialog open={deleteDialog} onClose={closeDeleteDialog}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ bgcolor: red[500] }}>
          <DeleteIcon />
        </Avatar>
      </DialogTitle>
      <DialogContent>
        <Typography>
          {" "}
          Are you sure you want to delete this Todo Permanently?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
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
  );
};

DeleteDialog.propTypes = {
  id: propTypes.number.isRequired,
  deleteDialog: propTypes.bool.isRequired,
  setDeleteDialog: propTypes.func.isRequired,
};

const DeletedItem = ({ id, title, status }) => {
  const [token] = useLocalStorage("token", "");
  const dispatch = useDispatch();
  const [deleteDialogState, setDeleteDialogState] = useState(false);
  const [isHovered,setIsHovered] = useState(false);

  const updateStatusHelper = async (state) => {
    await updateTodoStatusApi(id, state, token);
    dispatch(updateTodoStatus({ id, status: state }));
  };

  const handleRestoreButton = () => {
    if (status === "DELETED_COMPLETED") updateStatusHelper("COMPLETED");
    else updateStatusHelper("IN_PROGRESS");
  };

  const handlePermanentDeleteButton = () => {
    setDeleteDialogState(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <Paper key={title} sx={{ p: 1 }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            textDecoration:
              status === "DELETED_COMPLETED" ? "line-through" : "",
            opacity: status === "DELETED_COMPLETED" ?0.5:1,
          }}
        >
          {title}
        </Typography>
<Box>
          <Tooltip title="Restore">
            <IconButton color="primary">
              <RestoreIcon onClick={handleRestoreButton}  fontSize="small"/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete permanently">
            <IconButton color="error" onClick={handlePermanentDeleteButton}>
              <DeleteForever  fontSize="small"/>
            </IconButton>
          </Tooltip>
        </Box>
        
      </Box>
      <DeleteDialog
        id={id}
        deleteDialog={deleteDialogState}
        setDeleteDialog={setDeleteDialogState}
      />
    </Paper>
  );
};

DeletedItem.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
};

const DeletedTodos = () => {
  const todos = useDeletedTodos();
  return (
    
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 1,
          overflowY: "auto",
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
        <Typography sx={{ fontWeight: "bold" }}>
          Recently Deleted Todos
        </Typography>
        {todos?.map((todo) => (
          <DeletedItem
            key={todo.title}
            title={todo.title}
            id={todo.id}
            status={todo.status}
          />
        ))}
        {todos?.length === 0 && (
          <Typography>No items in the Recently Deleted List </Typography>
        )}
      </Box>
  );
};

export default DeletedTodos;
