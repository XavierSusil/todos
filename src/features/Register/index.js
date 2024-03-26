import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { enqueueSnackbar } from "notistack";
import RegisterImage from "../../assets/registerPageBack.jpg";

import { useNavigate } from "react-router-dom";
import registerApi from "../../api/registerApi";
import validate from "../../utils/validate/validate";
import { useState } from "react";
import CircularLoadingOverlayWrapper from "../../components/LoadingOverlay";

const enqueEmptyErrorMessage = (field) => {
  enqueueSnackbar(`Please enter ${field}`, {
    variant: "warning",
    autoHideDuration: 3000,
  });
};

const enqueInvalidErrorMessage = (field) => {
  enqueueSnackbar(`Invalid ${field} is entered`, {
    variant: "warning",
    autoHideDuration: 2000,
  });
};

const validateForm = (data) => {
  let returnFlag = false;

  let formData = {
    "First Name": data.get("firstName"),
    "Last Name": data.get("lastName"),
    Username: data.get("username"),
    Email: data.get("email"),
    Password: data.get("password"),
    "Confirm Password": data.get("confirmPassword"),
  };

  Object.keys(formData).forEach((entry) => {
    if (returnFlag) return;
    if (formData[entry] === "") {
      enqueEmptyErrorMessage(entry);
      returnFlag = true;
    }
    if (returnFlag) return;
    // converting the key format to match the key format of regexPatterns Object key
    let key =
      entry[0].toLowerCase() +
      entry
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace(" ", "")
        .slice(1);
    if (!validate(key, formData[entry])) {
      enqueInvalidErrorMessage(entry);
      returnFlag = true;
    }
  });
  if (returnFlag) return false;

  if (formData["Password"] !== formData["Confirm Password"]) {
    enqueueSnackbar("Passwords do not match", {
      variant: "warning",
      autoHideDuration: 3000,
    });
    return false;
  }

  return true;
};

const Register = () => {
  const navigate = useNavigate();
  const [registerButtonLoading, setRegisterButtonLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (validateForm(data)) {
      setRegisterButtonLoading(true);
      const dataFromApi = await registerApi(data);
      setRegisterButtonLoading(false);
      if (dataFromApi.hasOwnProperty("token")) {
        enqueueSnackbar("User Registered Successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate("/login");
      } else {
        enqueueSnackbar(dataFromApi.message, {
          variant: "warning",
          autoHideDuration: 3000,
        });
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={5}>
        <Paper
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
                REGISTER
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2} sx={{mb:1}}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="confirm-password"
                    />
                  </Grid>
                </Grid>
                <CircularLoadingOverlayWrapper
                  isLoading={registerButtonLoading}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ p: 1 }}
                  >
                    REGISTER
                  </Button>
                </CircularLoadingOverlayWrapper>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        style={{
          backgroundImage: `url(${RegisterImage})`,
          backgroundSize: "cover",
        }}
      ></Grid>
    </Grid>
  );
};

export default Register;
