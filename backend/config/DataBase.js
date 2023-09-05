import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log(`mongodb connected to ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default connectDB;
