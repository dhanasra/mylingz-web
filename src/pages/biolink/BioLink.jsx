import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { analyticsData, bioData } from "../../network/firebase";
import { addDoc, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import { fetchDeviceLocation, getDeviceType } from "../../utils/utils";
import { gradients } from "../../theme/colors";
import ProfileInfo from "./components/ProfileInfo";
import ButtonsInfo from "./components/ButtonsInfo";
import ContactForm from "./components/ContactForm";
import IconLinks from "./components/IconLinks";


let count = 0;

const BioLink =()=>{

  const { bioId } = useParams();
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);

  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isTabScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  var pageBackground = data?.design?.background !=null ?  gradients[data?.design?.background] : null;



  useEffect(()=>{
    async function fetchData(){
      const snapshots = await getDocs(bioData(bioId));

      if(snapshots.docs.length>0){
        const newData = snapshots.docs[0].data();
        setData(newData);
        setUserId(snapshots.docs[0].id)
        const isVisited = Cookies.get("visited");
        const visited = Cookies.get("history");

        console.log(!isVisited);
        console.log(visited);
        console.log(count);

        if(count===0 && !isVisited && newData.id && newData.bioId && visited!==newData.bioId){
          count++;
          Cookies.set("visited", true);
          Cookies.set("history", newData.bioId);
          const location = await fetchDeviceLocation();
          const data = {
            dateTime: Date.now(),
            device: getDeviceType(),
            location: location
          }
          const ref = await addDoc( analyticsData(newData.id, `m-${newData.bioId}`), data);
          console.log(ref)
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
          borderRadius: isMobileScreen ? "0": "16px 16px 0 0",
          maxWidth: "500px",
          minWidth: isMobileScreen ? "100%": isTabScreen ? "600px": "400px",
          background: pageBackground,
          padding: isMobileScreen ? "16px": isTabScreen ? "20px 50px" :  "20px",
          boxShadow: "0px 2px 30px #ccc6"
        }}
        spacing={3}
      >
        <ProfileInfo data={data}/>
        <IconLinks data={data}/>
        <ButtonsInfo data={data}/>
        <Box sx={{height: "12px"}}/>
        <ContactForm userId={userId} data={data}/>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Typography >Made With MYLingz</Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

export default BioLink;