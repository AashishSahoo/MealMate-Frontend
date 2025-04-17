import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Fade, Tooltip } from "@mui/material";
import axios from "axios";
import { startOfYear, endOfYear, format, eachDayOfInterval } from "date-fns";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const OrderHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [year] = useState(new Date().getFullYear());
  const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const token = userInfo.token;

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("/api/orders/day-wise", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        const apiData = response?.data?.resultData || [];

        // Transform API data to the format expected by CalendarHeatmap
        const transformedData = apiData.map((item) => ({
          date: item.date,
          count: item.count,
        }));

        setHeatmapData(transformedData);
      }
    } catch (error) {
      console.error("Failed to fetch heatmap data", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  // Generate all days in the year to fill in missing dates
  const generateCompleteData = () => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    const dataMap = {};
    heatmapData.forEach((item) => {
      dataMap[item.date] = item.count;
    });

    return allDays.map((date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      return {
        date: dateStr,
        count: dataMap[dateStr] || 0,
      };
    });
  };

  const classForValue = (value) => {
    if (!value) return "color-empty";
    if (value.count === 0) return "color-empty";
    if (value.count <= 5) return "color-scale-1";
    if (value.count <= 10) return "color-scale-2";
    if (value.count <= 20) return "color-scale-3";
    return "color-scale-4";
  };

  const customTooltip = (value) => {
    if (!value || value.count === 0) {
      return `No orders on ${value.date}`;
    }
    return `${value.count} orders on ${value.date}`;
  };

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          mt: 2,
          p: 3,
          borderRadius: 4,
          backgroundColor: "#fff",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#222",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Daily Orders Heatmap (Year {year})
        </Typography>

        <Box sx={{ mt: 4, width: "100%", overflowX: "auto" }}>
          <Box sx={{ width: "100%", minWidth: 800 }}>
            <CalendarHeatmap
              startDate={new Date(`${year}-01-01`)}
              endDate={new Date(`${year}-12-31`)}
              values={generateCompleteData()}
              classForValue={classForValue}
              tooltipDataAttrs={(value) => ({
                "data-tip": customTooltip(value),
              })}
              showWeekdayLabels={true}
              gutterSize={2}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "#ebedf0", mr: 1 }} />
            <Typography variant="caption">0 orders</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "#9be9a8", mr: 1 }} />
            <Typography variant="caption">1-5 orders</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "#40c463", mr: 1 }} />
            <Typography variant="caption">6-10 orders</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "#30a14e", mr: 1 }} />
            <Typography variant="caption">11-20 orders</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 16, height: 16, bgcolor: "#216e39", mr: 1 }} />
            <Typography variant="caption">20+ orders</Typography>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default OrderHeatmap;
// Add this to your global CSS
