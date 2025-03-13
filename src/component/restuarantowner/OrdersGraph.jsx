import React from "react";
import { Box, Typography } from "@mui/material";
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
        backgroundColor: "rgba(138, 43, 226, 0.2)", // Violet fill color
        borderColor: "rgba(138, 43, 226, 1)", // Violet line color
        borderWidth: 2,
        tension: 0.4, // Smooth curve for the line
        fill: true,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      x: {
        grid: { display: false }, // Remove vertical gridlines
      },
      y: {
        beginAtZero: true,
        grid: { display: false }, // Remove horizontal gridlines
      },
    },
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Monthly Orders
      </Typography>
      <Line data={salesData} options={salesOptions} />
    </Box>
  );
};

export default OrdersGraph;
