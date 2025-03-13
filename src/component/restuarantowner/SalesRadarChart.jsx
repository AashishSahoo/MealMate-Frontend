// import React, { useState } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const SalesRadarChart = () => {
//   const salesData = {
//     thisYear: [70000, 60000, 50000, 45000, 40000],
//     lastMonth: [4000, 3500, 3200, 2800, 2500],
//     lastYear: [80000, 75000, 70000, 65000, 60000],
//   };

//   const categories = ["Burgers", "Pizzas", "Beverages", "Fries", "Desserts"];

//   const data = {
//     labels: categories,
//     datasets: [
//       {
//         label: "This Year",
//         data: salesData.thisYear,
//         backgroundColor: "rgba(147, 51, 234, 0.7)", // Vibrant purple
//         borderColor: "rgba(147, 51, 234, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Last Month",
//         data: salesData.lastMonth,
//         backgroundColor: "rgba(6, 182, 212, 0.7)", // Vibrant cyan
//         borderColor: "rgba(6, 182, 212, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Last Year",
//         data: salesData.lastYear,
//         backgroundColor: "rgba(249, 115, 22, 0.7)", // Vibrant orange
//         borderColor: "rgba(249, 115, 22, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           color: "#333",
//           font: {
//             size: 12,
//             weight: "bold",
//           },
//         },
//       },
//       y: {
//         grid: {
//           color: "rgba(0, 0, 0, 0.1)",
//         },
//         ticks: {
//           color: "#333",
//           font: {
//             size: 12,
//           },
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           padding: 20,
//           color: "#333",
//           font: {
//             size: 12,
//             family: "'Inter', sans-serif",
//             weight: "bold",
//           },
//           usePointStyle: true,
//         },
//       },
//       tooltip: {
//         backgroundColor: "rgba(255, 255, 255, 0.9)",
//         titleColor: "#333",
//         bodyColor: "#333",
//         padding: 12,
//         titleFont: {
//           size: 14,
//           family: "'Inter', sans-serif",
//         },
//         bodyFont: {
//           size: 13,
//           family: "'Inter', sans-serif",
//         },
//         displayColors: true,
//         borderColor: "rgba(0, 0, 0, 0.1)",
//         borderWidth: 1,
//       },
//     },
//   };

//   return (
//     <Paper
//       elevation={2}
//       sx={{
//         p: 3,
//         borderRadius: 3,
//         background: "#ffffff",
//         height: "445px",
//         position: "relative",
//         overflow: "hidden",
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//         border: "1px solid rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Typography
//         variant="h6"
//         gutterBottom
//         sx={{
//           fontWeight: 600,
//           color: "#333",
//           mb: 3,
//           textAlign: "center",
//           fontFamily: "'Inter', sans-serif",
//         }}
//       >
//         Sales Performance by Category
//       </Typography>

//       <Box
//         sx={{
//           height: "350px",
//           position: "relative",
//         }}
//       >
//         <Bar data={data} options={options} />
//       </Box>
//     </Paper>
//   );
// };

// export default SalesRadarChart;

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

const SalesRadarChart = () => {
  const salesData = {
    thisYear: [70000, 60000, 50000, 45000, 40000],
    lastMonth: [4000, 3500, 3200, 2800, 2500],
    lastYear: [80000, 75000, 70000, 65000, 60000],
  };

  const categories = ["Burgers", "Pizzas", "Beverages", "Fries", "Desserts"];

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
          callback: (value) => `$${value.toLocaleString()}`,
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
            return ` $${context.raw.toLocaleString()}`;
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

// import React, { useState } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import { Radar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// const SalesRadarChart = () => {
//   const salesData = {
//     thisYear: [70000, 60000, 50000, 45000, 40000],
//     lastMonth: [4000, 3500, 3200, 2800, 2500],
//     lastYear: [80000, 75000, 70000, 65000, 60000],
//   };

//   const categories = ["Burgers", "Pizzas", "Beverages", "Fries", "Desserts"];

//   const data = {
//     labels: categories,
//     datasets: [
//       {
//         label: "This Year",
//         data: salesData.thisYear,
//         backgroundColor: "rgba(147, 51, 234, 0.3)", // Vibrant purple
//         borderColor: "rgba(147, 51, 234, 0.8)",
//         borderWidth: 2,
//         pointBackgroundColor: "rgba(147, 51, 234, 1)",
//         pointBorderColor: "#fff",
//         pointHoverBackgroundColor: "#fff",
//         pointHoverBorderColor: "rgba(147, 51, 234, 1)",
//       },
//       {
//         label: "Last Month",
//         data: salesData.lastMonth,
//         backgroundColor: "rgba(6, 182, 212, 0.3)", // Vibrant cyan
//         borderColor: "rgba(6, 182, 212, 0.8)",
//         borderWidth: 2,
//         pointBackgroundColor: "rgba(6, 182, 212, 1)",
//         pointBorderColor: "#fff",
//         pointHoverBackgroundColor: "#fff",
//         pointHoverBorderColor: "rgba(6, 182, 212, 1)",
//       },
//       {
//         label: "Last Year",
//         data: salesData.lastYear,
//         backgroundColor: "rgba(249, 115, 22, 0.3)", // Vibrant orange
//         borderColor: "rgba(249, 115, 22, 0.8)",
//         borderWidth: 2,
//         pointBackgroundColor: "rgba(249, 115, 22, 1)",
//         pointBorderColor: "#fff",
//         pointHoverBackgroundColor: "#fff",
//         pointHoverBorderColor: "rgba(249, 115, 22, 1)",
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       r: {
//         suggestedMin: 0,
//         suggestedMax: 80000,
//         grid: {
//           color: "rgba(255, 255, 255, 0.2)",
//         },
//         angleLines: {
//           color: "rgba(255, 255, 255, 0.2)",
//         },
//         ticks: {
//           backdropColor: "transparent",
//           color: "rgba(255, 255, 255, 0.8)",
//         },
//         pointLabels: {
//           color: "rgba(255, 255, 255, 0.9)",
//           font: {
//             size: 12,
//             weight: "bold",
//           },
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           padding: 20,
//           color: "rgba(255, 255, 255, 0.9)",
//           font: {
//             size: 12,
//             family: "'Inter', sans-serif",
//             weight: "bold",
//           },
//           usePointStyle: true,
//         },
//       },
//       tooltip: {
//         backgroundColor: "rgba(0, 0, 0, 0.8)",
//         padding: 12,
//         titleFont: {
//           size: 14,
//           family: "'Inter', sans-serif",
//         },
//         bodyFont: {
//           size: 13,
//           family: "'Inter', sans-serif",
//         },
//         displayColors: true,
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: 3,
//         borderRadius: 3,
//         background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", // Deep purple gradient
//         height: "445px",
//         position: "relative",
//         overflow: "hidden",
//         boxShadow: "0 10px 30px rgba(30, 27, 75, 0.3)",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: "4px",
//           background: "linear-gradient(90deg, #9333ea, #06b6d4, #f97316)", // Matching dataset colors
//         },
//         "&::after": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background:
//             "radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent)",
//           pointerEvents: "none",
//         },
//       }}
//     >
//       <Typography
//         variant="h6"
//         gutterBottom
//         sx={{
//           fontWeight: 600,
//           color: "rgba(255, 255, 255, 0.95)",
//           mb: 3,
//           textAlign: "center",
//           fontFamily: "'Inter', sans-serif",
//           textShadow: "0 2px 4px rgba(0,0,0,0.2)",
//         }}
//       >
//         Sales Performance by Category
//       </Typography>

//       <Box
//         sx={{
//           height: "350px",
//           position: "relative",
//           filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
//         }}
//       >
//         <Radar data={data} options={options} />
//       </Box>
//     </Paper>
//   );
// };

// export default SalesRadarChart;
