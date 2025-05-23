import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  FormHelperText,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authslice";
import axios from "axios";
import logo3 from "../assets/Applogo2.png";
import { Icon } from "@iconify/react";

const Login = () => {
  // Slideshow State
  const [currentIndex, setCurrentIndex] = useState(0);
  const media = [
    "../assets/slideshow/img19.jpg",
    "../assets/slideshow/img20.jpg",
    "../assets/slideshow/img21.jpg",
    "../assets/slideshow/img23.jpg",
    "../assets/slideshow/vdo4.mp4",
    "../assets/slideshow/vdo5.mp4",
    "../assets/slideshow/img5.jpg",
    "../assets/slideshow/img6.jpg",
    "../assets/slideshow/img7.jpg",
    "../assets/slideshow/img8.jpg",
    "../assets/slideshow/img9.jpg",
  ];

  // Login State
  const [openErrorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // email: "mailtoashishsahoo@gmail.com",
    email: "ashishsahoo0013@gmail.com",

    // email: "admin@gmail.com",

    password: "Pass@123",
    // roleType: "customer",
    // roleType: "admin",
    roleType: "resto-owner",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Slideshow Effect
  useEffect(() => {
    const isVideo =
      media[currentIndex].endsWith(".mp4") ||
      media[currentIndex].endsWith(".webm");
    const timer = setTimeout(
      () => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
      },
      isVideo ? 6000 : 4000
    );

    return () => clearTimeout(timer);
  }, [currentIndex, media.length]);

  // Login Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`/api/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response?.data?.resultCode === 0) {
        const data = response.data.resultData;
        const userData = {
          user: data.user.roleType,
          token: data.token,
          email: data.user.email,
          userId: data.user.userId,
        };

        localStorage.setItem("userInfo", JSON.stringify(userData));
        dispatch(login(userData));

        const redirectTo =
          formData.roleType === "admin"
            ? "/admin"
            : formData.roleType === "restro-owner"
              ? "/resto-owner"
              : "/customer";
        navigate(redirectTo);
      }

      if (response?.data?.resultCode === 71) setErrorMsg(true);
    } catch (error) {
      Swal.fire({
        title: "Network error",
        text: "Please try again later",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "97vh",
        width: "99vw",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      {/* Login Form - Left Side */}
      <Box
        sx={{
          width: { xs: "100%", md: "35%" },
          minWidth: 400,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%)",
          // zIndex: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            width: "80%",
            maxWidth: 400,
            padding: 4,
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(103, 58, 183, 0.15)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <img
              src={logo3}
              alt="Logo"
              style={{ width: 120, marginBottom: 16 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#512da8",
                  letterSpacing: 0.5,
                  mr: 1,
                }}
              >
                Welcome Back{"   "}
              </Typography>
              <Icon
                icon="icomoon-free:happy"
                style={{ fontSize: "2rem", color: "#673ab7" }}
              />
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Role</InputLabel>
              <Select
                value={formData.roleType}
                onChange={(e) =>
                  setFormData({ ...formData, roleType: e.target.value })
                }
                label="Select Role"
                size="small"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="restro-owner">Restaurant Owner</MenuItem>
                <MenuItem value="customer">User</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              size="small"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              size="small"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {openErrorMsg && (
              <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
                Invalid credentials. Please try again.
              </FormHelperText>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 3,
                background: "linear-gradient(to right, #7b1fa2, #512da8)",
                fontWeight: 600,
                letterSpacing: 1,
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(to right, #6a1b9a, #4527a0)",
                },
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
              {formData.roleType !== "admin" ? (
                <Link
                  href={`/register/${formData.roleType}`}
                  sx={{
                    cursor: "pointer",
                    color: "#512da8",
                    fontWeight: 500,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Don’t have an account? Sign Up
                </Link>
              ) : (
                <></>
                // <Link
                //   href="/register/admin"
                //   sx={{
                //     cursor: "pointer",
                //     color: "#512da8",
                //     fontWeight: 500,
                //     textDecoration: "none",
                //     "&:hover": {
                //       textDecoration: "underline",
                //     },
                //   }}
                // >
                //   Admin Registration
                // </Link>
              )}
            </Typography>
          </form>
        </Box>
      </Box>

      {/* Slideshow - Right Side */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          position: "relative",
          display: { xs: "none", md: "block" },
        }}
      >
        {media.map((src, index) => {
          const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
          return (
            <Box
              key={index}
              component={isVideo ? "video" : "img"}
              src={src}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: currentIndex === index ? 1 : 0,
                transition: "opacity 1s ease",
                filter: "brightness(0.8)",
              }}
              {...(isVideo && { autoPlay: true, muted: true, loop: true })}
            />
          );
        })}

        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
          }}
        >
          {media.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor:
                  currentIndex === index ? "#673ab7" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
