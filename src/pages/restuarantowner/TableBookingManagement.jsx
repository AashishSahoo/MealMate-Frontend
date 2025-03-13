import React, { useState } from "react";
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
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import table1 from "/assets/table2.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
  // borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1a237e",
    height: 3,
  },
});

const AnimatedCard = styled(motion(Card))({
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
  },
});

function TableBookingManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [tables, setTables] = useState([]);
  const [tableInput, setTableInput] = useState({
    tableNo: "",
    seats: "",
    timeSlot: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingTable, setEditingTable] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [loading, setLoading] = useState(false);

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

  const availableTimeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
  ];

  const handleAddTable = () => {
    if (tableInput.tableNo && tableInput.seats && tableInput.timeSlot) {
      if (tables.length < 6) {
        if (editingTable !== null) {
          // Update existing table
          const updatedTables = [...tables];
          updatedTables[editingTable] = {
            tableNo: tableInput.tableNo,
            seats: parseInt(tableInput.seats, 10),
            timeSlot: tableInput.timeSlot,
            status: "Empty",
          };
          setTables(updatedTables);
          setEditingTable(null);
        } else {
          // Add new table
          setTables([
            ...tables,
            {
              tableNo: tableInput.tableNo,
              seats: parseInt(tableInput.seats, 10),
              timeSlot: tableInput.timeSlot,
              status: "Empty",
            },
          ]);
        }
        setTableInput({ tableNo: "", seats: "", timeSlot: "" });
      } else {
        setIsDialogOpen(true);
      }
    }
  };

  const handleEditTable = (index) => {
    const table = tables[index];
    setTableInput({
      tableNo: table.tableNo,
      seats: table.seats.toString(),
      timeSlot: table.timeSlot,
    });
    setEditingTable(index);
  };

  const handleDeleteTable = (index) => {
    const updatedTables = tables.filter((_, i) => i !== index);
    setTables(updatedTables);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const rows = [
    {
      id: 1,
      bookingId: "B001",
      tableNo: 5,
      seats: 4,
      customerName: "John Doe",
      timeSlot: "10:00 AM - 11:00 AM",
      date: "2024-12-27",
    },
    {
      id: 2,
      bookingId: "B002",
      tableNo: 3,
      seats: 2,
      customerName: "Jane Smith",
      timeSlot: "11:00 AM - 12:00 PM",
      date: "2024-12-27",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ display: "flex", height: "85vh", backgroundColor: "#F5FDFE" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <StyledTabs value={activeTab} onChange={handleTabChange} centered>
          <StyledTab label="Manage Tables" />
          <StyledTab label="Incoming Bookings" />
        </StyledTabs>

        {activeTab === 0 && (
          <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 4 }}>
            <Grid container spacing={4}>
              {/* Add/Edit Table Form */}
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: "16px", p: 3, minHeight: "110%" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: "#1a237e",
                      textAlign: "center",
                    }}
                  >
                    {editingTable !== null ? "Edit Table" : "Add New Table"}
                  </Typography>
                  <FormHelperText
                    sx={{ textAlign: "center", mb: 2, color: "text.secondary" }}
                  >
                    This table will be directly booked by the customer so make
                    sure the table details are filled correctly
                  </FormHelperText>
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <TextField
                        label="Table Number"
                        type="number"
                        fullWidth
                        value={tableInput.tableNo}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 2 && /^[0-9]{0,2}$/.test(value)) {
                            handleInputChange("tableNo", value);
                          }
                        }}
                        InputProps={{
                          sx: { borderRadius: "12px" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Seats"
                        type="number"
                        fullWidth
                        value={tableInput.seats}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 1 && /^[0-9]{0,1}$/.test(value)) {
                            handleInputChange("seats", value);
                          }
                        }}
                        InputProps={{
                          sx: { borderRadius: "12px" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Time Slot</InputLabel>
                        <Select
                          value={tableInput.timeSlot}
                          onChange={(e) =>
                            handleInputChange("timeSlot", e.target.value)
                          }
                          label="Time Slot"
                          sx={{ borderRadius: "12px" }}
                        >
                          {availableTimeSlots.map((slot, index) => (
                            <MenuItem key={index} value={slot}>
                              {slot}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleAddTable}
                      sx={{
                        bgcolor: "#1a237e",
                        color: "white",
                        px: 4,
                        py: 1.5,
                        borderRadius: "12px",
                        fontSize: "1rem",
                        textTransform: "none",
                        boxShadow: "0 4px 12px rgba(26,35,126,0.3)",
                        "&:hover": {
                          bgcolor: "#0d47a1",
                        },
                      }}
                    >
                      {editingTable !== null ? "Update Table" : "Add Table"}
                    </Button>
                  </Box>
                </Card>
              </Grid>

              {/* Table List */}
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: "16px", p: 3, minHeight: "110%" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: "#1a237e",
                      textAlign: "center",
                    }}
                  >
                    Current Tables
                  </Typography>
                  <Grid container spacing={3}>
                    {tables.length === 0 ? (
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",
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
                      </Grid>
                    ) : (
                      tables.map((table, index) => (
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
                                transform: "perspective(1000px)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform:
                                    "perspective(1000px) rotateX(5deg) scale(1.05)",
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
                                  onClick={() => handleEditTable(index)}
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
                                  onClick={() => handleDeleteTable(index)}
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
                                  sx={{ textAlign: "center", color: "#1a237e" }}
                                >
                                  Table {table.tableNo}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    color: "text.secondary",
                                  }}
                                >
                                  {table.seats} Seats
                                </Typography>
                                <Typography
                                  sx={{
                                    textAlign: "center",
                                    color: "text.secondary",
                                    mt: 1,
                                  }}
                                >
                                  {table.timeSlot}
                                </Typography>
                                <Box
                                  sx={{
                                    mt: 2,
                                    p: 1,
                                    borderRadius: "8px",
                                    bgcolor:
                                      table.status === "Empty"
                                        ? "#4caf50"
                                        : "#f44336",
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
                      ))
                    )}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ p: 4 }}>
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
                    <TableRow sx={{ bgcolor: "#1a237e" }}>
                      <TableCell sx={{ color: "white", fontWeight: 600 }}>
                        Booking ID
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: 600 }}>
                        Table No
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: 600 }}>
                        Seats
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: 600 }}>
                        Customer Name
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: 600 }}>
                        Time Slot
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: 600 }}>
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:hover": { bgcolor: "rgba(26,35,126,0.05)" },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <TableCell>{row.bookingId}</TableCell>
                          <TableCell>{row.tableNo}</TableCell>
                          <TableCell>{row.seats}</TableCell>
                          <TableCell>{row.customerName}</TableCell>
                          <TableCell>{row.timeSlot}</TableCell>
                          <TableCell>
                            {new Date(row.date).toLocaleDateString()}
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
          </Box>
        )}
      </Box>

      <Dialog
        open={isDialogOpen}
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
    </Box>
  );
}

export default TableBookingManagement;
