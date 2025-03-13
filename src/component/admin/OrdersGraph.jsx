import React from "react";
import { Box, Typography, Paper, Fade } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const OrdersGraph = () => {
  const salesData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 18, 25, 30],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#555",
          font: {
            size: 12,
            weight: "bold",
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#555",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          color: "#444",
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: "bold",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#222",
        bodyColor: "#444",
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
          weight: "bold",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        displayColors: true,
        borderColor: "rgba(0, 0, 0, 0.05)",
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
  };

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          height: "500px", // Fixed height
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // gap: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#222",
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.5px",
              textShadow: "1px 1px 1px rgba(0,0,0,0.05)",
            }}
          >
            Monthly Orders Overview
          </Typography>

          <Box
            sx={{
              height: "400px",
              position: "relative",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.05))",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Line data={salesData} options={salesOptions} />
          </Box>

          {/* <Box
            sx={{
              flex: 1,
              overflow: "hidden",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              pt: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#222",
                mb: 2,
                fontFamily: "'Inter', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Recent Orders
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Paper
                elevation={1}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  backgroundColor: "rgba(75, 192, 192, 0.05)",
                  border: "1px solid rgba(75, 192, 192, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    backgroundColor: "rgba(75, 192, 192, 0.1)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: "#444" }}>
                    Order #123
                  </Typography>
                  <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
                    2 mins ago
                  </Typography>
                </Box>
                <Typography sx={{ color: "#666" }}>
                  2x Margherita Pizza, 1x Garlic Bread
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      bgcolor: "rgba(75, 192, 192, 0.2)",
                      color: "rgb(75, 192, 192)",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: 600,
                    }}
                  >
                    Pending
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box> */}
        </Box>
      </Paper>
    </Fade>
  );
};

export default OrdersGraph;
