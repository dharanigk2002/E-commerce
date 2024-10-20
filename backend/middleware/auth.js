import jwt from "jsonwebtoken";

async function userAuth(req, res, next) {
  const { token } = req.headers;
  if (!token)
    return res.status(403).json({ success: false, message: "Login again!!!" });
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: err.message });
  }
}

export default userAuth;
