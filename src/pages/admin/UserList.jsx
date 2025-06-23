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
  PersonOutline,
  Warning,
  CheckCircle,
} from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import Groups3Icon from "@mui/icons-material/Groups3";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Columns definition
const columns = [
  { id: "firstName", label: "First Name", minWidth: 150 },
  { id: "lastName", label: "Last Name", minWidth: 150 },
  { id: "mobile", label: "Mobile", minWidth: 150 },
  { id: "address", label: "Address", minWidth: 200 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "delete", label: "Actions", minWidth: 100 },
];

// Mock data for users
function createUserData(firstName, lastName, mobile, address, email) {
  return { firstName, lastName, mobile, address, email };
}

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userList, setUserList] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    deleteUser(userToDelete);
    setOpenDialog(false);
    // setOpenSuccessDialog(true);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    setUserToDelete(null);
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/users/delete-customer/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.resultCode === 0) {
        setOpenSuccessDialog(true);
        await fetchAllRestroOwnerList();
      }
    } catch (error) {
      console.log(" error deleting the customer");
    }
  };

  const fetchUserList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        setUserList(response?.data?.resultData);
        // console.log(response, "user data");
      }
    } catch (error) {
      console.log("error fetching  user list");
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <Fade in={true} timeout={800}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 4,
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
            <Groups3Icon sx={{ fontSize: 35 }} />
            User Management
          </Typography>
        </Box>

        {/* User Table */}
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
              {userList
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
                    <TableCell>{row.mobileNo}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Tooltip title="Delete User" arrow>
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
          count={userList.length}
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
              Delete User
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: "#546e7a" }}>
                Are you sure you want to delete this user? This action cannot be
                undone.
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
                User has been successfully deleted.
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
