import React from "react";
import { Box, Typography, Paper, Fade } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UsersOrderHistory = () => {
  const salesData = {
    labels: [
      "User 1",
      "User 2",
      "User 3",
      "User 4",
      "User 5",
      "User 6",
      "User 7",
      "User 8",
      "User 9",
      "User 10",
    ],
    datasets: [
      {
        label: "Electronics",
        data: [4500, 3800, 5200, 4200, 6100, 5800, 4900, 5500, 4800, 3900],
        backgroundColor: "rgba(53, 162, 235, 0.8)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Clothing",
        data: [3200, 2900, 3800, 3100, 4200, 3900, 3600, 4100, 3500, 2800],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Food & Beverages",
        data: [2800, 2400, 3100, 2600, 3500, 3200, 2900, 3300, 2700, 2300],
        backgroundColor: "rgba(255, 159, 64, 0.8)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
      {
        label: "Home & Garden",
        data: [2100, 1800, 2400, 2000, 2800, 2500, 2200, 2600, 2300, 1900],
        backgroundColor: "rgba(153, 102, 255, 0.8)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
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
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
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
          // borderDash: [2, 4],
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          height: "680px",
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
            Sales by Category per User
          </Typography>

          <Box
            sx={{
              height: "600px",
              position: "relative",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.05))",
              transition: "transform 0.3s ease-in-out",
              // "&:hover": {
              //   transform: "scale(1.02)",
              // },
            }}
          >
            <Bar data={salesData} options={options} />
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default UsersOrderHistory;
