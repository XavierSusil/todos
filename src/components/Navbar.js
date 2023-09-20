import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { logout as clearLogin } from "../redux/slices/loginSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  // if true, the user is currently logged in
  // const [isLogin, ,clearLogin] = useLocalStorage("login",false);
  const isLogin = useSelector((state) => state.login.isLoggedIn);
  const username = useSelector((state) => state.login.user?.username);
  const dispatch = useDispatch();
  const [, , clearToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const handleButtonClickLogin = () => {
    // logout button is currently in navbar so clear localstorage
    if (isLogin) {
      clearToken();
      dispatch(clearLogin());
      enqueueSnackbar("logged out successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } else {
      navigate("/login");
    }
  };

  const handleRegisterButtonClick = () => {
    navigate("/register");
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          HOME
        </Typography>
        {isLogin ? (
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
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={handleRegisterButtonClick}
            >
              REGISTER
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleButtonClickLogin}
            >
              LOGIN
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
