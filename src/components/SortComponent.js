import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../redux/slices/filterSortSlice";
import propTypes from "prop-types";
/**
 * It creates a new Sort button and manages the popover of it
 * The popover is internally created by the PopoverSort component
 *
 * @returns {JSX.Element}
 */

export const PopoverSort = ({ onClose }) => {
  const [checkBoxes, setCheckBoxes] = useState(
    useSelector((state) => state.filterSort.status)
  );
  const dispatch = useDispatch();

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setCheckBoxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSortChange = (e) => {
    setCheckBoxes((prev) => ({ ...prev, sort: e.currentTarget.value }));
  };

  const handleSortOrderClick = (e) => {
    const { name } = e.currentTarget;

    setCheckBoxes((prev) => ({
      ...prev,
      [name]: prev[name] === "asc" ? "desc" : "asc",
    }));
  };

  useEffect(() => {
    dispatch(updateStatus(checkBoxes));
  }, [checkBoxes, dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="primary" fontWeight="bold">
          Sort Todos{" "}
        </Typography>
        <CloseIcon
          style={{ opacity: 0.5, cursor: "pointer" }}
          fontSize="small"
          onClick={onClose}
        />
      </Box>
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
                label={checkBoxes.recentOrder === "asc" ? "Oldest" : "Recent"}
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
  );
};

PopoverSort.propTypes = {
  onClose: propTypes.func,
};

export const SortComponent = () => {
  const [sortEl, setSortEl] = useState(null);

  const handleSortPopover = (e) => {
    setSortEl(e.currentTarget);
  };

  const closeSortPopover = () => {
    setSortEl(null);
  };

  const openSort = Boolean(sortEl);
  const sortId = openSort ? "popoverSortId" : undefined;

  const component = (
    <Tooltip title="Sort List">
      <IconButton
        variant="contained"
        onClick={handleSortPopover}
        color="primary"
        sx={{
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
      >
        <ImportExportIcon />
      </IconButton>
    </Tooltip>
  );

  const sortPopover = (
    <Popover
      id={sortId}
      open={openSort}
      anchorEl={sortEl}
      onClose={closeSortPopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <PopoverSort onClose={closeSortPopover} />
    </Popover>
  );

  return (
    <>
      {component}
      {sortPopover}
    </>
  );
};
