import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import MainCard from "../../../components/MainCard";
import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";
import { formatDateMin } from "../../../utils/date-fns";
import { PiChartBar } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const LinkItem = ({ data })=>{

  const navigate = useNavigate();

  const openLink=(value)=>{
    let link = value;
    if (!link.includes("https")) {
        link = "https://" + link;
    }
    window.open(link, '_blank', 'noopener');
  } 

  return (
    <Grid item xs={12}>
      <MainCard
        contentSX={{
          padding: "24px"
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1.5}>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Box
                  sx={{
                    padding: "8px",
                    borderRadius: "30px",
                    border: `1px solid #dbe0eb`
                  }}
                >
                  <Avatar src={`http://www.google.com/s2/favicons?domain=${data?.url}`} />
                </Box>
                <Stack spacing={0.2}>
                  <Typography variant="h5" fontWeight={500}>{data?.title}</Typography>
                  <Typography 
                    variant="h5" 
                    onClick={
                      ()=>openLink(`mylingz.web.app/${data?.short}`)
                    }
                    sx={{
                      cursor: "pointer",
                      color: "#2a5bd7",
                      fontWeight: 600,
                      textDecoration: 'none', 
                      '&:hover': {
                        textDecoration: 'underline', 
                      },
                    }}    
                  >{`mylingz.web.app/${data?.short}`}</Typography>
                  <Typography 
                    onClick={
                      ()=>openLink(data?.url)
                    }
                    variant="h6" 
                    fontWeight={500}
                    sx={{
                      cursor: "pointer",
                      textDecoration: 'none', 
                      '&:hover': {
                        textDecoration: 'underline', 
                      },
                    }}  
                  >{data?.url}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={0} sm={6}>
            <Stack spacing={1.5} direction={"row"} justifyContent={"end"}>
              <Button 
                variant="outlined"
                onClick={
                  ()=>navigate(`${data.short}/details`)
                }
              >
                <Stack direction={"row"} spacing={1}>
                  <EyeOutlined/>
                  <Typography>View</Typography>
                </Stack>
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} >
            <Stack direction={"row"} spacing={3}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <PiChartBar/>
                <Typography>Analytics</Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}  alignItems={"center"}>
                <CalendarOutlined/>
                <Typography>{formatDateMin(data?.createdAt)}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
  )
}

export default LinkItem;