import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port || 3001;

app.get("/", (req, res) => {
  res.send("hello");
});

mongoose
  .connect("mongodb://localhost:27017/clients")
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
    console.log("srvice client listen to port", port);
  }
});
