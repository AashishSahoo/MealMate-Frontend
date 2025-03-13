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
  Divider,
  CircularProgress,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const TrendingFoodItem = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        // Simulated data for a single restaurant's top items
        const data = [
          {
            id: 1,
            name: "Butter Chicken",
            price: "₹350",
            orderCount: 150,
            imageUrl: "butter-chicken.jpg",
          },

          {
            id: 3,
            name: "Dal Makhani",
            price: "₹220",
            orderCount: 100,
            imageUrl: "dal-makhani.jpg",
          },
          {
            id: 4,
            name: "Naan",
            price: "₹40",
            orderCount: 90,
            imageUrl: "naan.jpg",
          },
          {
            id: 5,
            name: "Paneer Butter Masala",
            price: "₹280",
            orderCount: 85,
            imageUrl: "paneer.jpg",
          },
        ];
        setTrendingItems(data);
        setDisplayedItems(data.slice(0, itemsPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending items:", error);
        setLoading(false);
      }
    };

    fetchTrendingItems();
  }, []);

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
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FastfoodIcon /> Top Selling Items
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <CircularProgress sx={{ color: "#2E7D32" }} />
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
            {displayedItems.map((item, index) => (
              <React.Fragment key={item.id}>
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
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {item.price}
                        </Typography>
                      </Box>
                    }
                  />
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
                    {item.orderCount} orders
                  </Typography>
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
