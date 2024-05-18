import { Dialog, Typography } from "@mui/material";
import MainCard from "../MainCard";
import EditLink from "../../pages/links/components/EditLink";

const EditLinkDialog =({open, handleCancel, linkData, onSave})=>{

    return (
      <Dialog open={open} onClose={handleCancel}>
          <MainCard
              title={
                  <Typography variant="h4" fontWeight={500}>Edit Link</Typography>
              }
              borderRadius={1}
              headerBorder
              sx={{maxWidth: "440px", width: "100%" }}
          >
            <EditLink linkData={linkData} onCancel={handleCancel} onSave={onSave}/>
          </MainCard>
      </Dialog>
    )
}

export default EditLinkDialog;