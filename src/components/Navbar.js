import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          TODOS
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
