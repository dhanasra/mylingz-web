import { Box, Typography } from "@mui/material";
import { URL_CONST } from "../../constants/url_const";

const AboutUs = () => {
  return (
    <Box sx={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      background: "#fff",
      boxShadow: "0px 2px 30px #ccc6"
    }}>
      <Typography variant="h2" textAlign={"center"}>About Us</Typography>
      <Box height={54}/>
      <Typography variant="h4">Spiderlingz: A1 Tech Suites To Thrive Business In The Digital Epoch!</Typography>
      <Typography>We upgrade the development of your business by conveying first graded arrangements that match your prerequisites.</Typography>
      <Box height={24}/>
      <Typography variant="h5">Why To Choose Spiderlingz?</Typography>
      <Typography>Spiderlingz group is enthusiastic about conveying greatness and focused on assisting customers with scaling higher than ever. Focused on trustworthiness and determination. We exhibit a solid obligation to economical and mindful strategic policies. Our upsides of advancement and coordinated effort drive us to make enduring progress for our customers across the globe.</Typography>
      <Box height={24}/>
      <Typography variant="h5">Our Work Culture:</Typography>
      <Typography>It is easy and simple to work with us. We design, develop and deliver quality products based on your business requirements. The organization culture is considerably more keen to an independent venture and will approach you with deference and nobility. We create business suits with high-end technology solutions like React, Node.js, Flutter, GraphQL, Express.js, Redux, React Apollo, Swift, Bootstrap. It speeds up the advancement interaction, to give better execution and a solid establishment for adaptability.</Typography>
      <Box height={24}/>
      <Typography variant="h5">Noteworthy Customer Service:</Typography>
      <Typography>Our intention is to make clients more happy with our timely solutions. We are free to address everyone's questions at each phase of your venture advancement. Our smoothed out work measure helps in conveying first class items inside an expected time span. We are focused on building the best innovation tech suits and innovative solutions for your vision.</Typography>
      <Box height={24}/>
      <Typography variant="h5">Our Services</Typography>
      <Typography variant="h6">Web Application Development</Typography>
      <Typography>We build responsive and powerful web apps that cover the vast user base.</Typography>
      <Typography variant="h6">Mobile Application Development</Typography>
      <Typography>A Platform compatible power packed mobile apps are built in both the OS that encompass a unique user base.</Typography>
      <Typography variant="h6">Graphic Design Services</Typography>
      <Typography>We design spectacular, vibrant, eye-catching graphics to promote your brand.</Typography>
      <Typography variant="h6">DevOps Solutions</Typography>
      <Typography>We increase team flexibility and agility with faster fixes on operation and quick delivery.</Typography>
      <Typography variant="h6">Digital Marketing</Typography>
      <Typography>We help you in promoting products with a micro level of target in an optimised way.</Typography>
      <Box height={24}/>
      <Typography variant="h5">Our Process</Typography>
      <ul>
        <li>Understand And Analyse The Client Requirement</li>
        <li>Create A Prototype For It & Approved By Client</li>
        <li>Ticket Generation Based On Agile Workflow</li>
        <li>Product Development</li>
        <li>Deployment & Testing</li>
        <li>Delivery & Support</li>
      </ul>
      <Typography>---</Typography>
      <Typography>If you have any questions about Spiderlingz or would like to get in touch, please visit our website at <a href={URL_CONST.COMPANY} style={{ color: 'blue', textDecoration: 'underline' }}>spiderlingz.com</a> or contact us at our headquarters in Trichy, Tamilnadu.</Typography>
    </Box>
  )
}

export default AboutUs;
