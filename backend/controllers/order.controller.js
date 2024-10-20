import { orderModel } from "../models/order.model.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";

const deliveryCharge = 10;
const currency = "INR";

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// COD
async function placeOrder(req, res) {
  try {
    const { userId, items, amount, address } = req.body;
    const paymentMethod = "COD";
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
}

// Stripe
async function placeOrderStripe(req, res) {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    return res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// All orders data for admin panel
async function allOrders(req, res) {
  try {
    const orders = await orderModel.find({});
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
}

// User order data for frontend
async function userOrders(req, res) {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}

// Update order status from admin panel
async function updateStatus(req, res) {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    return res.status(200).json({ success: true, message: "Order updated" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

async function verifyStripe(req, res) {
  const { success, userId, orderId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.status(200).json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
