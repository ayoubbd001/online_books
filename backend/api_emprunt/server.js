import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import empRoutes from "./routes/empRoutes.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port || 3006;

app.get("/api/v1", (req, res) => {
  res.send("hello");
});

app.use("/api/v1", empRoutes);

mongoose
  .connect("mongodb://localhost:27017/Emprunts", {
    bufferCommands: false, // Disable buffering commands
    serverSelectionTimeoutMS: 10000, // Timeout for server selection
    socketTimeoutMS: 45000, // Timeout for socket operations
  })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("not connected ", e);
  });

app.listen(port, (err) => {
  if (err) {
    console.log("error listen to port", port);
  } else {
    console.log("service emprunt listen to port", port);
  }
});
