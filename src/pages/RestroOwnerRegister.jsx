// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Paper,
//   Toolbar,
//   Fab,
//   useScrollTrigger,
//   Zoom,
//   Chip,
//   Divider,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import { Card, CardMedia, Fade } from "@mui/material";

// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { Icon } from "@iconify/react";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import RegistrationForm from "../component/restuarantowner/RegistrationForm";

// // Elevate App Bar
// function ElevationScroll(props) {
//   const { children, window } = props;
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }

// // Back to Top
// function ScrollTop(props) {
//   const { children, window } = props;
//   const trigger = useScrollTrigger({
//     target: window ? window() : undefined,
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   const handleClick = (event) => {
//     const anchor = (event.target.ownerDocument || document).querySelector(
//       "#back-to-top-anchor"
//     );

//     if (anchor) {
//       anchor.scrollIntoView({
//         block: "center",
//       });
//     }
//   };

//   return (
//     <Zoom in={trigger}>
//       <Box
//         onClick={handleClick}
//         role="presentation"
//         sx={{ position: "fixed", bottom: 16, right: 16 }}
//       >
//         {children}
//       </Box>
//     </Zoom>
//   );
// }

// const images = [
//   "/assets/restro-owner-register-page/steps.jpeg",
//   "/assets/restro-owner-register-page/fillform.jpeg",
//   "/assets/restro-owner-register-page/upload.jpeg",
//   "/assets/restro-owner-register-page/analysis.jpeg",

//   "/assets/restro-owner-register-page/verified.jpeg",
// ];

// const RegisterPage = (props) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//         setFade(true);
//       }, 500); // Fade out before changing image
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(interval); // Cleanup
//   }, []);

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100%",
//         bgcolor: "#74CEF7",
//         color: "#2c003e",
//       }}
//     >
//       {/* App Bar */}
//       <ElevationScroll {...props}>
//         <AppBar sx={{ bgcolor: "#04304f" }}>
//           <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6" component="div">
//               MealMate Partner
//             </Typography>
//             <Chip
//               icon={
//                 <Icon icon="ant-design:login-outlined" width={20} height={20} />
//               }
//               label="Login"
//               variant="filled"
//               sx={{
//                 bgcolor: "#9EDDF9",
//                 color: "#000",
//                 fontWeight: 500,
//                 "& .MuiChip-icon": { color: "#000" },
//                 "&:hover": { bgcolor: "#5DA5C6" },
//                 cursor: "pointer",
//               }}
//               onClick={() => console.log("Login clicked")}
//             />
//           </Toolbar>
//         </AppBar>
//       </ElevationScroll>
//       <Toolbar id="back-to-top-anchor" />

//       {/* Hero Section */}
//       <Box
//         sx={{
//           backgroundImage: `url('../assets/restro-owner-register-page/background1.jpg')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-end",
//           justifyContent: "center",
//           textAlign: "right",
//           px: 2,
//           pt: 12,
//           pb: 16,
//           color: "#fff",
//         }}
//       >
//         <Typography variant="h3" fontWeight={600} gutterBottom>
//           Partner with MealMate <br /> and grow your business
//         </Typography>
//         <Typography variant="body1" sx={{ color: "#ffecff" }} gutterBottom>
//           <strong style={{ color: "#D5F0FD" }}>
//             0% commission for 1st month!
//           </strong>
//         </Typography>
//         <Typography variant="body1" sx={{ color: "#ffecff" }}>
//           Valid for new restaurant partners in select cities
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{
//             mt: 3,
//             px: 4,
//             py: 1.5,
//             borderRadius: 2,
//             backgroundColor: "#9EDDF9",
//             color: "#000",
//             "&:hover": { backgroundColor: "#5DA5C6" },
//           }}
//         >
//           Register your restaurant
//         </Button>
//       </Box>

//       {/* Info Section */}
//       <Box
//         sx={{
//           px: 2,
//           mt: -10,
//           mb: 6,
//           backgroundImage: `url('../assets/restro-owner-register-page/background.jpg')`,
//           backgroundSize: "cover",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             borderRadius: 3,
//             p: 4,
//             maxWidth: 1000,
//             mx: "auto",
//             position: "absolute",
//             bgcolor: "#F1FAFE",
//             color: "#2c003e",
//           }}
//         >
//           <Grid container spacing={5}>
//             <Grid item xs={12} md={7}>
//               <Typography variant="h6" fontWeight={700} gutterBottom>
//                 Get Started - It only takes 10 minutes
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#6e4c7b" }}>
//                 Please keep these documents and details ready for a smooth
//                 sign-up
//               </Typography>

//               <Grid container spacing={2} sx={{ mt: 2 }}>
//                 {[
//                   "PAN card",
//                   "FSSAI license",
//                   "Bank account details",
//                   "Menu & profile food image",
//                 ].map((item, i) => (
//                   <Grid item xs={12} sm={6} key={i}>
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                       <CheckCircleIcon sx={{ mr: 1, color: "#2DE200" }} />
//                       <Typography variant="body2">{item}</Typography>
//                     </Box>
//                   </Grid>
//                 ))}
//                 <Grid item xs={12} sx={{ pl: 4 }}>
//                   <Typography variant="caption" sx={{ color: "#6e4c7b" }}>
//                     Don't have a FSSAI license? <a href="#">Apply here</a>
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>

//             {/* Image Card Section */}
//             <Grid item xs={12} md={5}>
//               <Box
//                 sx={{
//                   position: "relative",
//                   height: 200,
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   boxShadow: "none",
//                   backgroundColor: "#f1fafe",
//                 }}
//               >
//                 <Card
//                   sx={{
//                     width: "100%",
//                     height: 200,
//                     margin: "auto",
//                     mt: 0,
//                     backgroundColor: "#f1fafe",
//                   }}
//                 >
//                   <Fade in={fade} timeout={500}>
//                     <CardMedia
//                       component="img"
//                       image={images[currentIndex]}
//                       alt={`Slide ${currentIndex + 1}`}
//                       sx={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "contain",
//                         backgroundColor: "#f1fafe",
//                       }}
//                     />
//                   </Fade>
//                 </Card>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>

//       {/* Why Partner Section */}
//       <Box
//         sx={{
//           backgroundImage: `url('../assets/restro-owner-register-page/BlueAbstractWallpaper.png')`,
//           backgroundSize: "cover",
//           px: 2,
//           pt: 12,
//           pb: 16,
//           color: "#fff",
//           height: "70vh",
//         }}
//       >
//         <Divider
//           sx={{
//             mx: { xs: 2, md: 15 },
//             mt: { xs: 10, md: 35 },
//             mb: 6,
//             borderBottomWidth: 3,
//             "&::before, &::after": { borderColor: "#000" },
//           }}
//         >
//           <Typography
//             variant="h3"
//             sx={{ fontFamily: "Space Grotesk", color: "#000", m: 0 }}
//           >
//             Why partner with MealMate?
//           </Typography>
//         </Divider>

//         <Grid container spacing={4} justifyContent="center" sx={{ px: 2 }}>
//           {[
//             {
//               icon: "fluent:people-community-32-filled",
//               title: "Attract Customers",
//               color: "#1976d2",
//               text: ["Reach millions of people", "ordering daily on MealMate"],
//             },
//             {
//               icon: "fluent-mdl2:onboarding",
//               title: "Onboarding Support",
//               color: "#388e3c",
//               text: ["Dedicated support team", "ashishsahoo0013@gmail.com"],
//             },
//             {
//               icon: "game-icons:take-my-money",
//               title: "No Setup Fee",
//               color: "#f57c00",
//               text: ["Zero upfront cost", "Start without initial charges"],
//             },
//           ].map((card, i) => (
//             <Grid item xs={12} sm={6} md={4} key={i}>
//               <Paper
//                 sx={{
//                   p: 3,
//                   height: 200,
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   background: "rgba(255, 255, 255, 0.1)", // More transparent background
//                   backdropFilter: "blur(12px)", // Increased blur
//                   border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border for depth
//                   boxShadow: "none", // Remove default shadow
//                   transition: "transform 0.5s ease, background 0.3s ease",
//                   transform: "scale(1)", // default scale
//                   "&:hover": {
//                     transform: "scale(1.05)", // Zoom-in effect
//                     background: "rgba(255, 255, 255, 0.15)", // Slight hover effect
//                   },
//                 }}
//               >
//                 <Box textAlign="center">
//                   <Icon
//                     icon={card.icon}
//                     height={70}
//                     width={70}
//                     style={{ color: card.color, marginBottom: 16 }}
//                   />
//                   <Typography variant="h6" fontWeight={600} gutterBottom>
//                     {card.title}
//                   </Typography>
//                   {card.text.map((line, idx) => (
//                     <Typography key={idx} variant="body2">
//                       {line}
//                     </Typography>
//                   ))}
//                 </Box>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {/* FAQ Section */}
//       <Box sx={{ bgcolor: "#fff", px: 2, pt: 12, pb: 16, color: "#000" }}>
//         <Divider
//           sx={{
//             mx: { xs: 2, md: 15 },
//             mb: 6,
//             borderBottomWidth: 3,
//             "&::before, &::after": { borderColor: "#000" },
//           }}
//         >
//           <Typography variant="h4" fontWeight={600}>
//             Frequently Asked Questions
//           </Typography>
//         </Divider>

//         <Grid container justifyContent="center">
//           <Grid item xs={12} md={8}>
//             <Accordion sx={{ mb: 2 }}>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="h6">
//                   What documents are required to start deliveries?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   <strong>Mandatory documents:</strong>
//                   <ul>
//                     <li>PAN Card</li>
//                     <li>FSSAI License</li>
//                     <li>Bank Details</li>
//                     {/* <li>Restaurant Menu</li> */}
//                     <li>Food Cover Image</li>
//                   </ul>
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion sx={{ mb: 2 }}>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="h6">
//                   How long will it take for a restaurant to go live on MealMate
//                   after submitting the documents?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   <span>
//                     Once all mandatory documents are uploaded and the contract
//                     is accepted, our team typically takes around 24 hours to
//                     verify the documents and build your menu.
//                   </span>
//                   <ul>
//                     <li>
//                       If all documents are correct, your restaurant will be
//                       ready to accept orders within 48 hours.
//                     </li>
//                     <li>
//                       If any document is rejected, the go-live process will be
//                       delayed until you resubmit the correct documents.
//                     </li>
//                   </ul>
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion sx={{ mb: 2 }}>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="h6">
//                   How can I get help and support from MealMate if I get stuck?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   <span>
//                     The MealMate team is here to help! Email us at
//                     ashishsahoo0013@gmail.com with your restaurant ID, and we’ll
//                     resolve your query within 24 hours.
//                   </span>
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>{" "}
//             <Accordion sx={{ mb: 2 }}>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="h6">
//                   Who developed this application?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   <strong>Ashish Sahoo</strong>
//                   <ul>
//                     <li>
//                       Greeting of the day, I’m Ashish Sahoo, a Frontend
//                       Developer Intern with 7 months of experience building
//                       responsive, user-friendly interfaces using React,
//                       JavaScript, TypeScript, Next.js, and Material UI. Beyond
//                       frontend work, I’ve also developed a full-stack MERN-based
//                       Online Food Ordering App from scratch, implementing
//                       features like role-based modules, admin analytics, and API
//                       integration. This project has deepened my understanding of
//                       backend development and full-stack architecture. I’m
//                       actively seeking opportunities as a Frontend Developer or
//                       MERN Stack Developer—whichever best fits the team’s needs.
//                       I’m eager to keep learning, contribute to impactful
//                       projects, and grow with a collaborative development team.
//                     </li>
//                     <li>
//                       Github :{" "}
//                       <a href="https://github.com/AashishSahoo">Link</a>
//                     </li>
//                     <li>
//                       LinkedIn :{" "}
//                       <a href="https://www.linkedin.com/in/ashishsahoo899/">
//                         Link
//                       </a>
//                     </li>
//                     <li>
//                       Portfolio :{" "}
//                       <a href="https://portfolio-seven-tan-71.vercel.app/">
//                         Link
//                       </a>
//                     </li>
//                   </ul>
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           </Grid>
//         </Grid>
//       </Box>

//       <Box sx={{ bgcolor: "#f1fafe", px: 2, pt: 6, pb: 16, color: "#000" }}>
//         {/* <Divider
//           sx={{
//             mx: { xs: 2, md: 15 },
//             mb: 6,
//             borderBottomWidth: 3,
//             "&::before, &::after": { borderColor: "#000" },
//           }} */}
//         {/* > */}
//         <Typography textAlign="center" variant="h4" fontWeight={600}>
//           Registeration Form
//         </Typography>
//         {/* </Divider> */}

//         <RegistrationForm />
//       </Box>

//       {/* Back to Top Button */}
//       <ScrollTop {...props}>
//         <Fab size="small" sx={{ bgcolor: "#8e24aa", color: "#fff" }}>
//           <KeyboardArrowUpIcon />
//         </Fab>
//       </ScrollTop>
//     </Box>
//   );
// };

// export default RegisterPage;

import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Toolbar,
  Fab,
  useScrollTrigger,
  Zoom,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Link,
  IconButton,
} from "@mui/material";
import { Card, CardMedia, Fade } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Icon } from "@iconify/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RegistrationForm from "../component/restuarantowner/RegistrationForm";
import Footer from "../component/restuarantowner/Footer"; // You'll need to create this component
import { useNavigate } from "react-router-dom";

// Elevate App Bar
function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// Back to Top
function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const images = [
  "/assets/restro-owner-register-page/steps.jpeg",
  "/assets/restro-owner-register-page/fillform.jpeg",
  "/assets/restro-owner-register-page/upload.jpeg",
  "/assets/restro-owner-register-page/analysis.jpeg",
  "/assets/restro-owner-register-page/verified.jpeg",
];

const RegisterPage = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const registrationRef = useRef(null);
  const navigation = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f8f9fa",
      }}
    >
      {/* App Bar */}
      <ElevationScroll {...props}>
        <AppBar sx={{ bgcolor: "#04304f" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              MealMate Partner
            </Typography>
            <Box>
              <Button
                color="inherit"
                sx={{ mr: 2, fontWeight: 500 }}
                onClick={() => navigation("/login")}
                startIcon={<Icon icon="ant-design:login-outlined" />}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  backgroundColor: "#9EDDF9",
                  color: "#000",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "#5DA5C6" },
                }}
                onClick={scrollToRegistration}
              >
                Register Now
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('../assets/restro-owner-register-page/background1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          textAlign: "right",
          px: { xs: 2, md: 6 },
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
          color: "#fff",
          minHeight: "80vh",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
            px: { xs: 2, md: 6 },
          }}
        >
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Partner with MealMate
          </Typography>
          <Typography variant="h2" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
            {" "}
            Grow Your Business
          </Typography>
          <Typography variant="h5" sx={{ color: "#ffecff" }}>
            <Box component="span" sx={{ color: "#D5F0FD", fontWeight: 600 }}>
              0% commission for 1st month!
            </Box>{" "}
          </Typography>
          <Typography variant="h5" sx={{ color: "#ffecff", mb: 4 }}>
            Valid for new restaurant partners in select cities
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              backgroundColor: "#9EDDF9",
              color: "#000",
              fontWeight: 600,
              fontSize: "1.1rem",
              "&:hover": { backgroundColor: "#5DA5C6" },
            }}
            onClick={scrollToRegistration}
          >
            Register Your Restaurant
          </Button>
        </Container>
      </Box>

      {/* Info Section */}
      <Box
        sx={{
          px: 2,
          mt: -10,
          mb: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
            bgcolor: "#F1FAFE",
            color: "#2c003e",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Get Started - It Only Takes 10 Minutes
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#6e4c7b", mb: 3 }}>
                Please keep these documents and details ready for a smooth
                sign-up
              </Typography>

              <Grid container spacing={2}>
                {[
                  "PAN card",
                  "FSSAI license",
                  "Bank account details",
                  "Menu & profile food image",
                ].map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1.5,
                        p: 1.5,
                        borderRadius: 1,
                        "&:hover": {
                          bgcolor: "rgba(46, 125, 50, 0.1)",
                        },
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ mr: 2, color: "#2DE200", fontSize: "1.5rem" }}
                      />
                      <Typography variant="body1" fontWeight={500}>
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={12} sx={{ pl: 4, mt: 1 }}>
                  <Typography variant="body2" sx={{ color: "#6e4c7b" }}>
                    Don't have a FSSAI license?{" "}
                    <Link href="#" color="primary" fontWeight={600}>
                      Apply here
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Image Card Section */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: "relative",
                  height: 250,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f1fafe",
                  }}
                >
                  <Fade in={fade} timeout={500}>
                    <CardMedia
                      component="img"
                      image={images[currentIndex]}
                      alt={`Slide ${currentIndex + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Fade>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Why Partner Section */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(135deg, #04304f 0%, #1976d2 100%)`,
          px: 2,
          pt: 12,
          pb: 16,
          color: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            fontWeight={700}
            sx={{ mb: 8 }}
          >
            Why Partner With MealMate?
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: "fluent:people-community-32-filled",
                title: "Attract Customers",
                color: "#4fc3f7",
                text: [
                  "Reach millions of people",
                  "ordering daily on MealMate",
                ],
              },
              {
                icon: "fluent-mdl2:onboarding",
                title: "Onboarding Support",
                color: "#81c784",
                text: ["Dedicated support team", "ashishsahoo0013@gmail.com"],
              },
              {
                icon: "game-icons:take-my-money",
                title: "No Setup Fee",
                color: "#ffb74d",
                text: ["Zero upfront cost", "Start without initial charges"],
              },
            ].map((card, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper
                  sx={{
                    p: 3,
                    height: "100%",
                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Box textAlign="center">
                    <Icon
                      icon={card.icon}
                      height={60}
                      width={60}
                      style={{ color: card.color, marginBottom: 16 }}
                    />
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      gutterBottom
                      sx={{ color: "#fff" }}
                    >
                      {card.title}
                    </Typography>
                    {card.text.map((line, idx) => (
                      <Typography
                        key={idx}
                        variant="body1"
                        sx={{ color: "rgba(255, 255, 255, 0.9)", mb: 1 }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: "#fff", py: 12 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            fontWeight={700}
            sx={{ mb: 8 }}
          >
            Frequently Asked Questions
          </Typography>

          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ bgcolor: "#f8f9fa" }}
              >
                <Typography variant="h6" fontWeight={600}>
                  What documents are required to start deliveries?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <strong>Mandatory documents:</strong>
                  <ul>
                    <li>PAN Card</li>
                    <li>FSSAI License</li>
                    <li>Bank Details</li>
                    <li>Food Cover Image</li>
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ bgcolor: "#f8f9fa" }}
              >
                <Typography variant="h6" fontWeight={600}>
                  How long will it take for a restaurant to go live on MealMate?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Once all mandatory documents are uploaded and the contract is
                  accepted, our team typically takes around 24 hours to verify
                  the documents and build your menu.
                  <Box component="ul" sx={{ mt: 1 }}>
                    <Box component="li" sx={{ mb: 1 }}>
                      If all documents are correct, your restaurant will be
                      ready to accept orders within 48 hours.
                    </Box>
                    <Box component="li">
                      If any document is rejected, the go-live process will be
                      delayed until you resubmit the correct documents.
                    </Box>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ bgcolor: "#f8f9fa" }}
              >
                <Typography variant="h6" fontWeight={600}>
                  How can I get help and support from MealMate?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The MealMate team is here to help! Email us at
                  ashishsahoo0013@gmail.com with your restaurant ID, and we'll
                  resolve your query within 24 hours.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ bgcolor: "#f8f9fa" }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Who developed this application?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <strong>Ashish Sahoo</strong>
                  <Box component="ul" sx={{ mt: 1 }}>
                    <Box component="li" sx={{ mb: 1 }}>
                      Greeting of the day, I'm Ashish Sahoo, a Frontend
                      Developer Intern with 7 months of experience building
                      responsive, user-friendly interfaces using React,
                      JavaScript, TypeScript, Next.js, and Material UI.
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      Beyond frontend work, I've also developed a full-stack
                      MERN-based Online Food Ordering App from scratch,
                      implementing features like role-based modules, admin
                      analytics, and API integration.
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Link
                        href="https://github.com/AashishSahoo"
                        target="_blank"
                        rel="noopener"
                      >
                        GitHub Profile
                      </Link>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Link
                        href="https://www.linkedin.com/in/ashishsahoo899/"
                        target="_blank"
                        rel="noopener"
                      >
                        LinkedIn Profile
                      </Link>
                    </Box>
                    <Box component="li">
                      <Link
                        href="https://portfolio-seven-tan-71.vercel.app/"
                        target="_blank"
                        rel="noopener"
                      >
                        Portfolio Website
                      </Link>
                    </Box>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Container>
      </Box>

      {/* Registration Form Section */}
      <Box
        ref={registrationRef}
        sx={{
          bgcolor: "#f1fafe",
          py: 12,
          borderTop: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            fontWeight={700}
            sx={{ mb: 6 }}
          >
            Registration Form
          </Typography>
          <RegistrationForm />
        </Container>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <ScrollTop {...props}>
        <Fab
          size="medium"
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            "&:hover": { bgcolor: "#1565c0" },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default RegisterPage;
