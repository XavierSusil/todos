import { Box } from "@mui/material";

const Experiment = () => {
  const handleParentClick = (event) => {
    console.log(event.target, event.currentTarget);
  };

  const handleChildBoxClick = (event) => {
    console.log(event.target, event.currentTarget);
    event.stopPropagation();
  };
  return (
    <Box onClick={handleParentClick}>
      <Box>
        <Box onClick={handleChildBoxClick}>inside all the boxes</Box>
      </Box>
    </Box>
  );
};

export default Experiment;
