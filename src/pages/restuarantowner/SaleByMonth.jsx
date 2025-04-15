import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Fade, Skeleton } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SaleByMonth = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email;
  const token = userInfo.token;

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      x: {
        grid: { display: false },
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
        grid: { display: false },
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
          label: (context) =>
            ` ${context.dataset.label}: ₹${context.raw.toLocaleString()}`,
        },
      },
    },
  };

  const fetchAllDetails = async () => {
    try {
      const response = await axios.get(
        `/api/report/monthlyProductSales/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.resultCode === 0) {
        const categorySalesArray = response.data.resultData.categorySalesArray;

        // Initialize data structure
        const categoryMap = {};

        categorySalesArray.forEach((entry) => {
          const entryDate = new Date(entry.latestTime);
          const year = entryDate.getFullYear();

          // Only consider current year
          if (year !== currentYear) return;

          const monthIndex = entryDate.getMonth(); // 0 - 11
          const category = entry.category;

          // Initialize category with zeroed array
          if (!categoryMap[category]) {
            categoryMap[category] = new Array(12).fill(0);
          }

          categoryMap[category][monthIndex] += entry.sales;
        });

        const colors = [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ];
        const backgroundColors = colors.map((c) => c.replace("1)", "0.2)"));

        const datasets = Object.keys(categoryMap).map((category, idx) => ({
          label: category,
          data: categoryMap[category],
          borderColor: colors[idx % colors.length],
          backgroundColor: backgroundColors[idx % colors.length],
          tension: 0.4,
        }));

        setChartData({
          labels: months,
          datasets,
        });
      } else {
        console.error("Failed to fetch report:", response.data.resultMessage);
      }
    } catch (error) {
      console.log("Error fetching monthly report:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDetails();
  }, []);

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          p: 3.5,
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          height: "95%",
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
        {loading ? (
          <Skeleton variant="rectangular" height={400} animation="wave" />
        ) : (
          <>
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
              Monthly Sales by Product
            </Typography>

            <Box
              sx={{
                height: "350px",
                position: "relative",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.05))",
              }}
            >
              <Line data={chartData} options={options} />
            </Box>
          </>
        )}
      </Paper>
    </Fade>
  );
};

export default SaleByMonth;
