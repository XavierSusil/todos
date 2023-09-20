import { Typography, Box } from "@mui/material";
import Navbar from "../../components/Navbar";

import Todo from "../Todo";
import { useSelector } from "react-redux";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const Home = () => {
  const login = useSelector((state) => state.login.isLoggedIn);
  useCustomSnackbar();
  const landingPageBack = require("../../assets/landingPageBack.jpg");

  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginTop: "15vh",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {login ? (
          <Todo />
        ) : (
          <Box
            sx={{
              backgroundImage: `url(${landingPageBack})`,
              height: "100%",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <Typography variant="h3" component={"h1"}>
              LOGIN TO VIEW YOUR TODOS
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
