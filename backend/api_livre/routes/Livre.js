import express from "express";
import mongoose from "mongoose";
import Livre from "../Models/Livre.js";
import sendMessage from "../utils/SndRabbit.js";
import amqp from "amqplib";

const routes = express.Router();

routes.get("/generateFakeData", async (req, res) => {
  try {
    // Generate 10 client records
    const livreRecords = [];
    for (let i = 0; i < 10; i++) {
      const livre = await Livre.create({
        code: 1000 + i,
        titre: "Livre " + i,
        description: "Description for Livre " + i,
        auteur: "Author " + i,
      });
      livreRecords.push(livre);
    }

    res.status(200).send("ok");
  } catch (e) {
    res.send(e);
  }
});

routes.get("/livres", async (req, res) => {
  const livres = await Livre.find();

  if (livres.length !== 0 && livres) {
    return res.status(200).json({ livres: livres });
  } else {
    return res.status(404).json({ msg: "livres not found" });
  }
});

routes.post("/livre/create", async (req, res) => {
  try {
    console.log(req.body);
    const livre = new Livre(req.body);
    await livre.save();

    // Send notification message to RabbitMQ
    const message = {
      eventType: "new_livre_added",
      livre: livre,
    };
    sendMessage(message);

    res
      .status(200)
      .json({ isSuccess: true, msg: "Livre added successfully", livre });
  } catch (err) {
    res.status(400).json({ isSuccess: false, msg: err.message });
  }
});

routes.get("/livre-count", async (req, res) => {
  const countLivres = await Livre.countDocuments();

  return res.status(200).json({ count: countLivres });
});

routes.get("/livres/search", async (req, res) => {
  try {
    const { query } = req.query;
    const livres = await Livre.find({ $text: { $search: query } });
    return res.status(200).json(livres);
  } catch (error) {
    console.error("Error searching livres:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.get("/livre/:code", async (req, res) => {
  const code = req.params.code;

  const livreData = await Livre.find({ code: code });

  if (!livreData) {
    return res.status(404).send("livre not found");
  }

  return res.status(200).json({ livre: livreData });
});

// Modify a livre
routes.put("/livre/:codeLivre", async (req, res) => {
  try {
    const livre = await Livre.findByIdAndUpdate(
      req.params.codeLivre,
      req.body,
      {
        new: true,
      }
    );
    if (!livre) {
      return res.status(404).json({ isSuccess: false, msg: "Livre not found" });
    }
    res
      .status(200)
      .json({ isSuccess: true, msg: "Livre updated successfully", livre });
  } catch (err) {
    res.status(500).json({ isSuccess: false, msg: err.message });
  }
});

routes.delete("/livre/:codeLivre", async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.codeLivre);
    if (!livre) {
      return res.status(404).json({ isSuccess: false, msg: "Livre not found" });
    }
    res.status(200).json({
      isSuccess: true,
      msg: "Livre deleted successfully",
      livre: livre,
    });
  } catch (err) {
    res.status(500).json({ isSuccess: false, msg: err.message });
  }
});

export default routes;
