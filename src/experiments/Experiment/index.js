import { useEffect, useRef, useState } from "react";
import SearchBar2, { SearchBar } from "../../components/SearchBar2";

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

import deleteTodoApi from "../../api/deleteTodoApi";
import { updateTodoStatusApi } from "../../api/updateTodoApi";

import { DeleteForever } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import { red } from "@mui/material/colors";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import { deleteTodo, updateTodoStatus } from "../../redux/slices/loginSlice";
import { enqueue } from "../../redux/slices/snackbarSlice";
import useDeletedTodos from "../../features/Todo/DeletedTodos/useDeletedTodos";
import { DeletedItemUI } from "../../features/Todo/DeletedTodos/DeletedItem";

const Experiment = () => {


  return <Paper sx={{p:1,minHeight:400,display:'flex',alignItems:'center'}} ><DeletedItemUI  title="test" isHovered={true}/></Paper>;
};

export default Experiment;
