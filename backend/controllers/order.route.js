import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  updateStatus,
  allOrders,
  userOrders,
  verifyStripe,
} from "./order.controller.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment features
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/stripe", userAuth, placeOrderStripe);

// User feature
orderRouter.post("/userorders", userAuth, userOrders);

// Verify payment
orderRouter.post("/verifyStripe", userAuth, verifyStripe);

export default orderRouter;
