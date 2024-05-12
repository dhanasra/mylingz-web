import { Box, Stack, Typography } from "@mui/material"
import { colorToHex } from "../../../theme/colors";

const ButtonsInfo =({data})=>{
  // const device = useScreenType();

  const design = data?.design;

  const textColor = colorToHex(design?.wrapper?.color) ?? colorToHex(design?.color);
  const outlineColor = colorToHex(design?.wrapper?.borderColor) ??  colorToHex(design?.color);
  const borderRadius = design?.cornerRadius!=null ? `${design?.cornerRadius/4}px` : "4px";

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
      width={"100%"}
    >
      {
        data?.buttons?.map((e, idx)=>{
          return (
            <Box
              key={`${idx}`}
              onClick={()=>navigate(e.url)}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                p: "12px",
                border: `1px solid ${outlineColor ?? "grey"}`,
                borderRadius: borderRadius
              }}
            >
              <Typography variant="body1" fontSize={16} color={textColor}>
                {e.text}</Typography>
            </Box>
          )
        })
      }
    </Stack>
  )
}

export default ButtonsInfo;