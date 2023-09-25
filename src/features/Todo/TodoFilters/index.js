import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Popover,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";

import  PopoverFilterSort  from "./PopoverFilterSort";
import useDebounceSearch from "../../../hooks/useDebounceSearch";

const TodoFilters = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const setSearchTerm = useDebounceSearch('',1000);
  
  const handleSearchChange =  (e) => {
    setSearchTerm(e.currentTarget.value);
  }

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
      <Grid container spacing={1} >
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Search"
            onChange={handleSearchChange}
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
            sx={{ height: "100%",width:'100%' }}
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

export default TodoFilters;
