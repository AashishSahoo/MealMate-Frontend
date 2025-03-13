// import React from "react";
// import { Box, Typography, Card, CardMedia, Avatar, Stack } from "@mui/material";

// const FoodItemCard = () => {
//   const foodItem = {
//     name: "Pasta Primavera",
//     price: "$12.99",
//     category: "Italian",
//     image: "https://via.placeholder.com/300", // Replace with actual image URL
//     restroLogo: "https://via.placeholder.com/50", // Replace with actual logo URL
//   };

//   return (
//     <Card>
//       <CardMedia
//         component="img"
//         height="140"
//         image={foodItem.image}
//         alt={foodItem.name}
//       />
//       <Box p={2}>
//         <Stack
//           direction="row"
//           justifyContent="center"
//           alignItems="center"
//           mb={2}
//         >
//           <Avatar src={foodItem.restroLogo} sx={{ width: 50, height: 50 }} />
//         </Stack>
//         <Typography variant="h6" textAlign="center">
//           {foodItem.name}
//         </Typography>
//         <Typography variant="body1" textAlign="center" color="text.secondary">
//           {foodItem.category}
//         </Typography>
//         <Typography variant="h6" textAlign="center" mt={1}>
//           {foodItem.price}
//         </Typography>
//       </Box>
//     </Card>
//   );
// };

// export default FoodItemCard;

import React from "react";
import {
  Card,
  CardMedia,
  Avatar,
  Typography,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import logo3 from "/assets/logo3.png";
import logo2 from "/assets/logo2.png";

const FoodItemCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        borderRadius: 4,
        boxShadow: 3,
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Background Image */}
      <CardMedia
        component="img"
        height="180"
        image={logo3} // Replace with actual background image URL
        alt="Background"
      />

      {/* Profile Image */}
      <Box
        sx={{
          position: "relative",
          marginTop: -6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={logo2} // Replace with actual profile image URL
          sx={{
            width: 100,
            height: 100,
            border: "4px solid #fff",
          }}
        />
      </Box>

      {/* Profile Details */}
      <Typography variant="h6" mt={2}>
        Jayvion Simon
      </Typography>
      <Typography variant="body2" color="text.secondary">
        CEO
      </Typography>

      {/* Social Media Icons */}
      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <FacebookIcon sx={{ cursor: "pointer", color: "#1877F2" }} />
        <InstagramIcon sx={{ cursor: "pointer", color: "#E4405F" }} />
        <LinkedInIcon sx={{ cursor: "pointer", color: "#0A66C2" }} />
        <TwitterIcon sx={{ cursor: "pointer", color: "#1DA1F2" }} />
      </Stack>

      {/* Stats Section */}
      <Grid container mt={2} sx={{ backgroundColor: "#f8f9fa", paddingY: 2 }}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            89.4k
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Follower
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            41.3k
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Following
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            91.4k
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total post
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FoodItemCard;
