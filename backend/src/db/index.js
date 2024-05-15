import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://sujitmern:sujitmern@cluster0.lthejge.mongodb.net/Threads_DB`
    );
    console.log(`MongoDBConnected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
    process.exit(1);
  }
};
