// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem,
//   Box,
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import PersonIcon from '@mui/icons-material/Person';

// export default function StatsCard() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [filter, setFilter] = useState('Last Month'); // Default filter
//   const open = Boolean(anchorEl);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//     handleMenuClose();
//   };

//   return (
//     <Card
//       sx={{
//         width: 300,
//         backgroundColor: 'green',
//         color: 'white',
//         borderRadius: 2,
//         padding: 2,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         position: 'relative',
//       }}
//     >
//       {/* Icon on the top-right */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 16,
//           right: 16,
//           backgroundColor: 'rgba(255, 255, 255, 0.2)',
//           borderRadius: '50%',
//           width: 40,
//           height: 40,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <PersonIcon sx={{ color: 'white' }} />
//       </Box>

//       {/* Main Content */}
//       <CardContent sx={{ padding: 0, paddingTop: 1 }}>
//         <Typography variant="subtitle1" component="div">
//           Total Users
//         </Typography>
//         <Typography variant="h4" component="div" sx={{ marginTop: 1 }}>
//           277
//         </Typography>
//         <Typography variant="body2" component="div" sx={{ marginTop: 1 }}>
//           {filter}
//         </Typography>
//       </CardContent>

//       {/* Three-dot menu */}
//       <IconButton
//         sx={{
//           position: 'absolute',
//           top: 16,
//           right: 60,
//           color: 'white',
//         }}
//         onClick={handleMenuOpen}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleMenuClose}
//         PaperProps={{
//           sx: {
//             backgroundColor: 'white',
//             color: 'black',
//           },
//         }}
//       >
//         <MenuItem onClick={() => handleFilterChange('Last Day')}>Last Day</MenuItem>
//         <MenuItem onClick={() => handleFilterChange('Last Week')}>Last Week</MenuItem>
//         <MenuItem onClick={() => handleFilterChange('Last Month')}>Last Month</MenuItem>
//       </Menu>
//     </Card>
//   );
// }

import React from "react";
import SlideNavbar from "../component/restuarantowner/SlideNavbar";

const Home1 = () => {
  return (
    <div>
      <SlideNavbar />
    </div>
  );
};

export default Home1;
