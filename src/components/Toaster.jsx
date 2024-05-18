
import { Alert, Snackbar, SnackbarContent } from "@mui/material";

const Toaster =({open, close, message})=>{

    return (
<Snackbar open={open} autoHideDuration={6000} >
      <Alert onClose={()=>{}} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
    )
}

export default Toaster;