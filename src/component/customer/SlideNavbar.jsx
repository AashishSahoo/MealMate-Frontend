import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import HistoryIcon from "@mui/icons-material/History";
import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Applogo from "../../assets/Applogo.png";
import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
  color: "#ffffff",
  boxShadow: "4px 0px 15px rgba(0, 0, 0, 0.3)",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
  color: "#ffffff",
  boxShadow: "4px 0px 15px rgba(0, 0, 0, 0.3)",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  color: "#ffffff",
  minHeight: 70,
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
  color: "#ffffff",
  boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.2)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuItemStyle = {
  margin: "4px 8px",
  borderRadius: "10px",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    transform: "translateX(5px)",
    transition: "all 0.3s ease",
  },
  "&.Mui-selected": {
    background: "rgba(255, 255, 255, 0.15)",
    borderLeft: "4px solid #E6E6FA",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.2)",
    },
  },
};

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "dashboard" },
    { text: "Menu", icon: <RestaurantMenuIcon />, path: "menu" },
    {
      text: "Cart",
      icon: <Icon icon="ph:shopping-cart-simple-fill" width="24" height="24" />,
      path: "cart",
    },
    {
      text: "Table Booking",
      icon: <TableRestaurantIcon />,
      path: "table-booking",
    },
    { text: "Order History", icon: <HistoryIcon />, path: "order-history" },
    {
      text: "AI Assistance",
      icon: <Icon icon="hugeicons:ai-network" width="24" height="24" />,
      path: "chatbot",
    },
  ];

  const isActive = (path) => {
    return matchPath(
      { path: `/${location.pathname.split("/")[1]}/${path}` },
      location.pathname
    );
  };

  return (
    <Box sx={{ display: "flex", background: "#f8f9fa", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!open && (
              <IconButton
                color="inherit"
                onClick={() => setOpen(!open)}
                edge="start"
                sx={{
                  marginRight: 2,
                  "&:hover": { background: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 600 }}
            >
              MealMate Customer
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={() => navigate("/customer/profile")}
          >
            <Icon
              icon="material-symbols:account-circle"
              width="30"
              height="30"
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Box
                component="img"
                src={Applogo}
                alt="App Logo"
                sx={{ height: "3.5rem", width: "auto", marginLeft: "0.5rem" }}
              />
            </Box>
          )}
          <IconButton onClick={() => setOpen(false)} sx={{ color: "#ffffff" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List sx={{ mt: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              disablePadding
              sx={{ display: "block", mb: 1 }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                  ...menuItemStyle,
                }}
                onClick={() => navigate(item.path)}
                selected={!!isActive(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive(item.path) ? "#E6E6FA" : "#ffffff",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ marginTop: "auto" }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: open ? "initial" : "center",
                ...menuItemStyle,
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <Icon icon="solar:logout-3-bold" width="24" height="24" />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: "#EEF1F0",
          pt: "80px",
          pl: "20px",
          pr: "20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
