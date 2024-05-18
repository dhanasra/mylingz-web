import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import LINKS_EMPTY from "../../../assets/app_images/share-link.png"
import { useNavigate } from "react-router-dom";

const LinksEmpty = ()=>{

  const navigate = useNavigate();

  return (
    <Grid container justifyContent={"center"} >
      <Grid item xs={12} sm={8} md={6}>
        <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
          <Box component={"img"} src={LINKS_EMPTY} width={"250px"}/>
          <Typography
            textAlign={"center"}
            variant="h3"
            fontWeight={500}
            sx={{
              padding: "0 50px"
            }}
          >Boost your click-through rates with customized links !</Typography>
          <Typography
            textAlign={"center"}
            variant="h6"
            fontWeight={500}
            color={"gray"}
            sx={{

            }}
          >Transform your long URLs to something catchy.</Typography>
          <Box
            sx={{
              paddingTop: "20px"
            }}
          >
            <Button
              onClick={()=>navigate('/links/create')}
              variant="contained"
              sx={{
                width: "130px"
              }}
            >Create</Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default LinksEmpty;