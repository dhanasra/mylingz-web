import { Box, Grid, Stack } from "@mui/material"
import { getIconUrl } from "../../../utils/utils";
import { colorToHex } from "../../../theme/colors";

const IconLinks =({data})=>{

  const design = data?.design;
  const iconType = design?.thumbnail?.style ?? "colored";

  const navigate=(value)=>{
    let link = value;
    if (!link.includes("https")) {
        link = "https://" + link;
    }
    window.open(link, '_blank', 'noopener');
  } 

  const iconColor = (iconType!=="colored" && iconType!=="gradient") ? colorToHex(design.color) : null;


  return (
    <Stack
      direction={"column"}
      spacing={2}
    >
      <Grid container justifyContent={"center"}>
        {
          data?.icons?.map((e)=>{
            const iconUrl = getIconUrl({type: iconType, icon: e.name.toLowerCase()});
            return (
              <Grid item sx={{p: 1, cursor: "pointer"}}>
                <Box sx={{overflow: "hidden"}}>
                  <Box component={"img"} onClick={()=>navigate(e.data.value)} src={iconUrl} 
                    sx={{width: "60px", height: "60px", color: "green", filter: iconColor!=null ? `drop-shadow(0px 1000px 0 ${iconColor})`: null, transform: iconColor!=null ? 'translateY(-1000px)': null}}/>
                </Box>
              </Grid>
            )
          })
        }
      </Grid>
    </Stack>
  )
}

export default IconLinks;