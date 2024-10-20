import http from "http";
import app from "./app.js";
import connectDB from "./config/mongodb.js";
import cloudinaryConfig from "./config/cloudinary.js";

const PORT = 4000;
const server = http.createServer(app);
async function startServer() {
  await connectDB();
  cloudinaryConfig();
  server.listen(PORT, () => console.log("Listening on port", PORT));
}

startServer();
