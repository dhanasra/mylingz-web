import { Avatar, Box, Stack, Typography } from "@mui/material"
import { colorToHex } from "../../../theme/colors";
import { useScreenType } from "../../../utils/utils";

const ProfileInfo =({data})=>{
  const device = useScreenType();

  const profileDesign = data?.design?.profileDesign;
  const titleColor = colorToHex(profileDesign?.titleColor ?? data?.design?.color);
  const sloganColor = colorToHex(profileDesign?.sloganColor  ?? data?.design?.color);

  let imageSize = profileDesign?.size;
  let imageCorner = `${profileDesign?.corner*2}px`;

  const layout = profileDesign?.layout;
  const stackAlignment = layout === "layout3" 
    ? "end" : layout === "layout2" ? "start" : "center"; 

  if(device==="mobile"){
    imageSize = `${imageSize}px` ?? "90px"
  }else if(device==="tab"){
    imageSize = `${(1.5*imageSize)}px` ?? "120px"
  }else{
    imageSize = `${(1.8*imageSize)}px` ?? "120px"
  }


  return (
    <Stack
      direction={ layout==="layout4" ? "row": "column"}
      alignItems={stackAlignment}
    >
      <Avatar sx={{width: imageSize, height: imageSize, borderRadius: imageCorner}} src={data?.picture}/>
      <Box height={"16px"} width={"16px"}/>
      <Stack>
        <Typography variant="h2" sx={{color: titleColor}}>{data?.title}</Typography>
        <Typography sx={{color: sloganColor}} >{data?.slogan}</Typography>
      </Stack>
    </Stack>
  )
}

export default ProfileInfo;