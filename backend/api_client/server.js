import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import mongoose from "mongoose";
import clientRoutes from "./routes/client.js";

dotenv.config();

const app = express();

app.use(cors());

// app.use(express.json());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 3001;

app.use("/clients", clientRoutes);

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
