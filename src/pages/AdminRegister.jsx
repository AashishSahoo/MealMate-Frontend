import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Slideshow from "../component/Slideshow";
import logo3 from "/assets/logo3.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const AdminRegister = () => {
  const [loading, setLoading] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",

    password: "",
    confirmPassword: "",
    roleType: "admin",
  });
  const navigate = useNavigate(); // This is wrong

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
      return Swal.fire({
        title: "Please enter a valid email address!",
        icon: "warning",
      });
    }

    if (!validatePassword(formData.password)) {
      return Swal.fire({
        title: "Password error",
        text: "Password must be 6-20 characters long and include a combination of letters, numbers, and special characters.",
        icon: "warning",
      });
    }

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        title: "Passwords do not match!",
        icon: "warning",
      });
    }
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/register/admin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const data = await response.json();

      if (response?.data?.resultCode === 0) {
        Swal.fire({
          title: "Account Created",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Registration failed",
          text: data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        title: "Network error",
        text: "Please try again later",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }

    console.log("Form Data Submitted!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "97vh",
        width: "99vw",
        overflow: "hidden",
      }}
    >
      {loading ? (
        <CircularProgress size={60} sx={{ color: "#673ab7" }} />
      ) : (
        <>
          {/* Slideshow - Takes 40% width */}
          <Box
            sx={{
              width: "40%",
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              borderRadius: "12px",
              backgroundColor: "lightgray",
            }}
          >
            <Slideshow />
          </Box>

          {/* Form Section - Takes 60% width */}
          <Box
            sx={{
              width: "60%",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "40px",
              height: "90vh",
            }}
          >
            <Box
              component="img"
              src={logo3}
              alt="Application Logo"
              sx={{
                width: "250px",
                height: "250px",
                marginBottom: "0px",
                ml: "20rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginBottom: "20px" }}
            >
              Create Account
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Email and Mobile */}
              <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
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
                />
              </Box>

              {/* Password and Confirm Password */}
              <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Submit Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mt: "20px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: "12px 0",
                    backgroundColor: "#673ab7",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Proccessing..." : "Register"}
                </Button>
              </Box>

              {/* Login Link */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "10px",
                }}
              >
                <Typography>
                  <Link
                    sx={{ textDecoration: "none", color: "#673ab7" }}
                    href="/login"
                  >
                    Already have an account? Log in
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminRegister;
