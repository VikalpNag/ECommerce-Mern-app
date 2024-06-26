import express from "express";
import color from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoute.js';
import cors from 'cors';

//DB config
connectDB();

//rest objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//configure env
dotenv.config();
const newPORT = process.env.PORT || 3000;

//rest api
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Ecommerce web app</h1>`);
});

//run listen
app.listen(newPORT, () => {
  console.log(`Server start on port:${newPORT}`.cyan);
});
