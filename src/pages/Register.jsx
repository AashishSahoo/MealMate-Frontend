import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const images = [
  "/assets/slideshow/img7.jpg",
  "/assets/slideshow/img1.jpg",
  "/assets/slideshow/img2.jpg",
  "/assets/slideshow/img3.jpg",
  "/assets/slideshow/img4.jpg",
  "/assets/slideshow/img5.jpg",
  "/assets/slideshow/img6.jpg",
  "/assets/slideshow/img8.jpg",
  "/assets/slideshow/img9.jpg",
];

// Container for background and form
const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "97vh",
  position: "relative",
  overflow: "hidden",
  borderRadius: "25px",
});

// Blurred background overlay
const Background = styled(Box)(({ bgImage }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(2px)",
  zIndex: 1,
}));

// Form container with solid background
const FormContainer = styled(Box)({
  position: "relative",
  background: "#ffffff",
  padding: "2rem",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
  zIndex: 2,
});

const Register = () => {
  const [bgImage, setBgImage] = useState(images[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        title: "Passwords do not match!",
        icon: "warning",
      });
    }

    // Check if terms are agreed
    if (!agreeTerms) {
      return Swal.fire({
        title: "Please agree to the terms",
        icon: "warning",
      });
    }

    try {
      const response = await fetch(
        "http://localhost:4000/Backend/MealMate/register",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Account Created",
          icon: "success",
        }).then(() => {
          Navigate("/login");
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
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        setBgImage(images[newIndex]);
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Background bgImage={bgImage} />
      <FormContainer>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          CREATE ACCOUNT
        </Typography>
        <FormControl component="form" fullWidth>
          <FormGroup>
            <TextField
              fullWidth
              required
              margin="normal"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Confirm password"
              type="password"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to all statements in{" "}
                  <Link href="#">Terms of Service</Link>
                </Typography>
              }
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                marginTop: 2,
                padding: "10px",
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
              }}
              onClick={handleSubmit}
            >
              SIGN UP
            </Button>
          </FormGroup>
        </FormControl>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account? <Link href="/login">Login here</Link>
        </Typography>
      </FormContainer>
    </Container>
  );
};

export default Register;

// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Link,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import logo3 from "/assets/logo3.png";
// import Slideshow from "../component/Slideshow";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import CircularProgress from "@mui/material/CircularProgress";

// const Login = () => {
//   const [roleType, setRoleType] = useState("");
//   const [loading, setLoading] = useState();

//   const handleRoleChange = (event) => {
//     setRoleType(event.target.value);
//   };

//   const [formData, setFormData] = {
//     email: "",
//     password: "",
//     roleType: "",
//   };
//   const navigate = useNavigate(); // This is wrong

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:4000/Backend/MealMate/login",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         Swal.fire({
//           title: "Login successful",
//           icon: "success",
//         }).then(() => {
//           navigate("/home");
//         });
//       } else {
//         Swal.fire({
//           title: "Invalide Credentials",
//           icon: error,
//         });
//       }
//     } catch (error) {
//       console.error("Error during loging :", error);
//       Swal.fire({
//         title: "Network error",
//         text: "Please try again later",
//         icon: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         height: "97vh",
//         width: "99vw",
//         overflow: "hidden", // Removes scrollbars
//       }}
//     >
//       {/* Left Side - Login Form */}

//       <Box
//         sx={{
//           width: "30%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#ffffffcc",
//           padding: "10px",
//         }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             padding: "50px 40px",
//             maxWidth: "400px",
//             width: "100%",
//             textAlign: "center",
//             borderRadius: "12px",
//             minHeight: "88%", // Set minimum height for expansion
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           <form onSubmit={handleSubmit}>
//             <Box
//               component="img"
//               src={logo3}
//               alt="Application Logo"
//               sx={{
//                 width: "300px",
//                 height: "300px",
//                 marginBottom: "0px",
//                 ml: "20px",
//               }}
//             />
//             <Typography variant="h4" gutterBottom>
//               Welcome Back
//             </Typography>

//             {/* Role Selection */}
//             <FormControl fullWidth sx={{ marginBottom: "20px" }}>
//               <InputLabel id="role-select-label">Select Role</InputLabel>
//               <Select
//                 labelId="role-select-label"
//                 value={roleType}
//                 onChange={handleRoleChange}
//                 label="Select Role"
//               >
//                 <MenuItem value="admin">Admin</MenuItem>
//                 <MenuItem value="restro-owner">Restaurant Owner</MenuItem>
//                 <MenuItem value="user">User</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               label="Email Address"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               sx={{ marginBottom: "20px" }}
//             />
//             <TextField
//               label="Password"
//               variant="outlined"
//               type="password"
//               fullWidth
//               margin="normal"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               sx={{ marginBottom: "30px" }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{
//                 padding: "12px 0",
//                 backgroundColor: "#673ab7",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//               }}
//               type="submit"
//             >
//               Sign In
//             </Button>
//             <Typography
//               variant="body2"
//               sx={{ color: "#673ab7", marginTop: "15px" }}
//             >
//               Forgot password?
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{ color: "#673ab7", marginTop: "15px" }}
//             >
//               {roleType === "restro-owner" ? (
//                 <Link
//                   sx={{ textDecoration: "none", color: "#673ab7" }}
//                   href="/register/resto-owner"
//                 >
//                   {" "}
//                   Don't have an account? Sign up here
//                 </Link>
//               ) : roleType === "user" ? (
//                 <Link
//                   sx={{ textDecoration: "none", color: "#673ab7" }}
//                   href="/register/customer"
//                 >
//                   {" "}
//                   Don't have an account? Sign up here
//                 </Link>
//               ) : roleType === "admin" ? (
//                 <></>
//               ) : (
//                 <span style={{ color: "red" }}> Please select a role</span>
//               )}
//             </Typography>
//           </form>
//         </Paper>
//       </Box>

//       {/* Right Side - Custom Slideshow */}
//       <Box
//         sx={{
//           width: "70%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           position: "relative",
//           borderRadius: "12px",
//         }}
//       >
//         <Slideshow />
//       </Box>
//     </Box>
//   );
// };

// export default Login;
