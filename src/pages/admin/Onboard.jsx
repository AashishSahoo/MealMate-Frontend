import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  DialogContentText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";

import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";

const columns = [
  { id: "firstName", label: "First Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  // { id: "email", label: "Email", minWidth: 150 },
  { id: "restaurantName", label: "Restaurant Name", minWidth: 200 },
  { id: "registrationTime", label: "Date", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 130 },
  { id: "documents", label: "Documents", minWidth: 130 },
];

export default function RestaurantOwnerManagement() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedContent, setSelectedContent] = React.useState(null);
  const [modalType, setModalType] = React.useState("");
  const [expanded, setExpanded] = React.useState({});
  const [restroOwnerList, setRestroOwnerList] = React.useState([]);
  const [errorDialogOpen, setErrorDialogOpen] = React.useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const { token } = useSelector((state) => state.auth);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (type, contentUrl, e) => {
    e.stopPropagation();
    setSelectedContent(contentUrl);
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedContent(null);
    setModalType("");
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleApprove = async (id, e) => {
    e.stopPropagation();
    const status = 1;
    try {
      const response = await axios.put(
        `http://localhost:4000/Backend/MealMate/updateRestroOwnerStatus/active/${id}`,
        status
      );

      if (response.data.resultCode === 0) {
        setDialogMessage(
          response.data.resultMessage ||
            "Restaurant owner approved successfully!"
        );
        setSuccessDialogOpen(true);
        fetchRestroOwnerList();
      } else {
        setDialogMessage(
          response.data.resultMessage || "Error approving restaurant owner"
        );
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage("Error approving restaurant owner");
      setErrorDialogOpen(true);
      console.error("Error approving restaurant owner:", error);
    }
  };

  const handleDecline = async (id, e) => {
    e.stopPropagation();
    const status = -1;
    try {
      const response = await axios.put(
        `http://localhost:4000/Backend/MealMate/updateRestroOwnerStatus/inactive/${id}`,
        status
      );

      if (response.data.resultCode === 0) {
        setDialogMessage(
          response.data.resultMessage ||
            "Restaurant owner declined successfully!"
        );
        setErrorDialogOpen(true);
        fetchRestroOwnerList();
      } else {
        setDialogMessage(
          response.data.resultMessage || "Error declining restaurant owner"
        );
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage("Error declining restaurant owner");
      setErrorDialogOpen(true);
      console.error("Error declining restaurant owner:", error);
    }
  };

  const handleRowClick = (index) => {
    setExpanded((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case 1:
        return "success";
      case -1:
        return "error";
      default:
        return "warning";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return "Approved";
      case -1:
        return "Declined";
      default:
        return "Pending";
    }
  };

  const fetchRestroOwnerList = async () => {
    try {
      const response = await axios.get(`/api/users/restaurant-owners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        setRestroOwnerList(response?.data?.resultData);
      }
    } catch (error) {
      console.error("Error fetching restaurant owners:", error);
    }
  };

  React.useEffect(() => {
    fetchRestroOwnerList();
  }, []);

  return (
    <>
      <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            // background: "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",
            // color: "white",
            p: 2,
          }}
        >
          <Box sx={{ mt: 1 }}>
            <ErrorIcon color="error" style={{ fontSize: "4rem" }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Status Update
          </Typography>

          <DialogContent sx={{ py: 1 }}>
            <DialogContentText sx={{ mb: 0 }}>
              {dialogMessage}
            </DialogContentText>
          </DialogContent>

          <DialogActions
            sx={{ width: "100%", justifyContent: "center", pb: 3 }}
          >
            <Button
              onClick={handleCloseErrorDialog}
              variant="contained"
              sx={{
                minWidth: "120px",
                background: "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1A1A1A 0%, #2C3E50 100%)",
                },
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            // background: "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",

            p: 2,
          }}
        >
          <Box sx={{ mt: 2 }}>
            <CheckCircleOutlineIcon
              color="success"
              style={{ fontSize: "4rem" }}
            />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Success
          </Typography>

          <DialogContent sx={{ py: 1 }}>
            <DialogContentText sx={{}}>{dialogMessage}</DialogContentText>
          </DialogContent>

          <DialogActions
            sx={{ width: "100%", justifyContent: "center", pb: 3 }}
          >
            <Button
              onClick={handleCloseSuccessDialog}
              variant="contained"
              sx={{
                minWidth: "120px",
                background: "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1A1A1A 0%, #2C3E50 100%)",
                },
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Card
        sx={{
          width: "100%",
          borderRadius: "20px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          background: "white",
          p: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#000" }}>
          Restaurant Owner Management
        </Typography>

        <TableContainer>
          <Table stickyHeader aria-label="collapsible restaurant owner table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: 600,
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {restroOwnerList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={row._id}>
                    <TableRow
                      hover
                      onClick={() => handleRowClick(index)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.02)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <TableCell
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton size="small">
                          {expanded[index] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                        {row.firstName}
                      </TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      {/* <TableCell>{row.email}</TableCell> */}
                      <TableCell>{row.restaurantName}</TableCell>
                      <TableCell>{row.registrationTime}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(row.restroOwnerStatus)}
                          color={getStatusChipColor(row.restroOwnerStatus)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Approve">
                            <IconButton
                              color="success"
                              onClick={(e) => handleApprove(row._id, e)}
                              disabled={row.restroOwnerStatus !== 0}
                              size="small"
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton
                              color="error"
                              onClick={(e) => handleDecline(row._id, e)}
                              disabled={row.restroOwnerStatus !== 0}
                              size="small"
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="View Logo">
                            <IconButton
                              onClick={(e) =>
                                handleOpenModal("logo", row.appLogoUrl, e)
                              }
                              size="small"
                              sx={{ color: "#5c6bc0" }}
                            >
                              <ImageIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View Document">
                            <IconButton
                              onClick={(e) =>
                                handleOpenModal("document", row.documentUrl, e)
                              }
                              size="small"
                              sx={{ color: "#5c6bc0" }}
                            >
                              <DescriptionIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={8} sx={{ py: 0, border: 0 }}>
                        <Collapse
                          in={expanded[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box
                            sx={{
                              p: 3,
                              backgroundColor: "#f8f9fa",
                              borderRadius: 2,
                              m: 1,
                            }}
                          >
                            <Typography
                              gutterBottom
                              sx={{
                                color: "#B96B1A",
                                fontWeight: "bold",
                              }}
                            >
                              Additional Details
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              <Typography>Address: {row.address}</Typography>
                              <Typography>Email: {row.email}</Typography>
                              <Typography>Mobile No: {row.mobileNo}</Typography>
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={restroOwnerList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "12px",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#f8f9fa",
              borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              color: "#2c387e",
              fontWeight: 600,
            }}
          >
            {modalType === "logo" ? "Restaurant Logo" : "Restaurant Document"}
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            {modalType === "logo" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#f8f9fa",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <img
                  src={selectedContent}
                  alt="App Logo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ) : (
              <iframe
                src={selectedContent}
                title="Document"
                style={{ width: "100%", height: "600px", border: "none" }}
              />
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2, backgroundColor: "#f8f9fa" }}>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1A1A1A 0%, #2C3E50 100%)",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </>
  );
}
