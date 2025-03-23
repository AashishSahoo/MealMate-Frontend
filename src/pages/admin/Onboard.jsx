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
  TextField,
  Avatar,
  FormHelperText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import RateReviewIcon from "@mui/icons-material/RateReview";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";
import moment from "moment";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import GroupsIcon from "@mui/icons-material/Groups";
import { HiUserGroup } from "react-icons/hi2";
import EventIcon from "@mui/icons-material/Event";
import { styled, keyframes } from "@mui/material/styles";

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
// Add these animation keyframes FIRST
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const timelineGrow = keyframes`
  from { height: 0; }
  to { height: 50px; }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

// THEN define the styled components
const TimelineLine = styled(Box)({
  animation: `${timelineGrow} 0.5s ease-out forwards`,
  animationDelay: "0.2s",
});

const TimelineItemWrapper = styled(Box)({
  opacity: 0,
  animation: `${fadeIn} 0.3s ease-out forwards`,
  "&:nth-of-type(1)": { animationDelay: "0.3s" },
  "&:nth-of-type(2)": { animationDelay: "0.5s" },
});

const ContactDetailsWrapper = styled(Box)({
  opacity: 0,
  animation: `${slideInRight} 0.4s ease-out forwards`,
  animationDelay: "0.7s",
});
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

  const [rejectionDialogOpen, setRejectionDialogOpen] = React.useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = React.useState(false);

  const [selectedOwnerId, setSelectedOwnerId] = React.useState(null);
  const [feedback, setFeedback] = React.useState("");

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
    try {
      const response = await axios.put(
        `/api/restaurantStatus/approve/${id}`,
        null, // Empty request body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response?.data?.resultCode === 0) {
        setApproveDialogOpen(false);
        setDialogMessage(
          response.data.resultMessage ||
            "RestaurantOwner approved successfully!"
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
    } finally {
      setSelectedOwnerId("");
    }
  };

  const handleDecline = async (id, e) => {
    try {
      const response = await axios.put(
        `/api/restaurantStatus/decline/${id}`,
        { feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response?.data?.resultCode === 0) {
        setDialogMessage(
          response?.data?.resultMessage ||
            "RestaurantOwner  Rejected successfully!"
        );
        setErrorDialogOpen(true);
        fetchRestroOwnerList();
      } else {
        setDialogMessage(
          response.data.resultMessage || "Error rejecting restaurant owner"
        );
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage("Error rejecting restaurant owner");
      setErrorDialogOpen(true);
      console.error("Error rejecting restaurant owner:", error);
    } finally {
      setSelectedOwnerId("");
    }
  };

  const handleRowClick = (index) => {
    setExpanded((prevState) => {
      const newState = {};
      // Close all other rows and toggle current row
      Object.keys(prevState).forEach((key) => {
        newState[key] = false;
      });
      newState[index] = !prevState[index];
      return newState;
    });
  };
  const getStatusChipColor = (status) => {
    switch (status) {
      case 1:
        return "success";
      case -1:
        return "error";
      default:
        return "primary";
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
        const data = response?.data?.resultData;
        data.sort(
          (a, b) => new Date(b.registrationTime) - new Date(a.registrationTime)
        );
        setRestroOwnerList(data);
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
          Restaurant Owner Verification Dashboard
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
                      <TableCell>{row.restaurantName}</TableCell>
                      <TableCell>
                        {moment(row.registrationTime).format(
                          "D/M/YYYY, HH:mm:ss"
                        )}
                      </TableCell>
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
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOwnerId(row._id);
                                setApproveDialogOpen(true);
                                // handleApprove(row._id, e);
                              }}
                              disabled={row.restroOwnerStatus !== 0}
                              size="small"
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOwnerId(row._id);
                                setRejectionDialogOpen(true);
                              }}
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
                              mx: "auto",
                              p: 2,
                              borderRadius: 2,
                              color: "#e6edf3",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              border: "1px solid #CBCCCD",
                              background:
                                "linear-gradient(145deg, #ffffff, #f5f5f5)",
                              boxShadow:
                                "4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff",
                            }}
                          >
                            {/* Left Timeline Section */}
                            <Box sx={{ flex: 1 }}>
                              <TimelineItemWrapper>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    {row.restroOwnerStatus === 1 ? (
                                      <HowToRegIcon
                                        color="success"
                                        sx={{
                                          fontSize: 28,
                                          mb: 1,
                                          transition: "transform 0.3s",
                                          "&:hover": {
                                            transform: "scale(1.2)",
                                          },
                                        }}
                                      />
                                    ) : row.restroOwnerStatus === -1 ? (
                                      <PersonOffIcon
                                        sx={{
                                          fontSize: 28,
                                          color: "#d32f2f",
                                          mb: 1,
                                          transition: "transform 0.3s",
                                          "&:hover": {
                                            transform: "scale(1.2)",
                                          },
                                        }}
                                      />
                                    ) : (
                                      <PendingActionsIcon
                                        sx={{
                                          fontSize: 28,
                                          color: "#58a6ff",
                                          mb: 1,
                                          transition: "transform 0.3s",
                                          "&:hover": {
                                            transform: "scale(1.2)",
                                          },
                                        }}
                                      />
                                    )}
                                    <TimelineLine
                                      sx={{
                                        width: 2,
                                        height: 50,
                                        bgcolor: "#D6D7D8",
                                      }}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography
                                      color="#3B3B3C"
                                      sx={{
                                        fontWeight: 600,
                                        fontSize: "1.1rem",
                                      }}
                                    >
                                      {row?.restroOwnerStatus === 1
                                        ? "Approved"
                                        : row?.restroOwnerStatus === -1
                                          ? "Rejected"
                                          : "Pending"}
                                    </Typography>
                                    {row?.updateStatusTime && (
                                      <Typography
                                        sx={{
                                          fontSize: "0.8rem",
                                          color: "#767777",
                                        }}
                                      >
                                        {moment(row.updateStatusTime).format(
                                          "D/M/YYYY, HH:mm:ss"
                                        )}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                              </TimelineItemWrapper>

                              <TimelineItemWrapper>
                                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <EventIcon
                                      sx={{
                                        fontSize: 28,
                                        color: "#ffa726",
                                        transition: "transform 0.3s",
                                        "&:hover": {
                                          transform:
                                            "rotate(-15deg) scale(1.1)",
                                        },
                                      }}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography
                                      color="#3B3B3C"
                                      sx={{
                                        fontWeight: 600,
                                        fontSize: "1.1rem",
                                      }}
                                    >
                                      Registered On
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "0.8rem",
                                        color: "#767777",
                                      }}
                                    >
                                      {moment(row.registrationTime).format(
                                        "D/M/YYYY, HH:mm:ss"
                                      )}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TimelineItemWrapper>
                            </Box>

                            {/* Right Contact Details Section */}
                            <ContactDetailsWrapper
                              sx={{
                                pl: 4,
                                borderLeft: "1px solid #eee",
                                width: "400px",
                                position: "relative",
                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  left: -2,
                                  top: "50%",
                                  height: "80%",
                                  width: 4,
                                  bgcolor: "primary.main",
                                  transform: "translateY(-50%)",
                                  borderRadius: 2,
                                },
                              }}
                            >
                              <Typography
                                gutterBottom
                                sx={{
                                  color: "#B96B1A",
                                  fontWeight: "bold",
                                  mb: 2,
                                }}
                              >
                                Contact Details
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 1.5,
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    Email: {row.email}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    Mobile: {row.mobileNo}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    Address: {row.address}
                                  </Typography>
                                </Box>
                              </Box>
                            </ContactDetailsWrapper>
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
        {/* rejct dailog box  */}
        <Dialog
          open={rejectionDialogOpen}
          onClose={() => setRejectionDialogOpen(false)}
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
                mb: 1,
              }}
            >
              <RateReviewIcon sx={{ color: "#d32f2f", fontSize: 40 }} />
            </Avatar>
            <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
              Rejection Reason
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                size="small"
                margin="dense"
                label="Feedback"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <FormHelperText sx={{ color: "#546e7a" }}>
                Provide specific reason
              </FormHelperText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
              <Button
                onClick={() => setRejectionDialogOpen(false)}
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
                onClick={async () => {
                  try {
                    await handleDecline(selectedOwnerId, feedback);
                    setRejectionDialogOpen(false);
                    setFeedback("");
                  } catch (error) {
                    console.error("Error submitting feedback:", error);
                  }
                }}
                variant="contained"
                color="error"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Reject
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        {/* Approve dailog box */}
        <Dialog
          open={approveDialogOpen}
          onClose={() => setApproveDialogOpen(false)}
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
                mb: 1,
              }}
            >
              <HowToRegIcon sx={{ color: "#2e7d32", fontSize: 40 }} />
            </Avatar>
            <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
              Approve
            </DialogTitle>
            <DialogContent sx={{ color: "#546e7a" }}>
              Are you sure you want to approve this Restaurant Owner?
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
              <Button
                onClick={() => setApproveDialogOpen(false)}
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
                onClick={async () => {
                  try {
                    await handleApprove(selectedOwnerId);
                    setApproveDialogOpen(false);
                  } catch (error) {
                    console.error("Error approving owner:", error);
                  }
                }}
                variant="contained"
                color="success"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Approve
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* success dailog box */}
        <Dialog
          open={successDialogOpen}
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
                mb: 1,
              }}
            >
              <CheckCircleOutlineIcon sx={{ color: "#2e7d32", fontSize: 40 }} />
            </Avatar>
            <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
              Success
            </DialogTitle>
            <DialogContent sx={{ color: "#546e7a" }}>
              {dialogMessage}
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
              <Button
                onClick={handleCloseSuccessDialog}
                variant="contained"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  background:
                    "linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)",
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

        {/* error dialog box  */}
        <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              p: 2,
            }}
          >
            <Box sx={{ mt: 1 }}>
              <NewReleasesIcon color="warning" style={{ fontSize: "4rem" }} />
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
                  background:
                    "linear-gradient(135deg, #F57C00 0%, #E65100 100%)",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #E65100 0%, #F57C00 100%)",
                  },
                }}
              >
                OK
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Card>
    </>
  );
}
