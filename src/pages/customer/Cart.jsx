import React, { useState } from "react";
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
  Paper,
  Fade,
  Slide,
  Zoom,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  CurrencyRupee,
  ShoppingCart,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import img10 from "../../assets/img10.jpg";
import img13 from "../../assets/img13.jpg";
import img14 from "../../assets/img14.jpg";
import img15 from "../../assets/img15.jpg";
import img16 from "../../assets/img16.jpg";
import img18 from "../../assets/img18.jpg";
import img19 from "../../assets/img19.jpg";
import img20 from "../../assets/img20.jpg";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic Burger",
      price: 299,
      quantity: 2,
      image: img10,
      restaurant: "The Burger House",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 399,
      quantity: 1,
      image: img13,
      restaurant: "Pizza Paradise",
    },
    {
      id: 3,
      name: "Pasta Alfredo",
      price: 349,
      quantity: 1,
      image: img14,
      restaurant: "Italian Corner",
    },
    {
      id: 4,
      name: "Pasta Alfredo",
      price: 349,
      quantity: 1,
      image: img15,
      restaurant: "Italian Corner",
    },
    {
      id: 5,
      name: "Pasta Alfredo",
      price: 349,
      quantity: 1,
      image: img16,
      restaurant: "Italian Corner",
    },
    {
      id: 6,
      name: "Pasta Alfredo",
      price: 349,
      quantity: 1,
      image: img18,
      restaurant: "Italian Corner",
    },
    {
      id: 7,
      name: "Pasta Alfredo",
      price: 349,
      quantity: 1,
      image: img19,
      restaurant: "Italian Corner",
    },
    // ... rest of the cart items
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {cartItems.map((item, index) => (
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
                            image={item.image}
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
                              sx={{
                                bgcolor: "rgba(147, 112, 219, 0.1)",
                                "&:hover": {
                                  bgcolor: "rgba(147, 112, 219, 0.2)",
                                },
                              }}
                            >
                              <Remove />
                            </IconButton>
                            <Typography sx={{ mx: 2, fontWeight: 600 }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              onClick={() => updateQuantity(item.id, 1)}
                              sx={{
                                bgcolor: "rgba(147, 112, 219, 0.1)",
                                "&:hover": {
                                  bgcolor: "rgba(147, 112, 219, 0.2)",
                                },
                              }}
                            >
                              <Add />
                            </IconButton>
                            <IconButton
                              fullWidth
                              onClick={() => removeItem(item.id)}
                              size="small"
                              sx={{
                                ml: "4rem",
                                "&:hover": {
                                  color: "#ff4444",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </StyledCard>
                </Grid>
              </Zoom>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Slide direction="left" in={true}>
            <StyledCard sx={{ position: "sticky", top: 100 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "#8A2BE2" }}
                >
                  Order Summary <BorderColorIcon />
                </Typography>
                {cartItems.map((item) => (
                  <Fade in={true} key={item.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2">
                        {item.name} x {item.quantity}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Box>
                  </Fade>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal</Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    ₹{calculateSubtotal()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Delivery Fee</Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    ₹{deliveryFee}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>GST (18%)</Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    ₹{(calculateSubtotal() * gstRate).toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#8A2BE2" }}
                  >
                    ₹{calculateTotal().toFixed(2)}
                  </Typography>
                </Box>
                <AnimatedButton
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<ShoppingCart />}
                >
                  Proceed to Checkout
                </AnimatedButton>
              </CardContent>
            </StyledCard>
          </Slide>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
