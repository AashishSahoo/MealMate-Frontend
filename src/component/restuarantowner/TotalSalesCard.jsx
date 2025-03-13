import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const TotalSalesCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("Last Month");
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setAnchorEl(null);
    // Simulate loading data
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [400, 800, 600, 1000],
        borderColor: "rgba(134, 100, 250, 1)",
        backgroundColor: "rgba(134, 100, 250, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              background: "#ffffff",
              borderRadius: 2,
              padding: 2,
              position: "relative",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Total Sale of Items
              </Typography>
              {loading ? (
                <CircularProgress sx={{ marginTop: 2 }} />
              ) : (
                <Typography
                  variant="h4"
                  sx={{ marginTop: 1, fontWeight: "bold" }}
                >
                  $12,340
                </Typography>
              )}
              <Box
                sx={{
                  height: 100,
                  marginTop: 2,
                }}
              >
                <Line data={data} options={options} />
              </Box>
              <Typography variant="body2" sx={{ marginTop: 1, color: "gray" }}>
                {filter}
              </Typography>
            </CardContent>
            <IconButton
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
              }}
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  boxShadow: "none",
                },
              }}
            >
              <MenuItem onClick={() => handleFilterChange("Last Day")}>
                Last Day
              </MenuItem>
              <MenuItem onClick={() => handleFilterChange("Last Week")}>
                Last Week
              </MenuItem>
              <MenuItem onClick={() => handleFilterChange("Last Month")}>
                Last Month
              </MenuItem>
            </Menu>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TotalSalesCard;
