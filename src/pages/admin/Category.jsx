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
  Button,
  TextField,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Delete,
  Category as CategoryIcon,
  Add,
  Warning,
} from "@mui/icons-material";
import { HiViewGridAdd } from "react-icons/hi";
import { TbLayoutGridRemove } from "react-icons/tb";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { RiAlarmWarningFill } from "react-icons/ri";

export default function Category() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openWarningDialog, setOpenWarningDialog] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/categories/${categoryToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response?.data?.resultCode === 0) {
        fetchCategoryList();
      }
    } catch (error) {
      console.log("Error deleting the category :", error);
    }

    setOpenDialog(false);
    setCategoryToDelete(null);
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        `/api/categories/create`,
        { name: newCategory },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.resultCode === -1) {
        console.log("Before setting:", openWarningDialog);
        setOpenWarningDialog(true);
        console.log("After setting:", openWarningDialog);
      }
      if (response?.data?.resultCode === 0) {
        fetchCategoryList();
      }
    } catch (error) {
      console.log("Error adding new category :", error);
    }

    setOpenAddDialog(false);
  };

  const fetchCategoryList = async (req, res) => {
    try {
      const response = await axios.get(`/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        setRows(response?.data?.resultData);
      }
    } catch (error) {
      console.log("Error fetching Category List : ", error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <>
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
          <Box
            sx={{
              marginBottom: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Title on the Left */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <CategoryIcon sx={{ fontSize: 35 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#000" }}>
                Category Management
              </Typography>
            </Stack>

            {/* Search Box & Add Category Button on the Right */}
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField size="small" label="Search by Name" />
              <Button
                variant="contained"
                // size="small"
                onClick={() => setOpenAddDialog(true)}
                startIcon={<Add />}
              >
                Add Category
              </Button>
            </Stack>
          </Box>

          <TableContainer sx={{ maxHeight: 600, borderRadius: 1 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}
                  >
                    Sr
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      key={row._id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.04)",
                        },
                      }}
                    >
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        {moment(row.createdAt).format("D/M/YYYY, HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(row._id)}
                            sx={{
                              color: "#d32f2f",
                              "&:hover": { transform: "scale(1.1)" },
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
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: "1px solid #e0e0e0", marginTop: 2 }}
          />
        </Paper>
      </Fade>

      {/* Add Category Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
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
              bgcolor: "#e3f2fd",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            {/* <HiViewGridAdd sx={{ color: "#000", fontSize: 40 }} /> */}
            <HiViewGridAdd style={{ color: "#000", fontSize: 40 }} />
          </Avatar>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogContent>
            <TextField
              label="Category Name"
              fullWidth
              size="small"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={() => setOpenAddDialog(false)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCategory}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "500px",
            width: "100%",
          },
        }}
      >
        <Box sx={{ textAlign: "center", pt: 3, px: 3 }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "#e3f2fd",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            {/* <HiViewGridAdd sx={{ color: "#000", fontSize: 40 }} /> */}
            <TbLayoutGridRemove style={{ color: "#000", fontSize: 40 }} />
          </Avatar>
          <DialogTitle>
            Are you sure you want to remove this category?
          </DialogTitle>
          <DialogContent sx={{ variant: "body2" }}>
            All the food items under it will be moved to uncategorised category
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              // color="primary"
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
              color="error"
            >
              Remove
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={openWarningDialog}
        onClose={() => setOpenWarningDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "500px",
            width: "100%",
          },
        }}
      >
        <Box sx={{ textAlign: "center", pt: 3, px: 3 }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "#e3f2fd",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            {/* <HiViewGridAdd sx={{ color: "#000", fontSize: 40 }} /> */}
            <RiAlarmWarningFill style={{ color: "#000", fontSize: 40 }} />
          </Avatar>
          <DialogTitle>Category already exists</DialogTitle>

          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={() => setOpenWarningDialog(false)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Ok
            </Button>
            {/* <Button
              onClick={handleConfirmDelete}
              variant="contained"
              // color="primary"
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
              color="error"
            >
              Remove
            </Button> */}
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

// F82830
// 2DE200
