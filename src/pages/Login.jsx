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
  FormHelperText,
} from "@mui/material";
import logo3 from "../assets/Applogo2.png";
import Slideshow from "../component/Slideshow";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import ErrorIcon from "@mui/icons-material/Error";

const Login = () => {
  const [openErrorMsg, setErrorMsg] = useState(false);

  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    // email: "ashishsahoo0013@gmail.com",
    // email: "admin@gmail.com",
    email: "mailtoashishsahoo@gmail.com",
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

      if (response?.data?.resultCode === 0) {
        const data = response.data.resultData;

        const userData = {
          user: data.user.roleType,
          token: data.token,
          email: data.user.email,
          userId: data.user.userId,
        };

        localStorage.setItem("userInfo", JSON.stringify(userData));

        dispatch(
          login({
            user: data.user.roleType,
            token: data.token,
            email: data.user.email,
            userId: data.user.userId,
          })
        );

        const redirectTo =
          formData.roleType === "admin"
            ? "/admin"
            : formData.roleType === "restro-owner"
              ? "/resto-owner"
              : "/customer";

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

      if (response?.data?.resultCode === 71) {
        setErrorMsg(true);
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
    // console.log("Redux state after login:", authState);
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
            <FormControl fullWidth sx={{ marginBottom: "15px" }}>
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
              sx={{ marginBottom: "15px" }}
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
              sx={{ marginBottom: "13px" }}
            />
            {openErrorMsg && (
              <FormHelperText
                color="#E40006"
                sx={{ mb: 0.5, color: "#E40006", textAlign: "center" }}
              >
                User not found{" "}
              </FormHelperText>
            )}
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

      {/* <Dialog
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
            <ErrorIcon sx={{ color: "#d32f2f", fontSize: 40 }} />
          </Avatar>
          <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
            User not found
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#546e7a" }}>
              Are you sure you want to delete this restaurant owner? This action
              cannot be undone.
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
      </Dialog> */}
    </Box>
  );
};

export default Login;
