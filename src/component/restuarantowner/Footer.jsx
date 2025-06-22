// Footer.js
import React from "react";
import { Box, Typography, Container, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#04304f",
        color: "#fff",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              MealMate Partner
            </Typography>
            <Typography variant="body2">
              Grow your restaurant business with MealMate's powerful platform.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box
              component="ul"
              sx={{ listStyle: "none", padding: 0, "& li": { mb: 1 } }}
            >
              <li>
                <Link href="#" color="inherit" underline="hover">
                  Partner Home
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit" underline="hover">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit" underline="hover">
                  Contact Support
                </Link>
              </li>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: ashishsahoo0013@gmail.com
            </Typography>
            <Typography variant="body2">Phone: +91 (8999) 081-573</Typography>
          </Grid>
        </Grid>
        <Box
          sx={{ mt: 4, pt: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} MealMate. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
