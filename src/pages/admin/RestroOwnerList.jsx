import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Fade,
  Tooltip,
  
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Avatar,
} from "@mui/material";
import {
  Delete,
  RestaurantMenu,
  Warning,
  CheckCircle,
} from "@mui/icons-material";

import axios from "axios";
import { useSelector } from "react-redux";
import Groups2Icon from "@mui/icons-material/Groups2";

// Columns definition
const columns = [
  { id: "firstName", label: "First Name", minWidth: 120 },
  { id: "lastName", label: "Last Name", minWidth: 120 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "restroName", label: "Restaurant Name", minWidth: 200 },
  { id: "address", label: "Address", minWidth: 200 },
  { id: "mobile", label: "Mobile", minWidth: 150 },
  { id: "delete", label: "Actions", minWidth: 40 },
];

export default function RestroOwnerList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [filteredRows, setFilteredRows] = useState(ownerRows);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [ownerToDelete, setOwnerToDelete] = useState(null);
  const [restroOwnerList, setRestroOwnerList] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (ownerId) => {
    setOwnerToDelete(ownerId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOwnerToDelete(null);
  };

  const handleConfirmDelete = () => {
    deleteRestrOwner(ownerToDelete);
    setOpenDialog(false);
    // setOpenSuccessDialog(true);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    setOwnerToDelete(null);
  };

  const deleteRestrOwner = async (id) => {
    try {
      const response = await axios.delete(
        `/api/users/delete-restaurant-owners/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.resultCode === 0) {
        setOpenSuccessDialog(true);
        await fetchAllRestroOwnerList();
      }
    } catch (error) {
      console.log(" error deleting the restro owner");
    }
  };

  const fetchAllRestroOwnerList = async () => {
    try {
      const response = await axios.get(`/api/users/restaurant-owners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        setRestroOwnerList(response?.data?.resultData);
      }
    } catch (error) {
      console.log("error fetching the restro owner list");
    }
  };

  useEffect(() => {
    fetchAllRestroOwnerList();
  }, []);

  return (
    <Fade in={true} timeout={800}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 4,
          mt: "0.6rem",
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        {/* Page Header */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#000",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Groups2Icon sx={{ fontSize: 35 }} />
            Restaurant Owner Management
          </Typography>
        </Box>

        {/* Restaurant Owner Table */}
        <TableContainer
          sx={{
            maxHeight: 600,
            borderRadius: 1,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#f5f5f5",
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "0.875rem",
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
                  <TableRow
                    hover
                    key={row._id}
                    sx={{
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.04)",
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>
                      {row.firstName}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {row.lastName}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell
                      sx={{
                        color: "#1976d2",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      {row.restaurantName}
                    </TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.mobileNo}</TableCell>
                    <TableCell>
                      <Tooltip title="Delete Owner" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(row._id)}
                          sx={{
                            color: "#d32f2f",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              backgroundColor: "rgba(211, 47, 47, 0.04)",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
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
          sx={{
            borderTop: "1px solid #e0e0e0",
            marginTop: 2,
          }}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
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
              Delete Restaurant Owner
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: "#546e7a" }}>
                Are you sure you want to delete this restaurant owner? This
                action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
              <Button
                onClick={handleCloseDialog}
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
                onClick={handleConfirmDelete}
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

        {/* Success Dialog */}
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
                Restaurant owner has been successfully deleted.
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
      </Paper>
    </Fade>
  );
}
