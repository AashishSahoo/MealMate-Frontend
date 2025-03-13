import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Chip,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Fade,
  Slide,
} from "@mui/material";
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  AccessTime as AccessTimeIcon,
  LocalOffer as LocalOfferIcon,
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import img6 from "../../assets/img6.jpg";
import img7 from "../../assets/img7.jpg";
import img8 from "../../assets/img8.jpg";
import img9 from "../../assets/img9.jpg";
import img10 from "../../assets/img10.jpg";
import img13 from "../../assets/img13.jpg";
import img14 from "../../assets/img14.jpg";
import img15 from "../../assets/img15.jpg";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 28px rgba(138,43,226,0.2)",
  },
}));

const DashboardCustomer = () => {
  const customerName = "Alex";
  const [currentIndex, setCurrentIndex] = useState(0);

  const topPicks = [
    {
      id: 1,
      name: "Supreme Pizza",
      image: img6,
      rating: 4.8,
      deliveryTime: "25-30 min",
      price: "₹399",
      offer: "50% OFF up to ₹100",
    },
    {
      id: 2,
      name: "Classic Burger",
      image: img7,
      rating: 4.5,
      deliveryTime: "20-25 min",
      price: "₹249",
      offer: "Free Delivery",
    },
    {
      id: 3,
      name: "Chicken Biryani",
      image: img8,
      rating: 4.7,
      deliveryTime: "30-35 min",
      price: "₹499",
      offer: "20% OFF",
    },
  ];

  const recentOrders = [
    {
      id: 1,
      name: "Veggie Delight Pizza",
      image: img9,
      orderDate: "Today, 2:30 PM",
      status: "Delivered",
    },
    {
      id: 2,
      name: "Double Cheese Burger",
      image: img10,
      orderDate: "Yesterday, 8:45 PM",
      status: "Delivered",
    },
    {
      id: 3,
      name: "Spicy Noodles",
      image: img13,
      orderDate: "2 days ago",
      status: "Delivered",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === topPicks.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? topPicks.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === topPicks.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Welcome Section */}
      <Fade in timeout={800}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: "#8A2BE2",
            textShadow: "2px 2px 4px rgba(138,43,226,0.2)",
          }}
        >
          Welcome back, {customerName}! 👋
        </Typography>
      </Fade>

      {/* Top Picks Carousel */}
      <Slide direction="right" in timeout={1000}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#333",
          }}
        >
          Today's Top Picks
        </Typography>
      </Slide>

      <StyledCard
        sx={{
          position: "relative",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(138,43,226,0.12)",
          mb: 4,
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={topPicks[currentIndex].image}
          alt={topPicks[currentIndex].name}
          sx={{ objectFit: "cover" }}
        />

        <IconButton
          onClick={handlePrevious}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "white",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "white",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <NavigateNextIcon />
        </IconButton>

        <CardContent sx={{ position: "relative" }}>
          <Chip
            icon={<LocalOfferIcon />}
            label={topPicks[currentIndex].offer}
            sx={{
              position: "absolute",
              top: -20,
              right: 16,
              bgcolor: "#8A2BE2",
              color: "white",
              fontWeight: 500,
            }}
          />

          <Box sx={{ mt: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {topPicks[currentIndex].name}
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Rating
                  value={topPicks[currentIndex].rating}
                  precision={0.1}
                  readOnly
                  sx={{ color: "#8A2BE2" }}
                />
              </Grid>

              <Grid item>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon sx={{ color: "#8A2BE2", mr: 0.5 }} />
                  <Typography variant="body1" color="text.secondary">
                    {topPicks[currentIndex].deliveryTime}
                  </Typography>
                </Box>
              </Grid>

              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#8A2BE2",
                    fontWeight: 600,
                  }}
                >
                  {topPicks[currentIndex].price}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </StyledCard>

      {/* Recent Orders */}
      <Slide direction="left" in timeout={1200}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#333",
          }}
        >
          Recent Orders
        </Typography>
      </Slide>

      <StyledCard sx={{ mb: 4, borderRadius: 4 }}>
        <List>
          {recentOrders.map((order) => (
            <ListItem key={order.id} divider>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={order.image}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={order.name}
                secondary={order.orderDate}
                sx={{ ml: 2 }}
              />
              <Chip
                label={order.status}
                color="success"
                size="small"
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      </StyledCard>

      {/* Order Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledCard
            sx={{ bgcolor: "#8A2BE2", color: "white", borderRadius: 3 }}
          >
            <CardContent>
              <Typography variant="h6">Today's Orders</Typography>
              <Typography variant="h3" sx={{ my: 2 }}>
                12
              </Typography>
              <Typography variant="body2">↑ 24% from yesterday</Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">Total Savings</Typography>
              <Typography variant="h3" sx={{ my: 2, color: "#8A2BE2" }}>
                ₹850
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">Current Order Status</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <LocalShippingIcon
                  sx={{ color: "#8A2BE2", fontSize: 30, mr: 1 }}
                />
                <Box>
                  <Typography variant="h6" color="#8A2BE2">
                    Chicken Biryani
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Out for delivery - 15 mins away
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <CheckCircleIcon
                  sx={{ color: "success.main", fontSize: 20, mr: 1 }}
                />
                <Typography variant="body2" color="success.main">
                  Order confirmed and being prepared
                </Typography>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCustomer;
