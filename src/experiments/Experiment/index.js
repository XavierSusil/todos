import { Box, Typography, Button, Toolbar, AppBar } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import SearchBar2, { SearchBar } from "../../components/SearchBar2";
import Navbar from "../../components/Navbar";

const SearchBarWidthComponent = forwardRef((props,ref) => {

  return  <AppBar {...props}>
  <Toolbar>
    <div  ref={ref}>
      <SearchBar showAdornment={true} />
    </div>
  </Toolbar>
</AppBar>
}) 

const Experiment = () => {
  const WrapperRef = useRef();

  const [width,setWidth] = useState(0)
 
  useEffect(() => {
    if(!width)
    {
      console.log(WrapperRef.current?.getBoundingClientRect());
    setWidth(WrapperRef?.current?.getBoundingClientRect().width);
    }
  }, [width]);

  return (
    <AppBar>
      <Toolbar >
      <Box>
      <Box ref={WrapperRef}  >
      {
        !width ? <SearchBar showAdornment={true} /> :
          <SearchBar2 width={width}/>
      } 
      </Box>
      </Box>
      {width}
      </Toolbar>
    </AppBar>
  );
};

export default Experiment;
