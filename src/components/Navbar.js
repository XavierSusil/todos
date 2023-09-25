import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import useLocalStorage from "../hooks/useLocalStorage";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { logout as clearLogin } from "../redux/slices/loginSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import useSmallScreen from "../hooks/useSmallScreen";

const Navbar = () => {
  const username = useSelector((state) => state.login.user?.username);
  const isSmallScreen = useSmallScreen();
  const dispatch = useDispatch();
  const [, , clearToken] = useLocalStorage("token", "");

  const handleButtonClickLogin = () => {
    // logout button is currently in navbar so clear localstorage
    clearToken();
    dispatch(clearLogin());
    enqueueSnackbar("logged out successfully", {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  const LoggedIn = () => {
    let component = isSmallScreen ? (
      <MenuIcon />
    ) : (
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccountCircleIcon />
          <Typography>{username}</Typography>
        </Box>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleButtonClickLogin}
        >
          LOGOUT
        </Button>
      </Box>
    );

    return component;
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isSmallScreen ? (
          <Box sx={{ flexGrow: 1 }}>
            <HomeIcon />
          </Box>
        ) : (
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            HOME
          </Typography>
        )}
        <LoggedIn />
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
