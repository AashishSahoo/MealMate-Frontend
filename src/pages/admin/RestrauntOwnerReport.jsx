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

const RestaurantOwnerReport = () => {
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
        label: "Italian Villa",
        data: [
          32000, 38000, 35000, 40000, 45000, 42000, 39000, 41000, 44000, 48000,
          50000, 52000,
        ],
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderColor: "rgba(33, 150, 243, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(33, 150, 243, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Sushi Express",
        data: [
          28000, 34000, 38000, 42000, 40000, 38000, 41000, 45000, 47000, 45000,
          48000, 50000,
        ],
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "rgba(76, 175, 80, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(76, 175, 80, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Spice Garden",
        data: [
          25000, 30000, 35000, 38000, 42000, 40000, 38000, 42000, 45000, 48000,
          46000, 49000,
        ],
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        borderColor: "rgba(255, 193, 7, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(255, 193, 7, 1)",
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
          callback: (value) => `$${value / 1000}k`,
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
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          mt: "10px",
          p: 3,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          height: "650px",
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
            gap: 3,
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
            Restaurant Sales Performance over 12 months
          </Typography>

          <Box
            sx={{
              height: "500px",
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
        </Box>
      </Paper>
    </Fade>
  );
};

export default RestaurantOwnerReport;
