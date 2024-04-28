import { Box, CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ForwardLink = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    window.location.replace('https://google.com');
  }, [])

  return (
    <Box
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
      }}
    >
      <CircularProgress
        thickness={3} size={30} sx={{color: "#201A3F"}}
      />
    </Box>
  )
}

export default ForwardLink;