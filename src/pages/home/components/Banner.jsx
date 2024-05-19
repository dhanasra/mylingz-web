import { ArrowRightOutlined } from "@ant-design/icons";
import { Box, Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import AppImg from "../../../assets/app-3d.png";
import { useNavigate } from "react-router-dom";

const Banner = ()=>{

  const theme = useTheme();

  // const isMdScreen = useMediaQuery('(min-width:960px)');
  const isMobileScreen = useMediaQuery('(min-width:600px)');

  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={8}>
      <Grid container sx={{py: "200px"}}>
          <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
            <Typography 
              sx={{
                background: `linear-gradient(45deg, #DE6262 30%, rgba(79, 75, 255, 0.9294) 90%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontSize: "32px",
                lineHeight: 1.2,
                margin: "0 16px 0 16px",
                fontWeight: 800,
                maxWidth: "1000px",
                textAlign: "center",
                [theme.breakpoints.up('md')]: {
                  fontSize: "54px",
                },
                [theme.breakpoints.up('sm')]: {
                  fontSize: "44px",
                }
              }}  
            >{`Engage, connect, track with Mylingz's versatile tools.`}</Typography>
          </Grid> 

          <Grid item xs={12}>
            <Box height={"24px"}/>
          </Grid>

          <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
            <Typography 
              sx={{
                textAlign: "center",
                fontWeight: 500,
                fontSize: "18px",
                margin: "0 36px 0 36px",
                maxWidth: "700px",
                [theme.breakpoints.up('md')]: {
                  fontSize: "18px",
                },
                [theme.breakpoints.up('sm')]: {
                  fontSize: "18px",
                }
              }}  
            >{`Leverage our URL trimmer and Hub pages to captivate your audience and link them to pertinent info. Craft, adjust, and monitor all within the Mylingz Networking Suite.`}</Typography>
          </Grid> 

          <Grid item xs={12}>
            <Box height={"44px"}/>
          </Grid>

          <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>

            <Button
              onClick={()=>navigate('/auth/register')}
              sx={{
                color: "white",
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: "30px",
                padding: "16px 64px",
                cursor: "pointer",
                boxShadow: "0px 4px 14px 0px #DE6262",
                [theme.breakpoints.down('sm')]: {
                  padding: "14px 24px",
                }
              }}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography variant="h4"
                  sx={{
                    fontSize: "18px",
                    [theme.breakpoints.down('sm')]: {
                      fontSize: "16px",
                    },
                  }}
                >Get Started !</Typography>
                <ArrowRightOutlined style={{fontSize: !isMobileScreen ? "16px" :"20px"}}/>
              </Stack>
            </Button>

          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{height: "800px", alignItems: "center", justifyContent: "center", display: "flex"}}>
        <Box component={"img"} src={AppImg} width={"350px"} height={"670px"}/>
      </Grid> 
    </Grid>
  )
}

export default Banner;