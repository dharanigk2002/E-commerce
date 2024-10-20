import { v2 as cloudinary } from "cloudinary";

function cloudinaryConfig() {
  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
  });
}

export default cloudinaryConfig;
