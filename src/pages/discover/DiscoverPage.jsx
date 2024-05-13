import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { analyticsData, bioDataDiscover, userData } from "../../network/firebase";
import ContactForm from "../biolink/components/ContactForm";
import ButtonsInfo from "../biolink/components/ButtonsInfo";
import IconLinks from "../biolink/components/IconLinks";
import ProfileInfo from "../biolink/components/ProfileInfo";
import { gradients } from "../../theme/colors";
import { FaEye } from "react-icons/fa6";

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

        const analyticsSnap = await getDocs(analyticsData(data.id, `m-${data.bioId}`));
        const count = analyticsSnap.docs.length;

        return { ...data, user: user, views: count };
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
        <Grid item xs={12} sx={{mb: 3}}>
          <Stack alignItems={"center"} sx={{mb: "32px", textAlign: "center"}} spacing={1}>
            <Typography variant="h2">Discover Profiles</Typography>
            <Typography>Explore profiles, enquire, expand your digital connections!</Typography>
          </Stack>
        </Grid>
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
                  <Stack direction={"row"} justifyContent={"space-between"} sx={{pr: "8px"}}>
                    <Stack>
                      <Typography variant="h4" fontSize={16}>{`${d?.user?.firstName} ${d?.user?.lastName}`}</Typography>
                      <Typography fontSize={12}>{`${d?.slogan ?? '-'}`}</Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <Typography fontSize={14}>{`${d?.views ?? ''}`}</Typography>
                      <FaEye style={{fontSize: "16px"}}/>
                    </Stack>
                  </Stack>
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