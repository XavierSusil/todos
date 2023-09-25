import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import extractDataFromForm from "../../utils/extractDataFromForm";
import useLocalStorage from "../../hooks/useLocalStorage";

import { createTodoThunk } from "../../redux/slices/loginSlice";

const CreateTodo = ({close}) => {
  const userid = useSelector((state) => state.login.user.id);
  const [token] = useLocalStorage("token", "");

  const [titleState, setTitle] = useState("");
  const [descriptionState, setDescription] = useState("");

  const dispatch = useDispatch();

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();

    setTitle("");
    setDescription("");

    const formData = new FormData(e.currentTarget);
    const data = extractDataFromForm(formData);
    data.userid = userid;

    dispatch(createTodoThunk({ data, token }));
    close();
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
        p: 2,
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
        value={titleState}
        onChange={changeTitle}
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
        value={descriptionState}
        onChange={changeDescription}
        multiline
        rows={4}
        fullWidth
        required
      />
      <FormControl>
        <FormLabel>Priority</FormLabel>
        <RadioGroup name="priority" defaultValue="low" row>
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

      <Button type="submit" variant="contained" sx={{ width: "50%" }}>
        CREATE
      </Button>
    </Box>
  );
};

export default CreateTodo;
