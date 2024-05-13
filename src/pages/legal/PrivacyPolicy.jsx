import { Box, Typography } from "@mui/material";

const PrivacyPolicy = () => {

  return (
    <Box sx={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      background: "#fff",
      boxShadow: "0px 2px 30px #ccc6"
    }}>
      <Typography variant="h2" textAlign={"center"}>Privacy Policy</Typography>
      <Box height={54}/>
      <Typography>MYLingz Privacy Policy</Typography>
      <Typography>Last updated: April 25, 2024</Typography>
      <Box height={24}/>
      <Typography>At MYLingz, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and protect your information when you use our QR code generation services through our website and mobile applications (collectively, the “Service”). Please read this policy carefully to understand our practices regarding your information and your choices regarding its use.</Typography>
      <Box height={24}/>
      <Typography variant="h4">The MYLingz Service</Typography>
      <Box height={8}/>
      <Typography>MYLingz provides tools to generate QR codes for various purposes, such as website URLs, contact information, Wi-Fi networks, and more. Our Service is designed to facilitate the creation and management of QR codes for personal and professional use.</Typography>
      <Box height={24}/>
      <Typography variant="h4">Information We Collect</Typography>
      <Box height={8}/>
      <Typography>We collect personal information, such as your name and email address, when you register for an account or use certain features of the Service. Additionally, we may collect usage data and information about your device when you interact with our Service.</Typography>
      <Box height={24}/>
      <Typography variant="h4">How We Use Your Information</Typography>
      <Box height={8}/>
      <Typography>We use the information we collect to provide, maintain, and improve our Service, as well as to communicate with you and personalize your experience. Your information may also be used for analytics and to comply with legal obligations.</Typography>
      <Box height={24}/>
      <Typography variant="h4">Information Sharing</Typography>
      <Box height={8}/>
      <Typography>We do not sell, rent, or lease your personal information to third parties. However, we may share your information with service providers who assist us in operating our Service or with your consent or as required by law.</Typography>
      <Box height={24}/>
      <Typography variant="h4">Security Measures</Typography>
      <Box height={8}/>
      <Typography>We employ industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</Typography>
      <Box height={24}/>
      <Typography variant="h4">Your Choices</Typography>
      <Box height={8}/>
      <Typography>You have the right to access, correct, or delete your personal information. You may also choose to opt out of certain communications from us. Please contact us if you have any questions or concerns about your privacy preferences.</Typography>
      <Box height={24}/>
      <Typography variant="h4">Changes to This Privacy Policy</Typography>
      <Box height={8}/>
      <Typography>We may update this Privacy Policy from time to time. Any changes will be reflected on this page, and we will notify you of significant updates through our Service or other means. We encourage you to review this policy periodically for the latest information.</Typography>
      <Box height={24}/>
      <Typography variant="h4">Contact Us</Typography>
      <Box height={8}/>
      <Typography>If you have any questions, comments, or concerns about our Privacy Policy or practices, please contact us at <a href="mailto:dhana.spiderlingz@gmail.com" style={{ color: 'blue', textDecoration: 'underline' }}>dhana.spiderlingz@gmail.com</a>.</Typography>
      <Typography>We appreciate your trust in MYLingz and are committed to protecting your privacy.</Typography>

    </Box>
  )
}

export default PrivacyPolicy;
