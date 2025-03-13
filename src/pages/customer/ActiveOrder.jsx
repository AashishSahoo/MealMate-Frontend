import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Stepper,
  Step,
  StepLabel,
  styled,
  Fade,
  Zoom,
} from "@mui/material";
import {
  RestaurantMenu,
  LocalShipping,
  DoneAll,
  AccessTime,
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(147, 112, 219, 0.2)",
  },
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderRadius: "1rem",
}));

const StyledStepIcon = styled("div")(({ theme, completed, active }) => ({
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  backgroundColor: completed || active ? "#8A2BE2" : "#e0e0e0",
  transition: "all 0.5s ease",
  transform: active ? "scale(1.2)" : "scale(1)",
  "& svg": {
    fontSize: 24,
    color: completed || active ? "#fff" : "#757575",
    animation: active ? "pulse 1.5s infinite" : "none",
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.1)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
}));

const ActiveOrder = () => {
  const [activeStep] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const steps = [
    { label: "Order Confirmed", icon: <RestaurantMenu /> },
    { label: "Preparing", icon: <AccessTime /> },
    { label: "On the Way", icon: <LocalShipping /> },
    { label: "Delivered", icon: <DoneAll /> },
  ];

  const orderDetails = {
    orderId: "#ORD123456",
    restaurant: "The Burger House",
    items: [
      { name: "Classic Burger", quantity: 2, price: 299 },
      { name: "French Fries", quantity: 1, price: 149 },
    ],
    total: 747,
    estimatedDelivery: "25-30 mins",
  };

  return (
    <Fade in={fadeIn} timeout={800}>
      <Container maxWidth="lg" sx={{ py: 1 }}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 600, color: "#8A2BE2" }}
        >
          Active Order
        </Typography>

        <Zoom in={fadeIn} timeout={1000}>
          <StyledCard>
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel
                        StepIconComponent={() => (
                          <StyledStepIcon
                            completed={index < activeStep}
                            active={index === activeStep}
                          >
                            {step.icon}
                          </StyledStepIcon>
                        )}
                      >
                        <Typography
                          sx={{
                            fontWeight: index === activeStep ? 600 : 400,
                            color: index === activeStep ? "#8A2BE2" : "inherit",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {step.label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Order Details
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Order ID: {orderDetails.orderId}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Restaurant: {orderDetails.restaurant}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#8A2BE2", fontWeight: 500 }}
                  >
                    Estimated Delivery: {orderDetails.estimatedDelivery}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Items
                  </Typography>
                  {orderDetails.items.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>
                        {item.name} x {item.quantity}
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#8A2BE2" }}
                    >
                      ₹{orderDetails.total}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Zoom>
      </Container>
    </Fade>
  );
};

export default ActiveOrder;
