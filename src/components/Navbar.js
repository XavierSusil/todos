import { AppBar, Toolbar, Typography, Box } from "@mui/material";

import { useRef, useEffect, forwardRef, useState } from "react";
import { SortComponent, FilterComponent } from "./TodoFilters";
import SearchBar2, { SearchBar } from "./SearchBar2";
import { UserDetails } from "./UserDetails";

const Navbar = () => {
  const [searchBarWidth, setSearchBarWidth] = useState(0);
  const WrapperRef = useRef();
  useEffect(() => {
    if (!searchBarWidth) {
      setSearchBarWidth(WrapperRef?.current?.getBoundingClientRect().width);
    }
  }, [searchBarWidth]);
  return (
    <AppBar position="relative">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            TODO LIST
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box ref={WrapperRef}>
              {!searchBarWidth ? (
                <SearchBar showAdornment={true} />
              ) : (
                <SearchBar2 width={searchBarWidth} />
              )}
            </Box>
            <SortComponent />
            <FilterComponent />
            <UserDetails />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
