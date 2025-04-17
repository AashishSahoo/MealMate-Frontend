import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Divider,
  Paper,
} from "@mui/material";
import moment from "moment";
import {
  Email,
  Phone,
  Place,
  Schedule,
  CheckCircle,
  AccountCircle,
  VerifiedUser,
  Badge,
  CalendarToday,
  Business,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import customerImage from "../../assets/customer.png";

// Enhanced Animations
const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(33, 150, 243, 0.4); }
  50% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.6); }
  100% { box-shadow: 0 0 10px rgba(33, 150, 243, 0.4); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GlowingCard = styled(motion.div)(({ theme }) => ({
  position: "relative",
  padding: "2px",
  borderRadius: "24px",
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  animation: `${gradientFlow} 8s ease infinite`,
  backgroundSize: "200% 200%",
}));

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerVariants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const ProfilePageCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [viewImageDialogOpen, setViewImageDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email;
  const token = userInfo.token;

  const theme = useTheme();
  const status = "active";
  const [userData, setUserData] = useState({
    userName: "",
    restroName: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    registrationDate: "",
    approvalDate: "",
    logo: "",
    document: "",
  });

  const fetchUserProfileDetails = async () => {
    try {
      const response = await axios.get(`/api/users/user-profile/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        const details = response?.data?.resultData;
        setUserData({
          userName: `${details.firstName} ${details.lastName}`,
          restroName: details.restaurantName,
          role: details.roleType,
          email: details.email,
          phone: details.mobileNo,
          address: details.address,
          registrationDate: details.registrationTime,
          approvalDate: details.updateStatusTime,
          logo: details.appLogoUrl,
          document: details.documentUrl,
        });
      }
    } catch (error) {
      console.log("Error fetching profile details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfileDetails();
  }, []);

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
    setViewImageDialogOpen(true);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minWidth: 1200, margin: "0 auto" }}>
      <GlowingCard
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 3,
            background: "linear-gradient(145deg, #f8faff, #ffffff)",
            overflow: "visible",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {/* Profile Header Section */}
            <Grid
              container
              spacing={4}
              component={motion.div}
              variants={staggerVariants}
            >
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    gap: 3,
                    mb: 3,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar
                      src={customerImage}
                      sx={{
                        width: 170,
                        height: 170,
                        bgcolor: theme.palette.primary.light,
                        borderRadius: 3,
                        border: "4px solid white",
                      }}
                    >
                      {loading ? (
                        <Skeleton
                          variant="circular"
                          width="100%"
                          height="100%"
                        />
                      ) : (
                        <AccountCircle sx={{ fontSize: 60 }} />
                      )}
                    </Avatar>
                  </motion.div>

                  <Box
                    sx={{
                      flexGrow: 1,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        {loading ? <Skeleton width={220} /> : userData.userName}
                      </Typography>

                      {!loading && (
                        <Chip
                          icon={<VerifiedUser />}
                          label="Verified"
                          color="success"
                          variant="outlined"
                          sx={{
                            borderWidth: 2,
                            height: 32,
                            "& .MuiChip-icon": { fontSize: 18 },
                          }}
                        />
                      )}
                    </Box>

                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {loading ? <Skeleton width={180} /> : userData.restroName}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: { xs: "center", sm: "flex-start" },
                      }}
                    >
                      <Chip
                        label={status.toUpperCase()}
                        color={status === "active" ? "success" : "error"}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          letterSpacing: 0.5,
                          px: 1.5,
                          py: 0.5,
                        }}
                      />
                      <Chip
                        icon={<Badge />}
                        label={userData.role}
                        color="primary"
                        size="small"
                        variant="outlined"
                        sx={{
                          fontWeight: 600,
                          px: 1.5,
                          py: 0.5,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Main Content Sections */}
              <Grid item xs={12} md={6}>
                <motion.div variants={cardVariants}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      background: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <List disablePadding>
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemIcon
                          sx={{
                            minWidth: 40,
                            color: theme.palette.primary.main,
                          }}
                        >
                          <Email />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email"
                          secondary={
                            loading ? <Skeleton width={180} /> : userData.email
                          }
                          secondaryTypographyProps={{ variant: "body1" }}
                        />
                      </ListItem>

                      <Divider component="li" sx={{ my: 1 }} />

                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemIcon
                          sx={{
                            minWidth: 40,
                            color: theme.palette.primary.main,
                          }}
                        >
                          <Phone />
                        </ListItemIcon>
                        <ListItemText
                          primary="Phone"
                          secondary={
                            loading ? <Skeleton width={150} /> : userData.phone
                          }
                          secondaryTypographyProps={{ variant: "body1" }}
                        />
                      </ListItem>

                      <Divider component="li" sx={{ my: 1 }} />

                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemIcon
                          sx={{
                            minWidth: 40,
                            color: theme.palette.primary.main,
                          }}
                        >
                          <Place />
                        </ListItemIcon>
                        <ListItemText
                          primary="Address"
                          secondary={
                            loading ? (
                              <Skeleton width={200} />
                            ) : (
                              userData.address
                            )
                          }
                          secondaryTypographyProps={{ variant: "body1" }}
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div variants={cardVariants}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      background: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CalendarToday
                        sx={{ color: theme.palette.primary.main }}
                      />
                      Registration Details
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Registration Date
                        </Typography>
                        <Typography variant="body1">
                          {loading ? (
                            <Skeleton width={180} />
                          ) : (
                            moment(userData.registrationDate).format(
                              "MMMM Do, YYYY [at] h:mm a"
                            )
                          )}
                        </Typography>
                      </Box>

                      <Divider />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </GlowingCard>
    </Box>
  );
};

export default ProfilePageCustomer;
