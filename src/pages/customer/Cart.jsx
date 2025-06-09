import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Button,
  Divider,
  Slide,
  Zoom,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Skeleton,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import payment from "./Payment";

import { Add, Remove, Delete } from "@mui/icons-material";
import { AiFillAlert } from "react-icons/ai";
import Fade from "@mui/material/Fade";

import { styled } from "@mui/material/styles";

import SummarizeIcon from "@mui/icons-material/Summarize";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Payment from "./Payment";
import { Icon } from "@iconify/react";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(147, 112, 219, 0.2)",
  },
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 5px 15px rgba(147, 112, 219, 0.4)",
  },
}));

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({
    delete: null,
    update: null,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const { email, token, userId } = userInfo;
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const [orderInfo, setOrderInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});

  const goToOrderDetailsPage = () => {
    // setShowPayment(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchCartItem = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/cart/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email },
      });

      if (response?.data?.resultCode === 0) {
        // Map API response to match your existing UI structure
        const mappedItems = response.data.resultData.items.map((item) => ({
          id: item.foodId, // Keep using id instead of foodId
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.imageUrl, // Fallback to your default image
          restaurant: response.data.resultData.restaurant.name,
          restaurantId: response.data.resultData.restaurantId._id, // Add this

          category: item.category,
          itemTotal: item.price * item.quantity,
        }));
        setCartItems(mappedItems);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update Quantity Function
  const updateQuantity = async (foodId, change) => {
    try {
      setActionLoading((prev) => ({ ...prev, update: foodId }));
      const item = cartItems.find((item) => item.id === foodId);
      const newQuantity = Math.max(1, item.quantity + change);

      const response = await axios.post(
        `/api/cart/updateCartItem`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            userId: userInfo.userId,
            foodId: foodId,
          },
        }
      );

      if (response?.data?.resultCode === 0) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === foodId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else if (response?.data?.resultCode === 71) {
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      fetchCartItem(); // Refresh on error
    } finally {
      setActionLoading((prev) => ({ ...prev, update: null }));
    }
  };

  // Remove Item Function
  const removeItem = async (foodId) => {
    try {
      setActionLoading((prev) => ({ ...prev, delete: foodId }));

      const response = await axios.delete(`/api/cart/removeCartItem`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          userId: userInfo.userId,
          foodId: foodId._id,
        },
      });

      if (response?.data?.resultCode === 0) {
        setCartItems((prev) => prev.filter((item) => item.id !== foodId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      fetchCartItem(); // Refresh on error
    } finally {
      setActionLoading((prev) => ({ ...prev, delete: null }));
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const deliveryFee = 50;
  const gstRate = 0.18;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const gst = subtotal * gstRate;
    return subtotal + deliveryFee + gst;
  };

  // Cart component
  const handlePayment = async () => {
    try {
      // 1. Prepare Order Data
      const orderData = {
        user: userId,
        restaurant: cartItems[0].restaurantId,
        items: cartItems.map((item) => ({
          food: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: calculateTotal(),
        deliveryAddress,
      };

      // 2. Create Order & Razorpay Order
      const response = await axios.post(
        "/api/payments/createOrder",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { razorpayOrder } = response.data.resultData;

      // 3. Initialize Razorpay Checkout
      const options = {
        // key: process.env.VITE_RAZORPAY_KEY_ID,
        key: "rzp_test_1wLEC32IyasGfA",
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,
        handler: async (paymentResponse) => {
          try {
            // 4. Verify Payment
            const verifyResponse = await axios.post(
              "/api/payments/verifyPayment",
              {
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            // 5. Payment Successful
            if (response?.data?.resultCode === 0) {
              console.log("Payment verified!");

              setOrderInfo(verifyResponse?.data?.resultData?.order);
              setPaymentInfo(verifyResponse?.data?.resultData?.payment);
              console.log("orderInfo : ", orderInfo);
              console.log("paymentInfo : ", paymentInfo);
              console.log(
                "order id : ",
                verifyResponse?.data?.resultData?.order._id
              );

              await navigate(
                `/customer/payment/${verifyResponse?.data?.resultData?.order._id}`
              );
              // {showPayment && <Payment order={orderInfo} payment={paymentInfo} />}
            }
          } catch (error) {
            console.error("Verification failed:", error);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Cart Items Section */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {loading ? (
                // Skeleton Loaders for Cart Items
                [1, 2, 3].map((i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <StyledCard>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={4}>
                            <Skeleton
                              variant="rectangular"
                              height={120}
                              sx={{ borderRadius: 2 }}
                            />
                          </Grid>
                          <Grid item xs={8}>
                            <Skeleton variant="text" width="60%" height={30} />
                            <Skeleton variant="text" width="40%" height={20} />
                            <Skeleton variant="text" width="30%" height={20} />
                            <Box
                              sx={{
                                mt: 2,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                              />
                              <Skeleton
                                variant="text"
                                width={30}
                                height={30}
                                sx={{ mx: 2 }}
                              />
                              <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                              />
                              <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                                sx={{ ml: 2 }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))
              ) : cartItems.length === 0 ? (
                // Empty Cart State
                <Grid item xs={12} sx={{ textAlign: "center", py: 8, ml: 40 }}>
                  <Box sx={{ color: "#8A2BE2" }}>
                    {/* <ShoppingCart fontSize="inherit" /> */}
                    <Icon icon="mdi:cart-arrow-down" width="70" height="70" />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                    Hungry? Let's Fix That!
                  </Typography>
                  <AnimatedButton
                    size="small"
                    variant="contained"
                    sx={{ px: 6, py: 2, fontSize: "1rem" }}
                    onClick={() => navigate("/customer/menu")}
                  >
                    Start Ordering
                  </AnimatedButton>
                </Grid>
              ) : (
                // Actual Cart Items
                cartItems.map((item, index) => (
                  <Zoom
                    in={true}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={item.id}
                  >
                    <Grid item xs={12} sm={cartItems.length > 3 ? 6 : 12}>
                      <StyledCard>
                        <CardContent>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                              <CardMedia
                                component="img"
                                height="120"
                                image={item.image} // Now properly mapped
                                alt={item.name}
                                sx={{ borderRadius: 2, objectFit: "cover" }}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600, color: "#8A2BE2" }}
                                  >
                                    {item.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary", mb: 1 }}
                                  >
                                    {item.restaurant}
                                  </Typography>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: "#9370DB", fontWeight: 600 }}
                                  >
                                    ₹{item.price}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  mt: 2,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <IconButton
                                  onClick={() => updateQuantity(item.id, -1)}
                                  disabled={actionLoading.update === item.id}
                                >
                                  {actionLoading.update === item.id ? (
                                    <CircularProgress size={20} thickness={5} />
                                  ) : (
                                    <Remove />
                                  )}
                                </IconButton>

                                <Typography sx={{ mx: 2, fontWeight: 600 }}>
                                  {actionLoading.update === item.id ? (
                                    <CircularProgress size={20} thickness={5} />
                                  ) : (
                                    item.quantity
                                  )}
                                </Typography>

                                <IconButton
                                  onClick={() => updateQuantity(item.id, 1)}
                                  disabled={actionLoading.update === item.id}
                                >
                                  {actionLoading.update === item.id ? (
                                    <CircularProgress size={20} thickness={5} />
                                  ) : (
                                    <Add />
                                  )}
                                </IconButton>

                                <IconButton
                                  onClick={() => removeItem(item.id)}
                                  disabled={actionLoading.delete === item.id}
                                >
                                  {actionLoading.delete === item.id ? (
                                    <CircularProgress size={20} thickness={5} />
                                  ) : (
                                    <Delete />
                                  )}
                                </IconButton>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  </Zoom>
                ))
              )}
            </Grid>
          </Grid>

          {/* Order Summary Section */}
          <Grid item xs={12} md={4}>
            <Slide
              direction="left"
              in={cartItems.length > 0}
              mountOnEnter
              unmountOnExit
            >
              <StyledCard
                sx={{ position: "sticky", top: 100, p: 3, boxShadow: 4 }}
              >
                <CardContent>
                  {loading ? (
                    // Skeleton loader remains the same
                    <>
                      <Skeleton
                        variant="text"
                        width="40%"
                        height={40}
                        sx={{ mb: 3 }}
                      />
                      <Box sx={{ maxHeight: 250, overflowY: "auto", pr: 0 }}>
                        {[1, 2, 3].map((i) => (
                          <Skeleton
                            key={i}
                            variant="text"
                            width="80%"
                            height={30}
                            sx={{ mb: 1.5 }}
                          />
                        ))}
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Skeleton variant="text" width="50%" height={24} />
                      <Skeleton variant="text" width="50%" height={24} />
                      <Skeleton variant="text" width="50%" height={24} />
                      <Divider sx={{ my: 2 }} />
                      <Skeleton variant="text" width="60%" height={32} />
                      <Skeleton
                        variant="rectangular"
                        height={40}
                        sx={{ mt: 2 }}
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          color: "#8A2BE2",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Icon
                          icon="streamline-freehand-color:mobile-shopping-cart"
                          width="30"
                          height="30"
                        />{" "}
                        Order Summary
                      </Typography>
                      <Box sx={{ maxHeight: 250, overflowY: "auto", pr: 0 }}>
                        {cartItems.length > 0 ? (
                          cartItems.map((item) => (
                            <Fade in={true} key={item.id}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",

                                  p: 1,
                                  borderRadius: 2,
                                  transition: "background-color 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "#E0E0E0",
                                    // p: 0.5,
                                  },
                                  // backgroundColor: "#F9F9F9",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: 500 }}
                                >
                                  {item.name} x {item.quantity}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: 600 }}
                                >
                                  ₹{item.price * item.quantity}
                                </Typography>
                              </Box>
                            </Fade>
                          ))
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{
                              textAlign: "center",
                              color: "gray",
                              py: 2,
                            }}
                          >
                            Your cart is empty
                          </Typography>
                        )}
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      {/* Price Breakdown */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          my: 0,
                        }}
                      >
                        <Typography variant="body1">Subtotal</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          ₹{calculateSubtotal()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          my: 1,
                        }}
                      >
                        <Typography variant="body1">Delivery Fee</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          ₹{deliveryFee}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          my: 1,
                        }}
                      >
                        <Typography variant="body1">GST (18%)</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          ₹{(calculateSubtotal() * gstRate).toFixed(2)}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      {/* Total Amount */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Total
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, color: "#8A2BE2" }}
                        >
                          ₹{calculateTotal().toFixed(2)}
                        </Typography>
                      </Box>
                      {/* Checkout Button */}
                      <AnimatedButton
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{
                          backgroundColor: "#8A2BE2",
                          "&:hover": { backgroundColor: "#6A1BBF" },
                          fontSize: "1rem",
                          fontWeight: 600,
                          py: 1.5,
                        }}
                        startIcon={<ShoppingCartCheckoutIcon />}
                        onClick={handlePayment}
                      >
                        Proceed to Checkout
                      </AnimatedButton>
                    </>
                  )}
                </CardContent>
              </StyledCard>
            </Slide>
          </Grid>
        </Grid>
      </Container>

      {/* {showPayment && <Payment order={orderInfo} payment={paymentInfo} />} */}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "400px",
            width: "100%",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ textAlign: "center", pt: 3, px: 3 }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "#ffebee",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            <AiFillAlert style={{ color: "#d32f2f", fontSize: 40 }} />
          </Avatar>
          <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
            Quantity Limit Reached
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#546e7a" }}>
              You've reached the maximum quantity limit of 10 for this food
              item.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                mr: 1,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default Cart;
