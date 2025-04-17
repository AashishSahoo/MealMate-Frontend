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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import OrdersGraph from "../../component/admin/OrdersGraph";
import TopRestaurantOwnersChart from "../../component/admin/TopRestaurantOwnersChart";
import TrendingFoodItem from "../../component/admin/TrendingFoodItem";
import axios from "axios";
import { useSelector } from "react-redux";
import Groups3Icon from "@mui/icons-material/Groups3";
import Groups2Icon from "@mui/icons-material/Groups2";
import GroupsIcon from "@mui/icons-material/Groups";
import CategoryIcon from "@mui/icons-material/Category";
import Skeleton from "@mui/material/Skeleton";

const StatCard = ({
  title,
  color,
  data,
  loading,
  filter,
  handleMenuOpen,
  icon,
}) => {
  const IconComponent = icon;

  return (
    <Card
      sx={{
        background: color,
        color: "white",
        borderRadius: 2,
        padding: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        position: "relative",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconComponent sx={{ color: "white" }} />
      </Box>
      <CardContent sx={{ padding: 0, paddingTop: 1 }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        {loading ? (
          <CircularProgress sx={{ color: "white", marginTop: 1 }} />
        ) : (
          <Typography
            variant="h4"
            component="div"
            sx={{ marginTop: 1, fontWeight: "bold" }}
          >
            {data.totalUsers}
          </Typography>
        )}
        <Typography variant="body2" component="div" sx={{ marginTop: 1 }}>
          {filter}
        </Typography>
      </CardContent>
      <IconButton
        sx={{ position: "absolute", bottom: 16, right: 16, color: "white" }}
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
    </Card>
  );
};

const DashboardAdmin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("Last Month");
  const [data, setData] = useState({ totalUsers: 0, filter: "Last Month" });
  const [loading, setLoading] = useState(true);
  const [skeletonLoader, setSkeletonLoader] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [restroOwnerCount, setRestroOwnerCount] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const [monthlyOrders, setMonthlOrders] = useState([]);
  const [topRestro, setTopRestro] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [categoryCount, setCategoryCount] = useState(0);

  const open = Boolean(anchorEl);

  const fetchUserCount = async () => {
    try {
      const response = await axios.get(`/api/users/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        const count = response?.data?.resultData;
        // setUserCount(count.length);
        setUserCount(response.data.resultData.length);
      }
    } catch (error) {
      console.log("error fetching  user list");
    } finally {
      setLoading(false);
    }
  };

  const fetchRestroOwnerCount = async () => {
    try {
      const response = await axios.get(`/api/users/restaurant-owners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        setRestroOwnerCount(response?.data?.resultData.length);
      }
    } catch (error) {
      console.log("error fetching the restro owner list");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAnalysisStats = async () => {
    try {
      const response = await axios.get(`/api/orders/dashboard-overview`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        const data = response?.data?.resultData;

        setMonthlOrders(data.monthlyOrders);
        setTopItems(data.topSellingItems);
        setTopRestro(data.topRestaurants);
      }
    } catch (error) {
      console.log("Error getting stats for admin :", error);
    } finally {
      setSkeletonLoader(false);
    }
  };

  const fetchCategoryList = async (req, res) => {
    try {
      const response = await axios.get(`/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        setCategoryCount(response?.data?.resultData.length);
      }
    } catch (error) {
      console.log("Error fetching Category List : ", error);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchRestroOwnerCount();
    fetchAllAnalysisStats();
    fetchCategoryList();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          {skeletonLoader ? (
            <Card sx={{ height: 150 }}>
              <Skeleton
                sx={{ bgcolor: "#6B73FF" }}
                variant="rectangular"
                width="100%"
                height="100%"
              />
            </Card>
          ) : (
            <StatCard
              title="Total Customer"
              color="linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)"
              // data={userCount}
              data={{ totalUsers: userCount }}
              loading={loading}
              filter={filter}
              handleMenuOpen={handleMenuOpen}
              icon={Groups3Icon}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {skeletonLoader ? (
            <Card sx={{ height: 150 }}>
              <Skeleton
                sx={{ bgcolor: "#FF6B6B" }}
                variant="rectangular"
                width="100%"
                height="100%"
              />
            </Card>
          ) : (
            <StatCard
              title="Total Restaurant Owner"
              color="linear-gradient(135deg, #FF6B6B 0%, #FF0000 100%)"
              data={{ totalUsers: restroOwnerCount }}
              loading={loading}
              filter={filter}
              handleMenuOpen={handleMenuOpen}
              icon={Groups2Icon}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {skeletonLoader ? (
            <Card sx={{ height: 150 }}>
              <Skeleton
                sx={{ bgcolor: "#36D1DC" }}
                variant="rectangular"
                width="100%"
                height="100%"
              />
            </Card>
          ) : (
            <StatCard
              title="Total Categories"
              color="linear-gradient(135deg, #36D1DC 0%, #5B86E5 100%)"
              data={{ totalUsers: categoryCount }}
              loading={loading}
              filter={filter}
              handleMenuOpen={handleMenuOpen}
              icon={CategoryIcon}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {skeletonLoader ? (
            <Card sx={{ height: 150 }}>
              <Skeleton
                sx={{ bgcolor: "#38ef7d" }}
                variant="rectangular"
                width="100%"
                height="100%"
              />
            </Card>
          ) : (
            <StatCard
              title="Total Users"
              color="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
              data={{ totalUsers: userCount + restroOwnerCount }}
              loading={loading}
              filter={filter}
              handleMenuOpen={handleMenuOpen}
              icon={GroupsIcon}
            />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ padding: 3 }}>
        <Grid item xs={12} md={5}>
          {skeletonLoader ? (
            <Skeleton
              sx={{ bgcolor: "rgba(153, 102, 255, 1)" }}
              variant="rectangular"
              height="500px"
            />
          ) : (
            <OrdersGraph
              orderHistory={monthlyOrders}
              style={{ flexGrow: 1, height: "100%", width: "100%" }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {skeletonLoader ? (
            <Skeleton
              sx={{ bgcolor: "rgba(255, 206, 86, 1)" }}
              variant="rectangular"
              height="500px"
            />
          ) : (
            <TopRestaurantOwnersChart trendingRestro={topRestro} />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {skeletonLoader ? (
            <Skeleton
              sx={{ bgcolor: "#2E7D32" }}
              variant="rectangular"
              height="500px"
            />
          ) : (
            <TrendingFoodItem trendingItems={topItems} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardAdmin;
