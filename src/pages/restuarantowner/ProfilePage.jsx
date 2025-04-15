import React from "react";
import {
  Avatar,
  Box,
  Button,
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
  styled,
} from "@mui/material";
import {
  Email,
  Phone,
  Place,
  Description,
  CheckCircle,
  Schedule,
  AccountCircle,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

const glow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GlowingCard = styled("div")(({ theme }) => ({
  position: "relative",
  padding: "2px",
  borderRadius: "16px",
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  animation: `${glow} 6s ease infinite`,
  backgroundSize: "200% 200%",
  boxShadow: `0 4px 30px rgba(0, 118, 255, 0.2)`,
}));

const ProfilePage = () => {
  const theme = useTheme();
  const status = "active";
  const documents = ["business_license.pdf", "health_certificate.pdf"];

  const userData = {
    name: "Michael Restaurantieri",
    role: "Restaurant Owner",
    email: "michael@epicureanpalate.com",
    phone: "+1 (555) 123-4567",
    address: "123 Gourmet Lane, Culinary City, CC 98765",
    registrationDate: "2023-03-15T10:00:00",
    approvalDate: "2023-03-20T14:30:00",
    logo: "https://example.com/restaurant-logo.jpg",
  };

  return (
    <GlowingCard>
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={4}>
            {/* Profile Header Section */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <GlowingCard>
                  <Avatar
                    src={userData.logo}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid white",
                      bgcolor: theme.palette.primary.light,
                    }}
                  >
                    <AccountCircle sx={{ fontSize: 60 }} />
                  </Avatar>
                </GlowingCard>
                <Box sx={{ ml: 4 }}>
                  <Typography variant="h3" gutterBottom>
                    {userData.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {userData.role}
                  </Typography>
                  <Chip
                    label={status.toUpperCase()}
                    color={status === "active" ? "success" : "error"}
                    sx={{
                      borderRadius: 1,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Contact Information Section */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    Contact Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                        <Email />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={userData.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone"
                        secondary={userData.phone}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                        <Place />
                      </ListItemIcon>
                      <ListItemText
                        primary="Address"
                        secondary={userData.address}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Documents & Verification Section */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    Documents & Verification
                  </Typography>
                  <List>
                    {documents.map((doc, index) => (
                      <ListItem key={index}>
                        <ListItemIcon
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <Description />
                        </ListItemIcon>
                        <ListItemText primary={doc} />
                        <Button variant="outlined" size="small">
                          Download
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Chip
                      icon={<CheckCircle />}
                      label="Verified Owner"
                      color="success"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Schedule />}
                      label={`Registered: ${new Date(userData.registrationDate).toLocaleDateString()}`}
                      variant="outlined"
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ mt: 2, color: "text.secondary" }}
                  >
                    Approved on:{" "}
                    {new Date(userData.approvalDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary">
                  Edit Profile
                </Button>
                <Button variant="outlined" color="primary">
                  Request Verification
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </GlowingCard>
  );
};

export default ProfilePage;
