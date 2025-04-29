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
import { Tooltip } from "@mui/material"; // already imported elsewhere in your file?

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
  const [userData, setUserData] = useState({
    restroName: "",
  });

  const [orderCount, setOrderCount] = useState(0);
  const [currentOrder, setCurrentOrder] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email || null;
  const token = userInfo.token || null;
  const userId = userInfo.userId || null;

  const [topPicks, setTopPicks] = useState([]);

  const fetchOrdersStats = async () => {
    try {
      const response = await axios.get(`/api/orders/user-dashboard/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response?.data?.resultCode === 0) {
        const data = response.data.resultData;

        setOrderCount(data.todayOrderCount);
        setCurrentOrder(data.currentOrderStatus);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfileDetails = async () => {
    try {
      const response = await axios.get(`/api/users/user-profile/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        const details = response?.data?.resultData;
        setUserData({
          userName: `${details.firstName} ${details.lastName}`,
        });
      }
    } catch (error) {
      console.log("Error fetching user name:", error);
    }
  };

  const fetchTodaysPick = async () => {
    try {
      const response = await axios.get(`/api/food/random`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response?.data?.resultCode === 0) {
        const data = response.data.resultData;
        setTopPicks(data);
      }
    } catch (error) {
      console.log("Error fetching top picks:", error);
    } finally {
      setLoading(false);
    }
  };

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
    fetchTodaysPick();
    fetchUserProfileDetails();
    fetchOrdersStats();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === topPicks.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [topPicks]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? topPicks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === topPicks.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ p: 1, minHeight: "100vh" }}>
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
          Welcome back, {userData.userName}! 👋
        </Typography>
      </Fade>

      {/* Top Picks Carousel */}
      <Slide direction="right" in timeout={1000}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: "#333" }}>
          Today's Top Picks
        </Typography>
      </Slide>

      {loading ? (
        <StyledCard sx={{ position: "relative", borderRadius: 4, mb: 5 }}>
          <Skeleton
            variant="rectangular"
            height={420}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton variant="text" height={30} width="60%" />
            </Box>
            <Grid container spacing={2} alignItems="center" sx={{ m: 1 }}>
              <Skeleton variant="text" height={30} width="40%" />
            </Grid>
          </CardContent>
        </StyledCard>
      ) : (
        topPicks.length > 0 && (
          <StyledCard sx={{ position: "relative", borderRadius: 4, mb: 5 }}>
            <CardMedia
              component="img"
              height="420"
              image={topPicks[currentIndex].imageUrl}
              alt={topPicks[currentIndex].name}
              sx={{ objectFit: "cover" }}
            />
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
                  {topPicks[currentIndex].name}
                </Typography>
                <Typography variant="subtitle" sx={{ fontWeight: 200, mt: 1 }}>
                  {topPicks[currentIndex].description}
                </Typography>
              </Box>
              <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
                <Grid item>
                  <Rating
                    value={4.5}
                    precision={0.1}
                    readOnly
                    sx={{ color: "#8A2BE2" }}
                  />
                </Grid>
                <Grid item>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTimeIcon sx={{ color: "#8A2BE2", mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      25-30 min
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    sx={{ color: "#8A2BE2", fontWeight: 600 }}
                  >
                    ₹{topPicks[currentIndex].price}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        )
      )}

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
        {loading ? (
          <>
            <Grid item xs={12} md={6}>
              <StyledCard
                sx={{ bgcolor: "#8A2BE2", color: "white", borderRadius: 3 }}
              >
                <CardContent>
                  <Skeleton variant="text" height={20} width="60%" />
                  <Skeleton
                    variant="text"
                    height={40}
                    width="50%"
                    sx={{ my: 2 }}
                  />
                  <Skeleton variant="text" height={20} width="30%" />
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledCard sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Skeleton variant="text" height={20} width="70%" />
                  <Skeleton
                    variant="text"
                    height={40}
                    width="60%"
                    sx={{ my: 2 }}
                  />
                  <Skeleton variant="text" height={20} width="40%" />
                </CardContent>
              </StyledCard>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6}>
              <StyledCard
                sx={{ bgcolor: "#8A2BE2", color: "white", borderRadius: 3 }}
              >
                <CardContent>
                  <Typography variant="h6">Today's Orders</Typography>
                  <Typography variant="h3" sx={{ my: 2 }}>
                    {orderCount}
                  </Typography>
                  {orderCount <= 0 ? (
                    <Typography variant="body2">
                      No orders yet... Why not explore our menu and discover
                      something delicious today?
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      Great going! Looks like you’re making today extra special
                      with some amazing orders.
                    </Typography>
                  )}
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledCard sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6">Current Order Status</Typography>
                  <Box sx={{ display: "flex", mt: 0 }}>
                    <Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Box>
                          <Box>
                            <Tooltip
                              title={
                                <Box>
                                  {currentOrder?.items?.map((food, index) => (
                                    <Typography
                                      key={index}
                                      variant="body2"
                                      color="inherit"
                                    >
                                      {food.foodName}
                                    </Typography>
                                  ))}
                                </Box>
                              }
                              arrow
                            >
                              <Box sx={{ cursor: "pointer" }}>
                                {currentOrder?.items
                                  ?.slice(0, 2)
                                  .map((food, index) => (
                                    <Typography
                                      key={index}
                                      variant="h6"
                                      color="#8A2BE2"
                                    >
                                      {food.foodName}
                                    </Typography>
                                  ))}
                                {currentOrder?.items?.length > 2 && (
                                  <Typography variant="h6" color="#8A2BE2">
                                    ...
                                  </Typography>
                                )}
                              </Box>
                            </Tooltip>
                          </Box>
                          {currentOrder.status === "completed" && (
                            <>
                              {" "}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Out for delivery - 15 mins away
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              ></Typography>
                            </>
                          )}
                          {currentOrder.status === "processing" && (
                            <>
                              {" "}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Order Preparing - 45 mins away
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              ></Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        ml: "auto",
                        height: "6.6rem",
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
          </>
        )}
      </Grid>
    </Box>
  );
};

export default DashboardCustomer;
