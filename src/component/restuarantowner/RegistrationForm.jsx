import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FormHelperText, CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const steps = [
  "Entry profile information",
  "Upload documents",
  "Verify your email",
];

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    isError: true,
  });

  const [image, setImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [profileData, setProfileData] = useState(null);
  const [resendCounter, setResendCounter] = useState(0);
  const [countdown, setCountdown] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    restaurantName: "",
    address: "",
    password: "",
    confirmPassword: "",
    appLogo: null,
    document: null,
    roleType: "restro-owner",
    isVerified: false,
  });

  // Countdown timer for OTP resend
  useEffect(() => {
    let intervalId;
    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [countdown]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/.test(
      password
    );

  const handleChange = (element, index) => {
    const value = element.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && element.target.nextSibling) {
        element.target.nextSibling.focus();
      }
    }
  };

  // Handle backspace key to move to previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      const prevInput = e.target.previousSibling;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showDialog = (title, message, isError = true) => {
    setDialogConfig({ title, message, isError });
    // setErrorDialogOpen(true);
  };

  const handleCloseDialog = () => setErrorDialogOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file?.size > 300 * 1024) {
      showDialog("File Size Warning", "File size exceeds 300KB");
      return;
    }

    setImage(file);
    setFormData((prev) => ({ ...prev, appLogo: file }));
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file?.size > 300 * 1024) {
      showDialog("File Size Warning", "File size exceeds 300KB");
      return;
    }

    setDocumentFile(file);
    setFormData((prev) => ({ ...prev, document: file }));
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    try {
      setOtpLoading(true);
      const response = await axios.post(
        `${BASE_URL}/auth/request-verification`,
        {
          email: formData.email,
        }
      );

      if (response?.data?.resultCode === 0) {
        setResendCounter((prev) => prev + 1);
        setCountdown(500);
        showDialog(
          "OTP Sent",
          "A new verification code has been sent to your email.",
          false
        );
        setOtp(Array(6).fill(""));
      } else {
        showDialog("Failed to Send OTP", response.data.resultMessage);
      }
    } catch (error) {
      showDialog(
        "OTP Request Failed",
        error.response?.data?.resultMessage || "Please try again"
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // Save profile data to state after step 1
  const saveProfileData = async () => {
    try {
      setLoading(true);

      // For step 1, just save the data in state
      setProfileData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobileNo: formData.mobileNo,
        restaurantName: formData.restaurantName,
        address: formData.address,
        password: formData.password,
      });

      // Move to step 2
      setActiveStep((prev) => prev + 1);
    } catch (error) {
      showDialog(
        "Error",
        "Failed to process your information. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Upload documents after step 2 and request OTP
  const uploadDocumentsAndRequestOtp = async () => {
    try {
      setLoading(true);

      // First, send OTP to user's email
      const otpResponse = await axios.post(
        `${BASE_URL}/auth/request-verification`,
        {
          email: formData.email,
        }
      );

      if (otpResponse?.data?.resultCode !== 0) {
        showDialog("Failed to Send OTP", otpResponse.data.resultMessage);
        return;
      }

      // Move to step 3 (OTP verification)
      setActiveStep((prev) => prev + 1);
      setCountdown(60); // 60 seconds cooldown for resend
    } catch (error) {
      showDialog(
        "Error",
        error.response?.data?.resultMessage ||
          "Failed to send verification email"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      showDialog("Invalid OTP", "Please enter the complete 6-digit OTP");
      return;
    }

    try {
      setVerifyLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        email: formData.email,
        otp: otpValue,
      });

      if (response?.data?.resultCode === 0) {
        // OTP verification successful
        setFormData((prev) => ({ ...prev, isVerified: true }));

        // Now submit the full registration data with files
        await handleSubmitRegistration();
      } else {
        showDialog("Verification Failed", response.data.resultMessage);
      }
    } catch (error) {
      showDialog(
        "Verification Failed",
        error.response?.data?.resultMessage || "Please try again"
      );
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSubmitRegistration = async () => {
    try {
      setLoading(true);

      const formDataToSend = new FormData();

      // Add all profile fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && key !== "confirmPassword") {
          formDataToSend.append(key, value);
        }
      });

      const response = await axios.post(
        `${BASE_URL}/auth/register/restaurant-owner`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response?.data?.resultCode === 0) {
        setActiveStep(steps.length); // Move to success step
        showDialog(
          "Registration Successful",
          "Your account has been created successfully!",
          false
        );
      } else {
        showDialog("Registration Failed", response.data.resultMessage);
      }
    } catch (error) {
      showDialog(
        "Registration Failed",
        error.response?.data?.resultMessage || "Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    let isValid = true;

    // Step 0 Validation (Profile Information)
    if (activeStep === 0) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.mobileNo ||
        !formData.restaurantName ||
        !formData.address ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        showDialog("Missing Fields", "Please fill all required fields");
        isValid = false;
      } else if (!validateEmail(formData.email)) {
        showDialog("Invalid Email", "Please enter a valid email address");
        isValid = false;
      } else if (!validatePassword(formData.password)) {
        showDialog(
          "Invalid Password",
          "Password must be 6-20 characters with at least one letter, one number & one special character"
        );
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        showDialog("Password Mismatch", "Passwords don't match");
        isValid = false;
      }

      if (isValid) {
        await saveProfileData();
      }
      return;
    }

    // Step 1 Validation (Documents)
    if (activeStep === 1) {
      if (!formData.appLogo || !formData.document) {
        showDialog("Missing Files", "Please upload both logo and document");
        isValid = false;
      }

      if (isValid) {
        await uploadDocumentsAndRequestOtp();
      }
      return;
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Profile information
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                sx={{ flex: "1 1 45%" }}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                sx={{ flex: "1 1 45%" }}
              />
            </Box>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <PhoneInput
              // backgroundColor="#f1fafe"
              country={"in"}
              value={formData.mobileNo}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, mobileNo: value }))
              }
              inputStyle={{
                width: "100%",
                height: "56px",
                backgroundColor: "#f1fafe",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "4px",
                paddingLeft: "48px",
              }}
            />
            <TextField
              fullWidth
              label="Restaurant Name"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
                sx={{ flex: "1 1 45%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} />
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
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                sx={{ flex: "1 1 45%" }}
              />
            </Box>
            <FormHelperText sx={{ color: "error.main" }}>
              {dialogConfig.message}
            </FormHelperText>
            <FormHelperText>
              Password must be 6-20 characters with at least one letter, one
              number & one special character.
            </FormHelperText>
          </Box>
        );

      case 1: // Document upload
        const previewStyle = {
          width: "5rem",
          height: "5rem",
          objectFit: "cover",
          borderRadius: "0.5rem",
          border: "1px solid #6c757d",
        };

        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Please upload your restaurant logo and PAN card for verification.
              Maximum file size is 300KB.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 4,
              }}
            >
              {/* Logo Upload */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: { xs: "100%", sm: "45%" },
                }}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="logo"
                    style={previewStyle}
                  />
                ) : (
                  <Icon icon="mdi:image-outline" width={60} />
                )}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="subtitle2">Restaurant Logo</Typography>
                  <label htmlFor="logo-upload">
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<Icon icon="mdi:upload" width={20} />}
                      sx={{ color: "#0d47a1", borderColor: "#0d47a1" }}
                    >
                      {image ? "Change Logo" : "Upload Logo"}
                    </Button>
                  </label>
                </Box>
              </Box>

              {/* Document Upload */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: { xs: "100%", sm: "45%" },
                }}
              >
                {documentFile ? (
                  documentFile.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(documentFile)}
                      alt="document preview"
                      style={previewStyle}
                    />
                  ) : (
                    <Icon icon="mdi:file-document-outline" width={60} />
                  )
                ) : (
                  <Icon icon="mdi:file-document-outline" width={60} />
                )}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="subtitle2">PAN Card</Typography>
                  <label htmlFor="document-upload">
                    <input
                      id="document-upload"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleDocumentChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<Icon icon="mdi:upload" width={20} />}
                      sx={{ color: "#0d47a1", borderColor: "#0d47a1" }}
                    >
                      {documentFile ? "Change Document" : "Upload PAN Card"}
                    </Button>
                  </label>
                </Box>
              </Box>
              <FormHelperText sx={{ color: "error.main" }}>
                {dialogConfig.message}
              </FormHelperText>
            </Box>
          </Box>
        );

      case 2: // OTP verification
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Icon
              icon="mdi:email-check-outline"
              style={{ fontSize: "64px", color: "#0d47a1", marginBottom: 16 }}
            />
            <Typography variant="h6">
              Verification email sent to {formData.email}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Please check your inbox and enter the 6-digit OTP below to verify
              your email.
            </Typography>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 4 }}
            >
              {otp.map((data, index) => (
                <TextField
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  variant="outlined"
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "1.5rem",
                      width: "3rem",
                      height: "3rem",
                    },
                  }}
                  autoFocus={index === 0 && otp[0] === ""}
                />
              ))}
            </Stack>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: 2, px: 4 }}
                onClick={handleVerifyOtp}
                disabled={otp.join("").length !== 6 || verifyLoading}
                endIcon={
                  verifyLoading ? (
                    <Icon icon="svg-spinners:ring-resize" />
                  ) : null
                }
              >
                {verifyLoading ? "Verifying..." : "Verify OTP"}
              </Button>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Didn't receive the code?
                </Typography>
                {countdown > 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Resend in {countdown}min
                  </Typography>
                ) : (
                  <Button
                    onClick={handleResendOtp}
                    disabled={otpLoading}
                    sx={{ textTransform: "none" }}
                    startIcon={
                      otpLoading ? <CircularProgress size={16} /> : null
                    }
                  >
                    Resend OTP
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Icon
              icon="mdi:check-circle"
              color="#4caf50"
              style={{ fontSize: "80px" }}
            />
            <Typography variant="h5" sx={{ my: 2, fontWeight: "bold" }}>
              Registration Successful!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Your restaurant account has been created successfully. Our Tema
              will review your account and let you about your application status
              within next 48hrs.
            </Typography>
            {/* <Button
              variant="contained"
              onClick={() => navigate("/login")}
              startIcon={<Icon icon="mdi:login" />}
              size="large"
            >
              Continue to Login
            </Button> */}
          </Box>
        ) : (
          <>
            <Box
              sx={{
                mt: 4,
                mb: 6,
                p: { xs: 2, sm: 3 },
                border: "1px solid #e0e0e0",
                borderRadius: 2,
              }}
            >
              {renderStepContent(activeStep)}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 0 },
              }}
            >
              <Button
                disabled={activeStep === 0 || activeStep === steps.length - 1}
                onClick={handleBack}
                startIcon={<Icon icon="mdi:arrow-left" />}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? null : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={loading}
                  endIcon={
                    loading ? (
                      <Icon icon="svg-spinners:ring-resize" />
                    ) : (
                      <Icon icon="mdi:arrow-right" />
                    )
                  }
                >
                  {loading ? "Processing..." : "Next"}
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>

      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderTop: dialogConfig.isError
              ? "4px solid #f44336"
              : "4px solid #4caf50",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <Icon
              icon={
                dialogConfig.isError ? "mdi:alert-circle" : "mdi:check-circle"
              }
              color={dialogConfig.isError ? "#f44336" : "#4caf50"}
              width={24}
            />
            {dialogConfig.title}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogConfig.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color={dialogConfig.isError ? "error" : "primary"}
            variant="contained"
            size="small"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
