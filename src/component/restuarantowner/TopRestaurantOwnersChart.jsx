import React from "react";
import { Box, Typography } from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const TopRestaurantOwnersChart = () => {
  const chartData = {
    labels: ["Dish A", "Dish B", "Dish C", "Dish D", "Dish E"],
    datasets: [
      {
        label: "Top Selling Products",
        data: [120, 90, 50, 30, 25],
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
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
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
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Top 5 Selling Products
      </Typography>
      <PolarArea data={chartData} options={chartOptions} />
    </Box>
  );
};

export default TopRestaurantOwnersChart;
