import { Grid, Typography, Paper, Divider, Box } from "@mui/material";
import Navbar from "../../components/Navbar";
import styled from "@emotion/styled";

import landinPageBack from "../../assets/landingPageBack.jpg"

const FlexPaper = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
});

const Home = () => {
  return (
    <>
      <Grid container sx={{ minHeight: "100vh" ,overflow:'hidden'}}>
        <Grid item xs={2}>
          <FlexPaper elevation={24}>
            <Typography variant="h2" component={"h2"} noWrap>
              TODOS
            </Typography>
            <Divider sx={{ borderBottomWidth: 1, width: "85%" }} />
          </FlexPaper>
        </Grid>
        <Grid item xs={10}>
          <Navbar />
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              backgroundImage: `url(${landinPageBack})`,
              backgroundSize: "cover",
            }}
          >
            <Typography variant="h3" component={"h1"}>
              LOGIN TO VIEW YOUR TODOS
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
