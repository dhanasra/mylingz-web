import { Box, CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { analyticsData, linkData } from "../../network/firebase";
import { addDoc, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import { fetchDeviceLocation, getDeviceType } from "../../utils/utils";

const ForwardLink = () => {
  const { linkId } = useParams();

  useEffect(()=>{
    async function fetchData(){
      const snapshots = await getDocs(linkData(linkId));
      if(snapshots.docs.length>0){
        const shorLink = snapshots.docs[0].data();
        // const visited = Cookies.get("history");
        if(shorLink.createdBy && shorLink.short ){
          Cookies.set("visited", true);
          Cookies.set("history", shorLink.short);
          const location = await fetchDeviceLocation();
          const data = {
            dateTime: Date.now(),
            device: getDeviceType(),
            location: location
          }

          console.log(data)
          const resp = await addDoc( analyticsData(shorLink.createdBy, shorLink.short), data);
          console.log(resp.id)
        }
        let link = shorLink.url;
        if (!link.includes("https")) {
            link = "https://" + link;
        }
        window.location.replace(link);
      }
    }
    fetchData();
  },[linkId])


  return (
    <Box
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
      }}
    >
      <CircularProgress
        thickness={3} size={30} sx={{color: "#201A3F"}}
      />
    </Box>
  )
}

export default ForwardLink;