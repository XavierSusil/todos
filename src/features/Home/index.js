import { Typography,Box } from "@mui/material";
import Navbar from "../../components/Navbar";

import Todo from "../Todo";
import { useSelector } from "react-redux";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const Home = () => {
  const login = useSelector((state) => state.login.isLoggedIn);
  useCustomSnackbar();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {login ? (
          <Todo />
        ) : (
          <Typography variant="h3" component={"h1"}>
            LOGIN TO VIEW YOUR TODOS
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Home;
