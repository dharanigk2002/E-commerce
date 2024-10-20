import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import userRouter from "./controllers/user.router.js";
import productRouter from "./controllers/product.router.js";
import cartRouter from "./controllers/cart.route.js";
import orderRouter from "./controllers/order.route.js";

const app = express();
// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);

export default app;
