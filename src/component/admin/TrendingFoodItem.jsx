import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tooltip,
  Divider,
  CircularProgress,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const TrendingFoodItem = ({ trendingItems }) => {
  // const [trendingItems, setTrendingItems] = useState([]);
  console.log(trendingItems, "5items");
  const [displayedItems, setDisplayedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollHeight - scrollTop === clientHeight) {
      // User has scrolled to the bottom
      const currentLength = displayedItems.length;
      if (currentLength < trendingItems.length) {
        const nextItems = trendingItems.slice(
          currentLength,
          currentLength + itemsPerPage
        );
        setDisplayedItems([...displayedItems, ...nextItems]);
      }
    }
  };

  return (
    <Card
      sx={{
        background: "white",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        height: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#1B5E20",
            mb: 0,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FastfoodIcon /> Top Selling Items
        </Typography>

        {trendingItems.length <= 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            {/* <CircularProgress sx={{ color: "#2E7D32" }} /> */}
            <Typography sx={{ color: "#2E7D32" }}>No data found</Typography>
          </Box>
        ) : (
          <List
            onScroll={handleScroll}
            sx={{
              width: "100%",
              overflow: "auto",
              flex: 1,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "10px",
                "&:hover": {
                  background: "#555",
                },
              },
            }}
          >
            {trendingItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <ListItem
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(10px)",
                      background: "rgba(46, 125, 50, 0.04)",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: `rgba(46, 125, 50, ${1 - index * 0.15})`,
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Tooltip title={item.name} arrow>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                          noWrap
                        >
                          {item.name}
                        </Typography>
                      </Tooltip>
                    }
                    secondary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.price}
                        </Typography>{" "}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#2E7D32",
                            fontWeight: 600,
                            background: "rgba(46, 125, 50, 0.1)",
                            padding: "4px 12px",
                            borderRadius: "12px",
                          }}
                        >
                          {item.totalSold} orders
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < displayedItems.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingFoodItem;
