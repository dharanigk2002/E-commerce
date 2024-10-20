import mongoose from "mongoose";

async function connectDB() {
  mongoose.connection.on("connected", () => console.log("Mongo db connected"));
  await mongoose.connect(process.env.MONGO_URI);
}

export default connectDB;
