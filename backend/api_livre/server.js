import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import livreRoutes from "./routes/livre.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port || 3000;

// app.get("/", (req, res) => {
//   res.send("hello");s
// });

app.use("/api/v1/livre", livreRoutes);

mongoose
  .connect("mongodb://localhost:27017/Livres")
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
