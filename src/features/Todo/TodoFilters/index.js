import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Popover,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  changeStatus as changeStatusAction,
  changeSortOrder,
} from "../../../redux/slices/filterStatusSlice";
import  PopoverFilterSort  from "./PopoverFilterSort";

const SearchBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popoverInSearchBar" : undefined;

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={handlePopover}
            sx={{ height: "100%" }}
          >
            <SortIcon />
            <ArrowDownwardIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={closePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{ p: 1 }}
          >
            <PopoverFilterSort close ={closePopover}/>
          </Popover>
        </Grid>
      </Grid>
    </>
  );
};

const TodoFilters = () => {
  const currentFilter = useSelector((state) => state.filter.filter);
  const currentSort = useSelector((state) => state.filter.sort);

  const dispatch = useDispatch();

  const handleAllButtonClick = () => {
    dispatch(changeStatusAction("ALL"));
  };

  const handleProgressButtonClick = () => {
    dispatch(changeStatusAction("IN_PROGRESS"));
  };

  const handleDoneButtonClick = () => {
    dispatch(changeStatusAction("COMPLETED"));
  };

  const handleSortIconClick = () => {
    dispatch(changeSortOrder());
  };

  return (
    <>
      <SearchBar />
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Grid item xs="auto" sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant={currentFilter === "ALL" ? "contained" : "outlined"}
            fullWidth
            onClick={handleAllButtonClick}
            color={currentFilter === "ALL" ? "secondary" : "primary"}
          >
            All
          </Button>
        </Grid>
        <Grid item xs="auto" sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant={currentFilter === "IN_PROGRESS" ? "contained" : "outlined"}
            fullWidth
            onClick={handleProgressButtonClick}
            color={currentFilter === "IN_PROGRESS" ? "secondary" : "primary"}
          >
            In Progress
          </Button>
        </Grid>

        <Grid item xs="auto" sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant={currentFilter === "COMPLETED" ? "contained" : "outlined"}
            fullWidth
            onClick={handleDoneButtonClick}
            color={currentFilter === "COMPLETED" ? "secondary" : "primary"}
          >
            Completed
          </Button>
        </Grid>
        <Grid item xs="auto" sx={{ display: "flex", justifyContent: "center" }}>
          <Button fullWidth variant="contained" onClick={handleSortIconClick}>
            <SortIcon fontSize="small" />
            {currentSort === "DESC" ? (
              <ArrowDownwardIcon fontSize="small" />
            ) : (
              <ArrowUpwardIcon fontSize="small" />
            )}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default TodoFilters;
