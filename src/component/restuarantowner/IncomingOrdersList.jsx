// import React from "react";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Typography,
//   Chip,
// } from "@mui/material";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import PersonIcon from "@mui/icons-material/Person";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";

// const IncomingOrdersList = () => {
//   const orders = [
//     {
//       id: "ORD12345",
//       customerName: "John Doe",
//       totalAmount: "$45.99",
//       orderTime: "2023-12-22 11:30 AM",
//       status: "Pending",
//     },
//     {
//       id: "ORD12346",
//       customerName: "Alice Smith",
//       totalAmount: "$23.49",
//       orderTime: "2023-12-22 11:20 AM",
//       status: "Confirmed",
//     },
//     {
//       id: "ORD12347",
//       customerName: "Mark Wilson",
//       totalAmount: "$15.00",
//       orderTime: "2023-12-22 11:10 AM",
//       status: "Pending",
//     },
//     {
//       id: "ORD12348",
//       customerName: "Jane Brown",
//       totalAmount: "$50.00",
//       orderTime: "2023-12-22 10:50 AM",
//       status: "Confirmed",
//     },
//     {
//       id: "ORD12349",
//       customerName: "Tom Harris",
//       totalAmount: "$30.75",
//       orderTime: "2023-12-22 10:30 AM",
//       status: "Pending",
//     },
//   ];

//   const getStatusChip = (status) => {
//     if (status === "Pending") {
//       return (
//         <Chip
//           icon={<PendingActionsIcon />}
//           label="Pending"
//           color="warning"
//           size="small"
//         />
//       );
//     }
//     if (status === "Confirmed") {
//       return (
//         <Chip
//           icon={<CheckCircleOutlineIcon />}
//           label="Confirmed"
//           color="success"
//           size="small"
//         />
//       );
//     }
//     return null;
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: 300,
//         height: 450, // Fixed height
//         // padding: 1,
//         borderRadius: 2,
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//         background: "#ffffff",
//       }}
//     >
//       {/* Centered Heading */}
//       <Box
//         sx={{
//           // background: "linear-gradient(to right, #4facfe, #00f2fe)",
//           background:
//             "linear-gradient(to right,rgb(250, 191, 90),rgb(230, 135, 19))",
//           padding: "10px 0",
//           borderRadius: 1,
//           textAlign: "center",
//           // marginBottom: 2,
//         }}
//       >
//         <Typography variant="h6" component="div" sx={{ color: "white" }}>
//           Incoming Orders
//         </Typography>
//       </Box>

//       {/* Order List */}
//       <Box
//         sx={{
//           background: "#ffffff",
//           borderRadius: 2,
//           height: "calc(100% - 60px)", // Remaining height after header
//           overflowY: "auto", // Scroll within the box
//           // padding: 1,
//         }}
//       >
//         <List>
//           {orders.map((order) => (
//             <ListItem
//               key={order.id}
//               sx={{
//                 position: "relative", // To position the orange line absolutely
//                 padding: 2,
//               }}
//             >
//               <ListItemAvatar>
//                 <Avatar sx={{ backgroundColor: "#ff9800" }}>
//                   <RestaurantIcon />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText
//                 primary={
//                   <Typography variant="body1" fontWeight="bold">
//                     Order ID: {order.id}
//                   </Typography>
//                 }
//                 secondary={
//                   <>
//                     <Typography variant="body2" color="textSecondary">
//                       <PersonIcon
//                         fontSize="small"
//                         sx={{ verticalAlign: "middle", marginRight: 0.5 }}
//                       />
//                       {order.customerName}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       <MonetizationOnIcon
//                         fontSize="small"
//                         sx={{ verticalAlign: "middle", marginRight: 0.5 }}
//                       />
//                       {order.totalAmount}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       <AccessTimeIcon
//                         fontSize="small"
//                         sx={{ verticalAlign: "middle", marginRight: 0.5 }}
//                       />
//                       {order.orderTime}
//                     </Typography>
//                   </>
//                 }
//               />
//               {/* Fixed-width orange line */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   width: "80%", // Fixed width for the line
//                   height: "1px", // Height of the line
//                   backgroundColor: "orange",
//                 }}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Box>
//   );
// };

// export default IncomingOrdersList;

import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Chip,
  Paper,
  Fade,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const IncomingOrdersList = () => {
  const orders = [
    {
      id: "ORD12345",
      customerName: "John Doe",
      totalAmount: "$45.99",
      orderTime: "2023-12-22 11:30 AM",
      status: "Pending",
    },
    {
      id: "ORD12346",
      customerName: "Alice Smith",
      totalAmount: "$23.49",
      orderTime: "2023-12-22 11:20 AM",
      status: "Confirmed",
    },
    {
      id: "ORD12347",
      customerName: "Mark Wilson",
      totalAmount: "$15.00",
      orderTime: "2023-12-22 11:10 AM",
      status: "Pending",
    },
    {
      id: "ORD12348",
      customerName: "Jane Brown",
      totalAmount: "$50.00",
      orderTime: "2023-12-22 10:50 AM",
      status: "Confirmed",
    },
    {
      id: "ORD12349",
      customerName: "Tom Harris",
      totalAmount: "$30.75",
      orderTime: "2023-12-22 10:30 AM",
      status: "Pending",
    },
  ];

  const getStatusChip = (status) => {
    if (status === "Pending") {
      return (
        <Chip
          icon={<PendingActionsIcon sx={{ fontSize: 16 }} />}
          label="Pending"
          sx={{
            backgroundColor: "rgba(255, 152, 0, 0.1)",
            color: "warning.main",
            fontWeight: 600,
            "& .MuiChip-icon": {
              color: "warning.main",
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
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            color: "success.main",
            fontWeight: 600,
            "& .MuiChip-icon": {
              color: "success.main",
            },
          }}
          size="small"
        />
      );
    }
    return null;
  };

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: 445,
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 48px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
            padding: "20px",
            borderRadius: "16px 16px 0 0",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 700,
              textAlign: "center",
              letterSpacing: "0.5px",
              textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Incoming Orders
          </Typography>
        </Box>

        <Box
          sx={{
            height: "calc(100% - 76px)",
            overflowY: "auto",
            overflowX: "hidden",

            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "10px",
            },
          }}
        >
          <List sx={{ p: 0 }}>
            {orders.map((order, index) => (
              <ListItem
                key={order.id}
                sx={{
                  py: 2.5,
                  px: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    transform: "translateX(5px)",
                  },
                  borderBottom:
                    index !== orders.length - 1
                      ? "1px solid rgba(0, 0, 0, 0.06)"
                      : "none",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background:
                        "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
                      boxShadow: "0 4px 12px rgba(255, 107, 107, 0.2)",
                    }}
                  >
                    <RestaurantIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: "#2d3436" }}
                      >
                        {order.id}
                      </Typography>
                      {getStatusChip(order.status)}
                    </Box>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          "& svg": { mr: 1, fontSize: 16, opacity: 0.8 },
                        }}
                      >
                        <PersonIcon /> {order.customerName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          "& svg": { mr: 1, fontSize: 16, opacity: 0.8 },
                        }}
                      >
                        <MonetizationOnIcon /> {order.totalAmount}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          "& svg": { mr: 1, fontSize: 16, opacity: 0.8 },
                        }}
                      >
                        <AccessTimeIcon /> {order.orderTime}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Fade>
  );
};

export default IncomingOrdersList;
