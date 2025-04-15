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
  Tooltip,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Skeleton } from "@mui/material";

const IncomingOrdersList = ({ IncomingOrdersList }) => {
  const getStatusChip = (status) => {
    if (status === "processing") {
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
    if (status === "completed") {
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
            {IncomingOrdersList.length === 0 ? (
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  No Orders Found
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  There are currently no incoming orders.
                </Typography>
              </Box>
            ) : (
              IncomingOrdersList.map((order, index) => (
                <ListItem
                  key={order._id}
                  sx={{
                    py: 2.5,
                    px: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      transform: "translateX(5px)",
                    },
                    borderBottom:
                      index !== IncomingOrdersList.length - 1
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
                          Order ID:{" "}
                          <Tooltip title={order._id} arrow>
                            {order._id.slice(0, 9) + ".."}
                          </Tooltip>
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
                          <PersonIcon /> {order.user.firstName}{" "}
                          {order.user.lastName}
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
                          <MonetizationOnIcon /> ₹{order.totalAmount.toFixed(2)}
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
                          <AccessTimeIcon />{" "}
                          {new Date(order.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Paper>
    </Fade>
  );
};

export default IncomingOrdersList;
