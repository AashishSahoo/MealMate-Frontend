import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register fonts (you can use different fonts if needed)
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#34A853",
    paddingBottom: 15,
  },
  logo: {
    width: 120,
    height: 40,
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34A853",
  },
  receiptSubtitle: {
    fontSize: 10,
    color: "#666666",
  },
  statusBanner: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  statusIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: "#34A853",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 5,
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridColumn: {
    width: "48%",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 10,
    color: "#666666",
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 10,
    color: "#333333",
  },
  itemsTable: {
    width: "100%",
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  colName: {
    width: "50%",
    fontSize: 10,
  },
  colPrice: {
    width: "20%",
    fontSize: 10,
    textAlign: "right",
  },
  colQty: {
    width: "15%",
    fontSize: 10,
    textAlign: "center",
  },
  colTotal: {
    width: "15%",
    fontSize: 10,
    textAlign: "right",
  },
  summaryBox: {
    backgroundColor: "#FAFAFA",
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrCode: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#999999",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 10,
  },
  restaurantDetails: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});

const PaymentReceiptPDF = ({
  order,
  payment,
  subtotal,
  gst,
  timestamp,
  qrCodeDataUrl,
}) => {
  // Format date and time
  const formattedDate = new Date(payment.timestamp).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const formattedTime = new Date(payment.timestamp).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.receiptTitle}>PAYMENT RECEIPT</Text>
            <Text style={styles.receiptSubtitle}>
              MealMate - Food Delivery Service
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, textAlign: "right" }}>
              Receipt #: {payment._id.slice(-8).toUpperCase()}
            </Text>
            <Text style={{ fontSize: 10, textAlign: "right" }}>
              {formattedDate} at {formattedTime}
            </Text>
          </View>
        </View>

        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <Text style={styles.statusText}>
            PAYMENT SUCCESSFUL • ORDER #{order._id.slice(-8).toUpperCase()}
          </Text>
          <Text
            style={{ marginLeft: "auto", fontSize: 12, fontWeight: "bold" }}
          >
            ₹{order.totalAmount?.toFixed(2)}
          </Text>
        </View>

        {/* Two Column Layout */}
        <View style={styles.gridContainer}>
          {/* Left Column */}
          <View style={styles.gridColumn}>
            {/* Customer Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CUSTOMER INFORMATION</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>
                  {order?.user?.firstName} {order?.user?.lastName}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailValue}>{order?.user?.email}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailValue}>{order?.user?.mobileNo}</Text>
              </View>
            </View>

            {/* Restaurant Information */}
            <View style={styles.restaurantDetails}>
              <Text style={styles.sectionTitle}>RESTAURANT DETAILS</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>
                  {order?.restaurant?.restaurantName}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailValue}>
                  {order?.restaurant?.email}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailValue}>
                  {order?.restaurant?.mobileNo}
                </Text>
              </View>
            </View>

            {/* Delivery Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>DELIVERY INFORMATION</Text>
              <Text style={{ fontSize: 10, lineHeight: 1.5 }}>
                {order.user?.address || "N/A"}
              </Text>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.gridColumn}>
            {/* Payment Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PAYMENT DETAILS</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment ID:</Text>
                <Text style={styles.detailValue}>{payment._id}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>
                  {formattedDate} at {formattedTime}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment Method:</Text>
                <Text style={styles.detailValue}>Razorpay</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={[styles.detailValue, { color: "#34A853" }]}>
                  Completed
                </Text>
              </View>
            </View>

            {/* QR Code */}
            {qrCodeDataUrl && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PAYMENT QR CODE</Text>
                <View style={styles.qrContainer}>
                  <Image src={qrCodeDataUrl} style={styles.qrCode} />
                  <Text style={{ fontSize: 8, marginTop: 5 }}>
                    Scan for payment reference
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORDER ITEMS</Text>
          <View style={styles.itemsTable}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.colName}>ITEM</Text>
              <Text style={styles.colPrice}>PRICE</Text>
              <Text style={styles.colQty}>QTY</Text>
              <Text style={styles.colTotal}>TOTAL</Text>
            </View>
            {/* Table Rows */}
            {order.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.colName}>{item.food?.name}</Text>
                <Text style={styles.colPrice}>
                  ₹{(item.food?.price || 0).toFixed(2)}
                </Text>
                <Text style={styles.colQty}>{item.quantity}</Text>
                <Text style={styles.colTotal}>
                  ₹{((item.food?.price || 0) * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAYMENT SUMMARY</Text>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.detailLabel}>Subtotal:</Text>
              <Text style={styles.detailValue}>₹{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.detailLabel}>
                GST ({gst > 0 ? "18%" : "0%"}):
              </Text>
              <Text style={styles.detailValue}>₹{gst}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.detailLabel}>Delivery Fee:</Text>
              <Text style={styles.detailValue}>₹50.00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={[styles.detailLabel, { fontWeight: "bold" }]}>
                TOTAL:
              </Text>
              <Text
                style={[
                  styles.detailValue,
                  { fontWeight: "bold", color: "#34A853" },
                ]}
              >
                ₹{order.totalAmount?.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Order ID: {order._id} • Payment ID: {payment._id}
          </Text>
          <Text style={{ marginTop: 5 }}>
            Need help? Contact us at wrongright899@gmail.com or call
            8999-081-573
          </Text>
          <Text style={{ marginTop: 5 }}>
            Thank you for choosing MealMate! • Generated on:{" "}
            {timestamp.toLocaleString()}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PaymentReceiptPDF;
