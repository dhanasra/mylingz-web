import { Box } from "@mui/material";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import HomeDrawer from "./components/HomeDrawer";
import Application from "./components/Application";

const HomePage = ()=>{

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const sectionRefs = {
    home: useRef(null),
    features: useRef(null),
    application: useRef(null),
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
      <HomeDrawer
        open={open} 
        onClose={()=>setOpen(false)}
        handleClick={(v)=>{
          setOpen(false);
          handleScrollToSection(v)
        }}
      />
      <Header
        handleClick={(s)=>handleScrollToSection(s)}
        handleDrawer={()=>setOpen(true)}
      />
      <Box sx={{display: "flex", flexDirection: "column"}}>
        <div ref={sectionRefs.home}>
          <Banner />
        </div>
        <div ref={sectionRefs.features}>
          <Features />
        </div>
        <div ref={sectionRefs.application}>
          <Application />
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