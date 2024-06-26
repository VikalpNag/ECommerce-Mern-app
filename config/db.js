import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to DataBase "${conn.connection.host}"`.white);
  } catch (error) {
    console.log(`Error found is ${error}`.red);
  }
};

export default connectDB;
