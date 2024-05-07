import express from "express";
import mongoose from "mongoose";

import sendMessage from "../utils/SndRabbit.js";
import Emprunt from "../Models/EmpruntModel.js";
import axios from "axios";

const routes = express.Router();

// routes.get("/fakeDataa", async (req, res) => {
//   console.log("hello");
//   try {
//     const clients = await Client.find();

//     const livres = await Livre.find();
//     console.log("cleint", clients);
//     console.log("livres:", livres);
//     const emprunts = [];

//     for (let i = 0; i < 10; i++) {
//       emprunts.push({
//         client: clients[i]._id,
//         livre: livres[i].code,
//         dateEmprunt: new Date(),
//         dateRetour: null,
//       });
//     }

//     await EmpruntModel.insertMany(emprunts);
//     return res.status(200).send("ok");
//   } catch (e) {
//     return res.status(500).send(e);
//   }
// });

routes.get("/emprunts", async (req, res) => {
  try {
    const emprunts = await Emprunt.find();

    if (!emprunts) {
      res.status(404).json({ msg: "emprunts not found" });
    }

    res.json({ emprunts: emprunts });
  } catch (error) {
    console.error("Error fetching emprunts:", error.message);
    res.status(500).json({ error: "Failed to fetch emprunts" });
  }
});

routes.post("/emprunts/create", async (req, res) => {
  try {
    const { livreCode, clientId } = req.body;

    const livreRes = await axios.get(
      `http://localhost:3001/api/v1/livre/${livreCode}`
    );
    const livreData = livreRes.data.livre;

    if (!livreData) {
      return res.status(404).json({ isSuccess: false, msg: "Livre not found" });
    }

    const clientRes = await axios.get(
      `http://localhost:3005/api/v1/client/${clientId}`
    );
    const clientData = clientRes.data.client;

    if (!clientData) {
      return res
        .status(404)
        .json({ isSuccess: false, msg: "Client not found" });
    }

    console.log(clientData, livreData);

    const emprunt = new Emprunt({
      livre: {
        id: livreData[0]._id,
        titre: livreData[0].titre,
      },
      client: {
        id: clientData[0]._id,
        name: clientData[0].fullName,
      },
      dateEmprunt: new Date(),
      dateRetour: null,
    });

    await emprunt.save();

    res
      .status(201)
      .json({ isSuccess: true, msg: "Emprunt added successfully", emprunt });

    // Send notification message to RabbitMQ
    //   const message = {
    //     eventType: 'new_emprunt_added',
    //     emprunt: emprunt,
    //   };
    //   sendMessage(message);
  } catch (err) {
    console.error("Error adding emprunt:", err);
    res.status(500).json({ isSuccess: false, msg: "Internal server error" });
  }
});

// Return a livre
routes.put("/emprunt/return/:id", async (req, res) => {
  try {
    const empruntId = req.params.id;

    const emprunt = await Emprunt.findByIdAndUpdate(
      empruntId,
      { dateRetour: Date.now() },
      { new: true }
    );

    if (!emprunt) {
      return res
        .status(404)
        .json({ isSuccess: false, msg: "Emprunt not found" });
    }

    // Send notification message to RabbitMQ
    //   const message = {
    //     eventType: 'emprunt_returned',
    //     emprunt: emprunt,
    //   };
    //   sendMessage(message);

    res
      .status(200)
      .json({ isSuccess: true, msg: "Livre returned successfully", emprunt });
  } catch (err) {
    res.status(400).json({ isSuccess: false, msg: err.message });
  }
});

routes.get("/emp-count", async (req, res) => {
  const countEmp = await Emprunt.countDocuments();

  return res.status(200).json({ count: countEmp });
});

routes.get("/emprunt/:idClient", async (req, res) => {
  try {
    const emprunts = await Emprunt.find({ client: req.params.idClient });

    if (!emprunts || emprunts.length === 0) {
      return res
        .status(404)
        .json({ isSuccess: false, msg: "No emprunts found for the client" });
    }

    res.status(200).json({ isSuccess: true, emprunts });
  } catch (err) {
    res.status(500).json({ isSuccess: false, msg: err.message });
  }
});

routes.delete("/emprunts/:id", async (req, res) => {
  try {
    const empruntId = req.params.id;

    const emprunt = await Emprunt.findById(empruntId);
    if (!emprunt) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Emprunt not found" });
    }

    await Emprunt.findByIdAndDelete(empruntId);

    return res
      .status(200)
      .json({ isSuccess: true, message: "Emprunt deleted successfully" });
  } catch (error) {
    console.error("Error deleting emprunt:", error);
    return res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
});

routes.get("/emprunts/search", async (req, res) => {
  try {
    const { query } = req.query;
    const emprunts = await Emprunt.find({ $text: { $search: query } });
    return res.status(200).json(emprunts);
  } catch (error) {
    console.error("Error searching emprunts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default routes;
