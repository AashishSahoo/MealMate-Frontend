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
  Avatar,
  Fade,
  Slide,
  Skeleton,
} from "@mui/material";
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  AccessTime as AccessTimeIcon,
  LocalOffer as LocalOfferIcon,
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";

import img6 from "../../assets/img6.jpg";
import img7 from "../../assets/img7.jpg";
import img8 from "../../assets/img8.jpg";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Delivery from "../../assets/delivery.png";
dayjs.extend(relativeTime);

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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email || null;
  const token = userInfo.token || null;

  const fetchAllOrderHistory = async () => {
    try {
      const response = await axios.get(
        `/api/orders/getAllOrdersByUser/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response?.data?.resultCode === 0) {
        const data = response.data.resultData;
        const filteredData = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setOrders(filteredData);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrderHistory();
  }, []);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === topPicks.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? topPicks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === topPicks.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      {/* Welcome Section */}
      <Fade in timeout={800}>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
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
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: "#333" }}>
          Today's Top Picks
        </Typography>
      </Slide>

      <StyledCard sx={{ position: "relative", borderRadius: 4, mb: 5 }}>
        <CardMedia
          component="img"
          height="400"
          image={topPicks[currentIndex].image}
          alt={topPicks[currentIndex].name}
          sx={{ objectFit: "cover" }}
        />

        {/* Navigation Buttons */}
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: "absolute",
            top: "50%",
            left: 16,
            transform: "translateY(-50%)",
            bgcolor: "white",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 16,
            transform: "translateY(-50%)",
            bgcolor: "white",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          <NavigateNextIcon />
        </IconButton>

        <CardContent>
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

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
            {topPicks[currentIndex].name}
          </Typography>

          <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
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
                <Typography variant="body2" color="text.secondary">
                  {topPicks[currentIndex].deliveryTime}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                sx={{ color: "#8A2BE2", fontWeight: 600 }}
              >
                {topPicks[currentIndex].price}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Recent Orders */}
      <Slide direction="left" in timeout={1200}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
          Recent Orders
        </Typography>
      </Slide>

      <Grid container spacing={2} sx={{ mb: 5 }}>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 2, borderRadius: 3 }}>
                  <Skeleton variant="text" height={30} width="70%" />
                  <Skeleton variant="text" height={20} width="40%" />
                  <Skeleton
                    variant="rectangular"
                    height={40}
                    width={120}
                    sx={{ my: 2 }}
                  />
                  <Skeleton variant="text" height={25} width="30%" />
                </Card>
              </Grid>
            ))
          : orders.map((order) => (
              <Grid item xs={12} md={4} key={order._id}>
                <Card sx={{ p: 2, borderRadius: 3, m: 0.5 }}>
                  <Typography variant="h6" fontWeight={600}>
                    {order.restaurant.restaurantName}
                  </Typography>{" "}
                  <Typography variant="body2" color="text.secondary">
                    {dayjs(order.createdAt).fromNow()}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
                    {order.items.slice(0, 3).map((item, index) => (
                      <Avatar
                        key={index}
                        src={item.food.imageUrl}
                        alt={item.food.name}
                        sx={{ width: 40, height: 40, borderRadius: 1 }}
                      />
                    ))}
                    {order.items.length > 3 && (
                      <Avatar sx={{ bgcolor: "#ccc", width: 40, height: 40 }}>
                        +{order.items.length - 3}
                      </Avatar>
                    )}
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography fontWeight={500}>
                      ₹{order.totalAmount.toFixed(2)}
                    </Typography>
                    <Chip
                      size="small"
                      variant="outlined"
                      label={order.status}
                      color={order.status === "completed" ? "success" : "error"}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* Order Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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

        {/* <Grid item xs={12} md={4}>
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
        </Grid> */}

        <Grid item xs={12} md={6}>
          <StyledCard sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">Current Order Status</Typography>
              <Box sx={{ display: "flex", mt: 0 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <LocalShippingIcon
                      sx={{ color: "#8A2BE2", fontSize: 30, mr: 1 }}
                    />
                    <Box>
                      <Typography variant="h6" color="#8A2BE2">
                        Chicken Biryani
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Out for delivery
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        15 mins away
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
                </Box>

                <Box
                  sx={{
                    ml: "auto",
                    height: "6.7rem",
                    width: "15rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={Delivery}
                    alt="delivery"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCustomer;
