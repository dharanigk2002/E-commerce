import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res
          .status(400)
          .json({ success: false, message: "Invalid password" });
      const token = generateToken(user._id);
      return res.status(200).json({ success: true, token });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });

    if (exists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 8 characters long",
      });
    //Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = generateToken(user._id);

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}
function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PWD)
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
}

export { loginUser, adminLogin, registerUser };
