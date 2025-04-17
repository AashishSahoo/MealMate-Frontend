import React from "react";
import { Typography, Box, Paper, Fade } from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const TopRestaurantOwnersChart = ({ trendingRestro }) => {
  console.log(trendingRestro, "top restro");

  const labelData = trendingRestro
    .slice(0, 5)
    .map((restro) => restro.restaurantName);
  const valueData = trendingRestro
    .slice(0, 5)
    .map((restro) => restro.totalOrders);

  const chartData = {
    labels: labelData,
    datasets: [
      {
        label: "Orders",
        data: valueData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
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
        // margin: "1rem", // Add margin below legend
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
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw} orders`,
        },
      },
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
    layout: {
      // padding: {
      //   top: 20, // Add padding between legend and chart
      // },
    },
  };

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          // p: 3.5,
          pt: 3.5,
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          height: "100%",
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
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#222",
            // mb: 3.5,
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.5px",
            textShadow: "1px 1px 1px rgba(0,0,0,0.05)",
          }}
        >
          Top 5 Restaurant Owners
        </Typography>

        <Box
          sx={{
            height: "calc(100% - 80px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          {trendingRestro.length > 0 ? (
            <PolarArea data={chartData} options={chartOptions} />
          ) : (
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
          )}
        </Box>
      </Paper>
    </Fade>
  );
};

export default TopRestaurantOwnersChart;
