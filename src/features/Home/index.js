import { Grid, Typography, Paper } from "@mui/material";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <Grid container sx={{minHeight:'100vh'}}>
        <Grid item xs={3} >
          <Paper elevation={12} sx={{height:'100%'}}>
            <Typography variant="h2" component={"h2"}>
              Side Bar
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Navbar />
          <Typography variant="h1" component={"h1"}>
            Home Page
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
