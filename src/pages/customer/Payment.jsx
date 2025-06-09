import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
  Tooltip,
  CircularProgress,
  Chip,
  Avatar,
} from "@mui/material";
import {
  ArrowCircleDown as DownloadIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Payment as PaymentIcon,
  CalendarToday as DateIcon,
  CheckCircle as SuccessIcon,
  LocalShipping as DeliveryIcon,
  Receipt as ReceiptIcon,
  Restaurant as RestaurantIcon,
  Money as MoneyIcon,
  Home as AddressIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode";
import PaymentReceiptPDF from "../../component/customer/PaymentReceiptPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Icon } from "@iconify/react";

const Payment = () => {
  const { orderId } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const { email, token, userId } = userInfo;

  const [order, setOrder] = useState({ items: [] });
  const [payment, setPayment] = useState({ razorpay: {} });
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate order totals
  const subtotal = order.items.reduce(
    (sum, item) => sum + (item.food?.price || 0) * item.quantity,
    0
  );
  const gst = (order.totalAmount - subtotal).toFixed(2);

  // Generate QR code
  useEffect(() => {
    const generateQR = async () => {
      try {
        if (order._id && payment?._id) {
          const url = await QRCode.toDataURL(
            JSON.stringify({
              orderId: order._id,
              paymentId: payment?._id,
              amount: order?.totalAmount,
              restaurant: order?.restaurant?.restaurantName,
            })
          );
          setQrCodeDataUrl(url);
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };
    generateQR();
  }, [order._id, payment?._id, payment?.order?.totalAmount]);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/payments/getPaymentDetails/${orderId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrder(response.data.resultData.order || { items: [] });
        setPayment(response.data.resultData.payment || { razorpay: {} });
        console.log("Order : ".order);
        console.log("Payment : ".payment);
      } catch (err) {
        console.error("Error fetching payment details:", err);
        setError("Failed to load payment details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [orderId]);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading Payment Details
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <Button variant="contained" onClick={() => fetchPaymentDetails()}>
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              Order Confirmation
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Thank you for your purchase!
            </Typography>
          </Box>

          <Box>
            <PDFDownloadLink
              document={
                <PaymentReceiptPDF
                  order={order}
                  payment={payment}
                  subtotal={subtotal}
                  gst={gst}
                  timestamp={new Date()}
                  qrCodeDataUrl={qrCodeDataUrl}
                />
              }
              fileName={`payment_receipt_${order._id}.pdf`}
            >
              {({ loading }) => (
                <Button
                  variant="outlined"
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <DownloadIcon />
                  }
                  disabled={loading}
                  sx={{ textTransform: "none" }}
                >
                  Download Receipt
                </Button>
              )}
            </PDFDownloadLink>
          </Box>
        </Box>

        {/* Status Banner */}
        <Box
          sx={{
            backgroundColor: "#e8f5e9",
            p: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          <SuccessIcon color="success" sx={{ mr: 2, fontSize: 30 }} />
          <Box>
            <Typography variant="h6" color="success.dark">
              Payment Successful
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your order #{order._id} has been confirmed
            </Typography>
          </Box>
          <Chip
            label={`₹${order.totalAmount?.toFixed(2) || "0.00"}`}
            color="success"
            sx={{ ml: "auto", fontWeight: 600, fontSize: "1rem" }}
          />
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Left Column - Customer and Order Details */}
          <Grid item xs={12} md={7}>
            {/* Customer Information Card */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Customer Information
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <PersonIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1">
                        {order?.user?.firstName + order?.user?.lastName ||
                          "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <EmailIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {order?.user?.email || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <PhoneIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">
                        {order?.user?.mobileNo || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <RestaurantIcon
                      color="action"
                      sx={{ mr: 1, fontSize: 20 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Restaurant
                      </Typography>
                      <Typography variant="body1">
                        {order?.restaurant?.restaurantName || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Order Items Card */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ReceiptIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Order Items
                </Typography>
              </Box>

              <List dense sx={{ pt: 0 }}>
                {order.items.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {item.quantity}x{" "}
                            {item.food?.name || `Item ${index + 1}`}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            ₹{(item.food?.price || 0).toFixed(2)} each
                          </Typography>
                        }
                        sx={{ flex: 2 }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, flex: 1, textAlign: "right" }}
                      >
                        ₹{((item.food?.price || 0) * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                    {index < order.items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            {/* Delivery Information Card */}
            <Paper
              elevation={0}
              sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <DeliveryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Delivery Information
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
                <AddressIcon
                  color="action"
                  sx={{ mr: 1, mt: 0.5, fontSize: 20 }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Delivery Address
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.user.address || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Paper>
            {/* QR Code Card */}
            {qrCodeDataUrl && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  mt: 4,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <QrCodeScannerIcon
                    color="primary"
                    sx={{ mr: 1, fontSize: 24 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Payment QR Code
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Avatar
                    src={qrCodeDataUrl}
                    variant="square"
                    sx={{ width: 180, height: 180, bgcolor: "transparent" }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  Scan this QR code for payment reference
                </Typography>
              </Paper>
            )}
          </Grid>

          {/* Right Column - Payment and QR Code */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                {/* <PaymentIcon color="primary" sx={{ mr: 1 }} /> */}
                <Icon
                  icon="ion:restaurant"
                  width="24"
                  height="24"
                  color="#1976d2"
                  style={{ marginRight: 8 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Restaurant Details
                </Typography>
              </Box>

              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    {/* <InfoIcon color="action" sx={{ mr: 1, fontSize: 20 }} /> */}
                    <Icon
                      icon="hugeicons:restaurant-01"
                      width="24"
                      height="24"
                      color="#757575"
                      style={{ marginRight: 4 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Restaurant Name
                      </Typography>
                      <Typography variant="body1">
                        {order?.restaurant?.restaurantName || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <EmailIcon color="action" sx={{ mr: 1, fontSize: 20 }} />

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {order?.restaurant?.email || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <PhoneIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Mobile No
                      </Typography>
                      <Typography variant="body1">
                        {order?.restaurant?.mobileNo || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PaymentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Payment Details
                </Typography>
              </Box>

              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <InfoIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Payment ID
                      </Typography>
                      <Typography variant="body1">
                        {payment?._id || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <DateIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body1">
                        {new Date(payment.timestamp).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <PaymentIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Method
                      </Typography>
                      <Typography variant="body1">RAZORPAY</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Payment Summary Card */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <MoneyIcon color="primary" sx={{ mr: 1 }} />

                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Payment Summary
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                {[
                  { label: "Subtotal", value: subtotal.toFixed(2) },
                  { label: "GST (18%)", value: gst },
                  { label: "Delivery Fee", value: "50" },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1.5,
                      pb: 1.5,
                      borderBottom: index < 2 ? "1px solid" : "none",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="body1">₹{item.value}</Typography>
                  </Box>
                ))}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    pt: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Total Amount
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ₹{order.totalAmount?.toFixed(2) || "0.00"}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Need help? Contact us at wrongright899@gmail.com or call 8999
            -081-573
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            Order ID: {order._id} • Payment ID: {payment?._id}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Payment;
