import express from "express";
import mongoose from "mongoose";
import Client from "../Models/Client.js";
// import dotenv from "dotenv";

const routes = express.Router();

routes.get("/clients", async (req, res) => {
  const clients = await Client.find({});

  if (clients.length !== 0 && clients) {
    return res.status(200).json({ clients: clients });
  }
  return res.status(404).json({ msg: "no clients found" });
});

routes.get("/generateFakeData", async (req, res) => {
  try {
    const clientRecords = [];
    for (let i = 0; i < 10; i++) {
      const client = await Client.create({
        firstname: `Client${i + 1}`,
        lastname: `Lastname${i + 1}`,
        fullName: `${firstname} ${lastname}`,
        email: `client${i + 1}@example.com`,
        phone: `+12345678${i}`,
      });
      clientRecords.push(client);
    }

    res.status(200).send("ok");
  } catch (e) {
    res.send(e);
  }
});

routes.post("/client/create", async (req, res) => {
  console.log(req.body);
  try {
    const { firstname, lastname, email, phone } = req.body;

    const newClient = new Client({
      _id: new mongoose.Types.ObjectId(),
      firstname: firstname,
      lastname: lastname,
      fullName: `${firstname} ${lastname}`,
      email: email,
      phone: phone,
    });

    const savedClient = await newClient.save();

    res.status(200).json({
      isSuccess: true,
      msg: "client added succefuly",
      client: savedClient,
    });
  } catch (error) {
    // console.error("Error creating Client:", error);
    res.status(500).send({
      isSuccess: false,
      msg: "an error occurs try again !",
    });
  }
});

routes.get("/client-count", async (req, res) => {
  try {
    const countClient = await Client.countDocuments();
    return res.status(200).json({ count: countClient });
  } catch (error) {
    console.error("Error fetching client count:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.get("/clients/search", async (req, res) => {
  try {
    const { query } = req.query;
    const clients = await Client.find({ $text: { $search: query } });
    return res.status(200).json(clients);
  } catch (error) {
    console.error("Error searching clients:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.get("/client/:id", async (req, res) => {
  const idCl = req.params.id;

  const clientData = await Client.find({ _id: idCl });

  if (!clientData) {
    return res.status(404).send("client not found");
  }

  return res.status(200).json({ client: clientData });
});

routes.put("/client/:idClient", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.idClient,
      req.body,
      { new: true }
    );
    if (!client) {
      return res
        .status(404)
        .json({ isSuccess: false, msg: "Client not found" });
    }
    res
      .status(200)
      .json({ isSuccess: true, msg: "Client updated successfully", client });
  } catch (err) {
    res.status(400).json({ isSuccess: false, msg: err.message });
  }
});

routes.delete("/client/:idClient", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.idClient);
    if (!client) {
      return res
        .status(404)
        .json({ isSuccess: false, msg: "Client not found" });
    }
    res
      .status(200)
      .json({ isSuccess: true, msg: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ isSuccess: false, msg: err.message });
  }
});

export default routes;
