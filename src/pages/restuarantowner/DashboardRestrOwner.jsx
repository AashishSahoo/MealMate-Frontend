import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
  CircularProgress,
  Paper,
  Fade,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IncomingOrdersList from "../../component/restuarantowner/IncomingOrdersList";
import TableBookingsList from "../../component/restuarantowner/TableBookingList";
import SalesRadarChart from "../../component/restuarantowner/SalesRadarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import axios from "axios";
import { CardSkeleton } from "../../component/CardSkeleton";
import { Skeleton } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const DashboardRestrOwner = () => {
  const [orders, setOrders] = useState([]);
  const [tableBookings, setTableBookings] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email || null;
  const token = userInfo.token || null;
  const userId = userInfo.userId || null;

  const initialFilters = {
    totalOrders: "Last Month",
    totalRevenue: "Last Month",
    pendingOrders: "Last Month",
    acceptedOrders: "Last Month",
    declinedOrders: "Last Month",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    acceptedOrders: 0,
    declinedOrders: 0,
  });

  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEls, setAnchorEls] = useState({});

  const cardConfig = [
    {
      title: "Total Orders",
      color: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
      icon: <ShoppingCartIcon />,
      dataKey: "totalOrders",
    },
    {
      title: "Total Revenue",
      color: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
      icon: <CurrencyRupeeIcon />,
      dataKey: "totalRevenue",
    },
    {
      title: "Pending Orders",
      color: "linear-gradient(135deg, #FFB88C 0%, #DE6262 100%)",
      icon: <PendingActionsIcon />,
      dataKey: "pendingOrders",
    },
    {
      title: "Accepted Orders",
      color: "linear-gradient(135deg, #56AB2F 0%, #A8E063 100%)",
      icon: <CheckCircleIcon />,
      dataKey: "acceptedOrders",
    },
    {
      title: "Declined Orders",
      color: "linear-gradient(135deg, #CB356B 0%, #BD3F32 100%)",
      icon: <CancelIcon />,
      dataKey: "declinedOrders",
    },
  ];

  const handleMenuOpen = (event, key) => {
    setAnchorEls((prev) => ({ ...prev, [key]: event.currentTarget }));
  };

  const handleMenuClose = (key) => {
    setAnchorEls((prev) => ({ ...prev, [key]: null }));
  };

  const fetchTableBookings = async () => {
    console.log("userID : ", userId);
    try {
      const response = await axios.get(
        `/api/tables/get-all-bookings-restuarant/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response?.data?.resultCode === 0) {
        setTableBookings(response?.data?.resultData);
      }
    } catch (error) {
      console.log("Error fetching table bookings:", error);
    }
  };

  const fetchAllDetails = async (req, res) => {
    setLoading(true);
    try {
      const response = await axios.get(`api/orders/dashboardStat/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.resultCode === 0) {
        const resp = response?.data?.resultData;
        data.acceptedOrders = resp.acceptedOrders;
        data.declinedOrders = resp.rejectedOrders;
        data.pendingOrders = resp.pendingOrders;
        data.totalRevenue = resp.totalRevenue;
        data.totalOrders = resp.totalOrders;

        setSalesData(resp.salesByCategory);
        await fetchAllIncomingOrders();
        await fetchTableBookings();
      }
    } catch (error) {
      console.log("Error fetching all details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllIncomingOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/orders/getAllIncomingOrdersByRestaurant/${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response?.data?.resultCode === 0) {
        setOrders(response.data.resultData);
        const newButtonState = {};
        response.data.resultData.forEach((order) => {
          newButtonState[order._id] = {
            acceptLoading: false,
            rejectLoading: false,
            disabled: order.status !== "processing",
          };
        });
        setButtonState(newButtonState);
      }
    } catch (error) {
      console.error("Error fetching incoming orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Object.keys(initialFilters).forEach((key) => fetchData(filters[key], key));
    fetchAllDetails();
  }, []);

  return (
    <>
      {/* <Box sx={{ height: "2rem", backgroundColor: "#F5FDFE" }}></Box> */}
      <Box sx={{}}>
        <Fade in timeout={800}>
          <Grid container spacing={3}>
            {cardConfig.map((card) => (
              <Grid item xs={12} sm={6} md={2.4} key={card.title}>
                <Card
                  elevation={8}
                  sx={{
                    background: card.color,
                    color: "white",
                    borderRadius: 4,
                    height: "8.4rem",
                    overflow: "hidden",
                    position: "relative",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      background: "rgba(255,255,255,0.1)",
                      transform: "translateX(-100%)",
                      transition: "transform 0.5s ease-in-out",
                    },
                    "&:hover::before": {
                      transform: "translateX(100%)",
                    },
                  }}
                >
                  <TimelineIcon
                    sx={{
                      position: "absolute",
                      right: -20,
                      bottom: -20,
                      fontSize: "8rem",
                      opacity: 0.2,
                      transform: "rotate(-15deg)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {card.icon}
                  </Box>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                    {loading ? (
                      <CircularProgress
                        size={20}
                        thickness={4}
                        sx={{ color: "rgba(255,255,255,0.9)" }}
                      />
                    ) : (
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {Math.round(data[card.dataKey])}
                      </Typography>
                    )}
                  </CardContent>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, card.dataKey)}
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                      color: "white",
                      "&:hover": { background: "rgba(255,255,255,0.2)" },
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEls[card.dataKey]}
                    open={Boolean(anchorEls[card.dataKey])}
                    onClose={() => handleMenuClose(card.dataKey)}
                    PaperProps={{
                      elevation: 3,
                      sx: { borderRadius: 2, minWidth: 150 },
                    }}
                  >
                    <MenuItem
                    // onClick={() =>
                    //   handleFilterChange("Last Month", card.dataKey)
                    // }
                    >
                      Last Month
                    </MenuItem>
                    <MenuItem
                    // onClick={() =>
                    //   handleFilterChange("Last Week", card.dataKey)
                    // }
                    >
                      Last Week
                    </MenuItem>
                  </Menu>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fade>

        <Box sx={{ mt: 6 }}>
          <Fade in timeout={1000}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={4}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    height: "100%",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {loading ? (
                    <CardSkeleton />
                  ) : (
                    <IncomingOrdersList IncomingOrdersList={orders} />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={4}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    height: "100%",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {loading ? (
                    <CardSkeleton />
                  ) : (
                    <TableBookingsList IncomingBookingList={tableBookings} />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={4}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    height: "100%",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {" "}
                  {loading ? (
                    <CardSkeleton />
                  ) : (
                    <SalesRadarChart dataset={salesData} />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        </Box>
      </Box>
    </>
  );
};

export default DashboardRestrOwner;
