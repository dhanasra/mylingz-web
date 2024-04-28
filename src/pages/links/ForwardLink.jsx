import { Box, CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { linkData } from "../../network/firebase";
import { getDocs } from "firebase/firestore";

const ForwardLink = () => {
  const { linkId } = useParams();

  useEffect(()=>{
    async function fetchData(){
      const snapshots = await getDocs(linkData(linkId));
      if(snapshots.docs.length>0){
        const url = snapshots.docs[0].data().url;
        window.location.replace(url)
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