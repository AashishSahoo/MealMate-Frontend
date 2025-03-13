import React from "react";
import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const MonthlyEarnings = () => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 2,
        maxWidth: 300,
        position: "relative",
        overflow: "hidden", // Ensures the SVG stays within the card bounds
        backgroundColor: "#fff", // Card background
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography variant="subtitle2" color="textSecondary">
          Monthly Earnings
        </Typography>

        {/* Earnings */}
        <Typography variant="h4" fontWeight="bold" sx={{ marginY: 1 }}>
          $6,820
        </Typography>

        {/* Percentage and Description */}
        <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: "#ff6b6b", fontWeight: "bold" }}
          >
            +9%
          </Typography>
          <Typography variant="body2" color="textSecondary">
            last year
          </Typography>
        </Box>
      </CardContent>

      {/* Wavy Graph */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          zIndex: -1, // Makes sure the graph stays behind the content
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Graph Area Fill */}
          <path
            fill="rgba(33, 150, 243, 0.2)" /* Semi-transparent fill */
            d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,117.3C672,107,768,117,864,144C960,171,1056,213,1152,202.7C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          {/* Graph Line */}
          <path
            fill="none"
            stroke="#2196f3"
            strokeWidth="2"
            d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,117.3C672,107,768,117,864,144C960,171,1056,213,1152,202.7C1248,192,1344,128,1392,96L1440,64"
          ></path>
        </svg>
      </Box>

      {/* Icon */}
      <Avatar
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          backgroundColor: "#e3f2fd",
          color: "#2196f3",
        }}
      >
        <AttachMoneyIcon />
      </Avatar>
    </Card>
  );
};

export default MonthlyEarnings;
