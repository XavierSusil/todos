import { Typography, Box } from "@mui/material";
import Navbar from "../../components/Navbar";
import Todo from "../Todo";
import { useSelector } from "react-redux";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { useEffect } from "react";

const Home = () => {
  const login = useSelector((state) => state.login.isLoggedIn);
  useCustomSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login, navigate]);

  if (login) {
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
          <Todo />
        </Box>
      </>
    );
  }
};

export default Home;
