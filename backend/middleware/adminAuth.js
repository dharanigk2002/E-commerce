import jwt from "jsonwebtoken";

function adminAuth(req, res, next) {
  try {
    const { token } = req.headers;
    if (!token)
      return res
        .status(403)
        .json({ success: false, message: "Login again to get authorized" });
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PWD)
      return res
        .status(401)
        .json({ success: false, message: "Admin credentials are invalid" });
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: error.message });
  }
}

export default adminAuth;
