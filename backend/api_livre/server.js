import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import livreRoutes from "./routes/livre.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port || 3001;

app.use("/api/v1", livreRoutes);

mongoose
  .connect("mongodb://localhost:27017/Livres", {
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
    console.log("service livre listen to port", port);
  }
});
