import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
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
} from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import QRCode from "qrcode";

// ... (keep all the existing style definitions and PaymentReceiptPDF component)
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#F8F9FA",
  },
  header: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
    textAlign: "center",
  },
  companyHeader: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 12,
    marginBottom: 25,
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "extrabold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#FF6B6B",
    paddingBottom: 4,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    fontSize: 16,
  },
  label: {
    color: "#585654",
    fontWeight: "medium",
  },
  value: {
    color: "#2C3E50",
    fontWeight: "semibold",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
    fontSize: 16,
  },
  totalBox: {
    backgroundColor: "#FF6B6B10",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  qrCode: {
    width: 120,
    height: 120,
    marginTop: 15,
    alignSelf: "center",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#353432",
    fontSize: 10,
  },
});

const PaymentReceiptPDF = ({
  order,
  payment,
  subtotal,
  gst,
  timestamp,
  qrCodeDataUrl,
}) => (
  <Document>
    <Page size="A3" style={styles.page}>
      {/* Company Header */}
      <View style={styles.companyHeader}>
        <Text>MealMate</Text>
      </View>

      {/* Transaction Overview */}
      <View style={{ marginBottom: 25 }}>
        <Text style={styles.header}>Payment Receipt</Text>
        <Text style={{ textAlign: "center", color: "#7F8C8D" }}>
          Transaction ID: {payment.razorpay?.payment_id}
        </Text>
      </View>

      {/* Two Column Layout */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        {/* Customer Details */}
        <View style={{ width: "48%" }}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{order?.user?.name || "N/A"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{order?.user?.email || "N/A"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{order?.user?.contact || "N/A"}</Text>
          </View>
        </View>

        {/* Transaction Details */}
        <View style={{ width: "48%" }}>
          <Text style={styles.sectionTitle}>Transaction Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>
              {new Date(payment.timestamp).toLocaleDateString("en-IN")}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, { color: "#2ecc71" }]}>
              {payment.status.toUpperCase()}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Method:</Text>
            <Text style={styles.value}>RAZORPAY</Text>
          </View>
        </View>
      </View>

      {/* Order Items */}
      <Text style={styles.sectionTitle}>Order Items</Text>
      {order.items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <View style={{ flex: 2 }}>
            <Text style={{ fontWeight: "semibold" }}>
              {item.food?.name || `Item ${index + 1}`}
            </Text>
            <Text style={{ fontSize: 10, color: "#7F8C8D" }}>
              {item.quantity} x ₹{(item.food?.price || 0).toFixed(2)} each
            </Text>
          </View>
          <Text style={{ flex: 1, textAlign: "right", fontWeight: "semibold" }}>
            ₹{((item.food?.price || 0) * item.quantity).toFixed(2)}
          </Text>
        </View>
      ))}
      {/* Payment Summary */}
      <View style={styles.totalBox}>
        <View style={[styles.detailItem, { marginBottom: 8 }]}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>₹{subtotal.toFixed(2)}</Text>
        </View>
        <View style={[styles.detailItem, { marginBottom: 8 }]}>
          <Text style={styles.label}>GST (5%):</Text>
          <Text style={styles.value}>₹{gst}</Text>
        </View>
        <View style={[styles.detailItem, { marginBottom: 12 }]}>
          <Text style={styles.label}>Delivery Fee:</Text>
          <Text style={styles.value}>₹0.00</Text>
        </View>
        <View
          style={[
            styles.detailItem,
            { borderTopWidth: 1, borderTopColor: "#ECF0F1", paddingTop: 8 },
          ]}
        >
          <Text style={[styles.label, { fontWeight: "bold" }]}>
            Total Amount:
          </Text>
          <Text
            style={[styles.value, { color: "#FF6B6B", fontWeight: "bold" }]}
          >
            ₹{order.totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Delivery & QR Code */}
      <View
        style={{
          marginTop: 25,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "48%" }}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={{ lineHeight: 1.5 }}>
            {order.deliveryAddress || "N/A"}
          </Text>
        </View>
        {qrCodeDataUrl && (
          <View style={{ width: "48%", alignItems: "center" }}>
            <Text style={[styles.sectionTitle, { textAlign: "center" }]}>
              QR Code
            </Text>
            <Image src={qrCodeDataUrl} style={styles.qrCode} />
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Generated on: {timestamp.toLocaleString()}</Text>
        <Text style={{ marginTop: 4 }}>Thank you for choosing MealMate!</Text>
        <Text style={{ marginTop: 2 }}>
          Contact: wrongright899@gmail.com | ☎️ 1800-123-4567
        </Text>
      </View>
    </Page>
  </Document>
);

const Payment = ({ order, payment }) => {
  console.log("Payment component props:", { order, payment });
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  const subtotal = order.items.reduce(
    (sum, item) => sum + (item.food?.price || 0) * item.quantity,
    0
  );

  const gst = (order.totalAmount - subtotal).toFixed(2);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(
          JSON.stringify({
            orderId: order._id,
            paymentId: payment?.razorpay?.payment_id,
            amount: payment?.razorpay?.amount,
            restaurant: order?.restaurant?.name,
          })
        );
        setQrCodeDataUrl(url);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };
    generateQR();
  }, [order._id, payment?.razorpay?.payment_id, payment?.razorpay?.amount]);

  return (
    <Container maxWidth="100vh" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#2c3e50" }}
          >
            Payment Receipt
          </Typography>
          <PDFDownloadLink
            document={
              <PaymentReceiptPDF
                order={order}
                payment={payment} // Fixed from payment={order}
                subtotal={subtotal}
                gst={gst}
                timestamp={new Date()}
                qrCodeDataUrl={qrCodeDataUrl}
              />
            }
            fileName="payment_receipt.pdf"
          >
            {({ loading }) => (
              <Button
                color="#8BC0F5"
                sx={{ fontSize: "large" }}
                disabled={loading}
              >
                <Tooltip title="Download PDF" arrow>
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <ArrowCircleDownIcon />
                  )}
                </Tooltip>
              </Button>
            )}
          </PDFDownloadLink>
        </Box>

        {/* Customer Details */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                p: 2,
                borderRadius: 1,
                borderLeft: "4px solid #ED97C0",
                height: "10rem",
              }}
            >
              <Typography variant="h6" sx={{ color: "#34495e", mb: 1 }}>
                Customer Details
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {order?.user?.name || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {order?.user?.email || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {order?.user?.contact || "N/A"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                p: 2,
                borderRadius: 1,
                borderLeft: "4px solid #F4C6A5",
              }}
            >
              <Typography variant="h6" sx={{ color: "#34495e", mb: 1 }}>
                Transaction Details
              </Typography>
              <Typography variant="body1">
                <strong>Payment Status:</strong> {payment?.status.toUpperCase()}
              </Typography>
              <Typography variant="body1">
                <strong>Payment ID:</strong> {payment.razorpay?.payment_id}
              </Typography>
              <Typography variant="body2">
                <strong>Method:</strong> RAZORPAY
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong>{" "}
                {new Date(payment.timestamp).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Order Summary */}
        <Typography variant="h6" sx={{ color: "#34495e", mb: 2 }}>
          Order Summary
        </Typography>
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            mb: 3,
          }}
        >
          <List>
            {order.items.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    "&:hover": { backgroundColor: "#f8f9fa" },
                    padding: "12px 16px",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item.quantity}x{" "}
                        {item.food?.name || `Item ${index + 1}`}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < order.items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Payment Breakdown */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                p: 2,
                borderRadius: 1,
                borderLeft: "4px solid #9C78DC",
                height: "13.5rem",
              }}
            >
              <Typography variant="h6" sx={{ color: "#34495e", mb: 2 }}>
                Delivery Information
              </Typography>
              <Typography variant="body1">
                {order?.user?.address || "N/A"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                p: 3,
                borderRadius: 1,
                borderLeft: "4px solid #2ecc71",
              }}
            >
              <Typography variant="h6" sx={{ color: "#34495e", mb: 2 }}>
                Payment Breakdown
              </Typography>
              <Grid container spacing={1}>
                {[
                  { label: "Subtotal:", value: subtotal.toFixed(2) },
                  { label: "GST (5%):", value: gst },
                  { label: "Delivery:", value: 0.0 },
                  {
                    label: "Total:",
                    value: order?.totalAmount.toFixed(2),
                    bold: true,
                  },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: item.bold ? 600 : 400,
                          color: item.bold ? "#2c3e50" : "inherit",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        align="right"
                        sx={{
                          fontWeight: item.bold ? 600 : 400,
                          color: item.bold ? "#2c3e50" : "inherit",
                        }}
                      >
                        ₹{item.value}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 3,
            textAlign: "center",
            borderTop: "1px solid #e0e0e0",
            pt: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Thank you for your order! • A confirmation email has been sent • For
            queries contact wrongright899@gmail.com
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Payment;
