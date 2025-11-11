import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./Router/route.js";
import loginRouter from "./Router/loginroutes.js";
import productRoute from "./Router/addProRout.js";
import productRouter from "./Router/productFetch.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"))

//  Use Environment Variables for MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://sohamata33:sohamata33@medicineshop.2uulw.mongodb.net/";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

//  Middleware
app.use(cors({ origin: "*" }));
app.use(express.json()); // 
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use("/", router);
app.use("/", loginRouter);
app.use("/api/products", productRoute);
app.use("/api/products", productRouter);

//  Start Server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
