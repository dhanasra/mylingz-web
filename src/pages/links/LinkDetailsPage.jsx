import { ArrowLeftOutlined, CalendarOutlined, CheckOutlined, CopyOutlined, DeleteOutlined, EditOutlined, ShareAltOutlined } from "@ant-design/icons"
import { Avatar, Box, Button, Divider, Grid, Stack, Typography } from "@mui/material"
import MainCard from "../../components/MainCard"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteLink, getLinkAnalytics, getLinkDetails } from "../../network/link_service"
import { formatDate } from "../../utils/date-fns"
import CountUp from 'react-countup';
import { PiCursorClick, PiDeviceMobileBold, PiMapPin } from "react-icons/pi";
import ShareDialog from "../../components/dialogs/ShareDialog"
import EditLinkDialog from "../../components/dialogs/EditLinkDialog"
import ConfirmDialog from "../../components/dialogs/ConfirmDialog"
import BarChart from "./components/BarChart"
import { AppRoutes } from "../../routes/Routes"
import { URL_CONST } from "../../constants/url_const"

const LinkDetailsPage =()=>{

    const { linkId } = useParams();
    const [ data, setData ] = useState(null);

    const [ copied, setCopied ] = useState(false);
    const [ openShare, setOpenShare ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);

    const navigate = useNavigate();

    const [chartData, setChartData ] = useState([]);
    const [insights, setInsights] = useState([
      {
          id: "totalClicks",
          name: "Total Clicks",
          count: 0,
          icon: <PiCursorClick fontSize={"24px"} color="#ff2052"/>
      },
      {
          id: "todaysClicks",
          name: "Today's Clicks",
          count: 0,
          icon: <PiCursorClick fontSize={"24px"} color="#ff5e20"/>
      },
      {
          id: "topLocation",
          name: "Top Location",
          value: 'N/A',
          icon: <PiMapPin fontSize={"24px"} color="#2051ff"/>
      },
      {
          id: "topDevice",
          name: "Top Device",
          value: 'N/A',
          icon: <PiDeviceMobileBold fontSize={"24px"} color="#5f20ff"/>
      }
    ]);

    useEffect(() => {
  
      const init = async () => {
        const d = await getLinkDetails({linkId});
        const analytics = (await getLinkAnalytics({linkId})).data;

        const updatedInsights = insights.map(insight => {
          switch (insight.id) {
              case 'totalClicks':
                  return { ...insight, count: analytics.totalClicks };
              case 'todaysClicks':
                  return { ...insight, count: analytics.todayClicks };
              case 'topLocation':
                  return { ...insight, value: analytics.location };
              case 'topDevice':
                  return { ...insight, value: analytics.device };
              default:
                  return insight;
          }
        });


        console.log(analytics)

        if(d.success){
          setData(d.data);
          setInsights(updatedInsights);
          setChartData(analytics.chart);
        }
      };
    
      init();
    });

    const copyLinkToClipboard =async()=>{
      setCopied(true);
      await navigator.clipboard.writeText(`${URL_CONST.DOMAIN}/${data?.short}`)
      setTimeout(()=>setCopied(false), 2000);
    }

    const onUpdate =async(updated)=>{
      setOpenEdit(false);
      setData({ ...data, ...updated });
    }

    const onDelete =async()=>{
      setOpenDelete(false);
      await deleteLink(data.id);
      navigate(AppRoutes.links)
    }

    return (
      <>
      <ConfirmDialog
        open={openDelete} 
        onOk={onDelete} 
        onCancel={()=>setOpenDelete(false)} 
        btnTxt={"Delete"}
        title={"Are you sure you want to delete?"}   
        content={`By deleting ${data?.title} link, the people can't access this link. This process in can't be undone.`}
      />
      <EditLinkDialog open={openEdit} handleCancel={()=>setOpenEdit(false)} linkData={data} onSave={onUpdate}/>
      <ShareDialog open={openShare} handleCancel={()=>setOpenShare(false)} linkId={linkId}/>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={1} sx={{cursor: "pointer"}} onClick={()=>navigate(AppRoutes.links)}>
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
                  <Button variant="outlined" onClick={()=>setOpenShare(true)}>
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
                  <Button variant="outlined" sx={{minWidth: "30px"}} onClick={()=>setOpenDelete(true)}>
                    <DeleteOutlined style={{ color: "red" }}/>
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
                                          <Stack direction={"row"} p={ insight.count!=null ? "0px": "10px 0"} justifyContent={"space-between"} alignItems={"center"}>
                                              {insight.icon}
                                              {
                                                insight.count!=null
                                                ? <CountUp start={0} end={insight?.count??0} duration={2.5} separator="," style={{fontSize: "32px"}} />
                                                : <Typography style={{fontSize: "20px"}}>{insight?.value}</Typography>
                                              } 
                                          </Stack>
                                      </Stack>
                                  }
                              </MainCard>
                          </Grid>
                      ))
                  }
              </Grid>
          </Grid>
        <Grid item xs={12}>
          <BarChart chartData={chartData}/>
        </Grid>
      </Grid>
      </>
    )
  }

  export default LinkDetailsPage;