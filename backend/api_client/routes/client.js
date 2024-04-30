import express from "express";
import mongoose from "mongoose";
import Client from "../Models/Client.js";
// import dotenv from "dotenv";

const routes = express.Router();

routes.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const { firstname, lastname, email, phone } = req.body;

    const newClient = new Client({
      _id: new mongoose.Types.ObjectId(),
      firstname: firstname,
      lastname: lastname,
      name: `${firstname} ${lastname}`,
      email: email,
      phone: phone,
    });

    const savedClient = await newClient.save();

    res.status(200).json(savedClient);
  } catch (error) {
    console.error("Error creating Client:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default routes;
