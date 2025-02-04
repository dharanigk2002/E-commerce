import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "./product.controller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.get("/list", listProducts);
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/single", singleProduct);
productRouter.delete("/remove/:id", adminAuth, removeProduct);

export default productRouter;
