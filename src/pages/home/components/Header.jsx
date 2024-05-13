import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import LogoImg from '../../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { MenuOutlined } from "@ant-design/icons";
import { PLAYSTORE_URL } from "../../../utils/constants";

const Header = ({handleClick, handleDrawer})=>{

  const navigate = useNavigate();
  const theme = useTheme();

  const isMdScreen = useMediaQuery('(min-width:960px)');
  const isMobileScreen = useMediaQuery('(min-width:600px)');

  const btnStyle = {
    width: "100px", 
    borderRadius: "30px", 
    fontSize: "16px",
    [theme.breakpoints.up('md')]: {
      width: "140px",
    }
  }

  const openPlayStore=()=>{
    window.open(PLAYSTORE_URL, '_blank', 'noopener')
  }


  return (
    <Box sx={{
      zIndex: "1100",
      position: "fixed",
      color: "rgb(240, 247, 255)",
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(191, 204, 217, 0.5)",
      boxShadow:"rgba(85, 166, 246, 0.1) 0px 0px 1px, rgba(85, 166, 246, 0.15) 1px 1.5px 2px -1px, rgba(85, 166, 246, 0.15) 4px 4px 12px -2.5px",
      right: 0,
      left: 0,
      m: "16px",
      p: "12px 16px",
      borderRadius: "36px"
    }}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} sx={{marginRight: "16px"}}>
          <Box component={"img"} src={LogoImg} width={"36px"} style={{marginLeft: "8px", marginRight: "8px"}}/>
          <Typography variant="h5" color={"#653BED"} fontSize={28} fontWeight={800}>mylingz</Typography>
        </Stack>
        {
          isMdScreen && <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
            <Button sx={btnStyle} onClick={()=>handleClick('features')}>
              <Typography variant="h5" color={"#333"} fontWeight={400}>Features</Typography>
            </Button>
            <Button sx={btnStyle} onClick={()=>handleClick('discover')} >
              <Typography variant="h5" color={"#333"} fontWeight={400}>Discover</Typography>
            </Button>
            <Button sx={btnStyle} onClick={()=>handleClick('testimonials')}>
              <Typography variant="h5" color={"#333"} fontWeight={400}>Testimonials</Typography>
            </Button>
            <Button sx={btnStyle} onClick={()=>handleClick('faq')} >
              <Typography variant="h5" color={"#333"} fontWeight={400}>FAQ</Typography>
            </Button>
          </Stack>
        }
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Button 
            variant="contained" 
            onClick={()=>openPlayStore()}
            sx={{width: "140px",fontWeight: 500, display: `${!isMobileScreen? "none": ""}`, borderRadius: "30px", backgroundImage: 'linear-gradient(45deg, #4D478B 30%, #151325 90%)'}}>Download App !</Button>
          {
            !isMdScreen && (
              <Box>
                <IconButton onClick={handleDrawer}>
                  <MenuOutlined/>
                </IconButton>
              </Box>
            )
          }
        </Stack>
      </Stack>
    </Box>
  )
}

export default Header;