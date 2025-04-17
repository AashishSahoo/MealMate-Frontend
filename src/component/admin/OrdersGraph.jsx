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

const OrdersGraph = ({ orderHistory }) => {
  // const labelData = orderHistory.map((order)=>{order.})
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
        data: orderHistory,
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            {orderHistory.length === 0 ||
            orderHistory.every((val) => val === 0) ? (
              <Typography
                variant="body1"
                sx={{
                  color: "#888",
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                No data found
              </Typography>
            ) : (
              <Line data={salesData} options={salesOptions} />
            )}
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default OrdersGraph;
