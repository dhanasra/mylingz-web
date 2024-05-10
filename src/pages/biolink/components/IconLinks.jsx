import { Avatar, Box, Button, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material"
import { colorToHex } from "../../../theme/colors";

const IconLinks =({data})=>{
  // const device = useScreenType();

  const design = data?.design;

  const textColor = colorToHex(design?.wrapper?.color) ?? colorToHex(design?.color);
  const outlineColor = colorToHex(design?.wrapper?.borderColor) ??  colorToHex(design?.color);
  const borderRadius = `${design?.cornerRadius/4}px`;

  // if(device=="mobile"){
  //   imageSize = `${imageSize}px` ?? "90px"
  // }else if(device=="tab"){
  //   imageSize = `${(1.5*imageSize)}px` ?? "120px"
  // }else{
  //   imageSize = `${(1.8*imageSize)}px` ?? "120px"
  // }


  return (
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
  )
}

export default IconLinks;