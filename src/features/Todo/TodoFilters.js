import { Button, Grid } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useDispatch, useSelector } from "react-redux";

import {
  changeStatus as changeStatusAction,
  changeSortOrder,
} from "../../redux/slices/filterStatusSlice";

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
