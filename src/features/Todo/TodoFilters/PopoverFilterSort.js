import {
  Button,
  Grid,
  IconButton,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Paper,
  Box,
  Divider,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultFilterSortState,
  updateStatus,
} from "../../../redux/slices/filterSortSlice";

const CheckBoxGenerator = ({ name, state, handle }) => {
  return (
    <FormControlLabel
      control={<Checkbox name={name} checked={state[name]} onChange={handle} />}
      label={name[0].toUpperCase() + name.slice(1)}
    />
  );
};

const PopoverFilterSort = ({ close }) => {
  const [checkBoxes, setCheckboxes] = useState(
    useSelector((state) => state.filterSort.status)
  );

  const dispatch = useDispatch();

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSortChange = (e) => {
    setCheckboxes((prev) => ({ ...prev, sort: e.currentTarget.value }));
  };

  const handleAllChange = () => {
    setCheckboxes((prev) => ({
      ...prev,
      progress: !prev.all,
      completed: !prev.all,
      all: !prev.all,
    }));
  };

  const handleSortOrderClick = (e) => {
    const { name } = e.currentTarget;

    setCheckboxes((prev) => ({
      ...prev,
      [name]: prev[name] === "asc" ? "desc" : "asc",
    }));
  };

  const handleApplyclick = () => {
    dispatch(updateStatus(checkBoxes));
    close();
  };

  const handleResetClick = () => {
    setCheckboxes(defaultFilterSortState.status);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs="auto" sx={{ p: 1 }}>
          <Typography sx={{ textAlign: "center" }}> Sort</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Paper
              sx={{
                px: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="priority"
                    checked={checkBoxes.priority}
                    onChange={handleCheckBoxChange}
                  />
                }
                label="Priority"
              />
              <IconButton
                name="priorityOrder"
                onClick={handleSortOrderClick}
                color="primary"
              >
                {checkBoxes.priorityOrder === "desc" ? (
                  <ArrowDownwardIcon />
                ) : (
                  <ArrowUpwardIcon />
                )}
              </IconButton>
            </Paper>
            <Paper sx={{ px: 1 }}>
              <FormControl>
                <RadioGroup
                  defaultValue="recent"
                  value={checkBoxes.sort}
                  name="sort"
                  onChange={handleSortChange}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      value="recent"
                      control={<Radio />}
                      label={
                        checkBoxes.recentOrder === "asc" ? "Oldest" : "Recent"
                      }
                    />
                    <IconButton
                      name="recentOrder"
                      onClick={handleSortOrderClick}
                      color="primary"
                    >
                      {checkBoxes.recentOrder === "desc" ? (
                        <ArrowDownwardIcon />
                      ) : (
                        <ArrowUpwardIcon />
                      )}
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      value="alphabetical"
                      control={<Radio />}
                      label="Alphabetical"
                    />
                    <IconButton
                      name="alphabeticalOrder"
                      onClick={handleSortOrderClick}
                      color="primary"
                    >
                      {checkBoxes.alphabeticalOrder === "desc" ? (
                        <ArrowDownwardIcon />
                      ) : (
                        <ArrowUpwardIcon />
                      )}
                    </IconButton>
                  </Box>
                </RadioGroup>
              </FormControl>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 1 }}>
            <Typography sx={{ textAlign: "center" }}> Filter</Typography>
            <Divider />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography sx={{ textAlign: "center" }}>Priority</Typography>
                <FormGroup>
                  {["low", "medium", "high"].map((priority) => (
                    <CheckBoxGenerator
                      key={priority}
                      name={priority}
                      state={checkBoxes}
                      handle={handleCheckBoxChange}
                    />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ textAlign: "center" }}>Status</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="all"
                      checked={checkBoxes.progress && checkBoxes.completed}
                      indeterminate={
                        checkBoxes.progress !== checkBoxes.completed
                      }
                      onChange={handleAllChange}
                    />
                  }
                  label="All"
                />
                <FormGroup>
                  {["progress", "completed"].map((status) => (
                    <CheckBoxGenerator
                      key={status}
                      name={status}
                      state={checkBoxes}
                      handle={handleCheckBoxChange}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", flexDirection: "row", p: 1, gap: 1 }}>
        <Button variant="contained" fullWidth onClick={close}>
          Cancel
        </Button>
        <Button variant="outlined" fullWidth onClick={handleResetClick}>
          Reset
        </Button>
        <Button variant="contained" fullWidth onClick={handleApplyclick}>
          Apply
        </Button>
      </Box>
    </>
  );
};

export default PopoverFilterSort;
