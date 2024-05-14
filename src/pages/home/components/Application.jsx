import { Stack, Typography } from "@mui/material";
import SS1 from '../../../assets/SS-1.png';
import SS2 from '../../../assets/SS-2.png';
import SS3 from '../../../assets/SS-3.png';
import SS4 from '../../../assets/SS-4.png';
import SS5 from '../../../assets/SS-5.png';
import SS6 from '../../../assets/SS-6.png';
import SS7 from '../../../assets/SS-7.png';
import HorizontalScroller from "../../../components/HorizontalSlider";

const Application = ()=>{

  const images = [
    SS1, SS2, SS3, SS4, SS5, SS6, SS7
  ];

  return (
    <Stack direction={"column"} sx={{py: 5}}>
      <Stack alignItems={"center"} sx={{mb: "32px", textAlign: "center"}} spacing={1}>
        <Typography variant="h2">Glimpses of Mylingz Application!</Typography>
        <Typography>Enhance your business connections with MYLingz.</Typography>
      </Stack>
      <HorizontalScroller items={images}/>
    </Stack>
  )
}

export default Application;