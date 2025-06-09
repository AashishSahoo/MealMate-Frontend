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
import { useParams } from "react-router-dom";
import axios from "axios";

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
}) => {
  return (
    <>
      {" "}
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
                <Text style={styles.value}>
                  {order?.user?.contact || "N/A"}
                </Text>
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
              <Text
                style={{ flex: 1, textAlign: "right", fontWeight: "semibold" }}
              >
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
            <Text style={{ marginTop: 4 }}>
              Thank you for choosing MealMate!
            </Text>
            <Text style={{ marginTop: 2 }}>
              Contact: wrongright899@gmail.com | ☎️ 1800-123-4567
            </Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default PaymentReceiptPDF;
