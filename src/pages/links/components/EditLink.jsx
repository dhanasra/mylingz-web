import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';
import { updateLink } from "../../../network/link_service";
import { useState } from "react";


const EditLink = ({linkData, onSave, onCancel})=>{

  const [ loading, setLoading ] = useState(false);

  return (
    <Formik
      initialValues={{
        title: linkData?.title, 
        backhalf: linkData?.short, 
        destination: linkData?.url
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required("Title is required"),
        backhalf: Yup.string().max(255).required("Backhalf is required"),
        destination: Yup.string().max(255).required("Destination url is required")
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm})=>{
        try {
          setLoading(true);

          const linkId = values.backhalf;

          const updated = {
            id: linkData.id,
            title: values.title,
            url: values.destination,
            short: linkId
          };

          const resp = await updateLink(updated)
          setLoading(false)

          if(resp.success){
            onSave(resp.data)
          }

        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({errors, handleBlur, handleChange, handleSubmit, touched, values})=>(
        <form noValidate onSubmit={handleSubmit}>
          <Grid container >
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems={"end"}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                      <InputLabel htmlFor="destination">Destination</InputLabel>
                      <OutlinedInput
                          id="destination"
                          type="text"
                          name="destination"
                          placeholder="Enter destination url"
                          value={values.destination}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                      />
                      {touched.destination && errors.destination && (
                        <FormHelperText error id={`standard-weight-helper-first-name`}>
                          {errors.destination}
                        </FormHelperText>
                      )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                      <InputLabel htmlFor="title">Title</InputLabel>
                      <OutlinedInput
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Enter title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                      />
                      {touched.title && errors.title && (
                        <FormHelperText error id={`standard-weight-helper-first-name`}>
                          {errors.title}
                        </FormHelperText>
                      )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  
                  <Stack direction={"row"} spacing={2} alignItems={"start"}>
                    <Stack spacing={1} sx={{width: "100%"}}>
                        <InputLabel htmlFor="domain">Domain</InputLabel>
                        <OutlinedInput
                            id="domain"
                            type="text"
                            name="domain"
                            placeholder="Enter title"
                            value={'mylingz.web.app'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            sx={{
                              pointerEvents: "none",
                              background: "#F4F6FA"
                            }}
                        />
                    </Stack>
                    <Box sx={{alignItems: "end", display: "flex", height: "70px"}}>
                      <Typography variant="h2" fontWeight={500}>/</Typography>
                    </Box>
                    <Stack spacing={1} sx={{width: "100%"}}>
                      <InputLabel htmlFor="backhalf">Custom back-half</InputLabel>
                      <OutlinedInput
                          id="backhalf"
                          type="text"
                          name="backhalf"
                          placeholder="Enter title"
                          value={values.backhalf}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                      />
                      {touched.backhalf && errors.backhalf && (
                        <FormHelperText error id={`standard-weight-helper-first-name`}>
                          {errors.backhalf}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={12} pt={10} alignItems={"end"}> 
                <Stack spacing={3} direction={"row"} justifyContent={"end"}>
                  <Button onClick={onCancel} type="submit" variant="contained" sx={{width: "100%", py: 1.2, background: 'lightgrey', color: 'black'}}>
                      Cancel
                  </Button>
                  <Button disabled={loading} type="submit" variant="contained" sx={{width: "100%", py: 1.2}}>
                      Save
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
       </form>
      )}
    </Formik>
  )
}

export default EditLink;