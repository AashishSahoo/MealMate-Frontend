import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import { Avatar, Badge, Collapse } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardAdmin from "../../pages/admin/DashboardAdmin";
import OrderAdmin from "../../pages/admin/OrderAdmin";
import Onboard from "../../pages/admin/Onboard";
import UserList from "../../pages/admin/UserList";
import RestroOwnerList from "../../pages/admin/RestroOwnerList";
import RestrauntOwnerReport from "../../pages/admin/RestrauntOwnerReport";
import UsersOrderHistory from "../../pages/admin/UsersOrderHistory";
import Category from "../../pages/admin/Category";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",
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
  background: "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",
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
  background: "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",
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
  "& .MuiPaper-root": {
    background: "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",
    color: "#ffffff",
    boxShadow: "4px 0px 15px rgba(0, 0, 0, 0.3)",
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState("Home");
  const [reportOpen, setReportOpen] = useState(false);

  const handleReportClick = () => {
    setReportOpen(!reportOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, id: "Home" },
    { text: "Onboard", icon: <ControlPointDuplicateIcon />, id: "Onboard" },
    { text: "Order", icon: <ShoppingBagIcon />, id: "Order" },
    { text: "UserList", icon: <ListAltIcon />, id: "UserList" },
    { text: "RestroOwnerList", icon: <ListAltIcon />, id: "RestroOwnerList" },
    { text: "Category", icon: <CategoryIcon />, id: "Category" },
    {
      text: "Reports",
      icon: <AssessmentIcon />,
      id: "Reports",
      subItems: [
        {
          text: "Users OrderHistory",
          icon: <SsidChartIcon />,
          id: "Users OrderHistory",
        },
        {
          text: "Restraunt Owner Report",
          icon: <AlignVerticalBottomIcon />,
          id: "Restraunt Owner Report",
        },
      ],
    },
  ];

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
      borderLeft: "4px solid #95A5A6",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.2)",
      },
    },
  };

  return (
    <Box sx={{ display: "flex", background: "#f8f9fa", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={() => setOpen(!open)}
              edge="start"
              sx={{
                marginRight: 2,
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 600 }}
            >
              MealMate Admin
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
            <Avatar sx={{ bgcolor: "#95A5A6" }}>
              <AccountCircleIcon />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Admin Panel
              </Typography>
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
            <React.Fragment key={item.text}>
              <ListItem disablePadding sx={{ display: "block", mb: 1 }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                    ...menuItemStyle,
                  }}
                  onClick={() => {
                    if (item.subItems) {
                      handleReportClick();
                    } else {
                      setMenuData(item.id);
                    }
                  }}
                  selected={!item.subItems && menuData === item.id}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: menuData === item.id ? "#95A5A6" : "#ffffff",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      "& .MuiTypography-root": {
                        fontWeight: 500,
                        fontSize: "0.95rem",
                      },
                    }}
                  />
                  {item.subItems &&
                    open &&
                    (reportOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {item.subItems && (
                <Collapse in={reportOpen && open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        key={subItem.text}
                        sx={{
                          pl: 4,
                          ...menuItemStyle,
                        }}
                        onClick={() => setMenuData(subItem.id)}
                        selected={menuData === subItem.id}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 3,
                            color:
                              menuData === subItem.id ? "#95A5A6" : "#ffffff",
                          }}
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={subItem.text}
                          sx={{
                            "& .MuiTypography-root": {
                              fontWeight: 500,
                              fontSize: "0.9rem",
                            },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
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
        {menuData === "Home" && <DashboardAdmin />}
        {menuData === "Order" && <OrderAdmin />}
        {menuData === "Onboard" && <Onboard />}
        {menuData === "UserList" && <UserList />}
        {menuData === "RestroOwnerList" && <RestroOwnerList />}
        {menuData === "Users OrderHistory" && <UsersOrderHistory />}
        {menuData === "Restraunt Owner Report" && <RestrauntOwnerReport />}
        {menuData === "Category" && <Category />}
      </Box>
    </Box>
  );
}
