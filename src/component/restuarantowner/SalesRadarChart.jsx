import React, { useState } from "react";
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

const SalesRadarChart = ({ dataset }) => {
  console.log(dataset, "dataset");

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  const salesData = {
    thisYear: [],
    lastMonth: [],
    lastYear: [],
  };

  dataset.forEach((item) => {
    const itemDate = new Date(item.latestTime);
    const itemYear = itemDate.getFullYear();
    const itemMonth = itemDate.getMonth();

    if (itemYear === currentYear) {
      salesData.thisYear.push(item.sales);
    }

    const isLastMonth =
      (itemYear === currentYear && itemMonth === currentMonth - 1) ||
      (currentMonth === 0 && itemYear === currentYear - 1 && itemMonth === 11);

    if (isLastMonth) {
      salesData.lastMonth.push(item.sales);
    }

    if (itemYear === currentYear - 1) {
      salesData.lastYear.push(item.sales);
    }
  });

  const categories = dataset.map((item) => item.category);
  console.log(categories);
  // Output: ['Dessert', 'Shakes']

  // const categories = ["Burgers", "Pizzas", "Beverages", "Fries", "Desserts"];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "This Year",
        data: salesData.thisYear,
        backgroundColor: "rgba(147, 51, 234, 0.8)", // Vibrant purple
        borderColor: "rgba(147, 51, 234, 1)",
        borderWidth: 0,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(147, 51, 234, 1)",
      },
      {
        label: "Last Month",
        data: salesData.lastMonth,
        backgroundColor: "rgba(6, 182, 212, 0.8)", // Vibrant cyan
        borderColor: "rgba(6, 182, 212, 1)",
        borderWidth: 0,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(6, 182, 212, 1)",
      },
      {
        label: "Last Year",
        data: salesData.lastYear,
        backgroundColor: "rgba(249, 115, 22, 0.8)", // Vibrant orange
        borderColor: "rgba(249, 115, 22, 1)",
        borderWidth: 0,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(249, 115, 22, 1)",
      },
    ],
  };

  const options = {
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
            size: 13,
            weight: "bold",
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#555",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          callback: (value) => `₹${value.toLocaleString()}`,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 25,
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
        padding: 15,
        titleFont: {
          size: 15,
          family: "'Inter', sans-serif",
          weight: "bold",
        },
        bodyFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        displayColors: true,
        borderColor: "rgba(0, 0, 0, 0.05)",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            return ` ₹${context.raw.toLocaleString()}`;
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
          p: 3.5,
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          height: "445px",
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
            mb: 3.5,
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.5px",
            textShadow: "1px 1px 1px rgba(0,0,0,0.05)",
          }}
        >
          Sales Performance by Category
        </Typography>

        <Box
          sx={{
            height: "350px",
            position: "relative",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.05))",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </Paper>
    </Fade>
  );
};

export default SalesRadarChart;
