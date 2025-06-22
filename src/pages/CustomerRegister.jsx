import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
  Container,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { motion } from "framer-motion";
import giftGIF from "../assets/giftGIF.gif";

import FastDeliveryIcon from "@mui/icons-material/DeliveryDining";
import FoodVarietyIcon from "@mui/icons-material/RestaurantMenu";
import DiscountIcon from "@mui/icons-material/LocalOffer";
import TrackingIcon from "@mui/icons-material/MyLocation";
import appLogo from "../assets/Applogo2.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Icon } from "@iconify/react";

const CustomerRegister = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationFail, setRegistrationFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    address: "",
    password: "",
    confirmPassword: "",
    roleType: "customer",
  });

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address!");
      setRegistrationFail(true);
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMessage(
        "Password must be 6-20 characters long and include a combination of letters, numbers, and special characters."
      );
      setRegistrationFail(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setRegistrationFail(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `/api/auth/register/customer`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.resultCode === 0) {
        setRegistrationSuccess(true);
        // Clear form after successful registration
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobileNo: "",
          address: "",
          password: "",
          confirmPassword: "",
          roleType: "customer",
        });
      } else if (response?.data?.resultCode !== 0) {
        setErrorMessage("Error creating account. Please try again later.");
        setRegistrationFail(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobileNo: "",
          address: "",
          password: "",
          confirmPassword: "",
          roleType: "customer",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Error creating account. Please try again later.");

      setRegistrationFail(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        address: "",
        password: "",
        confirmPassword: "",
        roleType: "customer",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      setRegistrationFail(false);
    } else if (registrationFail) {
      setRegistrationSuccess(false);
    }
  }, [registrationSuccess, registrationFail]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          // py: 2,
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="/login" sx={{ textDecoration: "none" }}>
              <img src={appLogo} alt="Logo" style={{ width: 85, height: 85 }} />
            </Link>

            <Box>
              <Button
                variant="outlined"
                sx={{
                  color: "#FF6B6B",
                  borderColor: "#FF6B6B",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#FFF0F0",
                    borderColor: "#FF5252",
                  },
                }}
                href="/login"
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Left Column - Marketing Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "#333",
                    lineHeight: 1.2,
                  }}
                >
                  Join MealMate Today
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#666", mb: 3, fontWeight: "normal" }}
                >
                  Discover the best food in your city and get it delivered to
                  your doorstep in minutes.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {/* <FastDeliveryIcon
                        sx={{ fontSize: 40, color: "#FF6B6B", mb: 1 }}
                      /> */}
                      <img
                        src={giftGIF}
                        alt="Fast Delivery"
                        style={{ width: 70, height: 90, marginBottom: 8 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        Fast Delivery
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        Get your food in 30 minutes or less
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <FoodVarietyIcon
                        sx={{ fontSize: 40, color: "#FF6B6B", mb: 1, mt: 6 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        1000+ Restaurants
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        Wide variety of cuisines to choose from
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <DiscountIcon
                        sx={{ fontSize: 40, color: "#FF6B6B", mb: 1 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        Exclusive Deals
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        Special discounts for registered users
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <TrackingIcon
                        sx={{ fontSize: 40, color: "#FF6B6B", mb: 1 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        Live Tracking
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        Track your order in real-time
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{ backgroundColor: "#FFF0F0", p: 3, borderRadius: "12px" }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Why Join MealMate?
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  MealMate isn't just another food delivery app. We partner with
                  the best local restaurants to bring you authentic flavors at
                  affordable prices.
                </Typography>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li>
                    <Typography variant="body2">
                      <strong>Priority customer support</strong> - Get help when
                      you need it
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      <strong>Personalized recommendations</strong> - Based on
                      your preferences
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Grid>

            {/* Right Column - Registration Form */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  p: 4,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  Create Account
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    color: "#666",
                    textAlign: "center",
                  }}
                >
                  Join thousands of happy customers
                </Typography>

                <form onSubmit={handleSubmit}>
                  {/* Name Fields */}
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      required
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      required
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                  </Box>

                  {/* Email and Phone */}
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      required
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      variant="outlined"
                      size="small"
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                    <PhoneInput
                      country={"in"}
                      value={formData.mobileNo}
                      onChange={(value) =>
                        setFormData({ ...formData, mobileNo: value })
                      }
                      inputStyle={{
                        width: "100%",
                        height: "40px",
                        borderRadius: "12px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        paddingLeft: "48px",
                      }}
                      containerStyle={{
                        marginBottom: "16px",
                      }}
                      buttonStyle={{
                        borderRadius: "12px 0 0 12px",
                      }}
                    />
                  </Box>

                  {/* Address */}
                  <TextField
                    fullWidth
                    required
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    variant="outlined"
                    size="small"
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                    multiline
                    rows={2}
                  />

                  {/* Password Fields */}
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      required
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      autoComplete="new-password"
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleTogglePassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      required
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      autoComplete="new-password"
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleTogglePassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: "12px",
                      backgroundColor: "#FF6B6B",
                      "&:hover": {
                        backgroundColor: "#FF5252",
                      },
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "none",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      mb: 2,
                    }}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  {/* Success Message */}
                  {registrationSuccess && (
                    <Paper
                      elevation={0}
                      sx={{
                        border: "2px solid #4CAF50",
                        borderRadius: "12px",
                        p: 2,
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        backgroundColor: "rgba(76, 175, 80, 0.1)",
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ color: "#4CAF50" }} />
                      <Typography sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                        Account created successfully! Welcome to MealMate.
                      </Typography>
                    </Paper>
                  )}

                  {/* Fail Message */}
                  {registrationFail && (
                    <Paper
                      elevation={0}
                      sx={{
                        border: "2px solid #D81F24",
                        borderRadius: "12px",
                        p: 2,
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        backgroundColor: "#FDEFEF",
                      }}
                    >
                      <Icon
                        icon="ix:user-fail"
                        width="30"
                        height="30"
                        color="#D81F24"
                      />
                      <Typography sx={{ color: "#D81F24", fontWeight: "bold" }}>
                        {errorMessage ||
                          "Failed to create account. Please try again."}
                      </Typography>
                    </Paper>
                  )}

                  {/* Terms and Conditions */}
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "#999",
                      fontSize: "0.75rem",
                      mb: 2,
                    }}
                  >
                    By creating an account, you agree to our{" "}
                    <Link
                      href="/terms"
                      sx={{ color: "#666", fontWeight: "bold" }}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      sx={{ color: "#666", fontWeight: "bold" }}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* Login Link */}
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      sx={{
                        color: "#FF6B6B",
                        fontWeight: "bold",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Sign In
                    </Link>
                  </Typography>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#333",
          color: "white",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "#FF6B6B" }}
              >
                MealMate
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Delivering happiness to your doorstep since 2023.
              </Typography>
              <Typography variant="body2">
                Available in 20+ cities across India.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Company
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                  About Us
                </Link>
                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                  Careers
                </Link>
                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                  Blog
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Help
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                  Help Center
                </Link>
                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                  Contact Us
                </Link>
                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                  FAQs
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Download Our App
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#555",
                    "&:hover": { backgroundColor: "#666" },
                    borderRadius: "8px",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/ashishsahoo899/",
                      "_blank"
                    )
                  }
                >
                  Google Play
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#555",
                    "&:hover": { backgroundColor: "#666" },
                    borderRadius: "8px",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/ashishsahoo899/",
                      "_blank"
                    )
                  }
                >
                  App Store
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, backgroundColor: "#555" }} />
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            © 2024 MealMate. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default CustomerRegister;
