import express from "express";
import dotenv from "dotenv";
import { connectDb } from './database/db.js';
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";

dotenv.config();

cloudinary.v2.config({
  cloud_name: "CloudName",
  api_key: "ApiKey",
  api_secret: "SecretKey",
});
const app = express();

// using middlewares
app.use(express.json());
app.use(cookieParser());

const port = 5000;

//importing routes
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

//using routes
app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
