import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { bioDataDiscover, userData } from "../../network/firebase";
import ContactForm from "../biolink/components/ContactForm";
import ButtonsInfo from "../biolink/components/ButtonsInfo";
import IconLinks from "../biolink/components/IconLinks";
import ProfileInfo from "../biolink/components/ProfileInfo";
import { gradients } from "../../theme/colors";

const { Box, Grid, Stack, Typography } = require("@mui/material")

const DiscoverPage =()=>{

  const [ data, setData ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snapshots = await getDocs(bioDataDiscover());
      const profilesPromises = snapshots.docs.map(async (e) => {
        const data = e.data();
        const userSnap = await getDocs(userData(data.id));
        const user = userSnap.docs[0].data();
        return { ...data, user: user };
      });
      const profiles = await Promise.all(profilesPromises);
      setData(profiles);
    }
    fetchData();
  }, []);

  const openLink=(url)=>{
    window.open(url, '_blank', 'noopener')
  }


  return (
    <Box sx={{background: "#fff"}}>
      <Grid container spacing={3} padding={4}>
        {
          data.map((d, idx)=>{
            return (
              <Grid item key={`${idx}`} lg={3} md={4} sm={6} xs={12} onClick={()=>openLink(`${d?.domainName}/${d?.bioId}`)}>
                <Stack direction={"column"}>
                  <Stack
                    direction={"column"}
                    sx={{
                      borderRadius: "2px",
                      maxWidth: "500px",
                      minWidth: "100%",
                      height: "400px",
                      overflow: "hidden",
                      background: d?.design?.background !=null ?  gradients[d?.design?.background] : null,
                      padding: "20px",
                      boxShadow: "0px 2px 30px #ccc6",
                    }}
                    spacing={3}
                  >
                    <ProfileInfo data={d}/>
                    <IconLinks data={d}/>
                    <ButtonsInfo data={d}/>
                    <Box sx={{height: "12px"}}/>
                    <ContactForm userId={'userId'} data={d}/>
                  </Stack>
                  <Box sx={{height: "8px"}}/>
                  <Typography variant="h4" fontSize={16}>{`${d?.user?.firstName} ${d?.user?.lastName}`}</Typography>
                  <Typography fontSize={12}>{`${d?.domainName}/${d?.bioId}`}</Typography>
                </Stack>
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  )
}

export default DiscoverPage;