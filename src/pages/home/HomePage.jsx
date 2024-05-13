import { Box } from "@mui/material";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

const HomePage = ()=>{

  const navigate = useNavigate();
  const sectionRefs = {
    home: useRef(null),
    features: useRef(null),
    testimonials: useRef(null),
    faq: useRef(null),
    contact: useRef(null)
  };

  const handleScrollToSection = (section) => {
    if(section==="discover"){
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
        <div ref={sectionRefs.features}>
          <Features />
        </div>
        <div ref={sectionRefs.testimonials}>
          <Testimonials />
        </div>
        <div ref={sectionRefs.faq}>
          <Faq />
        </div>
        <div ref={sectionRefs.contact} >
          <Contact/>
        </div>
        <Box
            sx={{
              margin: "0px 0px 54px 0px",
              borderTop: "1px solid rgba(191, 204, 217, 0.2)"
            }}
          />
        <Footer
          handleProductClick={(s)=>handleScrollToSection(s)}
        />
      </Box>
    </Box>
  )
}

export default HomePage;