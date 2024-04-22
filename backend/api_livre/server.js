import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port || 3001;

app.get("/", (req, res) => {
  console.log("hello");
});

app.listen(port, (err) => {
  if (err) {
    console.log("error listen to port", port);
  } else {
    console.log("app listen to port", port);
  }
});
