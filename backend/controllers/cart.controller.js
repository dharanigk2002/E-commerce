import userModel from "../models/user.model.js";

async function addToCart(req, res) {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) cartData[itemId][size]++;
      else cartData[itemId][size] = 1;
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
}

async function updateCart(req, res) {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({ success: true, message: "Updated cart" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
}

async function getUserCart(req, res) {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    return res.status(200).json({ success: false, cart: userData.cartData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
}

export { addToCart, updateCart, getUserCart };
