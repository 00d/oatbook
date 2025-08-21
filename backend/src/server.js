import express from "express";
import oatRoutes from "./routes/oatRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: process.env.CLIENT_URL })); // before rate limiter
}

app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.use("/api/oats", oatRoutes);

app.use(express.static(path.join(__dirname, "../frontend", "dist")));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
