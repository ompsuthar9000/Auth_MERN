import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/DB.js";
import UserRouter from "./routes/userRoutes.js";
import path from "path"; // Import path for directory handling

const app = express();
const port = process.env.PORT || 4000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL , // Replace this with your frontend URL
    optionsSuccessStatus: 200,
  })
);

// Connect to the database
connectDb();

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.resolve("uploads")));
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend is running smoothly!' });
});
// Define your user routes
app.use("/api/user", UserRouter);

// Start the server
app.listen(port, () => console.log(`App is running on port: ${port}`));
