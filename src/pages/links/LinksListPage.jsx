import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getLinks } from "../../network/link_service";
import LinkItem from "./components/LinkItem";
import LinksEmpty from "./components/LinksEmpty";
import { useNavigate } from "react-router-dom";

const LinksListPage = ()=>{

  const [ links, setLinks ] = useState([]);
  const navigate = useNavigate(); 

  useEffect(()=>{
    const fetchLinks = async()=>{
      const resp = await getLinks();
      if(resp.success){
        setLinks(resp.data)
      }
    }
    fetchLinks();
  }, [])
  

  return (
    links.length>0
    ? (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack justifyContent={"space-between"} direction={"row"}>
            <Typography variant="h3" fontWeight={400}>Links</Typography>
            <Button onClick={()=>navigate('/links/create')} variant="contained">Create New</Button>
          </Stack>
        </Grid>
        {
          links.map((d)=>{
            return <LinkItem key={d.id} data={d} />
          })
        }
      </Grid>
    )
    : <LinksEmpty/>
  )
}

export default LinksListPage;