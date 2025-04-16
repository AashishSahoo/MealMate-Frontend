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
            <Grid item xs={12}>
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
                  <GlowingCard
                    animate={{ scale: hoverStates.avatar ? 1.02 : 1 }}
                    onHoverStart={() =>
                      setHoverStates((s) => ({ ...s, avatar: true }))
                    }
                    onHoverEnd={() =>
                      setHoverStates((s) => ({ ...s, avatar: false }))
                    }
                  >
                    <Avatar
                      src={userData.logo}
                      sx={{
                        width: 140,
                        height: 140,
                        bgcolor: theme.palette.primary.light,
                        borderRadius: 4,
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
                        <AccountCircle sx={{ fontSize: 70 }} />
                      )}
                    </Avatar>
                  </GlowingCard>
                </motion.div>

                <Box sx={{ ml: 4, flexGrow: 1 }}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {loading ? (
                      <Skeleton width={220} />
                    ) : (
                      <>
                        {userData.restroName}
                        <Chip
                          icon={<AdminPanelSettingsIcon />}
                          label="Verified Owner"
                          color="success"
                          variant="outlined"
                          sx={{
                            ml: 2,
                            transform: "translateY(-3px)",
                            borderWidth: 2,
                            "& .MuiChip-icon": { fontSize: 20 },
                          }}
                        />
                      </>
                    )}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      {loading ? <Skeleton width={150} /> : userData.role}
                    </Typography>
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

            {/* Enhanced Contact Info */}
            <Grid item xs={12} md={6}>
              <motion.div variants={cardVariants}>
                <Card
                  variant="outlined"
                  sx={{
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
                          icon: <AccountBoxIcon />,
                          label: "User Name",
                          value: userData.userName,
                        },
                        {
                          icon: <Email />,
                          label: "Email",
                          value: userData.email,
                        },
                        {
                          icon: <Phone />,
                          label: "Phone",
                          value: userData.phone,
                        },
                        {
                          icon: <Place />,
                          label: "Address",
                          value: userData.address,
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

            {/* Enhanced Documents Section */}
            <Grid item xs={12} md={6}>
              <motion.div variants={cardVariants}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Documents & Verification
                    </Typography>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() =>
                        setHoverStates((s) => ({ ...s, document: true }))
                      }
                      onHoverEnd={() =>
                        setHoverStates((s) => ({ ...s, document: false }))
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          p: 2,
                          borderRadius: 2,
                          bgcolor: hoverStates.document
                            ? "action.hover"
                            : "transparent",
                          transition: "background-color 0.3s",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setCurrentImage(userData.document);
                          setViewImageDialogOpen(true);
                        }}
                      >
                        <Box
                          sx={{
                            width: 120,
                            height: 120,
                            borderRadius: 2,
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: hoverStates.document ? 3 : 1,
                            transition: "all 0.3s",
                          }}
                        >
                          {loading ? (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height="100%"
                            />
                          ) : (
                            <img
                              src={userData.document}
                              alt="Document"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="body1" sx={{ flex: 1 }}>
                          Uploaded ID Proof at the time of registration
                        </Typography>
                      </Box>
                    </motion.div>

                    <Box
                      sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}
                    >
                      {[
                        {
                          icon: <Schedule />,
                          label: "Registered",
                          value: userData.registrationDate,
                          color: "default",
                        },
                        {
                          icon: <CheckCircle />,
                          label: "Approved",
                          value: userData.approvalDate,
                          color: "success",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Chip
                            icon={item.icon}
                            label={`${item.label}: ${moment(item.value).format("D/M/YYYY, HH:mm")}`}
                            color={item.color}
                            variant="outlined"
                            sx={{
                              px: 2,
                              py: 1,
                              borderRadius: 2,
                              borderWidth: 2,
                              "& .MuiChip-icon": { fontSize: 20 },
                            }}
                          />
                        </motion.div>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Enhanced Image Dialog */}
      <AnimatePresence>
        {viewImageDialogOpen && (
          <Dialog
            open={viewImageDialogOpen}
            onClose={() => setViewImageDialogOpen(false)}
            maxWidth="md"
            PaperProps={{
              sx: {
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DialogTitle
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                ID Proof Document
                <IconButton
                  onClick={() => setViewImageDialogOpen(false)}
                  sx={{
                    color: "#0d47a1",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CgClose style={{ fontSize: "28px" }} />
                  </motion.div>
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ p: 4 }}>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    component="img"
                    src={currentImage}
                    alt="img"
                    sx={{
                      width: "100%",
                      maxHeight: "70vh",
                      objectFit: "contain",
                      borderRadius: 2,
                    }}
                  />
                </motion.div>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </GlowingCard>
  );
};

export default ProfilePage;
