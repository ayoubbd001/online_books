import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/dbConnect.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port || 3001;

app.get("/", (req, res) => {
  res.send("hello");
});

connectToDatabase();

app.listen(port, (err) => {
  if (err) {
    console.log("error listen to port", port);
  } else {
    console.log("app listen to port", port);
  }
});
