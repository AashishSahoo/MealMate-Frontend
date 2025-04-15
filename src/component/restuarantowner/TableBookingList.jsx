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
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Skeleton } from "@mui/material";

const TableBookingsList = ({ IncomingBookingList }) => {
  console.log(IncomingBookingList, "booking");

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
    if (status === "booked") {
      return (
        <Chip
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
          label="Booked"
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
            background: "linear-gradient(135deg, #6B8DD6 0%, #8E96F0 100%)",
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
            Table Bookings
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
            {IncomingBookingList.length === 0 ? (
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
                  No Bookings Found
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  There are currently no table bookings.
                </Typography>
              </Box>
            ) : (
              IncomingBookingList.map((booking, index) => (
                <ListItem
                  key={booking._id}
                  sx={{
                    py: 2.5,
                    px: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      transform: "translateX(5px)",
                    },
                    borderBottom:
                      index !== booking.length - 1
                        ? "1px solid rgba(0, 0, 0, 0.06)"
                        : "none",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background:
                          "linear-gradient(135deg, #6B8DD6 0%, #8E96F0 100%)",
                        boxShadow: "0 4px 12px rgba(107, 141, 214, 0.2)",
                      }}
                    >
                      <EventSeatIcon />
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
                          Table {booking.tableNumber}
                        </Typography>
                        {getStatusChip(booking.status)}
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
                          <PersonIcon /> {booking.bookedBy.firstName}{" "}
                          {booking.bookedBy.lastName}
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
                          <GroupIcon /> {booking.capacity} Persons
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
                          <AccessTimeIcon />
                          {new Date(booking.bookedAt).toLocaleString()}
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

export default TableBookingsList;
