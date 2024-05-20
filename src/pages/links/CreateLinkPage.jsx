import { Box, Button, FormHelperText, Grid, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';
import { hideLoader, showLoader } from "../../store/reducers/app";
import { checkIdAvailability, saveLink } from "../../network/link_service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateUniqueString } from "../../utils/utils";
import { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";


const CreateLinkPage = ()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ uniqueString, setUniqueString ] = useState(generateUniqueString());
  const [ available, setAvailable ] = useState(true);

  useEffect(()=>{
    const checkAvailability=async()=>{
      if(uniqueString.trim()==""){
        setAvailable(true);
        return;
      }
      const isAvailable =  await checkIdAvailability(uniqueString);
      setAvailable(isAvailable);
    }
    checkAvailability();
  }, [uniqueString])

  return (
    <Formik
      initialValues={{
        title: '', 
        backhalf: uniqueString, 
        destination: ''
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required("Title is required"),
        backhalf: Yup.string().max(255).required("Backhalf is required"),
        destination: Yup.string().max(255).required("Destination url is required")
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm})=>{
        try {
          if(!available){
            return;
          }

          dispatch(showLoader());

          const linkId = values.backhalf;
          const resp = await saveLink({
            title: values.title,
            url: values.destination,
            short: linkId
          })

          dispatch(hideLoader())

          if(resp.success){
            navigate(`/app/links/${linkId}/details`)
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
          <Grid container justifyContent={"center"}>
            <Grid item sm={7} xs={12}>
              <Grid container spacing={2} alignItems={"end"}>
                <Grid item xs={12} sx={{py: 2}}>
                  <Typography variant="h3" fontWeight={400}>Create New</Typography>
                </Grid>
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
                          onChange={(e)=>{
                            setUniqueString(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          endAdornment={
                            <InputAdornment position="end">
                              {
                                available
                                  ? <CheckCircleOutlined style={{color: "green", fontSize: "18px"}}/>
                                  : <CloseCircleOutlined style={{color: "red", fontSize: "18px"}}/>
                              }
                            </InputAdornment>
                          }
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
              <Grid item xs={12} alignItems={"end"}>
                {!available && (
                  <FormHelperText error id={`standard-weight-helper-available`} sx={{textAlign: "end"}}>
                    {'Custom back-half is not available. Try different one.'}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} py={8} alignItems={"end"}> 
                <Stack spacing={2} direction={"row"} justifyContent={"end"}>
                  <Button onClick={()=>navigate(-1)} variant="contained" sx={{width: { xs: "100%", sm: "120px" }, py: 1.2, background: 'lightgrey', color: 'black'}}>
                      Cancel
                  </Button>
                  <Button type="submit" variant="contained" sx={{width: { xs: "100%", sm: "120px" }, py: 1.2}}>
                      Create
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

export default CreateLinkPage;