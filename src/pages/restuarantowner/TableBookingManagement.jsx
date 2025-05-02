import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  FormHelperText,
  Chip,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Delete,
  RestaurantMenu,
  Warning,
  CheckCircle,
} from "@mui/icons-material";
import axios from "axios";

import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import table1 from "/assets/table2.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Skeleton from "@mui/material/Skeleton";
import moment from "moment";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  minWidth: 120,
  color: theme.palette.text.secondary,
  "&.Mui-selected": {
    color: "#1a237e",
  },
}));

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#1a237e",
    height: 3,
  },
});

function TableBookingManagement() {
  // Date formatting function
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const [openDialogForDelete, setOpenDialogForDelete] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  // Extract fields from userInfo
  const email = userInfo.email;
  const token = userInfo.token;
  const userId = userInfo.userId;

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date())); // store as string
  const [activeTab, setActiveTab] = useState(0);
  const [tables, setTables] = useState([]);
  const [tableInput, setTableInput] = useState({
    tableNumber: "",
    capacity: "",
    timeslot: "",
    status: "",
    bookingCharges: "",
    email: email,
    bookingDate: selectedDate,
  });

  const [bookingHistory, setBookingHistory] = useState([]);

  const [LimitDialogOpen, setLimitDialogOpen] = useState(false);
  const [DuplicateDialogOpen, setDuplicateDialogOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingTable, setEditingTable] = useState(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openSuccessDialogForUpdate, setOpenSuccessDialogForUpdate] =
    useState(false);

  const [rows, setRows] = useState([]);

  const [tableListLoader, setTableListLoader] = useState(true);
  const [tableToDelete, setTableToDelete] = useState("");
  const [openSuccessDialogForDelete, setOpenSuccessDialogForDelete] =
    useState(false);
  const [tableBookings, setTableBookings] = useState([]);

  // const { token, email } = useSelector((state) => state.auth);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    // setOwnerToDelete(null);
  };

  const handleInputChange = (field, value) => {
    setTableInput({ ...tableInput, [field]: value });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDialogForDelete(false);
  };

  const handleCloseSuccessDeleteDialog = () => {
    setOpenSuccessDialogForDelete(false);
  };

  const TIME_SLOTS = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
  ];

  const MAX_TABLES = 6;

  // Updated handleAddTable function
  const handleAddTable = async () => {
    if (
      tableInput.tableNumber &&
      tableInput.capacity &&
      tableInput.timeslot &&
      tableInput.status &&
      tableInput.bookingCharges &&
      // tableInput.email &&
      tableInput.bookingDate
    ) {
      try {
        const data = {
          tableNumber: tableInput.tableNumber,
          capacity: tableInput.capacity,
          timeslot: tableInput.timeslot,
          status: tableInput.status,
          bookingCharges: tableInput.bookingCharges,
          email: email,
          bookingDate: tableInput.bookingDate,
        };
        if (editingTable !== null) {
          // Update existing table
          const response = await axios.put(
            `/api/tables/updateTable/${editingTable}`,
            data,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response?.data?.resultCode === 0) {
            setOpenSuccessDialogForUpdate(true);
            fetchAllTablesDetails();
            setEditingTable(null);
            setTableInput((prev) => ({
              ...prev,
              tableNumber: "",
              capacity: "",
              timeslot: "",
              status: "",
              bookingCharges: "",
              bookingDate: selectedDate, // Use the state that's already being maintained
            }));
          }
          if (response?.data?.resultCode == 71) {
            setDuplicateDialogOpen(true);
          }
        } else {
          // Add new table
          if (tables.length < MAX_TABLES) {
            const response = await axios.post(`/api/tables/addTable`, data, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response?.data?.resultCode === 0) {
              setOpenSuccessDialog(true);
              fetchAllTablesDetails();
              setTableInput((prev) => ({
                ...prev,
                tableNumber: "",
                capacity: "",
                timeslot: "",
                status: "",
                bookingCharges: "",
                bookingDate: selectedDate, // Use the state that's already being maintained
              }));
            }
            if (response?.data?.resultCode == 71) {
              setDuplicateDialogOpen(true);
            }
          } else {
            setLimitDialogOpen(true);
          }
        }
      } catch (error) {
        console.log("Error saving table:", error);
      }
    } else {
      console.log(" All fields require : ", tableInput);
    }
  };

  const handleEditTable = (tableId) => {
    const table = tables.find((table) => table._id === tableId);
    if (table) {
      setTableInput((prev) => ({
        ...prev, // Preserve email and other fields
        tableNumber: table.tableNumber,
        capacity: table.capacity.toString(),
        timeslot: table.timeslot,
        status: table.status,
        bookingCharges: table.bookingCharges || "",
        bookingDate: formatDate(new Date(table.bookingDate)),
      }));
      setEditingTable(tableId);
    }
  };

  const handleConfirmDelete = (id) => {
    setTableToDelete(id);
    setOpenDialogForDelete(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/tables/deleteTable/${tableToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.resultCode === 0) {
        setOpenDialogForDelete(false);
        setOpenSuccessDialogForDelete(true);
        fetchAllTablesDetails();
      }
    } catch (error) {
      console.log("Error deleting table details:", error);
    }
  };

  const handleDialogClose = () => {
    setLimitDialogOpen(false);
  };

  const handleDuplicateDialogClose = () => {
    setDuplicateDialogOpen(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fetchAllIncomingBookings = async () => {
    try {
      console.log("Fetching bookings...");
      const response = await axios.get(
        `/api/tables/get-all-bookings-restuarant/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: email }, // Pass the user's email as a query parameter
        }
      );

      if (response?.data?.resultCode === 0) {
        const bookings = response?.data?.resultData;
        setRows(bookings);
        console.log("Bookings fetched successfully:", bookings);
        // Update state or display the bookings in your UI
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchBookingsHistory = async () => {
    try {
      const response = await axios.get(
        `/api/tables/get-restaurant-tables/history`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: email },
        }
      );

      if (response?.data?.resultCode === 0) {
        const bookings = response?.data?.resultData;
        setBookingHistory(bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings history:", error);
    }
  };

  const fetchAllTablesDetails = async () => {
    try {
      const response = await axios.get(
        `/api/tables/get-restaurant-tables`,
        // email,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: email },
        }
      );

      if (response?.data?.resultCode === 0) {
        await setTables([]);
        setTables(response.data.resultData);
        setTableListLoader(false);
      }
    } catch (error) {
      console.log("Error fetching all table details :", error);
    }
  };

  useEffect(() => {
    fetchAllTablesDetails();
    fetchAllIncomingBookings();
    fetchBookingsHistory();
  }, []);

  useEffect(() => {
    setTableInput((prev) => ({
      ...prev,
      bookingDate: selectedDate,
    }));
  }, [selectedDate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "86vh",
        backgroundColor: "#F5FDFE",
      }}
    >
      {/* Tabs at top-left */}
      <Box
        sx={{
          px: 4,
          pt: 2,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="table management tabs"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#1a237e",
              height: 4,
              borderRadius: "2px 2px 0 0",
            },
          }}
        >
          <StyledTab label="Manage Tables" />
          <StyledTab label="Incoming Bookings" />
          <StyledTab label="Bookings History" />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {activeTab === 0 && (
          <Grid container spacing={4}>
            {/* Add/Edit Table Form - Left Column */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: "16px",
                  p: 3,
                  height: "100%",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#1a237e",
                    }}
                  >
                    {editingTable !== null ? "Edit Table" : "Add New Table"}
                  </Typography>
                  <Tooltip
                    title="Table details will be directly shared with customers. So make sure the table details are filled correctly"
                    arrow
                  >
                    <IconButton
                      sx={{
                        color: "#FFBF00",
                        "&:hover": {
                          backgroundColor: "rgba(255, 191, 0, 0.1)",
                        },
                      }}
                    >
                      <TipsAndUpdatesIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="Table Number"
                      fullWidth
                      value={tableInput.tableNumber}
                      onChange={(e) =>
                        handleInputChange("tableNumber", e.target.value)
                      }
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        size="small"
                        label="Seats"
                        type="number"
                        value={tableInput.capacity}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numValue = Number(value);
                          if (numValue >= 0 && numValue <= 12) {
                            handleInputChange("capacity", value);
                          }
                        }}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        size="small"
                        label="Pre-Booking Charges"
                        type="number"
                        value={tableInput.bookingCharges}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numValue = Number(value);
                          if (
                            value === "" ||
                            (numValue >= 0 && numValue <= 1000)
                          ) {
                            handleInputChange("bookingCharges", value);
                          }
                        }}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Booking Date"
                      type="date"
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={tableInput.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        label="Status"
                      >
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="booked">Booked</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                      <InputLabel>Time Slot</InputLabel>
                      <Select
                        value={tableInput.timeslot}
                        onChange={(e) =>
                          handleInputChange("timeslot", e.target.value)
                        }
                        label="Time Slot"
                      >
                        {TIME_SLOTS.map((slot, index) => (
                          <MenuItem key={index} value={slot}>
                            {slot}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleAddTable}
                        sx={{
                          bgcolor: "#1a237e",
                          color: "white",
                          px: 4,
                          py: 1,
                          borderRadius: "12px",
                          "&:hover": {
                            bgcolor: "#0d47a1",
                          },
                        }}
                      >
                        {editingTable !== null ? "Update Table" : "Add Table"}
                      </Button>

                      {editingTable !== null && (
                        <Button
                          variant="outlined"
                          onClick={() => setEditingTable(null)}
                          sx={{
                            color: "#1a237e",
                            borderColor: "#1a237e",
                            px: 4,
                            py: 1,
                            borderRadius: "12px",
                            "&:hover": {
                              borderColor: "#0d47a1",
                              color: "#0d47a1",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* Table List - Right Column */}
            <Grid item xs={12} md={8}>
              {tableListLoader ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={600}
                  sx={{ borderRadius: "16px" }}
                />
              ) : (
                <Card
                  sx={{
                    borderRadius: "16px",
                    p: 3,
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: "#1a237e",
                      textAlign: "center",
                    }}
                  >
                    Current Tables
                  </Typography>

                  {tables.length === 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 200,
                        bgcolor: "rgba(0,0,0,0.03)",
                        borderRadius: "12px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0,0,0,0.5)" }}
                      >
                        No tables added yet
                      </Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={3}>
                      {tables.map((table, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card
                              sx={{
                                borderRadius: "12px",
                                position: "relative",
                                overflow: "visible",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: "translateY(-5px)",
                                  boxShadow: "0 8px 24px rgba(26,35,126,0.2)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: -10,
                                  right: -10,
                                  display: "flex",
                                  gap: 1,
                                  zIndex: 1,
                                }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => handleEditTable(table._id)}
                                  sx={{
                                    bgcolor: "#1a237e",
                                    color: "white",
                                    "&:hover": { bgcolor: "#0d47a1" },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => handleConfirmDelete(table._id)}
                                  sx={{
                                    bgcolor: "#d32f2f",
                                    color: "white",
                                    "&:hover": { bgcolor: "#c62828" },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>

                              <CardContent>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    textAlign: "center",
                                    color: "#1a237e",
                                  }}
                                >
                                  Table {table.tableNumber}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    color: "text.secondary",
                                  }}
                                >
                                  <strong>
                                    {moment(table.bookingDate).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </strong>
                                </Typography>
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    color: "text.secondary",
                                    mt: 0,
                                  }}
                                >
                                  {table.timeslot}
                                </Typography>
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    color: "text.secondary",
                                  }}
                                >
                                  {table.capacity} Seats (₹
                                  {table.bookingCharges})
                                </Typography>
                                <Box
                                  sx={{
                                    mt: 1,
                                    p: 1,
                                    borderRadius: "8px",
                                    bgcolor:
                                      table.status === "available"
                                        ? "#4caf50"
                                        : table.status === "booked"
                                          ? "#DF1717"
                                          : "#525150",
                                    textAlign: "center",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color: "white",
                                      fontSize: "0.875rem",
                                    }}
                                  >
                                    {table.status}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Card>
              )}
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Card
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#D2E2F3" }}>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Booking ID
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Booking Date
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Table No
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Seats
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Time Slot
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Mobile No
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Status
                    </TableCell>

                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Customer Name
                    </TableCell>

                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Booked At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice()
                    .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:hover": { bgcolor: "rgba(26,35,126,0.05)" },
                          transition: "background-color 0.2s",
                        }}
                      >
                        <TableCell>{row._id}</TableCell>
                        <TableCell>
                          {new Date(row.bookingDate).toLocaleDateString()}
                        </TableCell>

                        <TableCell>{row.tableNumber}</TableCell>
                        <TableCell>{row.capacity}</TableCell>
                        <TableCell>{row.timeslot}</TableCell>
                        <TableCell>{row.bookedBy.mobileNo}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            variant="outlined"
                            color="success"
                          />
                        </TableCell>

                        <TableCell>
                          {row.bookedBy.firstName} {row.bookedBy.lastName}
                        </TableCell>

                        <TableCell>
                          {" "}
                          {moment(row.bookedAt).format("YYYY-MM-DD hh:mm:ss A")}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>
        )}

        {activeTab === 2 && (
          <Card
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#D2E2F3" }}>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Booking ID
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Booking Date
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Table No
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Seats
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Time Slot
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Mobile No
                    </TableCell>
                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Status
                    </TableCell>

                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Customer Name
                    </TableCell>

                    <TableCell sx={{ color: "#1a237e", fontWeight: 600 }}>
                      Booked At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookingHistory
                    .slice()
                    .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:hover": { bgcolor: "rgba(26,35,126,0.05)" },
                          transition: "background-color 0.2s",
                        }}
                      >
                        <TableCell>{row._id}</TableCell>
                        <TableCell>
                          {new Date(row.bookingDate).toLocaleDateString()}
                        </TableCell>

                        <TableCell>{row.tableNumber}</TableCell>
                        <TableCell>{row.capacity}</TableCell>
                        <TableCell>{row.timeslot}</TableCell>
                        <TableCell>{row.bookedBy.mobileNo}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            variant="outlined"
                            color="success"
                          />
                        </TableCell>

                        <TableCell>
                          {row.bookedBy.firstName} {row.bookedBy.lastName}
                        </TableCell>

                        <TableCell>
                          {" "}
                          {moment(row.bookedAt).format("YYYY-MM-DD hh:mm:ss A")}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>
        )}
      </Box>

      {/* limit reached dailog box */}
      <Dialog
        open={LimitDialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            width: "400px",
            borderRadius: "16px",
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center", color: "#d32f2f", fontWeight: 600 }}
        >
          Table Limit Reached
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", color: "#666" }}>
            You have reached the maximum limit of 6 tables.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pt: 2 }}>
          <Button
            variant="contained"
            onClick={handleDialogClose}
            sx={{
              bgcolor: "#1a237e",
              color: "white",
              px: 4,
              py: 1,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#0d47a1",
              },
            }}
          >
            Understood
          </Button>
        </DialogActions>
      </Dialog>

      {/* duplicate table dailog box */}
      <Dialog
        open={DuplicateDialogOpen}
        onClose={handleDuplicateDialogClose}
        PaperProps={{
          sx: {
            width: "400px",
            borderRadius: "16px",
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center", color: "#d32f2f", fontWeight: 600 }}
        >
          Table Already Exist
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", color: "#666" }}>
            Table with same Table No and Timeslot already exists.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pt: 2 }}>
          <Button
            variant="contained"
            onClick={handleDuplicateDialogClose}
            sx={{
              bgcolor: "#1a237e",
              color: "white",
              px: 4,
              py: 1,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#0d47a1",
              },
            }}
          >
            Try Again
          </Button>
        </DialogActions>
      </Dialog>

      {/* delete dialog box */}
      <Dialog
        open={openDialogForDelete}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "400px",
            width: "100%",
          },
        }}
      >
        <Box sx={{ textAlign: "center", pt: 3, px: 3 }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "#ffebee",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            <Warning sx={{ color: "#d32f2f", fontSize: 40 }} />
          </Avatar>
          <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
            Delete Table Details
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#546e7a" }}>
              Are you sure you want to delete this table Details?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={handleCloseDeleteDialog}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                mr: 1,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* success  for add*/}
      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "400px",
            width: "100%",
          },
        }}
      >
        <Box sx={{ textAlign: "center", pt: 3, px: 3 }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "#e8f5e9",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            <CheckCircle sx={{ color: "#2e7d32", fontSize: 40 }} />
          </Avatar>
          <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
            Success!
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#546e7a" }}>
              New Table details added successfully.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={handleCloseSuccessDialog}
              variant="contained"
              color="success"
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Done
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* success  for delete*/}
      <Dialog
        open={openSuccessDialogForDelete}
        onClose={handleCloseSuccessDeleteDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "400px",
            width: "100%",
          },
        }}
      >
        <Box sx={{ textAlign: "center", pt: 3, px: 3 }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "#e8f5e9",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            <CheckCircle sx={{ color: "#2e7d32", fontSize: 40 }} />
          </Avatar>
          <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
            Success!
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#546e7a" }}>
              Table deleted successfully.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={() => setOpenSuccessDialogForDelete(false)}
              variant="contained"
              color="success"
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Done
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* success  for update*/}
      <Dialog
        open={openSuccessDialogForUpdate}
        onClose={() => setOpenSuccessDialogForUpdate(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "400px",
            width: "100%",
          },
        }}
      >
        <Box sx={{ textAlign: "center", pt: 3, px: 3 }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "#e8f5e9",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            <CheckCircle sx={{ color: "#2e7d32", fontSize: 40 }} />
          </Avatar>
          <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
            Success!
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#546e7a" }}>
              Table details updated successfully.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={() => setOpenSuccessDialogForUpdate(false)}
              variant="contained"
              color="success"
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Done
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default TableBookingManagement;
