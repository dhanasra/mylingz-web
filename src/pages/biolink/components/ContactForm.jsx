import { Box, Button, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material"
import { colorToHex } from "../../../theme/colors";
import { useTheme } from "@emotion/react";

const ContactForm =({data})=>{
  // const device = useScreenType();

  const theme = useTheme();

  const design = data?.design;

  const textColor = colorToHex(design?.wrapper?.color) ?? colorToHex(design?.color);
  const outlineColor = colorToHex(design?.wrapper?.borderColor) ??  colorToHex(design?.color);
  const borderRadius = `${design?.cornerRadius/4}px`;

  const actionBgColor = colorToHex(design?.actionBtnStyle?.bgColor);
  const actionBorderColor = colorToHex(design?.actionBtnStyle?.borderColor) ?? outlineColor;
  const actionTextColor = colorToHex(design?.actionBtnStyle?.color) ?? textColor;

  // if(device=="mobile"){
  //   imageSize = `${imageSize}px` ?? "90px"
  // }else if(device=="tab"){
  //   imageSize = `${(1.5*imageSize)}px` ?? "120px"
  // }else{
  //   imageSize = `${(1.8*imageSize)}px` ?? "120px"
  // }


  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: theme.palette.grey.A800,
        border: `1px solid ${outlineColor}`,
        borderRadius: borderRadius
      }}
    >
      <Stack alignItems={"center"} spacing={1}>
        <Typography variant="h4" color={textColor}>Contact Us</Typography>
        <Box sx={{height: "10px"}}/>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{width: "100%"}}
        >
          {
            data?.contactFields?.map((e)=>{
              return (
                <Stack spacing={1} >
                    <InputLabel htmlFor="fname" sx={{color:textColor}}>{e.label}</InputLabel>
                    <OutlinedInput
                      id="firstName"
                      type="text"
                      name="fname"
                      placeholder={`Enter ${e.label}`}
                      sx={{padding: "6px", borderRadius: borderRadius}}
                      onChange={()=>{}}
                      fullWidth
                    />
                </Stack>
              )
            })
          }
          <Box sx={{height: "20px"}}/>
          <Button onClick={()=>{}}  variant="contained" sx={{
            width: "100%", 
            padding: "12px", 
            border: `1px solid ${actionBorderColor}`,
            borderRadius: borderRadius,
            background: actionBgColor

          }} >
              <Typography variant="body1" fontSize={16} color={actionTextColor} >Submit</Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ContactForm;