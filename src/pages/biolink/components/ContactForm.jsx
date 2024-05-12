import { Box, Button, CircularProgress, FormHelperText, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material"
import { colorToHex } from "../../../theme/colors";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { addDoc, getDocs } from "firebase/firestore";
import { messagesData } from "../../../network/firebase";
import { fetchDeviceLocation, getDeviceType } from "../../../utils/utils";

const ContactForm =({userId, data})=>{
  const theme = useTheme();

  const design = data?.design;
  const [formState, setFormState] = useState("");

  const textColor = colorToHex(design?.wrapper?.color) ?? colorToHex(design?.color);
  const outlineColor = colorToHex(design?.wrapper?.borderColor) ??  colorToHex(design?.color);
  const borderRadius = `${design?.cornerRadius/4}px`;

  const actionBgColor = colorToHex(design?.actionBtnStyle?.bgColor);
  const actionBorderColor = colorToHex(design?.actionBtnStyle?.borderColor) ?? outlineColor;
  const actionTextColor = colorToHex(design?.actionBtnStyle?.color) ?? textColor;

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if(touched){
      const newErrors = {};
      data?.contactFields?.forEach((field) => {
        if (field.required && !formData[field.label]) {
          newErrors[field.label] = `${field.label} is required`;
        }
      });
      setErrors(newErrors); 
    }
  };

  const handleSubmit = async() => {
    const newErrors = {};
    data?.contactFields?.forEach((field) => {
      if (field.required && !formData[field.label]) {
        newErrors[field.label] = `${field.label} is required`;
      }
    });
    
    setErrors(newErrors);
    setTouched(true);
    var updatedFields = data?.contactFields?.map((e)=>{
      const item = e;
      item.value = formData[item.label];
      return item;
    })

    if (Object.keys(newErrors).length === 0) {
      setFormState("loading");
      const location = await fetchDeviceLocation();
      const message = {
        data: updatedFields,
        device: getDeviceType(),
        location: location,
        createdAt: Date.now()
      };
      await addDoc(messagesData(userId), message);
      setFormState("submitted");
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: theme.palette.grey.A800,
        border: `1px solid ${outlineColor}`,
        borderRadius: borderRadius
      }}
    >
      {
        (formState=="loading")
         ? (
            <center style={{padding: "60px"}}>
              <CircularProgress
                sx={{color: textColor}}
              />
            </center>
          )
         : (formState=="submitted")
         ? (
            <center style={{padding: "60px"}}>
              <Typography variant="body1" fontSize={16} sx={{color: textColor}} >Thank You For Submitting !</Typography>
            </center>
          )
         : (
          <Stack alignItems={"center"} spacing={1}>
            <Typography variant="h4" color={textColor}>Contact Us</Typography>
            <Box sx={{height: "10px"}}/>
            <Stack
              direction={"column"}
              spacing={2}
              sx={{width: "100%"}}
            >
              {
                data?.contactFields?.map((field, idx)=>{
                  return (
                    <Stack key={`${idx}`} spacing={1}>
                      <InputLabel htmlFor={field.label} sx={{ color: textColor }}>
                          {`${field.label} ${field.required ? '*': ''}`}
                        </InputLabel>
                        <OutlinedInput
                          id={field.label}
                          type={field.type}
                          name={field.label}
                          placeholder={`Enter ${field.label}`}
                          sx={{ padding: '6px', borderRadius: borderRadius, color: textColor }}
                          onChange={handleInputChange}
                          fullWidth
                          error={!!errors[field.label]}
                          helpertext={errors[field.label]}
                        />
                        <FormHelperText sx={{color: textColor}}>{errors[field.label]}</FormHelperText>
                    </Stack>
                  )
                })
              }
              <Box sx={{height: "20px"}}/>
              <Button onClick={handleSubmit}  variant="contained" sx={{
                width: "100%", 
                padding: "12px", 
                border: `1px solid ${actionBorderColor}`,
                borderRadius: borderRadius,
                background: actionBgColor

              }} >
                  <Typography variant="body1" fontSize={16} color={actionTextColor} >Submit</Typography>
              </Button>
            </Stack>
          </Stack>
         )
      }
    </Box>
  )
}

export default ContactForm;