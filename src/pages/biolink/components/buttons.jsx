import { Box, Stack, Typography } from "@mui/material"
import { colorToHex } from "../../../theme/colors";

const Buttons =({data})=>{
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
      width={"100%"}
    >
      {
        data?.buttons?.map((e)=>{
          return (
            <Box
              onClick={()=>window.open(e.url, '_blank', 'noopener')}
              sx={{
                textAlign: "center",
                p: "12px",
                border: `1px solid ${outlineColor}`,
                borderRadius: borderRadius
              }}
            >
              <Typography variant="body1" fontSize={16} color={textColor}>
                {e.text}</Typography>
            </Box>

            // <Button onClick={()=>{}}  variant="contained" sx={{width: "100%", borderRadius: "100px", p: 1.5, background: "lightgray"}}>
            //   
            // </Button>
          )
        })
      }
    </Stack>
  )
}

export default Buttons;