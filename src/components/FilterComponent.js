import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../redux/slices/filterSortSlice";
import { CheckBoxGenerator } from "./CheckBoxGenerator";

export const PopoverFilter = ({ onClose }) => {
  const [checkBoxes, setCheckBoxes] = useState(
    useSelector((state) => state.filterSort.status)
  );

  const dispatch = useDispatch();

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setCheckBoxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAllChange = () => {
    setCheckBoxes((prev) => ({
      ...prev,
      progress: !prev.all,
      completed: !prev.all,
      all: !prev.all,
    }));
  };

  useEffect(() => {
    dispatch(updateStatus(checkBoxes));
  }, [checkBoxes, dispatch]);

  return (
    <Grid container spacing={1} style={{ padding: "1rem" }}>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography color="primary" fontWeight="bold">
          Filter Todos
        </Typography>
        <CloseIcon
          style={{ opacity: 0.5, cursor: "pointer" }}
          fontSize="small"
          onClick={onClose}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight="bold">Priority</Typography>
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
        <Typography fontWeight="bold">Status</Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="all"
              checked={checkBoxes.progress && checkBoxes.completed}
              indeterminate={checkBoxes.progress !== checkBoxes.completed}
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
  );
};

PopoverFilter.propTypes = {
  onClose: propTypes.func,
};

/**
 * Responsible for filter button and the popover for the filter
 * It internally uses PopoverFilter to handle the popover
 *
 * @returns {JSX.Element}
 */

export const FilterComponent = ({ componentColor }) => {
  const [filterEl, setFilterEl] = useState(null);
  const open = Boolean(filterEl);
  const id = open ? "popoverInSearchBar" : undefined;

  const handleFilterPopover = (e) => {
    setFilterEl(e.currentTarget);
  };

  const closeFilterPopover = () => {
    setFilterEl(null);
  };

  const component = (
    <Tooltip title="Filter List">
      <IconButton
        variant="contained"
        onClick={handleFilterPopover}
        color="primary"
        sx={{
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
      >
        <FilterAltIcon />
      </IconButton>
    </Tooltip>
  );

  const filterPopover = (
    <Popover
      id={id}
      open={open}
      anchorEl={filterEl}
      onClose={closeFilterPopover}
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
      <PopoverFilter onClose={closeFilterPopover} />
    </Popover>
  );

  return (
    <>
      {component}
      {filterPopover}
    </>
  );
};

FilterComponent.propTypes = {
  componentColor: propTypes.string,
};
