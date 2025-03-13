import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Slideshow from "../component/Slideshow";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageAspectRatioIcon from "@mui/icons-material/ImageAspectRatio";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";

import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

const RestroOwnerRegister = () => {
  const [loading, setLoading] = useState();
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
  });

  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    restaurantName: "",
    address: "",
    password: "",
    confirmPassword: "",
    appLogo: image,
    document: document,
    roleType: "restro-owner",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const showDialog = (title, message, isSuccess = false) => {
    setDialogConfig({ title, message });
    if (isSuccess) {
      setSuccessDialogOpen(true);
    } else {
      setErrorDialogOpen(true);
    }
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    navigate("/login");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 300 * 1024) {
        showDialog(
          "File Size Warning",
          "The selected file exceeds the maximum allowed size of 300KB. Please choose a smaller file."
        );
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setFormData((prev) => ({ ...prev, appLogo: file }));
    }
  };

  const handleDocumentChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 300 * 1024) {
        showDialog(
          "File Size Warning",
          "The selected file exceeds the maximum allowed size of 300KB. Please choose a smaller file."
        );
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setDocument(file);
      setFormData((prev) => ({ ...prev, document: file }));
    }
  };

  const handleDeleteDocument = () => {
    setDocument(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.appLogo) {
      showDialog("Missing Logo", "Please upload a logo image.");
      return;
    }

    if (!formData.document) {
      showDialog("Missing Document", "Please upload a document.");
      return;
    }

    if (!validateEmail(formData.email)) {
      showDialog("Invalid Email", "Please enter a valid email address!");
      return;
    }

    if (!validatePassword(formData.password)) {
      showDialog(
        "Password Requirements",
        "Password must be 6-20 characters long and include a combination of letters, numbers, and special characters."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showDialog("Password Mismatch", "Passwords do not match!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobileNo", formData.mobileNo);
    formDataToSend.append("restaurantName", formData.restaurantName);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);
    formDataToSend.append("roleType", formData.roleType);
    formDataToSend.append("appLogo", image);
    formDataToSend.append("document", document);

    setLoading(true);

    try {
      const response = await axios.post(
        `/api/auth/register/restaurant-owner`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const { data } = response;
      console.log(response, "hi");

      if (response?.data?.resultCode === 0) {
        showDialog(
          "Registration Successful",
          "Your account has been created successfully!",
          true
        );
      } else {
        console.log(resultMessage, "hi");
        showDialog(
          "Registration Failed",
          data.resultMessage || "An error occurred during registration"
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // const errorMessage =
      //   error.response?.data?.resultMessage || "Please try again later";
      // showDialog(errorMessage);
      const errorMessage =
        error.response?.data?.resultMessage || "Please try again later";
      showDialog("Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
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
      {/* Error Dialog */}
      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
        PaperProps={{
          sx: {
            minWidth: "400px",
            maxWidth: "500px",
            textAlign: "center",
            padding: "20px",
            borderRadius: "10px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ mt: 2 }}>
            <ErrorIcon color="error" style={{ fontSize: "4rem" }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Error
          </Typography>

          <DialogContent sx={{ py: 1 }}>
            <DialogContentText sx={{ mb: 1 }}>
              {dialogConfig.message}
            </DialogContentText>
          </DialogContent>

          <DialogActions
            sx={{ width: "100%", justifyContent: "center", pb: 3 }}
          >
            <Button
              onClick={handleCloseErrorDialog}
              variant="contained"
              sx={{
                minWidth: "120px",
                background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #0d47a1 0%, #1a237e 100%)",
                },
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
        PaperProps={{
          sx: {
            minWidth: "400px",
            maxWidth: "500px",
            textAlign: "center",
            padding: "20px",
            borderRadius: "10px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ mt: 2 }}>
            <CheckCircleIcon color="success" style={{ fontSize: "4rem" }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Success
          </Typography>

          <DialogContent sx={{ py: 1 }}>
            <DialogContentText sx={{ mb: 1 }}>
              {dialogConfig.message}
            </DialogContentText>
          </DialogContent>

          <DialogActions
            sx={{ width: "100%", justifyContent: "center", pb: 3 }}
          >
            <Button
              onClick={handleCloseSuccessDialog}
              variant="contained"
              sx={{
                minWidth: "120px",
                background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #0d47a1 0%, #1a237e 100%)",
                },
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {loading ? (
        <CircularProgress size={60} sx={{ color: "#1a237e" }} />
      ) : (
        <>
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

          <Box
            sx={{
              width: "70%",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "40px",
              height: "90vh",
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginBottom: "20px" }}
            >
              {" "}
              <Box component="span" sx={{ color: "#0d47a1" }}>
                {/* <DinnerDiningIcon sx={{ fontSize: "2.5rem" }} /> */}
              </Box>
              Welcome to MealMate!{" "}
            </Typography>
            <Typography
              sx={{ textAlign: "center", marginBottom: "20px" }}
              variant="subtitle1"
            >
              Register Your Restaurant Today
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* First Name and Last Name */}
              <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <TextField
                  fullWidth
                  required
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
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
                />
              </Box>

              {/* Email */}
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
                <PhoneInput
                  country={"in"}
                  required
                  value={formData.mobileNo}
                  onChange={(value) =>
                    setFormData({ ...formData, mobileNo: value })
                  }
                  inputStyle={{
                    width: "100%",
                    height: "56px",
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    paddingLeft: "48px", // To adjust for country code prefix
                  }}
                />
              </Box>

              {/* Restaurant Name */}
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  fullWidth
                  required
                  label="Restaurant Name"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      restaurantName: e.target.value,
                    })
                  }
                />
              </Box>

              {/* Address */}
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </Box>

              {/* Password and Confirm Password */}
              <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
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

              {/* Logo Upload */}
              <Box
                sx={{
                  display: "flex",
                  gap: "10rem",
                  marginBottom: "20px",
                  ml: "7rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="logo"
                      style={{
                        width: "6rem",
                        height: "6rem",
                        objectFit: "scale-down",
                        borderRadius: "0.5rem",
                        padding: "0.1rem",
                        border: "1px solid #6c757d",
                      }}
                    />
                  ) : (
                    <ImageAspectRatioIcon
                      style={{
                        fontSize: "4rem",
                        opacity: "0.7",
                      }}
                    />
                  )}
                  <label htmlFor="icon-button-file">
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      name="appLogo"
                      onChange={handleImageChange}
                      id="icon-button-file"
                      type="file"
                    />
                    <Button
                      variant="outlined"
                      color="#0d47a1"
                      startIcon={<PhotoCamera />}
                      component="span"
                      sx={{
                        marginLeft: "10px",
                        color: "#0d47a1",
                        borderColor: "#0d47a1",
                      }}
                    >
                      Upload Logo
                    </Button>
                  </label>
                </Box>

                {/* Document Upload */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {document ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                        marginRight: "10px",
                      }}
                    >
                      {/* Document Preview */}
                      {document &&
                      document.type &&
                      document.type.startsWith("image") ? (
                        <img
                          src={URL.createObjectURL(document)}
                          alt="Document Preview"
                          style={{
                            width: "6rem",
                            height: "6rem",
                            objectFit: "cover",
                            borderRadius: "0.5rem",
                            padding: "0.1rem",
                            border: "1px solid #6c757d",
                          }}
                        />
                      ) : document.type === "application/pdf" ? (
                        <InsertDriveFileIcon
                          style={{ fontSize: "4rem", color: "#0d47a1" }}
                        />
                      ) : (
                        <InsertDriveFileIcon
                          style={{ fontSize: "4rem", color: "#0d47a1" }}
                        />
                      )}

                      {/* Document Delete Button */}
                      {/* <IconButton onClick={handleDeleteDocument} color="error">
                    Delete Document Image
                  </IconButton> */}
                    </Box>
                  ) : (
                    <InsertDriveFileIcon
                      style={{ fontSize: "4rem", opacity: "0.7" }}
                    />
                  )}
                  <label htmlFor="document-upload">
                    <input
                      accept="image/*,.pdf"
                      type="file"
                      name="document"
                      onChange={handleDocumentChange}
                      style={{ display: "none" }}
                      id="document-upload"
                    />
                    <Button
                      variant="outlined"
                      color="#0d47a1"
                      startIcon={<InsertDriveFileIcon />}
                      component="span"
                      sx={{ color: "#0d47a1", borderColor: "#0d47a1" }}
                    >
                      Upload Id proof
                    </Button>
                  </label>
                </Box>
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
                  fullWidth
                  type="submit"
                  sx={{
                    padding: "15px 30px",
                    background:
                      "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
                    fontSize: "16px",
                    fontWeight: "bold",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #0d47a1 0%, #1a237e 100%)",
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? "Processing ..." : "Register"}
                </Button>
              </Box>
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
                    sx={{ textDecoration: "none", color: "#0d47a1" }}
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

export default RestroOwnerRegister;
