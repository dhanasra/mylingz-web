import { ArrowLeftOutlined, CalendarOutlined, CheckOutlined, CopyOutlined, EditOutlined, ShareAltOutlined } from "@ant-design/icons"
import { Avatar, Box, Button, Divider, Grid, Stack, Typography } from "@mui/material"
import MainCard from "../../components/MainCard"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getLinkDetails } from "../../network/link_service"
import { formatDate } from "../../utils/date-fns"
import CountUp from 'react-countup';
import { PiDownload, PiEye, PiLink, PiPerson } from "react-icons/pi";
import ShareDialog from "../../components/dialogs/ShareDialog"
import EditLinkDialog from "../../components/dialogs/EditLinkDialog"

  const LinkDetailsPage =()=>{

    const { linkId } = useParams();
    const [ data, setData ] = useState(null);

    const [ copied, setCopied ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);

    const navigate = useNavigate();

    const [insights ] = useState([
      {
          id: "viewCount",
          name: "Total Views",
          count: 0,
          icon: <PiEye fontSize={"24px"} color="#ff2052"/>
      },
      {
          id: "uniqueVisitCount",
          name: "Total Unique Visitors",
          count: 0,
          icon: <PiPerson fontSize={"24px"} color="#ff5e20"/>
      },
      {
          id: "savedCount",
          name: "Total Downloads",
          count: 0,
          icon: <PiDownload fontSize={"24px"} color="#2051ff"/>
      },
      {
          id: "webClickCount",
          name: "Total Links Taps",
          count: 0,
          icon: <PiLink fontSize={"24px"} color="#5f20ff"/>
      }
    ]);

    useEffect(() => {
  
      const init = async () => {
        const d = await getLinkDetails({linkId});
        if(d.success){
          setData(d.data);
        }
      };
    
      init();
    }, [ linkId ]);

    const copyLinkToClipboard =async()=>{
      setCopied(true);
      await navigator.clipboard.writeText(`https://mylingz.web.app/${data?.short}`)
      setTimeout(()=>setCopied(false), 2000);
    }

    const onUpdate =async(updated)=>{
      setOpenEdit(false);
      setData({ ...data, ...updated });
    }

    return (
      <>
      <EditLinkDialog open={openEdit} handleCancel={()=>setOpenEdit(false)} linkData={data} onSave={onUpdate}/>
      <ShareDialog open={open} handleCancel={()=>setOpen(false)} linkId={linkId}/>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={1} sx={{cursor: "pointer"}} onClick={()=>navigate('/links')}>
            <ArrowLeftOutlined/>
            <Typography>Back to list</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <MainCard
            contentSX={{
              padding: "24px"
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1.5}>
                  <Typography variant="h4">{data?.title}</Typography>
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
                      <Typography variant="h5" fontWeight={600} color={"#2a5bd7"}>{`mylingz.web.app/${data?.short}`}</Typography>
                      <Typography variant="h6" fontWeight={500}>{data?.url}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={0} sm={6}>
                <Stack spacing={1.5} direction={"row"} justifyContent={"end"}>
                  <Box position={"relative"}>
                    <Button variant="outlined" onClick={copyLinkToClipboard} sx={{
                      background: copied ? "#90EE9033": null, 
                      border: copied ? "1px solid green": null
                    }}>
                      <Stack direction={"row"} spacing={1}>
                        { copied ? <CheckOutlined style={{color: "green"}}/> : <CopyOutlined/> }
                        <Typography color={copied ? "green": null}>{ copied ? 'Copied' :'Copy' }</Typography>
                      </Stack>
                    </Button>
                  </Box>
                  <Button variant="outlined" onClick={()=>setOpen(true)}>
                    <Stack direction={"row"} spacing={1}>
                      <ShareAltOutlined/>
                      <Typography>Share</Typography>
                    </Stack>
                  </Button>  
                  <Button variant="outlined" onClick={()=>setOpenEdit(true)}>
                    <Stack direction={"row"} spacing={1}>
                      <EditOutlined/>
                      <Typography>Edit</Typography>
                    </Stack>
                  </Button> 
                </Stack>
              </Grid>
              
              <Grid item xs={12}>
                <Divider/>
              </Grid>

              <Grid item xs={12}>
                <Stack direction={"row"} spacing={1}>
                  <CalendarOutlined/>
                  <Typography>{formatDate(data?.createdAt)}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} spacing={3}>
              <Grid container spacing={3}>
                  { 
                      insights.map((insight)=>(
                          <Grid item xs={12} sm={6} md={3}>
                              <MainCard>
                                  {
                                      <Stack>
                                          <Typography variant="body1" color={"grey"}>{insight.name}</Typography>
                                          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                              {insight.icon}
                                              <CountUp start={0} end={insight?.count??0} duration={2.5} separator="," style={{fontSize: "32px"}} />
                                          </Stack>
                                      </Stack>
                                  }
                              </MainCard>
                          </Grid>
                      ))
                  }
              </Grid>
          </Grid>
      </Grid>
      </>
    )
  }

  export default LinkDetailsPage;