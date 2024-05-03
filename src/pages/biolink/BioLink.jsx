import { Avatar, Box, Button, Grid, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { analyticsData, bioData } from "../../network/firebase";
import { getDocs } from "firebase/firestore";
import AnimateButton from "../../components/AnimateButton";
import { useTheme } from "@emotion/react";
import Cookies from "js-cookie";
import { fetchDeviceLocation, getDeviceType } from "../../utils/utils";


let count = 0;

const BioLink =()=>{

  const { bioId } = useParams();
  const [data, setData] = useState(null);

  const theme = useTheme();

  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(()=>{
    async function fetchData(){
      const snapshots = await getDocs(bioData(bioId));
      if(snapshots.docs.length>0){
        const newData = snapshots.docs[0].data();
        setData(newData);
        const isVisited = Cookies.get("visited");
        const visited = Cookies.get("history");
        if(count===0 && !isVisited && newData.id && newData.bioId && visited==newData.bioId){
          count++;
          Cookies.set("visited", true);
          Cookies.set("history", newData.bioId);
          const location = await fetchDeviceLocation();
          const data = {
            dateTime: Date.now(),
            device: getDeviceType(),
            location: location
          }
          await addDoc( analyticsData(newData.id, `m/${newData.bioId}`), data);
        }
      }
    }
    fetchData();
  },[bioId])

  return (
    <Stack alignItems={"center"} paddingTop={ isMobileScreen ? "0px" : "40px"} direction={"column"}>
      <Stack
        direction={"column"}
        sx={{
          borderRadius: "4px",
          maxWidth: "500px",
          minWidth: isMobileScreen ? "100%": "380px",
          background: "white",
          padding: isMobileScreen ? "16px": "20px",
          boxShadow: "0px 2px 30px #ccc6"
        }}
        spacing={3}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          
        >
          <Avatar sx={{width: "120px", height: "120px"}} src={data?.picture}/>
          <Box height={"16px"} />
          <Typography variant="h2">{data?.title}</Typography>
          <Typography >{data?.slogan}</Typography>
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
        >
          <Grid container justifyContent={"center"}>
            {
              data?.icons?.map((e)=>{
                return (
                  <Grid item sx={{p: 1}}>
                    <Avatar src={e?.icon} sx={{width: "60px", height: "60px"}}/>
                  </Grid>
                )
              })
            }
          </Grid>
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          width={"100%"}
        >
          {
            data?.buttons?.map((e)=>{
              return (
                <AnimateButton>
                  <Button onClick={()=>{}}  variant="contained" sx={{width: "100%", borderRadius: "100px", p: 1.5, background: "lightgray"}}>
                    <Typography variant="body1" fontSize={16} color={"black"}>{e.text}</Typography>
                  </Button>
                </AnimateButton>
              )
            })
          }
        </Stack>
        <Box
          sx={{
            border: "1px solid",
            borderColor: theme.palette.grey.A800,
            p: 3,
            borderRadius: "20px"
          }}
        >
          <Stack alignItems={"center"} spacing={1}>
            <Typography variant="h4">Contact Us</Typography>
            <Box sx={{height: "10px"}}/>
            <Stack
              direction={"column"}
              spacing={2}
              sx={{width: "100%"}}
            >
              {
                data?.contactFields?.map((e)=>{
                  return (
                    <Stack spacing={1} >
                        <InputLabel htmlFor="fname">{e.label}</InputLabel>
                        <OutlinedInput
                          id="firstName"
                          type="text"
                          name="fname"
                          placeholder={`Enter ${e.label}`}
                          onChange={()=>{}}
                          fullWidth
                        />
                    </Stack>
                  )
                })
              }
              <Box sx={{height: "20px"}}/>
              <Button onClick={()=>{}}  variant="contained" sx={{width: "100%"}}>
                  <Typography variant="body1" fontSize={16} >Submit</Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Typography >Made With MYLingz</Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

export default BioLink;