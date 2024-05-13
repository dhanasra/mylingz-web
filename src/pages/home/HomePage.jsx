import { Box } from "@mui/material";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ()=>{

  const navigate = useNavigate();
  const sectionRefs = {
    home: useRef(null)
  };

  const handleScrollToSection = (section) => {
    if(section=="discover"){
      navigate('/discover');
    }else if (sectionRefs[section].current) {
      sectionRefs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box>
      <Header
        handleClick={(s)=>handleScrollToSection(s)}
      />
      <Box sx={{display: "flex", flexDirection: "column"}}>
        <div ref={sectionRefs.home}>
          <Banner />
        </div>
      </Box>
    </Box>
  )
}

export default HomePage;