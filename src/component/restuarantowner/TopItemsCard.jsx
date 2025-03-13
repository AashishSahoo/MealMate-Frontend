// // import React from "react";
// // import { Box, Typography, CircularProgress, Stack } from "@mui/material";

// // const TopItemsCard = () => {
// //   const items = [
// //     { name: "Item 1", sales: 70 },
// //     { name: "Item 2", sales: 50 },
// //     { name: "Item 3", sales: 30 },
// //     { name: "Item 4", sales: 20 },
// //     { name: "Item 5", sales: 10 },
// //   ];

// //   return (
// //     <Box>
// //       <Typography variant="h6" mb={2}>
// //         Top 5 Items
// //       </Typography>
// //       <Stack spacing={2}>
// //         {items.map((item, index) => (
// //           <Box
// //             key={index}
// //             display="flex"
// //             alignItems="center"
// //             justifyContent="space-between"
// //           >
// //             <Box>
// //               <Typography>{item.name}</Typography>
// //             </Box>
// //             <Box display="flex" alignItems="center">
// //               <CircularProgress
// //                 variant="determinate"
// //                 value={item.sales}
// //                 sx={{
// //                   marginRight: 1,
// //                   color: index % 2 === 0 ? "primary.main" : "secondary.main",
// //                 }}
// //               />
// //               <Typography>{item.sales}%</Typography>
// //             </Box>
// //           </Box>
// //         ))}
// //       </Stack>
// //     </Box>
// //   );
// // };

// // export default TopItemsCard;

// import React from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Stack,
//   Card,
//   CardContent,
//   LinearProgress,
//   IconButton,
// } from "@mui/material";
// import FastfoodIcon from "@mui/icons-material/Fastfood";
// import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
// import CakeIcon from "@mui/icons-material/Cake";
// import LocalBarIcon from "@mui/icons-material/LocalBar";
// import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

// const TopItemsCard = () => {
//   const items = [
//     { name: "Burger", sales: 70, icon: <FastfoodIcon /> },
//     { name: "Pizza", sales: 50, icon: <LocalPizzaIcon /> },
//     { name: "Cake", sales: 30, icon: <CakeIcon /> },
//     { name: "Cocktail", sales: 20, icon: <LocalBarIcon /> },
//     { name: "Smoothie", sales: 10, icon: <EmojiFoodBeverageIcon /> },
//   ];

//   return (
//     <Box>
//       <Typography variant="h6" mb={2}>
//         Top 5 Trending Food Items
//       </Typography>
//       <Stack spacing={2}>
//         {items.map((item, index) => (
//           <Card
//             key={index}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: 2,
//               transition: "transform 0.3s ease",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: 3,
//               },
//             }}
//           >
//             <CardContent sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton sx={{ color: "primary.main", marginRight: 2 }}>
//                 {item.icon}
//               </IconButton>
//               <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                 {item.name}
//               </Typography>
//             </CardContent>

//             <Box sx={{ width: "50%", padding: 1 }}>
//               <LinearProgress
//                 variant="determinate"
//                 value={item.sales}
//                 sx={{
//                   height: 8,
//                   borderRadius: 5,
//                   backgroundColor: "grey.200",
//                   "& .MuiLinearProgress-bar": {
//                     backgroundColor:
//                       index % 2 === 0 ? "primary.main" : "secondary.main",
//                   },
//                 }}
//               />
//               <Box display="flex" justifyContent="space-between" mt={1}>
//                 <Typography variant="caption" color="textSecondary">
//                   {item.sales}%
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary">
//                   Sales
//                 </Typography>
//               </Box>
//             </Box>
//           </Card>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default TopItemsCard;

import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import CakeIcon from "@mui/icons-material/Cake";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

const TopItemsCard = () => {
  const items = [
    { name: "Burger", sales: 70, icon: <FastfoodIcon /> },
    { name: "Pizza", sales: 50, icon: <LocalPizzaIcon /> },
    { name: "Cake", sales: 30, icon: <CakeIcon /> },
    { name: "Cocktail", sales: 20, icon: <LocalBarIcon /> },
    { name: "Smoothie", sales: 10, icon: <EmojiFoodBeverageIcon /> },
  ];

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Top 5 Trending Food Items
      </Typography>
      <Stack spacing={2}>
        {items.map((item, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              backgroundColor: "#fafafa", // Neutral background color for all cards
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.3s ease, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <IconButton sx={{ color: "primary.main", marginRight: 2 }}>
                {item.icon}
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {item.name}
              </Typography>
            </CardContent>

            <Box sx={{ width: "50%", padding: 1 }}>
              <LinearProgress
                variant="determinate"
                value={item.sales}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: "grey.200", // Neutral background color for progress bar
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "primary.main", // Default color for progress bar
                  },
                }}
              />
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="caption" color="textSecondary">
                  {item.sales}%
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Sales
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default TopItemsCard;
