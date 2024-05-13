import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { CheckCircleOutlined } from "@ant-design/icons";
import UserImage from "../../../assets/user.png";
import UrlImage from "../../../assets/url.png";

const Features = ()=>{

  const theme = useTheme();

  return (
    <Grid container sx={{paddingBottom: "60px", background: "#efefef"}} spacing={6}>
        <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
          <Typography 
            sx={{
              color: '#151325',
              fontSize: "28px",
              margin: "0 16px 0 16px",
              fontWeight: 800,
              lineHeight: 1.6,
              maxWidth: "700px",
              textAlign: "center",
              [theme.breakpoints.up('md')]: {
                fontSize: "36px",
              },
              [theme.breakpoints.up('sm')]: {
                fontSize: "34px",
              }
            }}  
          >{`Design clear, trackable interactions using mylingz`}</Typography>
        </Grid> 

        <Grid item xs={12}>
            <Grid container alignItems={"center"} justifyContent={"center"} spacing={4}>
              <Grid item xs={12} md={4}>
                <Box
                  p={3}
                  sx={{
                    background: "#fff",
                    borderRadius: "6px"
                  }}
                >
                  <Stack direction={"column"} >
                      <Stack direction={"row"} spacing={1}>
                        <Box component={"img"} src={UrlImage} width={30}/>
                        <Typography variant="h3">URL Shortener</Typography>
                      </Stack>
                      <Box sx={{height: "10px"}}/>
                      <Typography fontSize={16}>Transform your URLs into dynamic brand tools, fueling engagement with every click.</Typography>
                      <Divider sx={{my: "20px"}}/>
                      <Stack direction={"column"} spacing={2}>
                        <Stack direction={"row"} spacing={2} alignItems={"start"}>
                          <CheckCircleOutlined style={{fontSize: "18px", color:"#653BED"}}/>
                          <Typography fontSize={16}>Easily tailor your links for maximum impact.</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2} alignItems={"start"}>
                          <CheckCircleOutlined style={{fontSize: "18px", color:"#653BED"}}/>
                          <Typography fontSize={16}>Efficiently organize and monitor all links from one convenient hub.</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2} alignItems={"start"}>
                          <CheckCircleOutlined style={{fontSize: "18px", color:"#653BED"}}/>
                          <Typography fontSize={16}>Harness valuable insights from click data to drive informed strategies.</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  p={3}
                  sx={{
                    background: "#fff",
                    borderRadius: "6px"
                  }}
                >
                  <Stack direction={"column"} >
                      <Stack direction={"row"} spacing={1}>
                        <Box component={"img"} src={UserImage} width={30}/>
                        <Typography variant="h3">Link In Bio</Typography>
                      </Stack>
                      <Box sx={{height: "10px"}}/>
                      <Typography fontSize={16}>Elevate views, sales, subscribers, and leads through tailored mini landing pages.</Typography>
                      <Divider sx={{my: "20px"}}/>
                      <Stack direction={"column"} spacing={2}>
                        <Stack direction={"row"} spacing={2} alignItems={"start"}>
                          <CheckCircleOutlined style={{fontSize: "18px", color:"#653BED"}}/>
                          <Typography fontSize={16}>Maximize the potential of your links.</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2} alignItems={"start"}>
                          <CheckCircleOutlined style={{fontSize: "18px", color:"#653BED"}}/>
                          <Typography fontSize={16}>Craft unique connection moments effortlessly, no coding required.</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2} alignItems={"start"}>
                          <CheckCircleOutlined style={{fontSize: "18px", color:"#653BED"}}/>
                          <Typography fontSize={16}>Efficiently oversee, organize, and analyze all links from a unified dashboard.</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                </Box>
              </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default Features;