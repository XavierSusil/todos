import {
  IconButton,
  Tooltip,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useRef, useEffect, forwardRef } from "react";

import useDebounceSearch from "../hooks/useDebounceSearch";
import { useSelector } from "react-redux";
import { selectTodoSearchTerm } from "../redux/slices/filterSortSlice";

export const SearchBar = forwardRef(({showAdornment}, ref) => {
  const setSearchTerm = useDebounceSearch("", 25);
  const searchTerm = useSelector(selectTodoSearchTerm);
  const handleSearchChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <TextField
      fullWidth
      placeholder="Search"
      value={searchTerm}
      onChange={handleSearchChange}
      inputRef={ref}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {(searchTerm !== "" || showAdornment) && (
             <Tooltip title="clear">
               <IconButton onClick={() => setSearchTerm("")}>
                <ClearIcon />
              </IconButton>
             </Tooltip>
            )}
          </InputAdornment>
        ),
        style: {
          backgroundColor: "white",
        },
      }}
    />
  );
});

const SearchBar2 = ({showAdornment,width}) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const searchBarRef = useRef();

  const handleSearchClick = async () => {
    setShowSearchBar(true);
  };

  useEffect(() => {
    /**
     * This is a very important flag (probably not the best way to code)
     * it is used for skipping the first click, for some reason the first click is
     * search icon click , at this point it won't be there at the dom thus creating nuissance
     */

    let flag = false;

    const handleClickOutside = (event) => {
      if (!flag) {
        flag = true;
        return;
      }

      if (
        flag &&
        !searchBarRef?.current?.contains(event.target) &&
        searchBarRef?.current?.value === ""
      )
        setShowSearchBar(false);
    };

    if (showSearchBar) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSearchBar]);

  return (
    <Box sx={showSearchBar ? {width:{width}} : {}}>
      {showSearchBar ? (
        <SearchBar ref={searchBarRef} showAdornment={showAdornment}/>
      ) : (
        <Tooltip title="Search List">
          <IconButton
            onClick={handleSearchClick}
            sx={{
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          >
            <SearchIcon color="white" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default SearchBar2;
