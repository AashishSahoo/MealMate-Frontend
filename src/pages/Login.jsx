import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import logo3 from "/assets/logo3.png";
import Slideshow from "../component/Slideshow";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    email: "abc@gmail.com",
    password: "Pass@123",
    // roleType: "restro-owner",
    // roleType: "admin",
    roleType: "customer",
  }); // Fixed incorrect initialization of formData
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    try {
      const response = await axios.post(`/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // const data = await response.json();

      if (response?.data?.resultCode === 0) {
        const data = response.data.resultData;
        console.log(data.user.roleType, "user");
        console.log(data.token, "token");
        console.log(data.user.email, "email");

        const userData = {
          user: data.user.roleType,
          token: data.token,
          email: data.user.email,
        };

        localStorage.setItem("userInfo", JSON.stringify(userData));

        dispatch(
          login({
            user: data.user.roleType,
            token: data.token,
            email: data.user.email,
          })
        );
        console.log("Login response:", data);

        const redirectTo =
          formData.roleType === "admin"
            ? "/admin"
            : formData.roleType === "restro-owner"
              ? "/resto-owner"
              : "/customer";

        console.log(redirectTo);
        navigate(redirectTo);

        //   Swal.fire({
        //     title: "Login successful",
        //     icon: "success",
        //   });
        // } else {
        //   Swal.fire({
        //     title: "Invalid Credentials",
        //     icon: "error",
        //   });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        title: "Network error",
        text: "Please try again later",
        icon: "error",
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    console.log("Redux state after login:", authState);
  }, [authState]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "96vh",
        width: "99vw",
        overflow: "hidden",
      }}
    >
      {/* Left Side - Login Form */}
      <Box
        sx={{
          width: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffffcc",
          padding: "10px",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: "50px 40px",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
            borderRadius: "12px",
            minHeight: "88%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              component="img"
              src={logo3}
              alt="Application Logo"
              sx={{
                width: "300px",
                height: "300px",
                marginBottom: "0px",
                ml: "20px",
              }}
            />
            <Typography variant="h4" gutterBottom>
              Welcome Back
            </Typography>

            {/* Role Selection */}
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <InputLabel id="role-select-label">Select Role</InputLabel>
              <Select
                size="small"
                labelId="role-select-label"
                value={formData.roleType}
                onChange={(e) =>
                  setFormData({ ...formData, roleType: e.target.value })
                }
                label="Select Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="restro-owner">Restaurant Owner</MenuItem>
                <MenuItem value="customer">User</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              size="small"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              autoComplete="current-password"
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              sx={{ marginBottom: "30px" }}
            />
            <Button
              size="small"
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
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
            <Typography
              variant="body2"
              sx={{ color: "#673ab7", marginTop: "15px" }}
            >
              Forgot password?
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#673ab7", marginTop: "15px" }}
            >
              {formData.roleType === "restro-owner" ? (
                <Link
                  sx={{ textDecoration: "none", color: "#673ab7" }}
                  href="/register/resto-owner"
                >
                  Don't have an account? Sign up here
                </Link>
              ) : formData.roleType === "customer" ? (
                <Link
                  sx={{ textDecoration: "none", color: "#673ab7" }}
                  href="/register/customer"
                >
                  Don't have an account? Sign up here
                </Link>
              ) : formData.roleType === "admin" ? (
                <>
                  {" "}
                  <Link
                    sx={{ textDecoration: "none", color: "#673ab7" }}
                    href="/register/admin"
                  >
                    ADMIN REGISTRATION
                  </Link>
                </>
              ) : (
                <span style={{ color: "red" }}> Please select a role</span>
              )}
            </Typography>
          </form>
        </Paper>
      </Box>

      {/* Right Side - Custom Slideshow */}
      <Box
        sx={{
          width: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          borderRadius: "12px",
        }}
      >
        <Slideshow />
      </Box>
    </Box>
  );
};

export default Login;
