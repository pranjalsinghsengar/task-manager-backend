import mongoose from "mongoose";



async function connectMongoDb(MONGO_URL) {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

export default connectMongoDb;
