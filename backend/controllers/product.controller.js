import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model.js";

async function listProducts(_, res) {
  try {
    const products = await productModel.find({}, { __v: 0 });
    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}
async function addProduct(req, res) {
  try {
    const {
      name,
      description,
      category,
      price,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const images = [];
    for (const item in req.files) images.push(req.files[item][0]);
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller == true ? true : false,
      image: imageUrl,
      price: +price,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();
    return res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}
async function removeProduct(req, res) {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
}
async function singleProduct(req, res) {
  try {
    let product = await productModel.findOne({ _id: req.query.id }, { __v: 0 });
    if (!product)
      return res.status(404).json({
        success: false,
        message: `Product ${req.query.id} doesn't exist`,
      });
    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
}

export { listProducts, addProduct, removeProduct, singleProduct };
