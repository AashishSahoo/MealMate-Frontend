// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Tabs,
// //   Tab,
// //   Typography,
// //   Paper,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Button,
// //   Grid,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   Chip,
// //   Fade,
// //   Zoom,
// //   Alert,
// // } from "@mui/material";
// // import EventSeatIcon from "@mui/icons-material/EventSeat";
// // import PersonIcon from "@mui/icons-material/Person";
// // import GroupIcon from "@mui/icons-material/Group";
// // import AccessTimeIcon from "@mui/icons-material/AccessTime";
// // import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// // import PendingActionsIcon from "@mui/icons-material/PendingActions";
// // import RestaurantIcon from "@mui/icons-material/Restaurant";

// // const TableBooking = () => {
// //   const [tabValue, setTabValue] = useState(0);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
// //   const [selectedBooking, setSelectedBooking] = useState(null);
// //   const [selectedRestaurant, setSelectedRestaurant] = useState("all");
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(5);

// //   // Sample data - replace with actual API data
// //   const availableTables = [
// //     {
// //       id: "TB12345",
// //       restaurantName: "Spice Garden",
// //       tableNumber: "5",
// //       capacity: 4,
// //       price: "₹500",
// //       status: "Available",
// //       description: "Window-side table with city view",
// //     },
// //     {
// //       id: "TB12346",
// //       restaurantName: "The Grand Kitchen",
// //       tableNumber: "3",
// //       capacity: 2,
// //       price: "₹300",
// //       status: "Available",
// //       description: "Cozy corner table for couples",
// //     },
// //     {
// //       id: "TB12347",
// //       restaurantName: "Spice Garden",
// //       tableNumber: "7",
// //       capacity: 6,
// //       price: "₹800",
// //       status: "Available",
// //       description: "Large family table",
// //     },
// //     {
// //       id: "TB12348",
// //       restaurantName: "The Grand Kitchen",
// //       tableNumber: "4",
// //       capacity: 4,
// //       price: "₹400",
// //       status: "Available",
// //       description: "Central dining area table",
// //     },
// //     {
// //       id: "TB12349",
// //       restaurantName: "Spice Garden",
// //       tableNumber: "9",
// //       capacity: 2,
// //       price: "₹300",
// //       status: "Available",
// //       description: "Intimate dining table",
// //     },
// //     {
// //       id: "TB12350",
// //       restaurantName: "The Grand Kitchen",
// //       tableNumber: "6",
// //       capacity: 8,
// //       price: "₹1000",
// //       status: "Available",
// //       description: "Premium large group table",
// //     },
// //     {
// //       id: "TB12351",
// //       restaurantName: "Spice Garden",
// //       tableNumber: "2",
// //       capacity: 4,
// //       price: "₹500",
// //       status: "Available",
// //       description: "Garden view table",
// //     },
// //     // ... rest of the availableTables data
// //   ];

// //   const bookingHistory = [
// //     {
// //       id: "BK12345",
// //       restaurantName: "Spice Garden",
// //       tableNumber: "5",
// //       numberOfPersons: 4,
// //       bookingTime: "2023-12-22 07:00 PM",
// //       status: "Confirmed",
// //     },
// //     {
// //       id: "BK12347",
// //       restaurantName: "Spice Garden",
// //       tableNumber: "7",
// //       numberOfPersons: 6,
// //       bookingTime: "2023-12-22 08:00 PM",
// //       status: "Confirmed",
// //     },
// //     {
// //       id: "BK12348",
// //       restaurantName: "The Grand Kitchen",
// //       tableNumber: "4",
// //       numberOfPersons: 4,
// //       bookingTime: "2023-12-22 07:30 PM",
// //       status: "Pending",
// //     },
// //     {
// //       id: "BK12349",
// //       restaurantName: "Spice Garden",
// //       tableNumber: "9",
// //       numberOfPersons: 2,
// //       bookingTime: "2023-12-22 06:30 PM",
// //       status: "Confirmed",
// //     },
// //     {
// //       id: "BK12350",
// //       restaurantName: "The Grand Kitchen",
// //       tableNumber: "6",
// //       numberOfPersons: 8,
// //       bookingTime: "2023-12-22 08:30 PM",
// //       status: "Confirmed",
// //     },
// //     {
// //       id: "BK12351",
// //       restaurantName: "Spice Garden",
// //       tableNumber: "2",
// //       numberOfPersons: 4,
// //       bookingTime: "2023-12-22 07:15 PM",
// //       status: "Pending",
// //     },
// //     {
// //       id: "BK12352",
// //       restaurantName: "The Grand Kitchen",
// //       tableNumber: "8",
// //       numberOfPersons: 6,
// //       bookingTime: "2023-12-22 06:15 PM",
// //       status: "Confirmed",
// //     },
// //     {
// //       id: "BK12353",
// //       restaurantName: "Spice Garden",
// //       tableNumber: "1",
// //       numberOfPersons: 2,
// //       bookingTime: "2023-12-22 08:45 PM",
// //       status: "Pending",
// //     },
// //     {
// //       id: "BK12354",
// //       restaurantName: "The Grand Kitchen",
// //       tableNumber: "10",
// //       numberOfPersons: 4,
// //       bookingTime: "2023-12-22 07:45 PM",
// //       status: "Confirmed",
// //     },
// //     // ... rest of the bookingHistory data
// //   ];

// //   const restaurants = [
// //     ...new Set(availableTables.map((table) => table.restaurantName)),
// //   ];

// //   const handleTabChange = (event, newValue) => {
// //     setTabValue(newValue);
// //   };

// //   const handleOpenDialog = (booking) => {
// //     setSelectedBooking(booking);
// //     setOpenDialog(true);
// //   };

// //   const handleCloseDialog = () => {
// //     setOpenDialog(false);
// //   };

// //   const handleConfirmBooking = () => {
// //     setOpenDialog(false);
// //     setOpenSuccessDialog(true);
// //   };

// //   const handleRestaurantChange = (event) => {
// //     setSelectedRestaurant(event.target.value);
// //   };

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const filteredTables =
// //     selectedRestaurant === "all"
// //       ? availableTables
// //       : availableTables.filter(
// //           (table) => table.restaurantName === selectedRestaurant
// //         );

// //   const getStatusChip = (status) => {
// //     if (status === "Pending") {
// //       return (
// //         <Chip
// //           icon={<PendingActionsIcon sx={{ fontSize: 16 }} />}
// //           label="Pending"
// //           sx={{
// //             backgroundColor: "rgba(147, 112, 219, 0.1)",
// //             color: "#9370DB",
// //             fontWeight: 600,
// //             "& .MuiChip-icon": {
// //               color: "#9370DB",
// //             },
// //           }}
// //           size="small"
// //         />
// //       );
// //     }
// //     if (status === "Confirmed") {
// //       return (
// //         <Chip
// //           icon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
// //           label="Confirmed"
// //           sx={{
// //             backgroundColor: "rgba(138, 43, 226, 0.1)",
// //             color: "#8A2BE2",
// //             fontWeight: 600,
// //             "& .MuiChip-icon": {
// //               color: "#8A2BE2",
// //             },
// //           }}
// //           size="small"
// //         />
// //       );
// //     }
// //     return null;
// //   };

// //   return (
// //     <Box sx={{ width: "100%", p: 2 }}>
// //       <Box
// //         sx={{
// //           display: "flex",
// //           alignItems: "center",
// //           mb: 3,
// //           borderBottom: 1,
// //           borderColor: "divider",
// //         }}
// //       >
// //         <Tabs
// //           value={tabValue}
// //           onChange={handleTabChange}
// //           sx={{
// //             "& .MuiTab-root": {
// //               fontWeight: 600,
// //               color: "#9370DB",
// //             },
// //             "& .Mui-selected": {
// //               color: "#8A2BE2",
// //             },
// //             "& .MuiTabs-indicator": {
// //               backgroundColor: "#8A2BE2",
// //             },
// //           }}
// //         >
// //           <Tab label="Available Tables" />
// //           <Tab label="Booking History" />
// //         </Tabs>

// //         {tabValue === 0 && (
// //           <FormControl sx={{ ml: "auto", minWidth: 200 }}>
// //             <InputLabel>Filter by Restaurant</InputLabel>
// //             <Select
// //               value={selectedRestaurant}
// //               onChange={handleRestaurantChange}
// //               label="Filter by Restaurant"
// //               sx={{
// //                 "& .MuiOutlinedInput-notchedOutline": {
// //                   borderColor: "#9370DB",
// //                 },
// //                 "&:hover .MuiOutlinedInput-notchedOutline": {
// //                   borderColor: "#8A2BE2",
// //                 },
// //                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
// //                   borderColor: "#8A2BE2",
// //                 },
// //               }}
// //             >
// //               <MenuItem value="all">All Restaurants</MenuItem>
// //               {restaurants.map((restaurant) => (
// //                 <MenuItem key={restaurant} value={restaurant}>
// //                   {restaurant}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //         )}
// //       </Box>

// //       {tabValue === 0 && (
// //         <Fade in={true} timeout={1000}>
// //           <Box>
// //             <Grid container spacing={3}>
// //               {filteredTables.map((table) => (
// //                 <Grid item xs={12} md={3} key={table.id}>
// //                   <Zoom in={true} timeout={500}>
// //                     <Card
// //                       sx={{
// //                         height: "100%",
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         borderRadius: "1rem",
// //                         transition: "transform 0.3s ease-in-out",
// //                         "&:hover": {
// //                           transform: "translateY(-5px)",
// //                           boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
// //                         },
// //                       }}
// //                     >
// //                       <CardContent>
// //                         <Typography variant="h6" gutterBottom>
// //                           {table.restaurantName}
// //                         </Typography>
// //                         <Typography
// //                           variant="body1"
// //                           color="text.secondary"
// //                           gutterBottom
// //                         >
// //                           <EventSeatIcon
// //                             sx={{
// //                               mr: 1,
// //                               verticalAlign: "middle",
// //                               color: "#9370DB",
// //                             }}
// //                           />
// //                           Table {table.tableNumber}
// //                         </Typography>
// //                         <Typography
// //                           variant="body1"
// //                           color="text.secondary"
// //                           gutterBottom
// //                         >
// //                           <GroupIcon
// //                             sx={{
// //                               mr: 1,
// //                               verticalAlign: "middle",
// //                               color: "#9370DB",
// //                             }}
// //                           />
// //                           Capacity: {table.capacity} Persons
// //                         </Typography>
// //                         <Typography
// //                           variant="body1"
// //                           color="text.secondary"
// //                           gutterBottom
// //                         >
// //                           Price: {table.price}
// //                         </Typography>
// //                         <Typography variant="body2" color="text.secondary">
// //                           {table.description}
// //                         </Typography>
// //                       </CardContent>
// //                       <CardActions sx={{ mt: "auto", p: 2 }}>
// //                         <Button
// //                           fullWidth
// //                           variant="contained"
// //                           onClick={() => handleOpenDialog(table)}
// //                           sx={{
// //                             borderRadius: "1rem",

// //                             background:
// //                               "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
// //                             "&:hover": {
// //                               background:
// //                                 "linear-gradient(135deg, #8A2BE2 0%, #9370DB 100%)",
// //                             },
// //                           }}
// //                         >
// //                           Book Now
// //                         </Button>
// //                       </CardActions>
// //                     </Card>
// //                   </Zoom>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           </Box>
// //         </Fade>
// //       )}

// //       {tabValue === 1 && (
// //         <Fade in={true} timeout={1000}>
// //           <TableContainer component={Paper}>
// //             <Table>
// //               <TableHead>
// //                 <TableRow sx={{ backgroundColor: "rgba(147, 112, 219, 0.1)" }}>
// //                   <TableCell>Booking ID</TableCell>
// //                   <TableCell>Restaurant</TableCell>
// //                   <TableCell>Table Number</TableCell>
// //                   <TableCell>Persons</TableCell>
// //                   <TableCell>Booking Time</TableCell>
// //                   <TableCell>Status</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {bookingHistory
// //                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //                   .map((booking) => (
// //                     <TableRow key={booking.id}>
// //                       <TableCell>{booking.id}</TableCell>
// //                       <TableCell>{booking.restaurantName}</TableCell>
// //                       <TableCell>{booking.tableNumber}</TableCell>
// //                       <TableCell>{booking.numberOfPersons}</TableCell>
// //                       <TableCell>{booking.bookingTime}</TableCell>
// //                       <TableCell>{getStatusChip(booking.status)}</TableCell>
// //                     </TableRow>
// //                   ))}
// //               </TableBody>
// //             </Table>
// //             <TablePagination
// //               rowsPerPageOptions={[5, 10, 25]}
// //               component="div"
// //               count={bookingHistory.length}
// //               rowsPerPage={rowsPerPage}
// //               page={page}
// //               onPageChange={handleChangePage}
// //               onRowsPerPageChange={handleChangeRowsPerPage}
// //             />
// //           </TableContainer>
// //         </Fade>
// //       )}

// //       <Dialog
// //         open={openDialog}
// //         onClose={handleCloseDialog}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle
// //           sx={{
// //             background: "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
// //             color: "white",
// //           }}
// //         >
// //           Confirm Table Booking
// //         </DialogTitle>
// //         <DialogContent sx={{ mt: 2 }}>
// //           {selectedBooking && (
// //             <Box sx={{ p: 2 }}>
// //               <Typography variant="h6" gutterBottom>
// //                 {selectedBooking.restaurantName}
// //               </Typography>
// //               <Typography variant="body1" gutterBottom>
// //                 Table Number: {selectedBooking.tableNumber}
// //               </Typography>
// //               <Typography variant="body1" gutterBottom>
// //                 Capacity: {selectedBooking.capacity} Persons
// //               </Typography>
// //               <Typography variant="body1">
// //                 Price: {selectedBooking.price}
// //               </Typography>
// //             </Box>
// //           )}
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCloseDialog}>Cancel</Button>
// //           <Button
// //             variant="contained"
// //             onClick={handleConfirmBooking}
// //             sx={{
// //               background: "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
// //               "&:hover": {
// //                 background: "linear-gradient(135deg, #8A2BE2 0%, #9370DB 100%)",
// //               },
// //             }}
// //           >
// //             Confirm Booking
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       <Dialog
// //         open={openSuccessDialog}
// //         onClose={() => setOpenSuccessDialog(false)}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogContent>
// //           <Alert
// //             severity="success"
// //             sx={{
// //               mt: 2,
// //               "& .MuiAlert-icon": {
// //                 color: "#8A2BE2",
// //               },
// //             }}
// //           >
// //             Table booked successfully! Your booking confirmation has been sent
// //             to your email.
// //           </Alert>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button
// //             onClick={() => setOpenSuccessDialog(false)}
// //             sx={{ color: "#9370DB" }}
// //           >
// //             Close
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default TableBooking;

// import React, { useState } from "react";
// import {
//   Box,
//   Tabs,
//   Tab,
//   Typography,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Chip,
//   Fade,
//   Zoom,
//   Alert,
//   Divider,
// } from "@mui/material";
// import EventSeatIcon from "@mui/icons-material/EventSeat";
// import PersonIcon from "@mui/icons-material/Person";
// import GroupIcon from "@mui/icons-material/Group";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";
// import RestaurantIcon from "@mui/icons-material/Restaurant";

// const TableBooking = () => {
//   const [tabValue, setTabValue] = useState(0);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [selectedRestaurant, setSelectedRestaurant] = useState("all");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // Sample data - replace with actual API data
//   const availableTables = [
//     {
//       id: "TB12345",
//       restaurantName: "Spice Garden",
//       tableNumber: "5",
//       capacity: 4,
//       price: "₹500",
//       status: "Available",
//       description: "Window-side table with city view",
//     },
//     {
//       id: "TB12346",
//       restaurantName: "The Grand Kitchen",
//       tableNumber: "3",
//       capacity: 2,
//       price: "₹300",
//       status: "Available",
//       description: "Cozy corner table for couples",
//     },
//     {
//       id: "TB12347",
//       restaurantName: "Spice Garden",
//       tableNumber: "7",
//       capacity: 6,
//       price: "₹800",
//       status: "Available",
//       description: "Large family table",
//     },
//     {
//       id: "TB12348",
//       restaurantName: "The Grand Kitchen",
//       tableNumber: "4",
//       capacity: 4,
//       price: "₹400",
//       status: "Available",
//       description: "Central dining area table",
//     },
//     {
//       id: "TB12349",
//       restaurantName: "Spice Garden",
//       tableNumber: "9",
//       capacity: 2,
//       price: "₹300",
//       status: "Available",
//       description: "Intimate dining table",
//     },
//     {
//       id: "TB12350",
//       restaurantName: "The Grand Kitchen",
//       tableNumber: "6",
//       capacity: 8,
//       price: "₹1000",
//       status: "Available",
//       description: "Premium large group table",
//     },
//     {
//       id: "TB12351",
//       restaurantName: "Spice Garden",
//       tableNumber: "2",
//       capacity: 4,
//       price: "₹500",
//       status: "Available",
//       description: "Garden view table",
//     },
//     // ... rest of the availableTables data
//   ];

//   const bookingHistory = [
//     {
//       id: "BK12345",
//       restaurantName: "Spice Garden",
//       tableNumber: "5",
//       numberOfPersons: 4,
//       bookingTime: "2023-12-22 07:00 PM",
//       status: "Confirmed",
//     },
//     {
//       id: "BK12347",
//       restaurantName: "Spice Garden",
//       tableNumber: "7",
//       numberOfPersons: 6,
//       bookingTime: "2023-12-22 08:00 PM",
//       status: "Confirmed",
//     },
//     {
//       id: "BK12348",
//       restaurantName: "The Grand Kitchen",
//       tableNumber: "4",
//       numberOfPersons: 4,
//       bookingTime: "2023-12-22 07:30 PM",
//       status: "Pending",
//     },
//     {
//       id: "BK12349",
//       restaurantName: "Spice Garden",
//       tableNumber: "9",
//       numberOfPersons: 2,
//       bookingTime: "2023-12-22 06:30 PM",
//       status: "Confirmed",
//     },
//     {
//       id: "BK12350",
//       restaurantName: "The Grand Kitchen",
//       tableNumber: "6",
//       numberOfPersons: 8,
//       bookingTime: "2023-12-22 08:30 PM",
//       status: "Confirmed",
//     },
//     {
//       id: "BK12351",
//       restaurantName: "Spice Garden",
//       tableNumber: "2",
//       numberOfPersons: 4,
//       bookingTime: "2023-12-22 07:15 PM",
//       status: "Pending",
//     },
//     {
//       id: "BK12352",
//       restaurantName: "The Grand Kitchen",
//       tableNumber: "8",
//       numberOfPersons: 6,
//       bookingTime: "2023-12-22 06:15 PM",
//       status: "Confirmed",
//     },
//     {
//       id: "BK12353",
//       restaurantName: "Spice Garden",
//       tableNumber: "1",
//       numberOfPersons: 2,
//       bookingTime: "2023-12-22 08:45 PM",
//       status: "Pending",
//     },
//     {
//       id: "BK12354",
//       restaurantName: "The Grand Kitchen",
//       tableNumber: "10",
//       numberOfPersons: 4,
//       bookingTime: "2023-12-22 07:45 PM",
//       status: "Confirmed",
//     },
//     // ... rest of the bookingHistory data
//   ];

//   const restaurants = [
//     ...new Set(availableTables.map((table) => table.restaurantName)),
//   ];

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleOpenDialog = (booking) => {
//     setSelectedBooking(booking);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleConfirmBooking = () => {
//     setOpenDialog(false);
//     setOpenSuccessDialog(true);
//   };

//   const handleRestaurantChange = (event) => {
//     setSelectedRestaurant(event.target.value);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredTables =
//     selectedRestaurant === "all"
//       ? availableTables
//       : availableTables.filter(
//           (table) => table.restaurantName === selectedRestaurant
//         );

//   const getStatusChip = (status) => {
//     if (status === "Pending") {
//       return (
//         <Chip
//           icon={<PendingActionsIcon sx={{ fontSize: 16 }} />}
//           label="Pending"
//           sx={{
//             backgroundColor: "rgba(147, 112, 219, 0.1)",
//             color: "#9370DB",
//             fontWeight: 600,
//             "& .MuiChip-icon": {
//               color: "#9370DB",
//             },
//           }}
//           size="small"
//         />
//       );
//     }
//     if (status === "Confirmed") {
//       return (
//         <Chip
//           icon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
//           label="Confirmed"
//           sx={{
//             backgroundColor: "rgba(138, 43, 226, 0.1)",
//             color: "#8A2BE2",
//             fontWeight: 600,
//             "& .MuiChip-icon": {
//               color: "#8A2BE2",
//             },
//           }}
//           size="small"
//         />
//       );
//     }
//     return null;
//   };

//   return (
//     <Box sx={{ width: "100%", p: 2 }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           mb: 3,
//           borderBottom: 1,
//           borderColor: "divider",
//         }}
//       >
//         <Tabs
//           value={tabValue}
//           onChange={handleTabChange}
//           sx={{
//             "& .MuiTab-root": {
//               fontWeight: 600,
//               color: "#9370DB",
//             },
//             "& .Mui-selected": {
//               color: "#8A2BE2",
//             },
//             "& .MuiTabs-indicator": {
//               backgroundColor: "#8A2BE2",
//             },
//           }}
//         >
//           <Tab label="Available Tables" />
//           <Tab label="Booking History" />
//         </Tabs>

//         {tabValue === 0 && (
//           <FormControl sx={{ ml: "auto", minWidth: 200 }}>
//             <InputLabel>Filter by Restaurant</InputLabel>
//             <Select
//               value={selectedRestaurant}
//               onChange={handleRestaurantChange}
//               label="Filter by Restaurant"
//               sx={{
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#9370DB",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#8A2BE2",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#8A2BE2",
//                 },
//               }}
//             >
//               <MenuItem value="all">All Restaurants</MenuItem>
//               {restaurants.map((restaurant) => (
//                 <MenuItem key={restaurant} value={restaurant}>
//                   {restaurant}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}
//       </Box>

//       {tabValue === 0 && (
//         <Fade in={true} timeout={1000}>
//           <Box>
//             <Grid container spacing={3}>
//               {filteredTables.map((table) => (
//                 <Grid item xs={12} md={3} key={table.id}>
//                   <Zoom in={true} timeout={500}>
//                     <Card
//                       sx={{
//                         height: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                         borderRadius: "1rem",
//                         // transition: "transform 0.3s ease-in-out",
//                         transition: "all 0.3s ease",

//                         "&:hover": {
//                           // transform: "translateY(-5px)",
//                           transform:
//                             "perspective(1000px) rotateX(5deg) scale(1.05)",

//                           // boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//                           // borderColor: solid "#dec3ff",
//                           border: "2px solid #b377ff",
//                         },
//                       }}
//                     >
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                           {table.restaurantName}
//                         </Typography>
//                         <Typography
//                           variant="body1"
//                           color="text.secondary"
//                           gutterBottom
//                         >
//                           <EventSeatIcon
//                             sx={{
//                               mr: 1,
//                               verticalAlign: "middle",
//                               color: "#9370DB",
//                             }}
//                           />
//                           Table {table.tableNumber}
//                         </Typography>
//                         <Typography
//                           variant="body1"
//                           color="text.secondary"
//                           gutterBottom
//                         >
//                           <GroupIcon
//                             sx={{
//                               mr: 1,
//                               verticalAlign: "middle",
//                               color: "#9370DB",
//                             }}
//                           />
//                           Capacity: {table.capacity} Persons
//                         </Typography>
//                         <Typography
//                           variant="body1"
//                           color="text.secondary"
//                           gutterBottom
//                         >
//                           Price: {table.price}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {table.description}
//                         </Typography>
//                       </CardContent>
//                       <CardActions sx={{ mt: "auto", p: 2 }}>
//                         <Button
//                           fullWidth
//                           variant="contained"
//                           onClick={() => handleOpenDialog(table)}
//                           sx={{
//                             borderRadius: "1rem",
//                             background:
//                               "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
//                             "&:hover": {
//                               background:
//                                 "linear-gradient(135deg, #8A2BE2 0%, #9370DB 100%)",
//                             },
//                           }}
//                         >
//                           Book Now
//                         </Button>
//                       </CardActions>
//                     </Card>
//                   </Zoom>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         </Fade>
//       )}

//       {tabValue === 1 && (
//         <Fade in={true} timeout={1000}>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "rgba(147, 112, 219, 0.1)" }}>
//                   <TableCell>Booking ID</TableCell>
//                   <TableCell>Restaurant</TableCell>
//                   <TableCell>Table Number</TableCell>
//                   <TableCell>Persons</TableCell>
//                   <TableCell>Booking Time</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {bookingHistory
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((booking) => (
//                     <TableRow key={booking.id}>
//                       <TableCell>{booking.id}</TableCell>
//                       <TableCell>{booking.restaurantName}</TableCell>
//                       <TableCell>{booking.tableNumber}</TableCell>
//                       <TableCell>{booking.numberOfPersons}</TableCell>
//                       <TableCell>{booking.bookingTime}</TableCell>
//                       <TableCell>{getStatusChip(booking.status)}</TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={bookingHistory.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </TableContainer>
//         </Fade>
//       )}

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 2,
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             bgcolor: "#f8f9fa",
//             color: "#1a1a1a",
//             fontWeight: 600,
//             py: 2,
//             px: 3,
//             borderBottom: "1px solid #e9ecef",
//           }}
//         >
//           Table Booking Details
//         </DialogTitle>
//         <DialogContent sx={{ p: 3 }}>
//           {selectedBooking && (
//             <Box>
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="h6" color="primary" gutterBottom>
//                   {selectedBooking.restaurantName}
//                 </Typography>
//                 <Divider sx={{ my: 2 }} />
//               </Box>

//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Table Number
//                   </Typography>
//                   <Typography variant="body1" sx={{ mt: 0.5 }}>
//                     {selectedBooking.tableNumber}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Capacity
//                   </Typography>
//                   <Typography variant="body1" sx={{ mt: 0.5 }}>
//                     {selectedBooking.capacity} Persons
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Price
//                   </Typography>
//                   <Typography variant="body1" sx={{ mt: 0.5 }}>
//                     {selectedBooking.price}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Description
//                   </Typography>
//                   <Typography variant="body1" sx={{ mt: 0.5 }}>
//                     {selectedBooking.description}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 3, borderTop: "1px solid #e9ecef" }}>
//           <Button
//             onClick={handleCloseDialog}
//             variant="outlined"
//             sx={{
//               borderRadius: 2,
//               px: 3,
//               borderColor: "#9370DB",
//               color: "#9370DB",
//               "&:hover": {
//                 borderColor: "#8A2BE2",
//                 backgroundColor: "rgba(138, 43, 226, 0.04)",
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleConfirmBooking}
//             sx={{
//               borderRadius: 2,
//               px: 3,
//               backgroundColor: "#9370DB",
//               "&:hover": {
//                 backgroundColor: "#8A2BE2",
//               },
//             }}
//           >
//             Confirm Booking
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={openSuccessDialog}
//         onClose={() => setOpenSuccessDialog(false)}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 2,
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           },
//         }}
//       >
//         <DialogContent sx={{ p: 3, textAlign: "center" }}>
//           <CheckCircleOutlineIcon
//             sx={{
//               fontSize: 60,
//               color: "#4CAF50",
//               mb: 2,
//             }}
//           />
//           <Typography variant="h6" gutterBottom>
//             Booking Confirmed!
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Your table has been successfully booked. A confirmation email has
//             been sent to your registered email address.The charges has to be
//             paid on visit.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ p: 3, justifyContent: "center" }}>
//           <Button
//             onClick={() => setOpenSuccessDialog(false)}
//             variant="contained"
//             sx={{
//               borderRadius: 2,
//               px: 4,
//               backgroundColor: "#4CAF50",
//               "&:hover": {
//                 backgroundColor: "#388E3C",
//               },
//             }}
//           >
//             Done
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default TableBooking;

import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CardMedia,
  Chip,
  Fade,
  Zoom,
  Alert,
  Divider,
  Grid2,
} from "@mui/material";
import { motion } from "framer-motion";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import tablebooking from "../../assets/tablebooking.png";

const TableBooking = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sample data - replace with actual API data
  const availableTables = [
    {
      id: "TB12345",
      restaurantName: "Spice Garden",
      tableNumber: "5",
      capacity: 4,
      price: "₹500",
      status: "Available",
      description: "Window-side table with city view",
      time: "1:00 PM - 2:00 PM",
    },
    {
      id: "TB12346",
      restaurantName: "The Grand Kitchen",
      tableNumber: "3",
      capacity: 2,
      price: "₹300",
      status: "Available",
      description: "Cozy corner table for couples",
      time: "1:00 PM - 2:00 PM",
    },
    {
      id: "TB12347",
      restaurantName: "Spice Garden",
      tableNumber: "7",
      capacity: 6,
      price: "₹800",
      status: "Available",
      description: "Large family table",
      time: "1:00 PM - 2:00 PM",
    },
    {
      id: "TB12348",
      restaurantName: "The Grand Kitchen",
      tableNumber: "4",
      capacity: 4,
      price: "₹400",
      status: "Available",
      description: "Central dining area table",
      time: "1:00 PM - 2:00 PM",
    },
    {
      id: "TB12349",
      restaurantName: "Spice Garden",
      tableNumber: "9",
      capacity: 2,
      price: "₹300",
      status: "Available",
      description: "Intimate dining table",
      time: "1:00 PM - 2:00 PM",
    },
    {
      id: "TB12350",
      restaurantName: "The Grand Kitchen",
      tableNumber: "6",
      capacity: 8,
      price: "₹1000",
      status: "Available",
      description: "Premium large group table",
      time: "1:00 PM - 2:00 PM",
    },
    {
      id: "TB12351",
      restaurantName: "Spice Garden",
      tableNumber: "2",
      capacity: 4,
      price: "₹500",
      status: "Available",
      description: "Garden view table",
      time: "1:00 PM - 2:00 PM",
    },
  ];

  const bookingHistory = [
    {
      id: "BK12345",
      restaurantName: "Spice Garden",
      tableNumber: "5",
      numberOfPersons: 4,
      bookingTime: "2023-12-22 07:00 PM",
      status: "Confirmed",
    },
    {
      id: "BK12347",
      restaurantName: "Spice Garden",
      tableNumber: "7",
      numberOfPersons: 6,
      bookingTime: "2023-12-22 08:00 PM",
      status: "Confirmed",
    },
    {
      id: "BK12348",
      restaurantName: "The Grand Kitchen",
      tableNumber: "4",
      numberOfPersons: 4,
      bookingTime: "2023-12-22 07:30 PM",
      status: "Pending",
    },
    {
      id: "BK12349",
      restaurantName: "Spice Garden",
      tableNumber: "9",
      numberOfPersons: 2,
      bookingTime: "2023-12-22 06:30 PM",
      status: "Confirmed",
    },
    {
      id: "BK12350",
      restaurantName: "The Grand Kitchen",
      tableNumber: "6",
      numberOfPersons: 8,
      bookingTime: "2023-12-22 08:30 PM",
      status: "Confirmed",
    },
    {
      id: "BK12351",
      restaurantName: "Spice Garden",
      tableNumber: "2",
      numberOfPersons: 4,
      bookingTime: "2023-12-22 07:15 PM",
      status: "Pending",
    },
    {
      id: "BK12352",
      restaurantName: "The Grand Kitchen",
      tableNumber: "8",
      numberOfPersons: 6,
      bookingTime: "2023-12-22 06:15 PM",
      status: "Confirmed",
    },
    {
      id: "BK12353",
      restaurantName: "Spice Garden",
      tableNumber: "1",
      numberOfPersons: 2,
      bookingTime: "2023-12-22 08:45 PM",
      status: "Pending",
    },
    {
      id: "BK12354",
      restaurantName: "The Grand Kitchen",
      tableNumber: "10",
      numberOfPersons: 4,
      bookingTime: "2023-12-22 07:45 PM",
      status: "Confirmed",
    },
  ];

  const restaurants = [
    ...new Set(availableTables.map((table) => table.restaurantName)),
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmBooking = () => {
    setOpenDialog(false);
    setOpenSuccessDialog(true);
  };

  const handleRestaurantChange = (event) => {
    setSelectedRestaurant(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTables =
    selectedRestaurant === "all"
      ? availableTables
      : availableTables.filter(
          (table) => table.restaurantName === selectedRestaurant
        );

  const getStatusChip = (status) => {
    if (status === "Pending") {
      return (
        <Chip
          icon={<PendingActionsIcon sx={{ fontSize: 16 }} />}
          label="Pending"
          sx={{
            backgroundColor: "rgba(147, 112, 219, 0.1)",
            color: "#9370DB",
            fontWeight: 600,
            "& .MuiChip-icon": {
              color: "#9370DB",
            },
          }}
          size="small"
        />
      );
    }
    if (status === "Confirmed") {
      return (
        <Chip
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
          label="Confirmed"
          sx={{
            backgroundColor: "rgba(138, 43, 226, 0.1)",
            color: "#8A2BE2",
            fontWeight: 600,
            "& .MuiChip-icon": {
              color: "#8A2BE2",
            },
          }}
          size="small"
        />
      );
    }
    return null;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              color: "#9370DB",
            },
            "& .Mui-selected": {
              color: "#8A2BE2",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#8A2BE2",
            },
          }}
        >
          <Tab label="Available Tables" />
          <Tab label="Booking History" />
        </Tabs>

        {tabValue === 0 && (
          <FormControl sx={{ ml: "auto", minWidth: 200 }}>
            <InputLabel>Filter by Restaurant</InputLabel>
            <Select
              value={selectedRestaurant}
              onChange={handleRestaurantChange}
              label="Filter by Restaurant"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9370DB",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#8A2BE2",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#8A2BE2",
                },
              }}
            >
              <MenuItem value="all">All Restaurants</MenuItem>
              {restaurants.map((restaurant) => (
                <MenuItem key={restaurant} value={restaurant}>
                  {restaurant}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {tabValue === 0 && (
        <Fade in={true} timeout={1000}>
          <Box>
            <Grid container spacing={3}>
              {/* First Card - Only Image */}
              <Grid item xs={12} md={3}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "1rem",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }} // Zoom-in effect on hover
                      transition={{ type: "tween", stiffness: 300 }} // Smooth transition
                    >
                      <CardMedia
                        component="img"
                        height="258"
                        image={tablebooking}
                        alt="People enjoying food"
                        sx={{
                          borderRadius: "1rem 1rem 0 0", // Rounded corners at the top
                        }}
                      />
                    </motion.div>
                  </Card>
                </motion.div>
              </Grid>

              {/* Other Cards - Normal Details */}
              {filteredTables.map((table, index) => (
                <Grid item xs={12} md={3} key={table.id}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "1rem",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {table.restaurantName}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          gutterBottom
                        >
                          <EventSeatIcon
                            sx={{
                              mr: 1,
                              verticalAlign: "middle",
                              color: "#9370DB",
                            }}
                          />
                          Table {table.tableNumber}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          gutterBottom
                        >
                          <GroupIcon
                            sx={{
                              mr: 1,
                              verticalAlign: "middle",
                              color: "#9370DB",
                            }}
                          />
                          Capacity: {table.capacity} Persons
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          gutterBottom
                        >
                          <CurrencyRupeeIcon
                            sx={{
                              mr: 1,
                              verticalAlign: "middle",
                              color: "#9370DB",
                            }}
                          />
                          Price: {table.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <HourglassBottomIcon
                            sx={{
                              mr: 1,
                              verticalAlign: "middle",
                              color: "#9370DB",
                            }}
                          />
                          Time Slot : {table.time}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ mt: "auto", p: 2 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleOpenDialog(table)}
                          sx={{
                            borderRadius: "1rem",
                            background:
                              "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
                            "&:hover": {
                              background:
                                "linear-gradient(135deg, #8A2BE2 0%, #9370DB 100%)",
                            },
                          }}
                        >
                          Book Now
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      )}
      {tabValue === 1 && (
        <Fade in={true} timeout={1000}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(147, 112, 219, 0.1)" }}>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Table Number</TableCell>
                  <TableCell>Persons</TableCell>
                  <TableCell>Booking Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingHistory
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.restaurantName}</TableCell>
                      <TableCell>{booking.tableNumber}</TableCell>
                      <TableCell>{booking.numberOfPersons}</TableCell>
                      <TableCell>{booking.bookingTime}</TableCell>
                      <TableCell>{getStatusChip(booking.status)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={bookingHistory.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Fade>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#dec3ff",
            color: "#1a1a1a",
            fontWeight: 600,
            py: 2,
            px: 3,
            borderBottom: "1px solid #e9ecef",
          }}
        >
          Table Booking Details
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedBooking && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  color="#5b4c73"
                  gutterBottom
                  sx={{ mt: "0.4rem" }}
                >
                  {selectedBooking.restaurantName}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Table Number
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {selectedBooking.tableNumber}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Capacity
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {selectedBooking.capacity} Persons
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Price
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {selectedBooking.price}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Time Slot
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {selectedBooking.time}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: "1px solid #e9ecef" }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 3,
              borderColor: "#9370DB",
              color: "#9370DB",
              "&:hover": {
                borderColor: "#8A2BE2",
                backgroundColor: "rgba(138, 43, 226, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmBooking}
            sx={{
              borderRadius: 2,
              px: 3,
              backgroundColor: "#9370DB",
              "&:hover": {
                backgroundColor: "#8A2BE2",
              },
            }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogContent sx={{ p: 3, textAlign: "center" }}>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 60,
              color: "#4CAF50",
              mb: 2,
            }}
          />
          <Typography variant="h6" gutterBottom>
            Booking Confirmed!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your table has been successfully booked. A confirmation email has
            been sent to your registered email address.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: "center" }}>
          <Button
            onClick={() => setOpenSuccessDialog(false)}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 4,
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "#388E3C",
              },
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableBooking;
