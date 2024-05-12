import { Avatar, Grid, Stack } from "@mui/material"
import { getIconUrl } from "../../../utils/utils";

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
                <Avatar onClick={()=>navigate(e.data.value)} src={iconUrl} sx={{width: "60px", height: "60px"}}/>
              </Grid>
            )
          })
        }
      </Grid>
    </Stack>
  )
}

export default IconLinks;