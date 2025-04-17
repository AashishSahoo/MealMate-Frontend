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
} from "@mui/material";
import moment from "moment";
import {
  Email,
  Phone,
  Place,
  Schedule,
  CheckCircle,
  AccountCircle,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import adminImage from "../../assets/admin.png";

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

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [hoverStates, setHoverStates] = useState({
    avatar: false,
    document: false,
    closeButton: false,
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email;
  const token = userInfo.token;

  const theme = useTheme();
  const status = "active";
  const [userData, setUserData] = useState({
    userName: "",
    role: "",
    email: "",
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
          role: details.roleType,
          email: details.email,
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

  return (
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
        <CardContent>
          <Grid
            container
            spacing={4}
            component={motion.div}
            variants={staggerVariants}
          >
            {/* Enhanced Header Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  position: "relative",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar
                    src={adminImage}
                    sx={{
                      width: 200,
                      height: 200,
                      bgcolor: theme.palette.primary.light,
                      borderRadius: 4,
                      border: "4px solid white",
                    }}
                  >
                    {loading ? (
                      <Skeleton variant="circular" width="100%" height="100%" />
                    ) : (
                      <AccountCircle sx={{ fontSize: 70 }} />
                    )}
                  </Avatar>
                </motion.div>

                <Box sx={{ ml: 4, flexGrow: 1 }}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {loading ? <Skeleton width={220} /> : <>ADMIN</>}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {!loading && (
                      <Chip
                        label={status.toUpperCase()}
                        color={status === "active" ? "success" : "error"}
                        sx={{
                          borderRadius: 4,
                          fontWeight: 700,
                          letterSpacing: 1,
                          px: 2,
                          py: 1,
                          boxShadow: theme.shadows[1],
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* Enhanced Contact Info */}
            <Grid item xs={12} md={6}>
              <motion.div variants={cardVariants}>
                <Card
                  variant="outlined"
                  sx={{
                    height: 200,
                    borderRadius: 3,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      Contact Information
                    </Typography>
                    <List>
                      {[
                        {
                          icon: <Email />,
                          label: "Email",
                          value: userData.email,
                        },
                        {
                          icon: <AdminPanelSettingsIcon />,
                          label: "Role",
                          value: userData.role,
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon
                              sx={{
                                color: theme.palette.primary.main,
                                minWidth: 40,
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={item.label}
                              secondary={
                                loading ? <Skeleton width={180} /> : item.value
                              }
                              primaryTypographyProps={{ fontWeight: 500 }}
                              secondaryTypographyProps={{ variant: "body1" }}
                            />
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Animated Divider */}
            <Grid item xs={12}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </GlowingCard>
  );
};

export default ProfilePage;
