import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper, Grid ,Link} from "@mui/material";

import LoginImage from "../../assets/loginPageBack.jpg";
import loginApi from "../../api/loginApi";
import useLocalStorage from "../../hooks/useLocalStorage";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage("token", "");
  const [, setLogin] = useLocalStorage("login", "");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    const fromApi = await loginApi(data.get("username"), data.get("password"));
    if (fromApi.hasOwnProperty("token")) {
      enqueueSnackbar("Login Success", { variant: "success" });
      setToken(fromApi.token);
      setLogin(true);
      navigate("/");
    } else {
      enqueueSnackbar("Login Failed", { variant: "error" });
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: "cover",
        }}
      ></Grid>
      <Grid item xs={12} sm={8} md={5}>
        <Paper
          elevation={12}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                lOGIN
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/register" variant="body2">
                      Do not have an account? Register
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
