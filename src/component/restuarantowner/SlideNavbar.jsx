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
import { TbHomeFilled } from "react-icons/tb";
import { PiShoppingCartFill } from "react-icons/pi";
import { MdProductionQuantityLimits, MdTableRestaurant } from "react-icons/md";
import { FaHistory, FaChartBar } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import Orderpage from "../../pages/restuarantowner/OrderPage";
import DashboardRestrOwner from "../../pages/restuarantowner/DashboardRestrOwner";
import TableBookingManagement from "../../pages/restuarantowner/TableBookingManagement";
import Products from "../../pages/restuarantowner/Products";
import OrderHistory from "../../pages/restuarantowner/OrderHistory";
import { Avatar, Badge, Button, Collapse } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SalesByCategoryChart from "../../pages/restuarantowner/SalesByCategoryChart";
import SaleByMonth from "../../pages/restuarantowner/SaleByMonth";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { BsGraphUp, BsCalendarMonth } from "react-icons/bs";
import ProfilePage from "../../pages/restuarantowner/ProfilePage";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
  color: "#ffffff",
  boxShadow: "4px 0px 15px rgba(0, 0, 0, 0.2)",
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
  background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
  color: "#ffffff",
  boxShadow: "4px 0px 15px rgba(0, 0, 0, 0.2)",
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
  background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
  color: "#ffffff",
  boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.15)",
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
    background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
    color: "#ffffff",
    boxShadow: "4px 0px 15px rgba(0, 0, 0, 0.2)",
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
  const [salesOpen, setSalesOpen] = useState(false);

  const handleSalesClick = () => {
    setSalesOpen(!salesOpen);
  };

  const menuItems = [
    { text: "Home", icon: <TbHomeFilled size={24} />, id: "Home" },
    { text: "Orders", icon: <PiShoppingCartFill size={24} />, id: "Orders" },
    {
      text: "Products",
      icon: <MdProductionQuantityLimits size={24} />,
      id: "Products",
    },
    {
      text: "Table Booking",
      icon: <MdTableRestaurant size={24} />,
      id: "Table Booking",
    },
    {
      text: "Order History",
      icon: <FaHistory size={24} />,
      id: "Order History",
    },
    // {
    //   text: "Sales Analytics",
    //   icon: <FaChartBar size={24} />,
    //   id: "Sales",
    //   subItems: [
    //     {
    //       text: "By Category",
    //       icon: <BsGraphUp size={20} />,
    //       id: "SalesByCategory",
    //     },
    //     {
    //       text: "By Month",
    //       icon: <BsCalendarMonth size={20} />,
    //       id: "SalesByMonth",
    //     },
    //   ],
    // },
    {
      text: "Sales Analytics",
      icon: <FaChartBar size={24} />,
      id: "SalesByMonth",
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
      borderLeft: "4px solid #64b5f6",
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
              Restaurant Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge> */}
            <Avatar
              sx={{
                bgcolor: "#64b5f6",
                cursor: "pointer", // Add pointer cursor
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.1)" },
              }}
              onClick={() => setMenuData("Profile")} // Add this
            >
              <AccountCircleIcon />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <GiMeal size={32} color="#64b5f6" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Meal Mate
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
                    setMenuData(item.id);
                  }}
                  selected={!item.subItems && menuData === item.id}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: menuData === item.id ? "#64b5f6" : "#ffffff",
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
                    (salesOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: "#F5FDFE",
          pt: "95px",
          pl: "20px",
          pr: "20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        {menuData === "Home" && <DashboardRestrOwner />}
        {menuData === "Orders" && <Orderpage />}
        {menuData === "Products" && <Products />}
        {menuData === "Table Booking" && <TableBookingManagement />}
        {menuData === "Order History" && <OrderHistory />}
        {menuData === "SalesByCategory" && <SalesByCategoryChart />}
        {menuData === "SalesByMonth" && <SaleByMonth />}
        {menuData === "Profile" && <ProfilePage />}
      </Box>
    </Box>
  );
}
